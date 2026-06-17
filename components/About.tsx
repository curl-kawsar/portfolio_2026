import { portfolio } from "@/data/portfolio";
import { renderBoldText } from "@/lib/renderBoldText";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function About() {
  const last = portfolio.about[portfolio.about.length - 1];
  const rest = portfolio.about.slice(0, -1);

  return (
    <section
      id="about"
      className="mx-auto w-full max-w-5xl px-6 py-12 sm:py-14 scroll-mt-28"
    >
      <SectionHeading index="01" label="About" />

      <div className="space-y-5 text-[15px] leading-relaxed text-justify sm:text-base">
        {rest.map((p, i) => (
          <Reveal key={i} delay={i * 40}>
            <div className="border-l-[6px] border-foreground pl-4">
              <p className="text-justify">{renderBoldText(p)}</p>
            </div>
          </Reveal>
        ))}
        <Reveal delay={rest.length * 40}>
          <blockquote className="mt-6 border-[3px] border-foreground bg-foreground text-background p-5 font-mono text-sm tracking-wide text-justify [&_strong]:text-accent">
            <span aria-hidden className="block text-accent text-2xl leading-none mb-2">
              &gt;&gt;
            </span>
            {renderBoldText(last)}
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
