import fs from "node:fs";
import path from "node:path";

const VIDEO_EXT = /\.(mp4|webm|mov|m4v)$/i;

/**
 * Enumerate video files inside /public/testimonial. Drop a file in and it
 * goes live on the next render — no code changes needed.
 */
export function listTestimonialVideos(): string[] {
  const dir = path.join(process.cwd(), "public", "testimonial");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => VIDEO_EXT.test(name))
    .sort();
}
