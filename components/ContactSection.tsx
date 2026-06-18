import { Mail, Phone, ArrowUpRight, MailPlus, Handshake } from "lucide-react";
import { LinkedinIcon } from "./icons/LinkedinIcon";
import { YoutubeIcon } from "./icons/YoutubeIcon";
import { portfolio } from "@/data/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-5xl px-6 py-12 sm:py-14 scroll-mt-28"
    >
      <SectionHeading index="13" label="Contact" />

      <Reveal>
        <div className="relative border-[3px] border-foreground bg-accent text-foreground p-6 sm:p-8 brutal-shadow">
          <span
            aria-hidden
            className="absolute -top-3 left-4 bg-foreground text-background border-2 border-foreground px-2 py-0.5 font-mono text-[10px] tracking-widest uppercase inline-flex items-center gap-1.5"
          >
            <MailPlus className="h-3 w-3" strokeWidth={2.5} />
            [ CTA ]
          </span>
          <p className="text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl">
            Open to opportunities
            <span className="inline-block bg-foreground text-accent px-2 ml-2">
              <ArrowUpRight className="inline h-7 w-7 sm:h-9 sm:w-9 -mt-1" strokeWidth={3} />
            </span>
            <br />
            <span className="text-foreground/80 text-2xl sm:text-3xl">
              let&rsquo;s build something durable.
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

      <Reveal delay={60}>
        <div className="mt-6">
          <ContactForm />
        </div>
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-6 border-[3px] border-foreground bg-card brutal-shadow">
          {/* Mockboard title bar */}
          <div className="flex items-center justify-between border-b-[2px] border-foreground bg-foreground text-background px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase">
            <span>~/kawsar/contact.json</span>
            <span className="inline-flex items-center gap-1.5">
              <Mail className="h-3 w-3" strokeWidth={2.5} />
              4 channels
            </span>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 font-mono text-sm">
            <li className="border-b-2 sm:border-b-0 lg:border-r-2 border-foreground">
              <a
                href={`mailto:${portfolio.email}`}
                className="group block px-4 py-3 hover:bg-foreground hover:text-background"
              >
                <span className="block text-[10px] tracking-widest uppercase text-muted group-hover:text-background inline-flex items-center gap-1.5">
                  <Mail className="h-3 w-3" strokeWidth={2.5} />
                  E / MAIL
                </span>
                <span className="mt-1 block text-[13px] break-all">
                  {portfolio.email}
                </span>
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
                <span className="mt-1 block text-[13px]">
                  {portfolio.phone}
                </span>
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
                <span className="mt-1 block text-[13px] inline-flex items-center gap-1.5">
                  Playlist
                  <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
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
                <span className="mt-1 block text-[13px] inline-flex items-center gap-1.5">
                  @curl-kawsar
                  <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
                </span>
              </a>
            </li>
          </ul>

          <div className="flex items-center justify-between border-t-[2px] border-foreground bg-foreground text-background px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase">
            <span>UTF-8</span>
            <span>JSON</span>
            <span>4 keys</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
