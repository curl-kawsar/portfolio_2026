import { Mic, Check } from "lucide-react";
import type { MentorshipActivity, MentorshipStat } from "@/data/portfolio";
import { renderBoldText } from "@/lib/renderBoldText";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

type Props = {
  stats: MentorshipStat[];
  activities: MentorshipActivity[];
};

function StatChip({ stat, index }: { stat: MentorshipStat; index: number }) {
  return (
    <div className="border-[3px] border-foreground bg-card px-4 py-3 brutal-shadow">
      <p className="font-mono text-[10px] tracking-widest uppercase text-muted">
        [ {String(index + 1).padStart(2, "0")} ] {stat.label}
      </p>
      <p className="mt-1 text-2xl font-black tracking-tight">{stat.value}</p>
    </div>
  );
}

function ActivityCard({
  activity,
  index,
  total,
}: {
  activity: MentorshipActivity;
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
            <Mic className="h-3 w-3" strokeWidth={2.5} />
            [ TALK / {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} ]
          </span>

          {activity.period && (
            <p className="mb-2 inline-block border-2 border-foreground bg-foreground text-background px-2 py-0.5 font-mono text-[10px] tracking-widest uppercase">
              {activity.period}
            </p>
          )}

          <header>
            <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
              {activity.title}
            </h3>
            <p className="mt-1 inline-block border-2 border-foreground bg-background px-2 py-0.5 font-mono text-[11px] tracking-widest uppercase">
              {activity.org}
            </p>
          </header>

          {activity.metric && (
            <p className="mt-4 inline-flex items-center gap-1.5 border-2 border-foreground bg-accent px-2 py-1 font-mono text-[11px] tracking-widest uppercase">
              {renderBoldText(activity.metric)}
            </p>
          )}

          <ul className="mt-5 space-y-2 text-[15px] leading-relaxed">
            {activity.bullets.map((b, i) => (
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

export default function SpeakingMentorshipSection({ stats, activities }: Props) {
  const total = activities.length;

  return (
    <section
      id="mentorship"
      className="mx-auto w-full max-w-5xl px-6 py-12 sm:py-14 scroll-mt-28"
    >
      <SectionHeading index="08" label="Speaking & Mentorship" />

      <Reveal>
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <StatChip key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </Reveal>

      <div className="relative mt-2">
        <span
          aria-hidden
          className="absolute top-0 bottom-0 w-[3px] bg-foreground left-4 md:left-5"
        />
        <ol className="space-y-10 md:space-y-14 list-none">
          {activities.map((activity, i) => (
            <li key={`${activity.org}-${activity.title}`}>
              <ActivityCard activity={activity} index={i} total={total} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
