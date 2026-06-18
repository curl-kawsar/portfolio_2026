import { Trophy, MapPin, Calendar } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function RecognitionSection() {
  const byYear = new Map<number, typeof portfolio.awards>();
  for (const a of portfolio.awards) {
    if (!byYear.has(a.year)) byYear.set(a.year, []);
    byYear.get(a.year)!.push(a);
  }
  const years = Array.from(byYear.keys()).sort((a, b) => b - a);

  const badgeTone = (result: string) => {
    const r = result.toLowerCase();
    if (r.includes("champion")) return "bg-accent text-foreground";
    if (r.includes("runner")) return "bg-foreground text-background";
    if (r.includes("finalist") || r.includes("top")) return "bg-card text-foreground";
    return "bg-background text-foreground";
  };

  return (
    <section
      id="recognition"
      className="mx-auto w-full max-w-5xl px-6 py-12 sm:py-14 scroll-mt-28"
    >
      <SectionHeading index="05" label="Recognition" />

      <div className="space-y-8">
        {years.map((year, yi) => (
          <Reveal key={year} delay={yi * 30}>
            <div>
              <h3 className="inline-flex items-center gap-2 bg-foreground text-background border-2 border-foreground px-3 py-1 font-mono text-xs tracking-widest uppercase mb-4">
                <Calendar className="h-3.5 w-3.5" strokeWidth={2.5} />
                {year} / {byYear.get(year)!.length} EVENTS
              </h3>
              <ul className="space-y-3">
                {byYear.get(year)!.map((a, i) => (
                  <li
                    key={`${year}-${i}`}
                    className="grid grid-cols-1 gap-3 border-[3px] border-foreground bg-card p-4 sm:grid-cols-12 sm:items-center sm:gap-4"
                  >
                    <span
                      className={[
                        "sm:col-span-3 inline-flex items-center justify-center gap-1.5 border-2 border-foreground px-2 py-1 font-mono text-[11px] tracking-widest uppercase",
                        badgeTone(a.result),
                      ].join(" ")}
                    >
                      <Trophy className="h-3 w-3" strokeWidth={2.5} />
                      {a.result}
                    </span>
                    <div className="sm:col-span-9">
                      <p className="text-[15px] leading-snug font-medium">
                        {a.event}
                      </p>
                      <p className="mt-1 font-mono text-[11px] tracking-widest uppercase text-muted inline-flex items-center gap-1.5">
                        <MapPin className="h-3 w-3" strokeWidth={2.5} />
                        {a.location}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
