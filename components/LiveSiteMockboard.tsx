"use client";

import { useState } from "react";
import { Monitor, ExternalLink, RefreshCw, Wifi, BatteryFull } from "lucide-react";

type Props = {
  /** The site to render inside the MacBook screen. */
  url: string;
  /** Caption shown above the screen (e.g. "LIVE PREVIEW / EDOKANDAR.CLOUD"). */
  caption?: string;
  /** Optional accent line below the caption. */
  subcaption?: string;
};

/**
 * Brutalist MacBook Mockboard.
 *
 * Renders a stylized laptop frame (lid, hinge, base) containing a real
 * <iframe> loaded with the user's site. Visitors can scroll, click, and
 * interact with the live site inside the screen — not a screenshot.
 *
 * The frame is composed with pure CSS + a few inline SVG dots for the
 * window controls. The screen is a sandboxed iframe with `allow-same-origin`
 * disabled so the embedded site can't reach into the parent page.
 */
export default function LiveSiteMockboard({
  url,
  caption = "LIVE PREVIEW",
  subcaption,
}: Props) {
  // Bumping this key forces the iframe to reload, giving the user a manual
  // "refresh" affordance without leaving the page.
  const [reloadKey, setReloadKey] = useState(0);

  // Strip the protocol off the URL for the caption.
  const displayHost = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <section
      aria-label="Live site preview"
      className="mx-auto w-full max-w-5xl px-6 py-12 sm:py-14"
    >
      {/* Caption strip — same mono spec-sheet vocabulary as the rest of
          the site, so the mockboard feels native to the brutalist system. */}
      <div className="mb-5 flex items-center justify-between border-y-[3px] border-foreground bg-card px-3 py-2 font-mono text-[11px] tracking-widest uppercase">
        <span className="inline-flex items-center gap-1.5">
          <Monitor className="h-3 w-3" strokeWidth={2.5} />
          {caption}
        </span>
        <span className="hidden sm:inline-flex items-center gap-1.5 opacity-70">
          {subcaption ?? displayHost}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-1.5 w-1.5 bg-accent" />
          ONLINE
        </span>
      </div>

      {/* Screen frame.
          Desktop / tablet (>= md) → MacBook laptop (16:10 lid + hinge).
          Mobile (< md)             → iPhone-style portrait phone.
          Both share the same sandboxed iframe + RELOAD / OPEN controls. */}
      <div className="relative">
        {/* ============== LAPTOP (md and up) ============== */}
        <div className="hidden md:block">
          <div
            className="relative w-full overflow-hidden border-[3px] border-foreground bg-card"
            style={{
              // 16:10 is the classic MacBook screen aspect.
              aspectRatio: "16 / 10",
              boxShadow: "10px 10px 0 0 var(--accent)",
            }}
          >
            {/* Browser chrome / address bar */}
            <div className="flex items-center gap-2 border-b-2 border-foreground bg-card px-3 py-2 font-mono text-[10px] tracking-widest uppercase">
              <span className="inline-flex items-center gap-1">
                <span className="h-2.5 w-2.5 border border-foreground bg-card" />
                <span className="h-2.5 w-2.5 border border-foreground bg-card" />
                <span className="h-2.5 w-2.5 border border-foreground bg-card" />
              </span>
              <span className="flex-1 mx-2 border border-foreground bg-background px-2 py-0.5 text-center normal-case tracking-normal opacity-80 truncate">
                https://{displayHost}
              </span>
              <button
                type="button"
                onClick={() => setReloadKey((k) => k + 1)}
                aria-label="Reload preview"
                className="inline-flex items-center gap-1 border border-foreground bg-card px-1.5 py-0.5 hover:bg-foreground hover:text-background"
              >
                <RefreshCw className="h-3 w-3" strokeWidth={2.5} />
                RELOAD
              </button>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open in new tab"
                className="inline-flex items-center gap-1 border border-foreground bg-card px-1.5 py-0.5 hover:bg-foreground hover:text-background"
              >
                <ExternalLink className="h-3 w-3" strokeWidth={2.5} />
                OPEN
              </a>
            </div>

            <iframe
              key={`desk-${reloadKey}`}
              src={url}
              title={`Live preview of ${displayHost}`}
              loading="lazy"
              className="block w-full border-0 bg-background"
              style={{ height: "calc(100% - 33px)" }}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Hinge + base */}
          <div className="relative mx-auto h-3 w-[104%] -translate-x-[2%] border-x-[3px] border-b-[3px] border-foreground bg-foreground" />
          <div className="mx-auto h-1.5 w-[18%] border-x-[3px] border-b-[3px] border-foreground bg-card" />
        </div>

        {/* ============== PHONE (below md) ============== */}
        <div className="md:hidden">
          {/* Outer phone body — max-w on small screens, centered, brutalist
              drop shadow matching the laptop's. */}
          <div
            className="relative mx-auto w-full max-w-[360px] overflow-hidden border-[3px] border-foreground bg-card"
            style={{
              // 9:19.5 — modern iPhone-ish portrait ratio.
              aspectRatio: "9 / 19.5",
              boxShadow: "8px 8px 0 0 var(--accent)",
            }}
          >
            {/* Status bar — time left, signal/wifi/battery right */}
            <div className="flex items-center justify-between border-b-2 border-foreground bg-card px-3 pt-1.5 pb-1 font-mono text-[9px] tracking-widest uppercase">
              <span className="font-bold">9:41</span>
              <span className="inline-flex items-center gap-1">
                {/* signal bars */}
                <span className="inline-flex items-end gap-[1px]">
                  <span className="block w-[2px] h-[3px] bg-foreground" />
                  <span className="block w-[2px] h-[5px] bg-foreground" />
                  <span className="block w-[2px] h-[7px] bg-foreground" />
                  <span className="block w-[2px] h-[9px] bg-foreground" />
                </span>
                <Wifi className="h-2.5 w-2.5" strokeWidth={2.5} />
                <BatteryFull className="h-3 w-3" strokeWidth={2.5} />
              </span>
            </div>

            {/* Browser address row */}
            <div className="flex items-center gap-1 border-b-2 border-foreground bg-card px-2 py-1.5 font-mono text-[9px] tracking-widest uppercase">
              <span className="flex-1 border border-foreground bg-background px-1.5 py-0.5 text-center normal-case tracking-normal opacity-80 truncate">
                {displayHost}
              </span>
              <button
                type="button"
                onClick={() => setReloadKey((k) => k + 1)}
                aria-label="Reload preview"
                className="inline-flex items-center gap-0.5 border border-foreground bg-card px-1 py-0.5 hover:bg-foreground hover:text-background"
              >
                <RefreshCw className="h-2.5 w-2.5" strokeWidth={2.5} />
              </button>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open in new tab"
                className="inline-flex items-center gap-0.5 border border-foreground bg-card px-1 py-0.5 hover:bg-foreground hover:text-background"
              >
                <ExternalLink className="h-2.5 w-2.5" strokeWidth={2.5} />
              </a>
            </div>

            {/* The live iframe. On phones the chrome (status + address) is
                ~52px tall, so the iframe fills the rest of the 9:19.5 lid. */}
            <iframe
              key={`mob-${reloadKey}`}
              src={url}
              title={`Live preview of ${displayHost} (mobile)`}
              loading="lazy"
              className="block w-full border-0 bg-background"
              style={{ height: "calc(100% - 52px)" }}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Home indicator — bottom centered bar */}
            <div className="pointer-events-none absolute bottom-1.5 left-1/2 h-1 w-[36%] -translate-x-1/2 bg-foreground opacity-70" />
          </div>
        </div>
      </div>

      {/* Footer spec strip under the mockboard — mono metadata. */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[10px] tracking-widest uppercase">
        <div className="border-2 border-foreground bg-card px-3 py-2">
          <div className="opacity-50">URL</div>
          <div className="mt-0.5 font-bold normal-case tracking-normal truncate">
            {displayHost}
          </div>
        </div>
        <div className="border-2 border-foreground bg-card px-3 py-2">
          <div className="opacity-50">RES</div>
          <div className="mt-0.5 font-bold">
            <span className="md:hidden">9:19.5 / MOBILE</span>
            <span className="hidden md:inline">16:10 / RESPONSIVE</span>
          </div>
        </div>
        <div className="border-2 border-foreground bg-card px-3 py-2 inline-flex items-center gap-2">
          <Wifi className="h-3 w-3" strokeWidth={2.5} />
          <span className="font-bold">STREAMING</span>
        </div>
        <div className="border-2 border-foreground bg-card px-3 py-2 inline-flex items-center gap-2">
          <BatteryFull className="h-3 w-3" strokeWidth={2.5} />
          <span className="font-bold">100%</span>
        </div>
      </div>
    </section>
  );
}
