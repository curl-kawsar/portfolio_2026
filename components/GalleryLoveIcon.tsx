"use client";

import { Heart } from "lucide-react";
import { useLove } from "@/components/love/LoveProvider";

type Props = {
  imageKey: string;
  size?: "sm" | "md";
};

const ICON_SIZE = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
} as const;

export default function GalleryLoveIcon({ imageKey, size = "sm" }: Props) {
  const { images, ready, poppingImage, sendLove } = useLove();
  const state = images[imageKey];
  const loved = state?.loved ?? false;
  const count = state?.count ?? 0;
  const popping = poppingImage === imageKey;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        void sendLove(imageKey);
      }}
      disabled={loved}
      aria-label={
        loved
          ? `Loved · ${count} on this photo`
          : `Love this photo · ${count} loves`
      }
      aria-pressed={loved}
      className={[
        "absolute left-1.5 top-1.5 z-10 inline-flex items-center gap-1 border-2 border-foreground brutal-shadow-sm transition-[transform,background-color]",
        size === "sm" ? "px-1 py-1" : "px-1.5 py-1",
        loved
          ? "bg-accent cursor-default"
          : "bg-background/90 hover:bg-accent",
        popping ? "scale-110" : "scale-100",
      ].join(" ")}
    >
      <Heart
        className={[ICON_SIZE[size], loved ? "fill-foreground" : ""].join(" ")}
        strokeWidth={2.5}
      />
      <span className="font-mono text-[9px] font-bold tabular-nums leading-none">
        {!ready && count === 0 ? "·" : count}
      </span>
    </button>
  );
}
