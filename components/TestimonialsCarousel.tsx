"use client";

import { useMemo, useState } from "react";
import type { Testimonial } from "@/data/portfolio";
import TestimonialShowcase from "./TestimonialShowcase";

type ResolvedTestimonial = {
  testimonial: Testimonial;
  src: string;
};

type Props = {
  items: ResolvedTestimonial[];
};

export default function TestimonialsCarousel({ items }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex] ?? items[0];

  const clipLabel = useMemo(
    () => String(activeIndex + 1).padStart(2, "0"),
    [activeIndex]
  );

  if (!active) return null;

  return (
    <>
      {items.length > 1 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {items.map((item, i) => (
            <button
              key={item.testimonial.video}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-current={i === activeIndex ? "true" : undefined}
              className={[
                "border-[3px] border-foreground px-3 py-2 font-mono text-[10px] tracking-widest uppercase transition-[transform,box-shadow,background-color]",
                i === activeIndex
                  ? "bg-accent brutal-shadow-sm"
                  : "bg-card brutal-shadow hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none",
              ].join(" ")}
            >
              Clip {String(i + 1).padStart(2, "0")} · {item.testimonial.name}
            </button>
          ))}
        </div>
      )}

      <TestimonialShowcase
        key={active.testimonial.video}
        testimonial={active.testimonial}
        src={active.src}
        clipLabel={clipLabel}
        totalClips={items.length}
      />
    </>
  );
}
