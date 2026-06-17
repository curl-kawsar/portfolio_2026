import { Building2, Check, BadgeCheck, ArrowUpRight } from "lucide-react";
import type { WorkExperience } from "@/data/portfolio";
import { renderBoldText } from "@/lib/renderBoldText";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

type Props = {
  roles: WorkExperience[];
};

function ExperienceCard({
  role,
  index,
  total,
}: {
  role: WorkExperience;
  index: number;
  total: number;
}) {
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
            <Building2 className="h-3 w-3" strokeWidth={2.5} />
            [ ROLE / {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} ]
          </span>

          <p className="mb-2 inline-block border-2 border-foreground bg-foreground text-background px-2 py-0.5 font-mono text-[10px] tracking-widest uppercase">
            {role.period}
          </p>

          <header>
            <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
              {role.title}
            </h3>
            <p className="mt-1 inline-block border-2 border-foreground bg-background px-2 py-0.5 font-mono text-[11px] tracking-widest uppercase">
              {role.company}
              {role.location ? ` · ${role.location}` : ""}
            </p>
          </header>

          {role.verificationUrl && (
            <a
              href={role.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 border-[3px] border-foreground bg-accent px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase brutal-shadow-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-[transform,box-shadow]"
            >
              <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2.5} />
              Verify employment
              <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
            </a>
          )}

          <ul className="mt-5 space-y-2 text-[15px] leading-relaxed">
            {role.bullets.map((b, i) => (
              <li key={i} className="flex gap-3">
                <Check
                  className="mt-[3px] h-4 w-4 shrink-0"
                  strokeWidth={3}
                  aria-hidden
                />
                <span>{renderBoldText(b)}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </Reveal>
  );
}

export default function ExperienceSection({ roles }: Props) {
  const total = roles.length;

  return (
    <section
      id="experience"
      className="mx-auto w-full max-w-5xl px-6 py-12 sm:py-14 scroll-mt-28"
    >
      <SectionHeading index="03" label="Experience" />

      <div className="relative mt-6">
        <span
          aria-hidden
          className="absolute top-0 bottom-0 w-[3px] bg-foreground left-4 md:left-5"
        />

        <ol className="space-y-10 md:space-y-14 list-none">
          {roles.map((r, i) => (
            <li key={`${r.company}-${r.title}`}>
              <ExperienceCard role={r} index={i} total={total} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
