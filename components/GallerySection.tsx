import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import Image from "next/image";
import { listHackathonPhotos } from "@/lib/hackathonPhotos";

/**
 * Photo gallery. Auto-discovers any jpeg/png/webp/avif in
 * /public/hackathons via lib/hackathonPhotos — drop a new file in and it
 * shows up on the next render. Rendered in a brutalist mockboard with hard
 * borders, hard shadows, mono captions, and a single accent cap.
 */
const HACKATHON_PHOTOS = listHackathonPhotos();

export default function GallerySection() {
  return (
    <section
      id="gallery"
      className="mx-auto w-full max-w-5xl px-6 py-12 sm:py-14 scroll-mt-20"
    >
      <SectionHeading index="04" label="Gallery" />

      <Reveal>
        <div className="flex items-center justify-between border-y-[3px] border-foreground bg-card px-3 py-2 font-mono text-[11px] tracking-widest uppercase">
          <span>FILE: 04_GALLERY.IMG</span>
          <span>{HACKATHON_PHOTOS.length} PHOTOS</span>
        </div>
      </Reveal>

      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
        {HACKATHON_PHOTOS.map((file, i) => (
          <Reveal key={file} delay={(i % 6) * 40}>
            <figure
              className={[
                "group relative border-[3px] border-foreground bg-card brutal-shadow-accent",
                "hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none",
                "transition-[transform,box-shadow]",
                i % 5 === 0 ? "sm:col-span-2 sm:row-span-2" : "",
              ].join(" ")}
            >
              <div className="absolute -top-3 left-3 z-10 bg-foreground text-background border-2 border-foreground px-2 py-0.5 font-mono text-[10px] tracking-widest uppercase">
                [ {String(i + 1).padStart(2, "0")} ]
              </div>
              <div className="relative aspect-square w-full overflow-hidden border-b-[3px] border-foreground bg-background">
                <Image
                  src={`/hackathons/${file}`}
                  alt={`Photo ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover"
                />
                <a
                  href={`/hackathons/${file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View photo ${i + 1} in full size`}
                  className="absolute right-2 bottom-2 z-10 inline-flex items-center gap-1 border-[3px] border-foreground bg-background text-foreground px-2 py-1 font-mono text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity brutal-shadow"
                >
                  View
                </a>
              </div>
              <figcaption className="px-3 py-2 font-mono text-[10px] tracking-widest uppercase text-muted">
                {file.replace(/\.[^.]+$/, "")}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
