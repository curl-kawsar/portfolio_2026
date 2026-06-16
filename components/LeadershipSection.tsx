import { Users, Check } from "lucide-react";
import type { LeadershipRole } from "@/data/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

type Props = {
  roles: LeadershipRole[];
};

function RoleCard({ role, index }: { role: LeadershipRole; index: number }) {
  return (
    <Reveal delay={index * 50}>
      <article className="relative border-[3px] border-foreground bg-card p-5 sm:p-6 brutal-shadow">
        <span
          aria-hidden
          className="absolute -top-3 right-4 bg-foreground text-background border-2 border-foreground px-2 py-0.5 font-mono text-[10px] tracking-widest uppercase inline-flex items-center gap-1.5"
        >
          <Users className="h-3 w-3" strokeWidth={2.5} />
          [ ROLE / {String(index + 1).padStart(2, "0")} ]
        </span>

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
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </article>
    </Reveal>
  );
}

export default function LeadershipSection({ roles }: Props) {
  return (
    <section
      id="leadership"
      className="mx-auto w-full max-w-5xl px-6 py-12 sm:py-14 scroll-mt-20"
    >
      <SectionHeading index="04" label="Leadership" />
      <div className="space-y-6">
        {roles.map((r, i) => (
          <RoleCard key={r.title} role={r} index={i} />
        ))}
      </div>
    </section>
  );
}
