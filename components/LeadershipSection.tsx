import { Users, Check } from "lucide-react";
import type { LeadershipRole } from "@/data/portfolio";
import { renderBoldText } from "@/lib/renderBoldText";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

type Props = {
  roles: LeadershipRole[];
};

/**
 * A single role rendered as a timeline entry. The node (square dot on
 * the spine) is painted with CSS so the component itself just owns the
 * content card + period label. The spine is a sibling `before:` pseudo-
 * element on the outer container (see `LeadershipSection`).
 */
function RoleCard({
  role,
  index,
  total,
}: {
  role: LeadershipRole;
  index: number;
  total: number;
}) {
  return (
    <Reveal delay={index * 60}>
      <div className="relative pl-10 md:pl-12">
        {/* Square node on the spine */}
        <span
          aria-hidden
          className="absolute left-3 md:left-4 top-6 block h-5 w-5 bg-accent border-[3px] border-foreground brutal-shadow-sm"
        />

        {/* Connector from spine to card edge */}
        <span
          aria-hidden
          className="absolute left-8 md:left-9 top-[2.4rem] h-[3px] w-6 bg-foreground"
        />

        <article className="relative border-[3px] border-foreground bg-card p-5 sm:p-6 brutal-shadow">
          {/* Top-right tag — role index */}
          <span
            aria-hidden
            className="absolute -top-3 right-4 bg-foreground text-background border-2 border-foreground px-2 py-0.5 font-mono text-[10px] tracking-widest uppercase inline-flex items-center gap-1.5"
          >
            <Users className="h-3 w-3" strokeWidth={2.5} />
            [ ROLE / {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} ]
          </span>

          {/* Period label, always shown in the card header */}
          {role.period && (
            <p className="mb-2 inline-block border-2 border-foreground bg-foreground text-background px-2 py-0.5 font-mono text-[10px] tracking-widest uppercase">
              {role.period}
            </p>
          )}

          <header>
            <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
              {role.title}
            </h3>
            <p className="mt-1 inline-block border-2 border-foreground bg-background px-2 py-0.5 font-mono text-[11px] tracking-widest uppercase">
              {role.org}
            </p>
          </header>

          <ul className="mt-5 space-y-2 text-[15px] leading-relaxed">
            {role.bullets.map((b, i) => (
              <li key={i} className="flex gap-3">
                <Check
                  className="mt-[3px] h-4 w-4 shrink-0"
                  strokeWidth={3}
                  aria-hidden
                />
                <span className="flex-1 min-w-0 text-justify">{renderBoldText(b)}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </Reveal>
  );
}

export default function LeadershipSection({ roles }: Props) {
  const total = roles.length;

  return (
    <section
      id="leadership"
      className="mx-auto w-full max-w-5xl px-6 py-12 sm:py-14 scroll-mt-28"
    >
      <SectionHeading index="10" label="Leadership" />

      {/* Timeline container. The vertical spine is a single 3px ink
          line on the left at all breakpoints. Each role card sits to
          the right of the spine, with a square accent node pinned to
          the spine and a short connector to the card edge. */}
      <div className="relative mt-6">
        <span
          aria-hidden
          className="absolute top-0 bottom-0 w-[3px] bg-foreground left-4 md:left-5"
        />

        <ol className="space-y-10 md:space-y-14 list-none">
          {roles.map((r, i) => (
            <li key={i}>
              <RoleCard role={r} index={i} total={total} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
