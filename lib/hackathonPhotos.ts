import fs from "node:fs";
import path from "node:path";

const PHOTO_EXT = /\.(jpe?g|png|webp|avif)$/i;

/**
 * Enumerate every image inside /public/hackathons. Called on every render
 * (server component) so the gallery picks up new files in dev without a
 * restart, and so a production build only includes files that exist at
 * build time.
 */
export function listHackathonPhotos(): string[] {
  const dir = path.join(process.cwd(), "public", "hackathons");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => PHOTO_EXT.test(name))
    .sort();
}

export const hackathonPhotos: string[] = listHackathonPhotos();
