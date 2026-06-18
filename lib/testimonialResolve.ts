import type { Testimonial } from "@/data/portfolio";

const VIDEO_EXT = /\.(mp4|webm|mov|m4v)$/i;

/** Resolve a testimonial video filename to an available file in /public/testimonial. */
export function resolveTestimonialVideo(
  filename: string,
  available: string[]
): string | null {
  const set = new Set(available);
  if (set.has(filename)) return filename;

  const numbered = filename.match(/^(.+)-(\d+)\.(mp4|webm|mov|m4v)$/i);
  if (numbered) {
    const base = `${numbered[1]}.${numbered[3]}`;
    if (set.has(base)) return base;
  }

  return null;
}

export function resolveTestimonialSrc(
  testimonial: Testimonial,
  available: string[]
): string | null {
  const file = resolveTestimonialVideo(testimonial.video, available);
  return file ? `/testimonial/${file}` : null;
}
