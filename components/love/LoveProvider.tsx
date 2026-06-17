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
  addLovedImageKey,
  applyServerLoveState,
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

  const syncFromServer = useCallback(
    (serverTotal: number, serverImages: Record<string, GalleryLoveImage>) => {
      const applied = applyServerLoveState(serverTotal, serverImages);
      setState(applied);
      return applied;
    },
    []
  );

  useEffect(() => {
    fetch("/api/gallery-love", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.total !== "number" || !data.images) return;
        syncFromServer(data.total, data.images);
      })
      .catch(() => {})
      .finally(() => setReady(true));
  }, [syncFromServer]);

  const sendLove = useCallback(
    async (imageKey: string) => {
      if (pendingRef.current.has(imageKey)) return;

      const rollbackRef = { current: null as LoveState | null };
      let didUpdate = false;

      setState((prev) => {
        const current = prev.images[imageKey];
        if (current?.loved) return prev;

        didUpdate = true;
        rollbackRef.current = prev;
        const next: LoveState = {
          total: prev.total + 1,
          images: {
            ...prev.images,
            [imageKey]: { count: (current?.count ?? 0) + 1, loved: true },
          },
        };
        addLovedImageKey(imageKey);
        return next;
      });

      if (!didUpdate || !rollbackRef.current) return;

      const rollback = rollbackRef.current;
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

        if (typeof data.total === "number" && data.images) {
          syncFromServer(data.total, data.images);
          if (data.imageKey) addLovedImageKey(data.imageKey);
        }
      } catch {
        setState(rollback);
      } finally {
        pendingRef.current.delete(imageKey);
      }
    },
    [syncFromServer]
  );

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
