import type { GalleryLoveImage } from "@/lib/db";

const CACHE_KEY = "portfolio_gallery_love_v1";

export type GalleryLoveCache = {
  total: number;
  images: Record<string, GalleryLoveImage>;
  updatedAt: number;
};

function sumCounts(images: Record<string, GalleryLoveImage>) {
  return Object.values(images).reduce((sum, img) => sum + img.count, 0);
}

export function readGalleryLoveCache(): GalleryLoveCache | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as GalleryLoveCache;
    if (
      typeof parsed.total !== "number" ||
      !parsed.images ||
      typeof parsed.images !== "object"
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function writeGalleryLoveCache(
  total: number,
  images: Record<string, GalleryLoveImage>
) {
  if (typeof window === "undefined") return;

  try {
    const payload: GalleryLoveCache = {
      total,
      images,
      updatedAt: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    // ignore quota / private mode errors
  }
}

export function mergeGalleryLoveCache(
  serverTotal: number,
  serverImages: Record<string, GalleryLoveImage>
) {
  const cached = readGalleryLoveCache();
  if (!cached) {
    writeGalleryLoveCache(serverTotal, serverImages);
    return { total: serverTotal, images: serverImages };
  }

  const merged: Record<string, GalleryLoveImage> = { ...serverImages };

  for (const [key, cachedImage] of Object.entries(cached.images)) {
    const serverImage = merged[key];
    if (!serverImage) {
      merged[key] = cachedImage;
      continue;
    }

    merged[key] = {
      count: Math.max(serverImage.count, cachedImage.count),
      loved: serverImage.loved || cachedImage.loved,
    };
  }

  const total = Math.max(serverTotal, sumCounts(merged));
  writeGalleryLoveCache(total, merged);
  return { total, images: merged };
}
