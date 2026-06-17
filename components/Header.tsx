"use client";

import { useEffect, useState } from "react";
import {
  User,
  Briefcase,
  Building2,
  Trophy,
  Users,
  Wrench,
  GraduationCap,
  Mail,
  ArrowUpRight,
  Terminal,
  FileText,
  Mic,
} from "lucide-react";
import { portfolio } from "@/data/portfolio";

const NAV = [
  { href: "#about", label: "About", n: "01", Icon: User },
  { href: "#skills", label: "Stack", n: "02", Icon: Wrench },
  { href: "#experience", label: "Jobs", n: "03", Icon: Building2 },
  { href: "#work", label: "Work", n: "04", Icon: Briefcase },
  { href: "#recognition", label: "Awards", n: "05", Icon: Trophy },
  { href: "#blog", label: "Blog", n: "07", Icon: FileText },
  { href: "#mentorship", label: "Mentor", n: "08", Icon: Mic },
  { href: "#leadership", label: "Lead", n: "09", Icon: Users },
  { href: "#education", label: "Edu", n: "10", Icon: GraduationCap },
  { href: "#contact", label: "Mail", n: "12", Icon: Mail },
];

/**
 * Floating left sidebar nav — desktop only.
 * Sits flush to the left edge, sticks to top, and stays out of the
 * content's way. Mobile gets a compact bottom bar.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("#about");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionEls = NAV.map((n) =>
      document.querySelector(n.href) as HTMLElement | null
    ).filter(Boolean) as HTMLElement[];

    if (!sectionEls.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (intersecting[0]) {
          setActive("#" + intersecting[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sectionEls.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Resolve the active NAV entry once so the progress strip and the
  // sidebar can both render against the same source of truth.
  const activeEntry =
    NAV.find((n) => n.href === active) ?? NAV[0];
  const activeIdx = NAV.indexOf(activeEntry) + 1;
  const totalSections = NAV.length;

  return (
    <>
      {/* Top scroll-progress strip — 1px mono line that reports the
          current section number, slash, total, and label. Updates live
          from the same IntersectionObserver scroll-spy that drives the
          sidebar's active state, so both stay in sync. */}
      <div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 right-0 z-[60] hidden lg:flex items-center gap-1.5 border-b-2 border-foreground bg-background/95 backdrop-blur px-3 py-1 font-mono text-[9px] tracking-widest uppercase select-none"
      >
        <span className="font-bold">
          {String(activeIdx).padStart(2, "0")}
        </span>
        <span className="opacity-30">/</span>
        <span className="opacity-60">
          {String(totalSections).padStart(2, "0")}
        </span>
        <span className="opacity-30">·</span>
        <span className="font-bold">{activeEntry.label}</span>
        <span className="ml-auto inline-flex items-center gap-1.5 opacity-50">
          <span className="inline-block h-1.5 w-1.5 bg-accent" />
          SCROLL
        </span>
      </div>

      {/* Desktop floating sidebar */}
      <aside
        aria-label="Primary"
        className="hidden lg:flex fixed left-3 top-[4.5rem] z-50 flex-col gap-1.5 select-none pointer-events-none"
      >
        {/* Brand block */}
        <a
          href="#top"
          className="pointer-events-auto group relative border-2 border-foreground bg-card brutal-shadow-sm w-9 h-9 inline-flex items-center justify-center font-mono uppercase font-bold"
          aria-label={`${portfolio.name} — back to top`}
        >
          <Terminal className="h-3.5 w-3.5" strokeWidth={2.5} />

          {/* Hover tooltip */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-full ml-2 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-1 whitespace-nowrap border-2 border-foreground bg-background px-1.5 py-0.5 font-mono text-[9px] tracking-widest uppercase shadow-[3px_3px_0_0_var(--foreground)]"
          >
            <ArrowUpRight className="h-2.5 w-2.5" strokeWidth={3} />
            TOP
          </span>
        </a>

        {/* Nav cells */}
        <ul className="pointer-events-auto flex flex-col border-2 border-foreground bg-card brutal-shadow-sm max-h-[min(72vh,34rem)] overflow-y-auto overscroll-contain">
          {NAV.map(({ href, label, n, Icon }) => {
            const isActive = active === href;
            return (
              <li
                key={href}
                className="group relative border-b border-foreground last:border-b-0"
              >
                <a
                  href={href}
                  className={[
                    "w-9 h-9 inline-flex items-center justify-center",
                    isActive
                      ? "bg-foreground text-background"
                      : "bg-card text-foreground hover:bg-accent",
                  ].join(" ")}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={`${n} ${label}`}
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={2.5} />
                </a>
                {/* Hover label — flies out to the right */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 hidden group-hover:flex items-center gap-1 whitespace-nowrap border-2 border-foreground bg-background px-2 py-1 font-mono text-[9px] tracking-widest uppercase shadow-[3px_3px_0_0_var(--foreground)]"
                >
                  <span className="opacity-60">{n}</span>
                  <span className="opacity-30">/</span>
                  <span className="font-bold">{label}</span>
                  {isActive && (
                    <ArrowUpRight
                      className="h-2.5 w-2.5 ml-0.5 text-accent"
                      strokeWidth={3}
                    />
                  )}
                </span>
              </li>
            );
          })}
        </ul>

        {/* Status footer — current section / total */}
        <div className="pointer-events-auto border-2 border-foreground bg-card brutal-shadow-sm w-9 py-1 font-mono uppercase text-center font-bold text-[8px] leading-none tracking-widest">
          <div>
            {String(NAV.findIndex((n) => n.href === active) + 1).padStart(2, "0")}
          </div>
          <div className="mt-0.5 opacity-50">
            /{String(NAV.length).padStart(2, "0")}
          </div>
        </div>
      </aside>

      {/* Mobile bottom bar — minimal pill */}
      <nav
        aria-label="Primary mobile"
        className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 border-[3px] border-foreground bg-card brutal-shadow font-mono"
      >
        <ul className="flex items-stretch divide-x-2 divide-foreground">
          {NAV.map(({ href, label, n, Icon }) => {
            const isActive = active === href;
            return (
              <li key={href}>
                <a
                  href={href}
                  className={[
                    "w-11 h-11 inline-flex items-center justify-center",
                    isActive
                      ? "bg-foreground text-background"
                      : "bg-card text-foreground active:bg-accent",
                  ].join(" ")}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={`${n} ${label}`}
                >
                  <Icon className="h-4 w-4" strokeWidth={2.5} />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
