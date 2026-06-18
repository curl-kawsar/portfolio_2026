import { Mail, UserCheck, Building2 } from "lucide-react";
import type { Reference } from "@/data/portfolio";
import { portfolio } from "@/data/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

function ReferenceCard({
  person,
  index,
}: {
  person: Reference;
  index: number;
}) {
  return (
    <Reveal delay={index * 80}>
      <article className="relative h-full border-[3px] border-foreground bg-card p-5 sm:p-6 brutal-shadow">
        <span
          aria-hidden
          className="absolute -top-3 left-4 bg-foreground text-background border-2 border-foreground px-2 py-0.5 font-mono text-[10px] tracking-widest uppercase inline-flex items-center gap-1.5"
        >
          <UserCheck className="h-3 w-3" strokeWidth={2.5} />
          [ REF / {String(index + 1).padStart(2, "0")} ]
        </span>

        <h3 className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">
          {person.name}
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed">{person.title}</p>

        <div className="mt-4 space-y-2">
          <p className="inline-flex items-start gap-2 font-mono text-[11px] tracking-wide uppercase">
            <Building2
              className="mt-0.5 h-3.5 w-3.5 shrink-0"
              strokeWidth={2.5}
            />
            <span>
              {person.org}
              {person.location ? ` · ${person.location}` : ""}
            </span>
          </p>
          <a
            href={`mailto:${person.email}`}
            className="group inline-flex items-center gap-2 border-2 border-foreground bg-background px-3 py-2 font-mono text-[11px] tracking-wide hover:bg-foreground hover:text-background transition-colors"
          >
            <Mail className="h-3.5 w-3.5" strokeWidth={2.5} />
            {person.email}
          </a>
        </div>
      </article>
    </Reveal>
  );
}

export default function ReferencesSection() {
  const refs = portfolio.references;

  return (
    <section
      id="references"
      className="mx-auto w-full max-w-5xl px-6 py-12 sm:py-14 scroll-mt-28"
    >
      <SectionHeading index="13" label="References" />

      <div className="border-[3px] border-foreground bg-card brutal-shadow">
        <div className="flex items-center justify-between border-b-[2px] border-foreground bg-foreground text-background px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase">
          <span>~/kawsar/references.json</span>
          <span className="inline-flex items-center gap-1.5">
            <UserCheck className="h-3 w-3" strokeWidth={2.5} />
            {refs.length} contacts
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:gap-5 sm:p-5">
          {refs.map((person, i) => (
            <ReferenceCard key={person.email} person={person} index={i} />
          ))}
        </div>

        <div className="flex items-center justify-between border-t-[2px] border-foreground bg-foreground text-background px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase">
          <span>UTF-8</span>
          <span>JSON</span>
          <span>{refs.length} keys</span>
        </div>
      </div>
    </section>
  );
}
