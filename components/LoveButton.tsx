"use client";

import { Heart } from "lucide-react";
import { useLove } from "@/components/love/LoveProvider";

export default function LoveButton() {
  const { total, ready } = useLove();

  return (
    <a
      href="#gallery"
      aria-label={`${total} gallery loves — jump to gallery`}
      className="group fixed z-50 inline-flex items-center gap-1.5 border-2 border-foreground bg-card px-2 py-1.5 brutal-shadow-sm transition-[transform,box-shadow,background-color] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:bg-accent bottom-[calc(var(--mobile-dock-height)+env(safe-area-inset-bottom,0px)+0.75rem)] left-3 lg:bottom-6 lg:left-6 lg:gap-2 lg:border-[3px] lg:px-3 lg:py-2 lg:brutal-shadow"
    >
      <Heart
        className="h-4 w-4 transition-transform group-hover:scale-110 lg:h-5 lg:w-5"
        strokeWidth={2.5}
      />
      <span className="font-mono text-[10px] font-bold tabular-nums tracking-widest lg:text-xs">
        {!ready && total === 0 ? "0" : total}
      </span>
    </a>
  );
}
