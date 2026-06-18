type Props = {
  index: string;
  label: string;
  id?: string;
};

/**
 * Brutalist numbered section heading.
 * Mono number on a hard-shadow chip, with the section label stamped next to it.
 * A huge outlined display glyph of the same index sits behind the row as a
 * visual hook (Linear-style) so the section number becomes the page's
 * dominant typographic signal.
 */
export default function SectionHeading({ index, label, id }: Props) {
  return (
    <header
      id={id}
      className="relative isolate flex items-center gap-3 mb-6 scroll-mt-28 overflow-hidden"
    >
      {/* Ghost number — a huge outlined display glyph in the background.
          Sits behind the row (z-0), bleeds off the right edge for tension,
          and uses text-stroke + transparent fill so it reads as a frame. */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none font-mono font-black leading-none tracking-tighter text-[clamp(7rem,18vw,14rem)] text-transparent [-webkit-text-stroke:2px_var(--foreground)] opacity-[0.08] z-0"
      >
        {index}
      </span>

      {/* Foreground row — index chip + label + rule, all in front of
          the ghost number. */}
      <div className="relative z-10 flex items-center gap-3 w-full">
        <span className="inline-flex items-center justify-center min-w-[3rem] px-3 py-1 bg-foreground text-background border-2 border-foreground font-mono text-sm tracking-widest brutal-shadow-sm">
          [{index}]
        </span>
        <h2 className="font-mono text-sm tracking-widest uppercase font-bold">
          {label}
        </h2>
        <span aria-hidden className="flex-1 h-[2px] bg-foreground" />
      </div>
    </header>
  );
}
