"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import Reveal from "./Reveal";
import ImageWatermark from "./ImageWatermark";
import GalleryLoveIcon from "./GalleryLoveIcon";

type Props = {
  photos: string[];
};

export default function GalleryGrid({ photos }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activePhoto = activeIndex !== null ? photos[activeIndex] : null;

  const close = useCallback(() => setActiveIndex(null), []);

  const showPrev = useCallback(() => {
    setActiveIndex((i) =>
      i === null ? null : (i - 1 + photos.length) % photos.length
    );
  }, [photos.length]);

  const showNext = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % photos.length));
  }, [photos.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, close, showPrev, showNext]);

  return (
    <>
      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
        {photos.map((file, i) => (
          <Reveal key={file} delay={(i % 6) * 40}>
            <figure
              className={[
                "group relative border-[3px] border-foreground bg-card brutal-shadow-accent",
                "transition-[transform,box-shadow]",
                i % 5 === 0 ? "sm:col-span-2 sm:row-span-2" : "",
              ].join(" ")}
            >
              <div className="pointer-events-none absolute -top-3 left-3 z-10 bg-foreground text-background border-2 border-foreground px-2 py-0.5 font-mono text-[10px] tracking-widest uppercase">
                [ {String(i + 1).padStart(2, "0")} ]
              </div>
              <div className="relative isolate aspect-square w-full overflow-hidden border-b-[3px] border-foreground bg-background">
                <Image
                  src={`/hackathons/${file}`}
                  alt={`${portfolio.name} at a hackathon event - photo ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="pointer-events-none object-cover"
                />
                <ImageWatermark size="sm" />
                <GalleryLoveIcon imageKey={file} size="sm" />
                <button
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  aria-label={`View photo ${i + 1} in full size`}
                  className="absolute right-2 bottom-2 z-10 inline-flex items-center gap-1 border-[3px] border-foreground bg-background text-foreground px-2 py-1 font-mono text-[10px] tracking-widest uppercase opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100 transition-opacity brutal-shadow cursor-pointer"
                >
                  View
                </button>
              </div>
              <figcaption className="px-3 py-2 font-mono text-[10px] tracking-widest uppercase text-muted">
                {file.replace(/\.[^.]+$/, "")}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      {activePhoto && activeIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${activeIndex + 1} of ${photos.length}`}
        >
          <button
            type="button"
            aria-label="Close gallery viewer"
            className="absolute inset-0 bg-foreground/80 backdrop-blur-[2px]"
            onClick={close}
          />

          <div className="relative z-10 flex w-fit max-w-[min(92vw,100%)] flex-col border-[3px] border-foreground bg-card brutal-shadow">
            <div className="flex items-center justify-between gap-3 border-b-[2px] border-foreground bg-foreground text-background px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase">
              <span className="truncate">
                [ {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(photos.length).padStart(2, "0")} ] {activePhoto}
              </span>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="inline-flex shrink-0 items-center justify-center border-2 border-background p-1 hover:bg-accent hover:text-foreground transition-colors"
              >
                <X className="h-3.5 w-3.5" strokeWidth={2.5} />
              </button>
            </div>

            <div className="relative bg-background leading-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/hackathons/${activePhoto}`}
                alt={`${portfolio.name} at a hackathon event - photo ${activeIndex + 1}`}
                className="block max-h-[75vh] max-w-[88vw] h-auto w-auto"
                decoding="async"
              />
              <ImageWatermark size="lg" />
            </div>

            <div className="flex items-center justify-between border-t-[2px] border-foreground bg-foreground text-background px-3 py-2">
              <button
                type="button"
                onClick={showPrev}
                aria-label="Previous photo"
                className="inline-flex items-center gap-1 border-2 border-background px-2 py-1 font-mono text-[10px] tracking-widest uppercase hover:bg-accent hover:text-foreground transition-colors"
              >
                <ChevronLeft className="h-3.5 w-3.5" strokeWidth={2.5} />
                Prev
              </button>
              <span className="font-mono text-[10px] tracking-widest uppercase opacity-70">
                ESC to close
              </span>
              <button
                type="button"
                onClick={showNext}
                aria-label="Next photo"
                className="inline-flex items-center gap-1 border-2 border-background px-2 py-1 font-mono text-[10px] tracking-widest uppercase hover:bg-accent hover:text-foreground transition-colors"
              >
                Next
                <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
