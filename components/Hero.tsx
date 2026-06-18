import Image from "next/image";
import { Mail, Phone, MapPin, Terminal, FileText, Handshake, ArrowUpRight } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import Reveal from "./Reveal";
import { LinkedinIcon } from "./icons/LinkedinIcon";
import { YoutubeIcon } from "./icons/YoutubeIcon";
export default function Hero() {
  const hasPhoto = Boolean(portfolio.photoUrl);

  return (
    <section    
      id="top"
      className="mx-auto w-full max-w-5xl px-6 pt-10 pb-14 sm:pt-12 sm:pb-16"
    >
      {/* Mockboard: grid of asymmetric, thick-bordered "boards" that hold
          a piece of the hero. Each board is offset, has a hard shadow, and
          is labeled with a mono caption like a designer spec sheet. */}
      <div className="grid grid-cols-12 gap-4 sm:gap-5">
        {/* Caption strip across the top */}
        <Reveal className="col-span-12">
          <div className="flex items-center justify-between border-y-[3px] border-foreground bg-card px-3 py-2 font-mono text-[11px] tracking-widest uppercase">
            <span className="inline-flex items-center gap-1.5">
              <FileText className="h-3 w-3" strokeWidth={2.5} />
              FILE: 00_HERO.LOGO
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5">
              <Terminal className="h-3 w-3" strokeWidth={2.5} />
              ROLE / {portfolio.role}
            </span>
            <span>VER 1.0</span>
          </div>
        </Reveal>

        {/* Intro — after photo on mobile, left column on desktop */}
        <Reveal className="col-span-12 order-3 lg:col-span-8 lg:order-2" delay={80}>
          <div className="relative border-[3px] border-foreground bg-card p-6 sm:p-8 brutal-shadow">
            <div className="absolute -top-3 left-3 bg-accent border-2 border-foreground px-2 py-0.5 font-mono text-[10px] tracking-widest uppercase text-foreground inline-flex items-center gap-1.5">
              <Terminal className="h-3 w-3" strokeWidth={2.5} />
              [ HELLO / I'M ]
            </div>
            <h1 className="mt-2 text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              Md<span className="text-accent">.</span>{" "}
              K<span className="text-accent">a</span>ws
              <span className="text-accent">a</span>r{" "}
              A<span className="text-accent">h</span>m
              <span className="text-accent">e</span>d
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted sm:text-lg inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0" strokeWidth={2.5} />
              <span>
                {portfolio.role} · {portfolio.location}
              </span>
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
              href={`mailto:${portfolio.email}?subject=${encodeURIComponent(
                "Hiring Inquiry — Md. Kawsar Ahmed"
              )}`}
              className="group inline-flex items-center justify-center gap-2 border-[3px] border-foreground bg-background text-foreground px-5 py-3 font-mono text-xs tracking-widest uppercase brutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-[transform,box-shadow]"
            >
              <Handshake className="h-4 w-4" strokeWidth={2.75} />
              Hire Me
            </a>
              <a
                href={portfolio.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 border-[3px] border-foreground bg-foreground text-background px-5 py-3 font-mono text-xs tracking-widest uppercase brutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-[transform,box-shadow]"
              >
                View Resume
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2.75}
                />
              </a>
            </div>
          </div>
        </Reveal>

        {/* Photo — first on mobile, right column on desktop */}
        <Reveal className="col-span-12 order-2 lg:col-span-4 lg:order-3" delay={140}>
          <div className="relative h-full border-[3px] border-foreground bg-card p-3 brutal-shadow-accent">
            <div className="absolute -top-3 left-3 bg-foreground text-background border-2 border-foreground px-2 py-0.5 font-mono text-[10px] tracking-widest uppercase inline-flex items-center gap-1.5">
              <FileText className="h-3 w-3" strokeWidth={2.5} />
              [ ID_PHOTO ]
            </div>
            <div className="relative aspect-[4/5] w-full overflow-hidden border-2 border-foreground bg-background">
              {hasPhoto ? (
                <Image
                  src={portfolio.photoUrl}
                  alt={portfolio.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-foreground text-background font-mono text-[11px] tracking-widest uppercase">
                  DROP /public/profile.jpg
                </div>
              )}
            </div>
            <p className="mt-2 font-mono text-[10px] tracking-widest uppercase text-muted text-center inline-flex items-center gap-1.5 w-full justify-center">
              <MapPin className="h-3 w-3" strokeWidth={2.5} />
              {portfolio.location}
            </p>
          </div>
        </Reveal>

        {/* Contact quick-links board — full width, segmented */}
        <Reveal className="col-span-12 order-4" delay={220}>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-[3px] border-foreground bg-card font-mono text-sm">
            <li className="border-b-2 sm:border-b-0 lg:border-r-2 border-foreground">
              <a
                href={`mailto:${portfolio.email}`}
                className="group block px-4 py-3 hover:bg-foreground hover:text-background"
              >
                <span className="block text-[10px] tracking-widest uppercase text-muted group-hover:text-background inline-flex items-center gap-1.5">
                  <Mail className="h-3 w-3" strokeWidth={2.5} />
                  E / MAIL
                </span>
                <span className="block mt-1 text-[13px]">{portfolio.email}</span>
              </a>
            </li>
            <li className="border-b-2 sm:border-b-0 lg:border-r-2 border-foreground">
              <a
                href={`tel:${portfolio.phone}`}
                className="group block px-4 py-3 hover:bg-foreground hover:text-background"
              >
                <span className="block text-[10px] tracking-widest uppercase text-muted group-hover:text-background inline-flex items-center gap-1.5">
                  <Phone className="h-3 w-3" strokeWidth={2.5} />
                  T / PHONE
                </span>
                <span className="block mt-1 text-[13px]">{portfolio.phone}</span>
              </a>
            </li>
            <li className="border-b-2 sm:border-b-0 lg:border-r-2 border-foreground">
              <a
                href={portfolio.youtubePlaylist.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block px-4 py-3 hover:bg-foreground hover:text-background"
              >
                <span className="block text-[10px] tracking-widest uppercase text-muted group-hover:text-background inline-flex items-center gap-1.5">
                  <YoutubeIcon className="h-3 w-3" />
                  V / YOUTUBE
                </span>
                <span className="block mt-1 text-[13px]">
                  Watch playlist ↗
                </span>
              </a>
            </li>
            <li>
              <a
                href={portfolio.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group block px-4 py-3 hover:bg-foreground hover:text-background"
              >
                <span className="block text-[10px] tracking-widest uppercase text-muted group-hover:text-background inline-flex items-center gap-1.5">
                  <LinkedinIcon className="h-3 w-3" />
                  S / LINKEDIN
                </span>
                <span className="block mt-1 text-[13px]">
                  linkedin.com/in/curl-kawsar ↗
                </span>
              </a>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}