import { Wrench, FolderTree, Quote } from "lucide-react";
import type { SkillGroup } from "@/data/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

type Props = {
  groups: SkillGroup[];
};

export default function SkillsSection({ groups }: Props) {
  return (
    <section
      id="skills"
      className="mx-auto w-full max-w-5xl px-6 py-12 sm:py-14 scroll-mt-20"
    >
      <SectionHeading index="05" label="Skills" />

      <Reveal>
        <div className="border-[3px] border-foreground bg-card brutal-shadow">
          {/* Mockboard title bar */}
          <div className="flex items-center justify-between border-b-[2px] border-foreground bg-foreground text-background px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase">
            <span>~/kawsar/skills.json</span>
            <span className="inline-flex items-center gap-1.5">
              <FolderTree className="h-3 w-3" strokeWidth={2.5} />
              {groups.length} categories
            </span>
          </div>

          <ul>
            {groups.map((g, i) => (
              <li
                key={g.category}
                className={[
                  "grid grid-cols-1 gap-3 p-4 sm:grid-cols-12 sm:items-start sm:gap-6",
                  i < groups.length - 1
                    ? "border-b-[2px] border-foreground"
                    : "",
                ].join(" ")}
              >
                <span className="sm:col-span-3 inline-flex items-center justify-center gap-1.5 bg-foreground text-background border-2 border-foreground px-2 py-1 font-mono text-[11px] tracking-widest uppercase">
                  <Wrench className="h-3 w-3" strokeWidth={2.5} />
                  {g.category}
                </span>
                <ul className="sm:col-span-9 flex flex-wrap gap-1.5 font-mono">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="text-[11px] tracking-wide border-2 border-foreground bg-background px-2 py-1 inline-flex items-center gap-1"
                    >
                      <Quote className="h-2.5 w-2.5 text-cyan-600" strokeWidth={3} />
                      <span className="text-cyan-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between border-t-[2px] border-foreground bg-foreground text-background px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase">
            <span>UTF-8</span>
            <span>JSON</span>
            <span className="inline-flex items-center gap-1.5">
              <Wrench className="h-3 w-3" strokeWidth={2.5} />
              {groups.reduce((n, g) => n + g.items.length, 0)} items
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
