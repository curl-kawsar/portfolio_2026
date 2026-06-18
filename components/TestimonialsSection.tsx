import { MessageSquareQuote, Video } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { listTestimonialVideos } from "@/lib/testimonialVideos";
import { resolveTestimonialSrc } from "@/lib/testimonialResolve";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import TestimonialShowcase from "./TestimonialShowcase";

export default function TestimonialsSection() {
  const available = listTestimonialVideos();
  const featured = portfolio.testimonials[0];

  if (!featured) return null;

  const src = resolveTestimonialSrc(featured, available);
  if (!src) return null;

  return (
    <section
      id="testimonials"
      className="mx-auto w-full max-w-5xl px-6 py-12 sm:py-14 scroll-mt-28"
    >
      <SectionHeading index="09" label="Testimonials" />

      <Reveal>
        <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="border-[3px] border-foreground bg-card px-4 py-3 brutal-shadow">
            <p className="font-mono text-[10px] tracking-widest uppercase text-muted">
              Clips
            </p>
            <p className="mt-1 text-2xl font-black tabular-nums">01</p>
          </div>
          <div className="border-[3px] border-foreground bg-accent px-4 py-3 brutal-shadow">
            <p className="font-mono text-[10px] tracking-widest uppercase">
              Format
            </p>
            <p className="mt-1 text-sm font-bold uppercase tracking-wide inline-flex items-center gap-1.5">
              <Video className="h-4 w-4" strokeWidth={2.5} />
              Video
            </p>
          </div>
          <div className="col-span-2 border-[3px] border-foreground bg-foreground text-background px-4 py-3 brutal-shadow sm:col-span-1">
            <p className="font-mono text-[10px] tracking-widest uppercase opacity-70 inline-flex items-center gap-1.5">
              <MessageSquareQuote className="h-3.5 w-3.5" strokeWidth={2.5} />
              Source
            </p>
            <p className="mt-1 text-sm font-bold tracking-tight">
              {featured.org}
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={60}>
        <TestimonialShowcase testimonial={featured} src={src} />
      </Reveal>
    </section>
  );
}
