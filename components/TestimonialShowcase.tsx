"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  Film,
  MessageSquareQuote,
  Pause,
  Play,
  Sparkles,
} from "lucide-react";
import type { Testimonial } from "@/data/portfolio";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

type Props = {
  testimonial: Testimonial;
  src: string;
  clipLabel?: string;
  totalClips?: number;
};

export default function TestimonialShowcase({
  testimonial,
  src,
  clipLabel = "01",
  totalClips = 1,
}: Props) {
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <div className="overflow-hidden border-[3px] border-foreground bg-card brutal-shadow-accent">
      <div className="flex flex-col gap-2 border-b-[3px] border-foreground bg-foreground px-3 py-2 text-background sm:flex-row sm:items-center sm:justify-between font-mono text-[10px] tracking-widest uppercase">
        <span className="inline-flex items-center gap-1.5">
          <Film className="h-3.5 w-3.5" strokeWidth={2.5} />
          [ VIDEO / PROOF / {clipLabel}
          {totalClips > 1 ? ` · ${String(totalClips).padStart(2, "0")} CLIPS` : ""} ]
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          REC · LIVE
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="relative lg:col-span-7 border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-foreground bg-foreground">
          <div className="relative aspect-video w-full">
            {ready ? (
              <ReactPlayer
                src={src}
                playing={playing}
                controls
                playsInline
                width="100%"
                height="100%"
                style={{ position: "absolute", inset: 0 }}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onEnded={() => setPlaying(false)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-background font-mono text-[10px] tracking-widest uppercase">
                Loading player…
              </div>
            )}
          </div>

          <div className="flex items-center justify-center border-t-[2px] border-background/30 px-3 py-2">
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause" : "Play"}
              className="inline-flex h-10 w-10 items-center justify-center border-[3px] border-background bg-accent text-foreground brutal-shadow-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-[transform,box-shadow]"
            >
              {playing ? (
                <Pause className="h-4 w-4" strokeWidth={2.5} />
              ) : (
                <Play className="h-4 w-4 ml-0.5" strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:col-span-5">
          <div className="border-b-[2px] border-foreground bg-accent px-4 py-3">
            <p className="font-mono text-[10px] tracking-widest uppercase inline-flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2.5} />
              Featured collaborator
            </p>
            <p className="mt-1 text-2xl font-black tracking-tight">
              {testimonial.name}
            </p>
            <p className="mt-0.5 text-sm font-medium">{testimonial.role}</p>
            <p className="mt-1 font-mono text-[10px] tracking-widest uppercase opacity-80">
              {testimonial.org}
            </p>
          </div>

          <div className="flex flex-1 flex-col justify-center p-4 sm:p-6">
            <MessageSquareQuote
              className="h-5 w-5 text-accent"
              strokeWidth={2.5}
              aria-hidden
            />
            <blockquote className="mt-3 text-lg font-bold leading-snug tracking-tight text-justify sm:text-xl">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}
