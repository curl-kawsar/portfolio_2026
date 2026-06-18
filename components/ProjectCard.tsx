import type { Project } from "@/data/portfolio";
import { Star, Layers, Check } from "lucide-react";
import { renderBoldText } from "@/lib/renderBoldText";
import Reveal from "./Reveal";

type Props = {
  project: Project;
  index: number;
};

export default function ProjectCard({ project, index }: Props) {
  return (
    <Reveal delay={index * 60}>
      <article className="relative border-[3px] border-foreground bg-card p-5 sm:p-6 brutal-shadow">
        {/* corner tape */}
        <span
          aria-hidden
          className="absolute -top-3 left-4 bg-accent border-2 border-foreground px-2 py-0.5 font-mono text-[10px] tracking-widest uppercase inline-flex items-center gap-1.5"
        >
          <Layers className="h-3 w-3" strokeWidth={2.5} />
          [ PROJECT / {String(index + 1).padStart(2, "0")} ]
        </span>

        <header className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
            {project.name}
          </h3>
        </header>

        <p className="mt-3 inline-flex flex-wrap items-center gap-1.5 border-2 border-foreground bg-foreground text-background px-2 py-1 font-mono text-[11px] tracking-widest uppercase [&_strong]:text-accent">
          <Star className="h-3 w-3 shrink-0" strokeWidth={2.5} />
          <span>{renderBoldText(project.metric)}</span>
        </p>

        <ul className="mt-5 space-y-2 text-[15px] leading-relaxed">
          {project.bullets.map((b, i) => (
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

        <ul className="mt-6 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <li
              key={s}
              className="font-mono text-[11px] tracking-wide border-2 border-foreground bg-background px-2 py-1"
            >
              {s}
            </li>
          ))}
        </ul>
      </article>
    </Reveal>
  );
}
