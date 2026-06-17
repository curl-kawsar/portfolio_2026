import type { GalleryLoveImage } from "@/lib/db";
import { getLoveForImage, withImageLove } from "@/lib/galleryLoveUtils";

const LOVED_KEY = "portfolio_gallery_loved_v1";

/** Only cache which images this visitor has loved — counts always come from the server. */
export function readLovedImageKeys(): Set<string> {
  if (typeof window === "undefined") return new Set();

  try {
    const raw = localStorage.getItem(LOVED_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as string[];
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

export function writeLovedImageKeys(keys: Set<string>) {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(LOVED_KEY, JSON.stringify([...keys]));
  } catch {
    // ignore
  }
}

export function addLovedImageKey(imageKey: string) {
  const keys = readLovedImageKeys();
  keys.add(imageKey);
  writeLovedImageKeys(keys);
}

/** Apply universal server counts; merge in local loved state only when server lacks cookie yet. */
export function applyServerLoveState(
  serverTotal: number,
  serverImages: Record<string, GalleryLoveImage>
): { total: number; images: Record<string, GalleryLoveImage> } {
  const localLoved = readLovedImageKeys();
  let images: Record<string, GalleryLoveImage> = { ...serverImages };

  for (const key of localLoved) {
    const existing = getLoveForImage(images, key);
    if (existing) {
      images = withImageLove(images, key, { ...existing, loved: true });
    } else {
      images = withImageLove(images, key, { count: 0, loved: true });
    }
  }

  return { total: serverTotal, images };
}
