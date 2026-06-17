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
import { getLoveForImage, withImageLove } from "@/lib/galleryLoveUtils";

type LoveState = {
  total: number;
  images: Record<string, GalleryLoveImage>;
};

type LoveContextValue = LoveState & {
  ready: boolean;
  poppingImage: string | null;
  getImageLove: (imageKey: string) => GalleryLoveImage | undefined;
  sendLove: (imageKey: string) => Promise<void>;
};

const LoveContext = createContext<LoveContextValue | null>(null);

const EMPTY_STATE: LoveState = { total: 0, images: {} };

type Props = {
  children: ReactNode;
  initialLove?: LoveState;
};

export function LoveProvider({ children, initialLove }: Props) {
  const [state, setState] = useState<LoveState>(initialLove ?? EMPTY_STATE);
  const [ready, setReady] = useState(Boolean(initialLove));
  const [poppingImage, setPoppingImage] = useState<string | null>(null);
  const pendingRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    try {
      localStorage.removeItem("portfolio_gallery_love_v1");
      localStorage.removeItem("portfolio_gallery_loved_v1");
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    fetch("/api/gallery-love", { cache: "no-store", credentials: "same-origin" })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.total !== "number" || !data.images) return;
        setState({ total: data.total, images: data.images });
      })
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  const getImageLove = useCallback(
    (imageKey: string) => getLoveForImage(state.images, imageKey),
    [state.images]
  );

  const sendLove = useCallback(async (imageKey: string) => {
    if (pendingRef.current.has(imageKey)) return;

    let didUpdate = false;
    let rollback: LoveState | null = null;

    setState((prev) => {
      const current = getLoveForImage(prev.images, imageKey);
      if (current?.loved) return prev;

      didUpdate = true;
      rollback = prev;
      return {
        total: prev.total + 1,
        images: withImageLove(prev.images, imageKey, {
          count: (current?.count ?? 0) + 1,
          loved: true,
        }),
      };
    });

    if (!didUpdate || !rollback) return;

    pendingRef.current.add(imageKey);
    setPoppingImage(imageKey);
    window.setTimeout(() => setPoppingImage(null), 320);

    try {
      const res = await fetch("/api/gallery-love", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ image: imageKey }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error("Love request failed");

      if (typeof data.total === "number" && data.images) {
        setState({ total: data.total, images: data.images });
      }
    } catch {
      setState(rollback);
    } finally {
      pendingRef.current.delete(imageKey);
    }
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      ready,
      poppingImage,
      getImageLove,
      sendLove,
    }),
    [state, ready, poppingImage, getImageLove, sendLove]
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
