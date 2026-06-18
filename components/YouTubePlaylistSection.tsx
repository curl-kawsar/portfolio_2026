import { ArrowUpRight, Play } from "lucide-react";
import type { YouTubePlaylist } from "@/data/portfolio";
import { YoutubeIcon } from "./icons/YoutubeIcon";
import Reveal from "./Reveal";

type Props = {
  playlist: YouTubePlaylist;
};

export default function YouTubePlaylistSection({ playlist }: Props) {
  const embedUrl = `https://www.youtube.com/embed/videoseries?list=${playlist.playlistId}`;

  return (
    <section
      id="youtube"
      className="mx-auto w-full max-w-5xl px-6 pb-12 sm:pb-14 scroll-mt-28"
    >
      <Reveal>
        <div className="border-[3px] border-foreground bg-card brutal-shadow">
          <div className="flex flex-col gap-3 border-b-[2px] border-foreground bg-foreground text-background px-3 py-2 sm:flex-row sm:items-center sm:justify-between font-mono text-[10px] tracking-widest uppercase">
            <span className="inline-flex items-center gap-1.5">
              <YoutubeIcon className="h-3.5 w-3.5" />
              [ PLAYLIST / YOUTUBE ]
            </span>
            <a
              href={playlist.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border-2 border-background px-2 py-1 hover:bg-accent hover:text-foreground transition-colors"
            >
              Open on YouTube
              <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
            </a>
          </div>

          <div className="p-4 sm:p-5">
            <div className="mb-4 flex items-start gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center border-2 border-foreground bg-accent brutal-shadow-sm">
                <Play className="h-4 w-4" strokeWidth={2.5} />
              </span>
              <div>
                <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
                  {playlist.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-justify text-muted">
                  {playlist.description}
                </p>
              </div>
            </div>

            <div className="relative aspect-video w-full overflow-hidden border-[3px] border-foreground bg-background">
              <iframe
                src={embedUrl}
                title={playlist.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
