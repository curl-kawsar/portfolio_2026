"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { GalleryLoveImage } from "@/lib/db";
import {
  mergeGalleryLoveCache,
  readGalleryLoveCache,
  writeGalleryLoveCache,
} from "@/lib/galleryLoveCache";

type LoveState = {
  total: number;
  images: Record<string, GalleryLoveImage>;
};

type LoveContextValue = LoveState & {
  ready: boolean;
  poppingImage: string | null;
  sendLove: (imageKey: string) => Promise<void>;
};

const LoveContext = createContext<LoveContextValue | null>(null);

const EMPTY_STATE: LoveState = { total: 0, images: {} };

export function LoveProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LoveState>(EMPTY_STATE);
  const [ready, setReady] = useState(false);
  const [poppingImage, setPoppingImage] = useState<string | null>(null);
  const pendingRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const cached = readGalleryLoveCache();
    if (cached) {
      setState({ total: cached.total, images: cached.images });
      setReady(true);
    }

    fetch("/api/gallery-love", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.total !== "number" || !data.images) return;

        const merged = mergeGalleryLoveCache(data.total, data.images);
        setState({ total: merged.total, images: merged.images });
      })
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  const sendLove = useCallback(async (imageKey: string) => {
    if (pendingRef.current.has(imageKey)) return;

    let snapshot: LoveState | null = null;

    setState((prev) => {
      const current = prev.images[imageKey];
      if (current?.loved) return prev;

      snapshot = prev;
      const next: LoveState = {
        total: prev.total + 1,
        images: {
          ...prev.images,
          [imageKey]: { count: (current?.count ?? 0) + 1, loved: true },
        },
      };
      writeGalleryLoveCache(next.total, next.images);
      return next;
    });

    if (!snapshot) return;

    pendingRef.current.add(imageKey);
    setPoppingImage(imageKey);
    window.setTimeout(() => setPoppingImage(null), 320);

    try {
      const res = await fetch("/api/gallery-love", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageKey }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error("Love request failed");

      if (typeof data.total === "number" && data.imageKey && data.image) {
        setState((prev) => {
          const next: LoveState = {
            total: data.total,
            images: { ...prev.images, [data.imageKey]: data.image },
          };
          writeGalleryLoveCache(next.total, next.images);
          return next;
        });
      }
    } catch {
      setState(snapshot);
      writeGalleryLoveCache(snapshot.total, snapshot.images);
    } finally {
      pendingRef.current.delete(imageKey);
    }
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      ready,
      poppingImage,
      sendLove,
    }),
    [state, ready, poppingImage, sendLove]
  );

  return <LoveContext.Provider value={value}>{children}</LoveContext.Provider>;
}

export function useLove() {
  const ctx = useContext(LoveContext);
  if (!ctx) {
    throw new Error("useLove must be used within LoveProvider");
  }
  return ctx;
}
