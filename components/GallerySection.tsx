import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import GalleryGrid from "./GalleryGrid";
import { listHackathonPhotos } from "@/lib/hackathonPhotos";

/**
 * Photo gallery. Auto-discovers any jpeg/png/webp/avif in
 * /public/hackathons via lib/hackathonPhotos — drop a new file in and it
 * shows up on the next render.
 */
export default function GallerySection() {
  const hackathonPhotos = listHackathonPhotos();

  return (
    <section
      id="gallery"
      className="mx-auto w-full max-w-5xl px-6 py-12 sm:py-14 scroll-mt-28"
    >
      <SectionHeading index="06" label="Gallery" />

      <Reveal>
        <div className="flex items-center justify-between border-y-[3px] border-foreground bg-card px-3 py-2 font-mono text-[11px] tracking-widest uppercase">
          <span>FILE: 04_GALLERY.IMG</span>
          <span>{hackathonPhotos.length} PHOTOS</span>
        </div>
      </Reveal>

      <GalleryGrid photos={hackathonPhotos} />
    </section>
  );
}
