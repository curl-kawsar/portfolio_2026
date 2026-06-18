"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  User,
  Briefcase,
  Building2,
  Trophy,
  Users,
  Wrench,
  GraduationCap,
  ShieldAlert,
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
  { href: "#incidents", label: "Ops", n: "10", Icon: ShieldAlert },
  { href: "#education", label: "Edu", n: "11", Icon: GraduationCap },
  { href: "#contact", label: "Mail", n: "13", Icon: Mail },
];

export default function Header() {
  const [active, setActive] = useState<string>("#about");
  const [dockIndicator, setDockIndicator] = useState({ left: 0, width: 0 });
  const dockRef = useRef<HTMLUListElement>(null);
  const dockItemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const updateDockIndicator = useCallback(() => {
    const dock = dockRef.current;
    const activeEl = dockItemRefs.current[active];
    if (!dock || !activeEl) return;

    setDockIndicator({
      left: activeEl.offsetLeft,
      width: activeEl.offsetWidth,
    });
  }, [active]);

  const scrollToSection = useCallback((href: string) => {
    const id = href.replace("#", "");
    const target = document.getElementById(id);
    if (!target) return;

    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? "auto"
      : "smooth";

    setActive(href);
    target.scrollIntoView({ behavior, block: "start" });
    window.history.replaceState(null, "", href);
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      scrollToSection(href);
    },
    [scrollToSection]
  );

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

  useEffect(() => {
    updateDockIndicator();
    const activeEl = dockItemRefs.current[active];
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? "auto"
      : "smooth";
    activeEl?.scrollIntoView({
      behavior,
      inline: "center",
      block: "nearest",
    });
  }, [active, updateDockIndicator]);

  useEffect(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const onScroll = () => updateDockIndicator();
    dock.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateDockIndicator);

    return () => {
      dock.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateDockIndicator);
    };
  }, [updateDockIndicator]);

  const activeEntry = NAV.find((n) => n.href === active) ?? NAV[0];
  const activeIdx = NAV.indexOf(activeEntry) + 1;
  const totalSections = NAV.length;

  return (
    <>
      {/* Desktop top strip */}
      <div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 right-0 z-[60] hidden lg:flex items-center gap-1.5 border-b-2 border-foreground bg-background/95 backdrop-blur px-3 py-1 font-mono text-[9px] tracking-widest uppercase select-none"
      >
        <span className="font-bold">{String(activeIdx).padStart(2, "0")}</span>
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

      {/* Desktop sidebar */}
      <aside
        aria-label="Primary"
        className="hidden lg:flex fixed left-3 top-[4.5rem] z-50 flex-col gap-1.5 select-none pointer-events-none"
      >
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, "#top")}
          className="pointer-events-auto group relative border-2 border-foreground bg-card brutal-shadow-sm w-9 h-9 inline-flex items-center justify-center font-mono uppercase font-bold"
          aria-label={`${portfolio.name} — back to top`}
        >
          <Terminal className="h-3.5 w-3.5" strokeWidth={2.5} />
          <span
            aria-hidden
            className="pointer-events-none absolute left-full ml-2 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-1 whitespace-nowrap border-2 border-foreground bg-background px-1.5 py-0.5 font-mono text-[9px] tracking-widest uppercase shadow-[3px_3px_0_0_var(--foreground)]"
          >
            <ArrowUpRight className="h-2.5 w-2.5" strokeWidth={3} />
            TOP
          </span>
        </a>

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
                  onClick={(e) => handleNavClick(e, href)}
                  className={[
                    "w-9 h-9 inline-flex items-center justify-center transition-colors duration-300",
                    isActive
                      ? "bg-foreground text-background"
                      : "bg-card text-foreground hover:bg-accent",
                  ].join(" ")}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={`${n} ${label}`}
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={2.5} />
                </a>
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

        <div className="pointer-events-auto border-2 border-foreground bg-card brutal-shadow-sm w-9 py-1 font-mono uppercase text-center font-bold text-[8px] leading-none tracking-widest">
          <div>{String(activeIdx).padStart(2, "0")}</div>
          <div className="mt-0.5 opacity-50">
            /{String(NAV.length).padStart(2, "0")}
          </div>
        </div>
      </aside>

      {/* Mobile top chip */}
      <div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 right-0 z-[60] flex lg:hidden items-center justify-center gap-1.5 border-b-2 border-foreground bg-background/95 backdrop-blur px-3 py-1 font-mono text-[9px] tracking-widest uppercase select-none transition-opacity duration-300"
      >
        <span className="font-bold">{String(activeIdx).padStart(2, "0")}</span>
        <span className="opacity-30">/</span>
        <span className="opacity-60">{String(totalSections).padStart(2, "0")}</span>
        <span className="opacity-30">·</span>
        <span className="font-bold truncate max-w-[42vw] transition-all duration-300">
          {activeEntry.label}
        </span>
      </div>

      {/* Mobile docknav */}
      <nav
        aria-label="Primary mobile"
        className="mobile-dock lg:hidden fixed inset-x-0 bottom-0 z-50 border-t-2 border-foreground bg-background/95 backdrop-blur"
      >
        <div className="relative">
          <span
            aria-hidden
            className="pointer-events-none absolute top-0 h-[2px] bg-accent transition-all duration-300 ease-out"
            style={{
              left: dockIndicator.left,
              width: dockIndicator.width,
            }}
          />
          <ul
            ref={dockRef}
            className="flex items-center gap-0.5 overflow-x-auto overscroll-x-contain scroll-smooth snap-x snap-mandatory px-1.5 py-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {NAV.map(({ href, label, n, Icon }) => {
              const isActive = active === href;
              return (
                <li key={href} className="shrink-0 snap-center">
                  <a
                    ref={(el) => {
                      dockItemRefs.current[href] = el;
                    }}
                    href={href}
                    data-href={href}
                    onClick={(e) => handleNavClick(e, href)}
                    className={[
                      "relative flex h-10 w-10 flex-col items-center justify-center transition-all duration-300 ease-out",
                      "active:scale-90",
                      isActive
                        ? "bg-foreground text-background scale-105"
                        : "bg-transparent text-foreground",
                    ].join(" ")}
                    aria-current={isActive ? "page" : undefined}
                    aria-label={`${n} ${label}`}
                  >
                    <Icon
                      className={[
                        "h-4 w-4 transition-transform duration-300",
                        isActive ? "scale-110" : "scale-100",
                      ].join(" ")}
                      strokeWidth={2.5}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
}
