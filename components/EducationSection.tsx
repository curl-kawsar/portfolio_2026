import { GraduationCap, BookOpen, Award, Check } from "lucide-react";
import type { EducationEntry } from "@/data/portfolio";
import { portfolio } from "@/data/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

function EducationCard({
  entry,
  index,
  total,
}: {
  entry: EducationEntry;
  index: number;
  total: number;
}) {
  const isDegree = index === 0;

  return (
    <Reveal delay={index * 60}>
      <div className="relative pl-10 md:pl-12">
        <span
          aria-hidden
          className="absolute left-3 md:left-4 top-6 block h-5 w-5 bg-accent border-[3px] border-foreground brutal-shadow-sm"
        />

        <span
          aria-hidden
          className="absolute left-8 md:left-9 top-[2.4rem] h-[3px] w-6 bg-foreground"
        />

        <article className="relative border-[3px] border-foreground bg-card p-5 sm:p-6 brutal-shadow">
          <span
            aria-hidden
            className="absolute -top-3 right-4 bg-foreground text-background border-2 border-foreground px-2 py-0.5 font-mono text-[10px] tracking-widest uppercase inline-flex items-center gap-1.5"
          >
            <GraduationCap className="h-3 w-3" strokeWidth={2.5} />
            [ {isDegree ? "DEGREE" : "SCHOOL"} / {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} ]
          </span>

          {entry.period && (
            <p className="mb-2 inline-block border-2 border-foreground bg-foreground text-background px-2 py-0.5 font-mono text-[10px] tracking-widest uppercase">
              {entry.period}
            </p>
          )}

          <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
            {entry.institution}
          </h3>
          <p className="mt-1 text-[15px] leading-relaxed text-justify">{entry.degree}</p>

          <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-4">
            {entry.result && (
              <div className="border-2 border-foreground bg-background p-3">
                <dt className="font-mono text-[10px] tracking-widest uppercase text-muted inline-flex items-center gap-1.5">
                  <Award className="h-3 w-3" strokeWidth={2.5} />
                  Result
                </dt>
                <dd className="mt-1 font-mono text-xl font-bold">
                  {entry.result}
                </dd>
              </div>
            )}
            {entry.thesis && (
              <div className="border-2 border-foreground bg-background p-3 sm:col-span-2">
                <dt className="font-mono text-[10px] tracking-widest uppercase text-muted inline-flex items-center gap-1.5">
                  <BookOpen className="h-3 w-3" strokeWidth={2.5} />
                  Thesis
                </dt>
                <dd className="mt-1 text-[15px] leading-snug text-justify">
                  &ldquo;{entry.thesis}&rdquo;
                </dd>
              </div>
            )}
          </dl>

          {entry.honors && entry.honors.length > 0 && (
            <div className="mt-5">
              <p className="font-mono text-[10px] tracking-widest uppercase text-muted mb-2 inline-flex items-center gap-1.5">
                <Award className="h-3 w-3" strokeWidth={2.5} />
                Honors
              </p>
              <ul className="space-y-1">
                {entry.honors.map((h) => (
                  <li
                    key={h}
                    className="flex gap-3 text-[15px] leading-relaxed"
                  >
                    <Check
                      className="mt-[3px] h-4 w-4 shrink-0"
                      strokeWidth={3}
                      aria-hidden
                    />
                    <span className="flex-1 min-w-0 text-justify">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>
      </div>
    </Reveal>
  );
}

export default function EducationSection() {
  const entries = portfolio.education;
  const total = entries.length;

  return (
    <section
      id="education"
      className="mx-auto w-full max-w-5xl px-6 py-12 sm:py-14 scroll-mt-28"
    >
      <SectionHeading index="11" label="Education" />

      <div className="relative mt-6">
        <span
          aria-hidden
          className="absolute top-0 bottom-0 w-[3px] bg-foreground left-4 md:left-5"
        />

        <ol className="space-y-10 md:space-y-14 list-none">
          {entries.map((entry, i) => (
            <li key={`${entry.institution}-${entry.period}`}>
              <EducationCard entry={entry} index={i} total={total} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
