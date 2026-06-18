import type { GalleryLoveImage } from "@/lib/db";

export function getLoveForImage(
  images: Record<string, GalleryLoveImage>,
  imageKey: string
): GalleryLoveImage | undefined {
  if (images[imageKey]) return images[imageKey];

  const lower = imageKey.toLowerCase();
  for (const [key, value] of Object.entries(images)) {
    if (key.toLowerCase() === lower) return value;
  }

  return undefined;
}

export function withImageLove(
  images: Record<string, GalleryLoveImage>,
  imageKey: string,
  update: GalleryLoveImage
): Record<string, GalleryLoveImage> {
  const existingKey =
    imageKey in images
      ? imageKey
      : Object.keys(images).find((k) => k.toLowerCase() === imageKey.toLowerCase());

  const key = existingKey ?? imageKey;
  return { ...images, [key]: update };
}
