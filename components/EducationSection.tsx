import { GraduationCap, BookOpen, Award, Check } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function EducationSection() {
  const e = portfolio.education;
  return (
    <section
      id="education"
      className="mx-auto w-full max-w-5xl px-6 py-12 sm:py-14 scroll-mt-20"
    >
      <SectionHeading index="06" label="Education" />

      <Reveal>
        <article className="relative border-[3px] border-foreground bg-card p-6 brutal-shadow">
          <span
            aria-hidden
            className="absolute -top-3 left-4 bg-accent border-2 border-foreground px-2 py-0.5 font-mono text-[10px] tracking-widest uppercase inline-flex items-center gap-1.5"
          >
            <GraduationCap className="h-3 w-3" strokeWidth={2.5} />
            [ DEGREE ]
          </span>

          <h3 className="text-2xl font-bold tracking-tight">{e.institution}</h3>
          <p className="mt-1 text-[15px]">{e.degree}</p>

          <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            {e.cgpa && (
              <div className="border-2 border-foreground bg-background p-3">
                <dt className="font-mono text-[10px] tracking-widest uppercase text-muted inline-flex items-center gap-1.5">
                  <Award className="h-3 w-3" strokeWidth={2.5} />
                  CGPA
                </dt>
                <dd className="mt-1 font-mono text-2xl font-bold">
                  {e.cgpa}
                </dd>
              </div>
            )}
            {e.thesis && (
              <div className="border-2 border-foreground bg-background p-3 sm:col-span-2">
                <dt className="font-mono text-[10px] tracking-widest uppercase text-muted inline-flex items-center gap-1.5">
                  <BookOpen className="h-3 w-3" strokeWidth={2.5} />
                  THESIS
                </dt>
                <dd className="mt-1 text-[15px] leading-snug">
                  &ldquo;{e.thesis}&rdquo;
                </dd>
              </div>
            )}
          </dl>

          {e.honors && e.honors.length > 0 && (
            <div className="mt-5">
              <p className="font-mono text-[10px] tracking-widest uppercase text-muted mb-2 inline-flex items-center gap-1.5">
                <Award className="h-3 w-3" strokeWidth={2.5} />
                HONORS
              </p>
              <ul className="space-y-1">
                {e.honors.map((h) => (
                  <li
                    key={h}
                    className="flex gap-3 text-[15px] leading-relaxed"
                  >
                    <Check
                      className="mt-[3px] h-4 w-4 shrink-0"
                      strokeWidth={3}
                      aria-hidden
                    />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>
      </Reveal>
    </section>
  );
}
