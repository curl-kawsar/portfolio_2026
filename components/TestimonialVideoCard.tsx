"use client";

import { useRef, useState } from "react";
import { Play, Pause, Film, Quote } from "lucide-react";
import type { Testimonial } from "@/data/portfolio";

type Props = {
  testimonial: Testimonial;
  index: number;
  isAvailable: boolean;
};

export default function TestimonialVideoCard({
  testimonial,
  index,
  isAvailable,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const src = `/testimonial/${testimonial.video}`;

  function togglePlay() {
    const el = videoRef.current;
    if (!el || !isAvailable) return;
    if (el.paused) {
      void el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  }

  return (
    <article className="flex h-full flex-col border-[3px] border-foreground bg-card brutal-shadow">
      <div className="flex items-center justify-between border-b-[2px] border-foreground bg-foreground text-background px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase">
        <span className="inline-flex items-center gap-1.5">
          <Film className="h-3 w-3" strokeWidth={2.5} />
          testimonial / {String(index + 1).padStart(2, "0")}
        </span>
        <span>{isAvailable ? "LIVE" : "PLACEHOLDER"}</span>
      </div>

      <div className="relative aspect-video w-full border-b-[2px] border-foreground bg-foreground">
        {isAvailable ? (
          <>
            <video
              ref={videoRef}
              src={src}
              className="h-full w-full object-cover"
              playsInline
              preload="metadata"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
            />
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? "Pause video" : "Play video"}
              className="absolute inset-0 flex items-center justify-center bg-foreground/20 transition-colors hover:bg-foreground/35"
            >
              <span className="inline-flex h-14 w-14 items-center justify-center border-[3px] border-background bg-accent text-foreground brutal-shadow">
                {playing ? (
                  <Pause className="h-6 w-6" strokeWidth={2.5} />
                ) : (
                  <Play className="h-6 w-6 ml-0.5" strokeWidth={2.5} />
                )}
              </span>
            </button>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 px-4 text-background">
            <span className="inline-flex h-14 w-14 items-center justify-center border-[3px] border-background/40 bg-background/10 text-background/50">
              <Play className="h-6 w-6 ml-0.5" strokeWidth={2.5} />
            </span>
            <p className="font-mono text-[10px] tracking-widest uppercase text-background/70">
              Video pending
            </p>
            <p className="font-mono text-[9px] tracking-wide text-background/50 text-center break-all">
              /public/testimonial/{testimonial.video}
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <Quote
          className="h-4 w-4 text-accent"
          strokeWidth={2.5}
          aria-hidden
        />
        <blockquote className="mt-2 flex-1 text-[15px] leading-relaxed">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        <footer className="mt-4 border-t-2 border-foreground/15 pt-3">
          <p className="font-bold tracking-tight">{testimonial.name}</p>
          <p className="mt-0.5 text-sm text-muted">{testimonial.role}</p>
          <p className="mt-1 font-mono text-[10px] tracking-widest uppercase text-muted">
            {testimonial.org}
          </p>
        </footer>
      </div>
    </article>
  );
}
