import { portfolio } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";

export default function WorkSection() {
  return (
    <section
      id="work"
      className="mx-auto w-full max-w-5xl px-6 py-12 sm:py-14 scroll-mt-20"
    >
      <SectionHeading index="02" label="Selected Work" />
      <div className="space-y-8">
        {portfolio.projects.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
