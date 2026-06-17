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

function seedLovedKeys(images: Record<string, GalleryLoveImage>) {
  const keys = new Set<string>();
  for (const [key, value] of Object.entries(images)) {
    if (value.loved) keys.add(key);
  }
  return keys;
}

function hasLovedKey(keys: Set<string>, imageKey: string) {
  if (keys.has(imageKey)) return true;
  const lower = imageKey.toLowerCase();
  for (const key of keys) {
    if (key.toLowerCase() === lower) return true;
  }
  return false;
}

/** Keep every image this visitor has loved in the session, even across API responses. */
function mergeVisitorLoves(
  server: LoveState,
  lovedByYou: Set<string>
): LoveState {
  let images: Record<string, GalleryLoveImage> = { ...server.images };

  for (const key of lovedByYou) {
    const existing = getLoveForImage(images, key);
    images = withImageLove(images, key, {
      count: existing?.count ?? 1,
      loved: true,
    });
  }

  return { total: server.total, images };
}

export function LoveProvider({ children, initialLove }: Props) {
  const [state, setState] = useState<LoveState>(() =>
    initialLove ? mergeVisitorLoves(initialLove, seedLovedKeys(initialLove.images)) : EMPTY_STATE
  );
  const [ready, setReady] = useState(false);
  const [poppingImage, setPoppingImage] = useState<string | null>(null);
  const lovedByYouRef = useRef<Set<string>>(seedLovedKeys(initialLove?.images ?? {}));
  const postQueueRef = useRef<Promise<void>>(Promise.resolve());

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

        for (const [key, value] of Object.entries(
          data.images as Record<string, GalleryLoveImage>
        )) {
          if (value.loved) lovedByYouRef.current.add(key);
        }

        setState(mergeVisitorLoves(
          { total: data.total, images: data.images },
          lovedByYouRef.current
        ));
      })
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  const getImageLove = useCallback(
    (imageKey: string) => getLoveForImage(state.images, imageKey),
    [state.images]
  );

  const sendLove = useCallback((imageKey: string) => {
    const run = async () => {
      if (hasLovedKey(lovedByYouRef.current, imageKey)) return;

      let didUpdate = false;
      let rollback: LoveState | null = null;

      setState((prev) => {
        const existing = getLoveForImage(prev.images, imageKey);
        if (existing?.loved) return prev;

        didUpdate = true;
        rollback = prev;
        return mergeVisitorLoves(
          {
            total: prev.total + 1,
            images: withImageLove(prev.images, imageKey, {
              count: (existing?.count ?? 0) + 1,
              loved: true,
            }),
          },
          new Set([...lovedByYouRef.current, imageKey])
        );
      });

      if (!didUpdate || !rollback) return;

      lovedByYouRef.current.add(imageKey);
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
          if (data.imageKey) lovedByYouRef.current.add(data.imageKey);
          setState(
            mergeVisitorLoves(
              { total: data.total, images: data.images },
              lovedByYouRef.current
            )
          );
        }
      } catch {
        lovedByYouRef.current.delete(imageKey);
        setState(rollback);
      }
    };

    postQueueRef.current = postQueueRef.current.then(run, run);
    return postQueueRef.current;
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
