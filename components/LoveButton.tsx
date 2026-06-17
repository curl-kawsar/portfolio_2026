"use client";

import { Heart } from "lucide-react";
import { useLove } from "@/components/love/LoveProvider";

export default function LoveButton() {
  const { total, ready } = useLove();

  return (
    <a
      href="#gallery"
      aria-label={`${total} gallery loves — jump to gallery`}
      className="group fixed bottom-20 left-4 z-50 inline-flex items-center gap-2 border-[3px] border-foreground bg-card px-3 py-2 brutal-shadow transition-[transform,box-shadow,background-color] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:bg-accent lg:bottom-6 lg:left-6"
    >
      <Heart
        className="h-5 w-5 transition-transform group-hover:scale-110"
        strokeWidth={2.5}
      />
      <span className="font-mono text-xs font-bold tabular-nums tracking-widest">
        {!ready && total === 0 ? "0" : total}
      </span>
    </a>
  );
}
