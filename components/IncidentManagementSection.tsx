import { ShieldAlert, Check } from "lucide-react";
import type { IncidentEntry } from "@/data/portfolio";
import { renderBoldText } from "@/lib/renderBoldText";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

type Props = {
  intro: string;
  incidents: IncidentEntry[];
};

function IncidentCard({
  incident,
  index,
  total,
}: {
  incident: IncidentEntry;
  index: number;
  total: number;
}) {
  return (
    <Reveal delay={index * 60}>
      <div className="relative pl-10 md:pl-12">
        <span
          aria-hidden
          className="absolute left-3 md:left-4 top-6 block h-5 w-5 bg-foreground text-background border-[3px] border-foreground brutal-shadow-sm"
        />
        <span
          aria-hidden
          className="absolute left-8 md:left-9 top-[2.4rem] h-[3px] w-6 bg-foreground"
        />

        <article className="relative border-[3px] border-foreground bg-card p-5 sm:p-6 brutal-shadow">
          <span
            aria-hidden
            className="absolute -top-3 right-4 bg-accent text-foreground border-2 border-foreground px-2 py-0.5 font-mono text-[10px] tracking-widest uppercase inline-flex items-center gap-1.5"
          >
            <ShieldAlert className="h-3 w-3" strokeWidth={2.5} />
            [ INC / {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} ]
          </span>

          <div className="mb-2 flex flex-wrap items-center gap-2">
            {incident.period && (
              <p className="inline-block border-2 border-foreground bg-foreground text-background px-2 py-0.5 font-mono text-[10px] tracking-widest uppercase">
                {incident.period}
              </p>
            )}
            <p className="inline-block border-2 border-foreground bg-background px-2 py-0.5 font-mono text-[10px] tracking-widest uppercase text-accent">
              {incident.severity}
            </p>
          </div>

          <header>
            <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
              {incident.title}
            </h3>
            <p className="mt-1 inline-block border-2 border-foreground bg-background px-2 py-0.5 font-mono text-[11px] tracking-widest uppercase">
              {incident.org}
            </p>
          </header>

          <p className="mt-4 inline-flex flex-wrap items-center gap-1.5 border-2 border-foreground bg-foreground text-background px-2 py-1 font-mono text-[11px] tracking-widest uppercase [&_strong]:text-accent">
            {renderBoldText(incident.metric)}
          </p>

          <ul className="mt-5 space-y-2 text-[15px] leading-relaxed">
            {incident.bullets.map((b, i) => (
              <li key={i} className="flex gap-3">
                <Check
                  className="mt-[3px] h-4 w-4 shrink-0"
                  strokeWidth={3}
                  aria-hidden
                />
                <span className="flex-1 min-w-0 text-justify">
                  {renderBoldText(b)}
                </span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </Reveal>
  );
}

export default function IncidentManagementSection({ intro, incidents }: Props) {
  const total = incidents.length;

  return (
    <section
      id="incidents"
      className="mx-auto w-full max-w-5xl px-6 py-12 sm:py-14 scroll-mt-28"
    >
      <SectionHeading index="10" label="Incident Management" />

      <Reveal>
        <blockquote className="mb-8 border-[3px] border-foreground bg-foreground text-background p-5 font-mono text-sm tracking-wide text-justify [&_strong]:text-accent">
          <span
            aria-hidden
            className="block text-accent text-2xl leading-none mb-2"
          >
            &gt;&gt;
          </span>
          {renderBoldText(intro)}
        </blockquote>
      </Reveal>

      <div className="relative mt-2">
        <span
          aria-hidden
          className="absolute top-0 bottom-0 w-[3px] bg-foreground left-4 md:left-5"
        />

        <ol className="space-y-10 md:space-y-14 list-none">
          {incidents.map((incident, i) => (
            <li key={i}>
              <IncidentCard incident={incident} index={i} total={total} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
