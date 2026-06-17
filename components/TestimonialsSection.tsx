import { MessageSquareQuote } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { listTestimonialVideos } from "@/lib/testimonialVideos";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import TestimonialVideoCard from "./TestimonialVideoCard";

export default function TestimonialsSection() {
  const available = new Set(listTestimonialVideos());
  const items = portfolio.testimonials;
  const liveCount = items.filter((t) => available.has(t.video)).length;

  return (
    <section
      id="testimonials"
      className="mx-auto w-full max-w-5xl px-6 py-12 sm:py-14 scroll-mt-28"
    >
      <SectionHeading index="07" label="Testimonials" />

      <Reveal>
        <div className="mb-5 flex flex-col gap-2 border-[3px] border-foreground bg-card px-4 py-3 brutal-shadow sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] tracking-widest uppercase text-muted inline-flex items-center gap-1.5">
            <MessageSquareQuote className="h-3.5 w-3.5" strokeWidth={2.5} />
            Video testimonials
          </p>
          <p className="font-mono text-[10px] tracking-widest uppercase">
            <span className="text-accent font-bold">{liveCount}</span>
            <span className="text-muted"> / {items.length} live</span>
            <span className="hidden sm:inline text-muted">
              {" "}
              · drop files in{" "}
              <code className="text-foreground">/public/testimonial/</code>
            </span>
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {items.map((testimonial, i) => (
          <Reveal key={testimonial.video} delay={i * 80}>
            <TestimonialVideoCard
              testimonial={testimonial}
              index={i}
              isAvailable={available.has(testimonial.video)}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
