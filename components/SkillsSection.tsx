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

      {/* Mobile stats strip */}
      <div className="mt-2 grid grid-cols-2 gap-3 lg:hidden">
        <div className="border-[3px] border-foreground bg-foreground text-background px-4 py-3 brutal-shadow">
          <p className="font-mono text-[10px] tracking-widest uppercase opacity-70">
            Domains
          </p>
          <p className="text-4xl font-black tabular-nums leading-none mt-1">
            {String(groups.length).padStart(2, "0")}
          </p>
        </div>
        <div className="border-[3px] border-foreground bg-accent px-4 py-3 brutal-shadow">
          <p className="font-mono text-[10px] tracking-widest uppercase opacity-70">
            Tools
          </p>
          <p className="text-4xl font-black tabular-nums leading-none mt-1">
            {totalSkills}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-5 lg:mt-2 lg:gap-0 lg:flex-row">
        {/* Category picker */}
        <nav
          aria-label="Skill categories"
          className="lg:w-[38%] lg:border-r-[3px] lg:border-foreground"
        >
          {/* Mobile: icon-forward snap chips */}
          <div className="flex gap-2.5 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-none lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
                    "snap-start shrink-0 flex flex-col items-center justify-center gap-2 border-[3px] border-foreground px-3 py-3 min-w-[5.5rem] transition-[transform,box-shadow,background-color]",
                    isActive
                      ? "bg-accent brutal-shadow scale-[1.02]"
                      : "bg-card",
                  ].join(" ")}
                >
                  <CategoryIcon
                    category={group.category}
                    className={[
                      "h-6 w-6",
                      isActive ? "text-foreground" : "text-foreground/70",
                    ].join(" ")}
                  />
                  <span className="font-mono text-[10px] tracking-widest tabular-nums">
                    {num}
                  </span>
                  <span className="max-w-[5rem] text-center text-[9px] font-bold uppercase leading-tight tracking-wide line-clamp-2">
                    {group.category.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Desktop: vertical index */}
          <div className="hidden lg:flex lg:flex-col lg:gap-0">
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
                    "group w-full text-left border-b-[2px] border-foreground px-5 py-4 transition-colors last:border-b-0",
                    isActive
                      ? "bg-foreground text-background border-l-[6px] border-l-accent pl-[calc(1.25rem-3px)]"
                      : "hover:bg-accent/20",
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
                      <span className="block text-lg font-bold tracking-tight">
                        {group.category}
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Spotlight */}
        <div className="relative flex-1 lg:pl-8">
          {/* Mobile hero card */}
          <div
            key={`${current.category}-hero`}
            className="border-[3px] border-foreground bg-accent p-4 brutal-shadow lg:hidden"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase opacity-70">
                  [{String(active + 1).padStart(2, "0")}] Active lane
                </p>
                <h3 className="mt-1 text-2xl font-black tracking-tight leading-tight">
                  {current.category}
                </h3>
                <p className="mt-1 font-mono text-xs tracking-widest uppercase">
                  {current.items.length} capabilities
                </p>
              </div>
              <CategoryIcon
                category={current.category}
                className="h-10 w-10 shrink-0"
              />
            </div>
          </div>

          <div
            key={current.category}
            className="relative mt-4 min-h-0 lg:mt-0 lg:min-h-[320px]"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -top-4 right-0 hidden select-none font-mono font-black leading-none tracking-tighter text-[clamp(5rem,16vw,11rem)] text-transparent [-webkit-text-stroke:2px_var(--foreground)] opacity-[0.07] lg:block"
            >
              {String(active + 1).padStart(2, "0")}
            </span>

            <div className="hidden items-center gap-2 lg:flex">
              <CategoryIcon
                category={current.category}
                className="h-5 w-5 text-accent"
              />
              <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted">
                {current.category}
              </p>
            </div>
            <h3 className="mt-2 hidden text-3xl font-black tracking-tight lg:block">
              {current.items.length} capabilities
            </h3>

            {/* Mobile: 2-col skill grid */}
            <ul className="mt-0 grid grid-cols-2 gap-2.5 lg:hidden">
              {current.items.map((skill) => (
                <li
                  key={skill}
                  className="flex flex-col gap-2 border-[3px] border-foreground bg-card p-3 brutal-shadow-sm active:bg-accent active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-[transform,box-shadow,background-color]"
                >
                  <SkillIcon skill={skill} className="h-6 w-6" />
                  <span className="text-xs font-bold leading-snug tracking-tight">
                    {skill}
                  </span>
                </li>
              ))}
            </ul>

            {/* Desktop: typographic list */}
            <ul className="mt-8 hidden space-y-0 lg:block">
              {current.items.map((skill, i) => (
                <li
                  key={skill}
                  className="group border-t-[2px] border-foreground/15 first:border-t-0"
                >
                  <div className="flex items-center gap-4 py-3.5">
                    <span
                      aria-hidden
                      className={[
                        "font-mono text-[10px] tracking-widest tabular-nums",
                        i === 0 ? "text-accent" : "text-muted/50",
                      ].join(" ")}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <SkillIcon
                      skill={skill}
                      className={[
                        "shrink-0 transition-transform group-hover:scale-110",
                        i === 0 ? "h-7 w-7" : "h-6 w-6",
                      ].join(" ")}
                    />
                    <span
                      className={[
                        "flex-1 font-black tracking-tight transition-colors",
                        i === 0
                          ? "text-4xl text-foreground"
                          : "text-2xl text-foreground/85 group-hover:text-foreground",
                      ].join(" ")}
                    >
                      {skill}
                    </span>
                    <span
                      aria-hidden
                      className="h-[2px] flex-1 max-w-[4rem] bg-accent opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-5 font-mono text-[10px] tracking-widest uppercase text-muted text-center lg:mt-6 lg:text-left">
            {groups.length} domains · {totalSkills} tools · swipe lanes
          </p>
        </div>
      </div>

      <div className="mt-8 border-y-[2px] border-foreground py-3 overflow-hidden lg:mt-10">
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
