"use client";

import { useState } from "react";
import type { SkillGroup } from "@/data/portfolio";
import { CategoryIcon, SkillIcon } from "@/components/icons/SkillIcon";
import SectionHeading from "./SectionHeading";

type Props = {
  groups: SkillGroup[];
};

export default function SkillsSection({ groups }: Props) {
  const [active, setActive] = useState(0);
  const current = groups[active];
  const totalSkills = groups.reduce((n, g) => n + g.items.length, 0);
  const allSkills = groups.flatMap((g) => g.items);
  const marqueeItems = [...allSkills, ...allSkills];

  return (
    <section
      id="skills"
      className="mx-auto w-full max-w-5xl px-6 py-12 sm:py-14 scroll-mt-28"
    >
      <SectionHeading index="02" label="Skills" />

      <div className="mt-2 flex flex-col gap-6 lg:flex-row lg:gap-0">
        <nav
          aria-label="Skill categories"
          className="lg:w-[38%] lg:border-r-[3px] lg:border-foreground"
        >
          <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0 lg:gap-0">
            {groups.map((group, i) => {
              const isActive = i === active;
              const num = String(i + 1).padStart(2, "0");

              return (
                <button
                  key={group.category}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-current={isActive ? "true" : undefined}
                  className={[
                    "group shrink-0 text-left border-[3px] border-foreground px-4 py-3 transition-colors lg:shrink lg:border-0 lg:border-b-[2px] lg:px-5 lg:py-4 lg:last:border-b-0",
                    isActive
                      ? "bg-foreground text-background lg:border-l-[6px] lg:border-l-accent lg:pl-[calc(1.25rem-3px)]"
                      : "bg-card hover:bg-accent/30 lg:bg-transparent lg:hover:bg-accent/20",
                  ].join(" ")}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={[
                        "font-mono text-xs tracking-widest tabular-nums",
                        isActive ? "text-accent" : "text-muted",
                      ].join(" ")}
                    >
                      {num}
                    </span>
                    <CategoryIcon
                      category={group.category}
                      className={[
                        "h-4 w-4",
                        isActive ? "text-accent" : "text-foreground/70",
                      ].join(" ")}
                    />
                    <span className="min-w-0">
                      <span className="block font-mono text-[10px] tracking-widest uppercase opacity-60">
                        {group.items.length} tools
                      </span>
                      <span className="block text-sm font-bold tracking-tight sm:text-base lg:text-lg">
                        {group.category}
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        <div className="relative flex-1 lg:pl-8">
          <div
            key={current.category}
            className="relative min-h-[280px] sm:min-h-[320px]"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -top-4 right-0 select-none font-mono font-black leading-none tracking-tighter text-[clamp(5rem,16vw,11rem)] text-transparent [-webkit-text-stroke:2px_var(--foreground)] opacity-[0.07]"
            >
              {String(active + 1).padStart(2, "0")}
            </span>

            <div className="flex items-center gap-2">
              <CategoryIcon
                category={current.category}
                className="h-5 w-5 text-accent"
              />
              <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted">
                {current.category}
              </p>
            </div>
            <h3 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
              {current.items.length} capabilities
            </h3>

            <ul className="mt-8 space-y-0">
              {current.items.map((skill, i) => (
                <li
                  key={skill}
                  className="group border-t-[2px] border-foreground/15 first:border-t-0"
                >
                  <div className="flex items-center gap-3 sm:gap-4 py-3 sm:py-3.5">
                    <span
                      aria-hidden
                      className={[
                        "font-mono text-[10px] tracking-widest tabular-nums transition-colors",
                        i === 0 ? "text-accent" : "text-muted/50",
                      ].join(" ")}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <SkillIcon
                      skill={skill}
                      className={[
                        "shrink-0 transition-transform group-hover:scale-110",
                        i === 0 ? "h-6 w-6 sm:h-7 sm:w-7" : "h-5 w-5 sm:h-6 sm:w-6",
                      ].join(" ")}
                    />
                    <span
                      className={[
                        "flex-1 font-black tracking-tight transition-colors",
                        i === 0
                          ? "text-2xl sm:text-4xl text-foreground"
                          : "text-xl sm:text-2xl text-foreground/85 group-hover:text-foreground",
                      ].join(" ")}
                    >
                      {skill}
                    </span>
                    <span
                      aria-hidden
                      className="hidden h-[2px] flex-1 max-w-[4rem] bg-accent opacity-0 transition-opacity group-hover:opacity-100 sm:block"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 font-mono text-[10px] tracking-widest uppercase text-muted">
            {groups.length} domains · {totalSkills} tools · pick a lane
          </p>
        </div>
      </div>

      <div className="mt-10 border-y-[2px] border-foreground py-3 overflow-hidden">
        <div className="skill-marquee-track flex w-max gap-8 font-mono text-[11px] tracking-widest uppercase text-muted">
          {marqueeItems.map((skill, i) => (
            <span
              key={`${skill}-${i}`}
              className="inline-flex items-center gap-3 shrink-0"
            >
              <SkillIcon skill={skill} className="h-3.5 w-3.5" />
              {skill}
              <span aria-hidden className="text-accent">
                ◆
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
