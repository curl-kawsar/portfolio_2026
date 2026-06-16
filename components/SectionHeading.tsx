type Props = {
  index: string;
  label: string;
  id?: string;
};

/**
 * Brutalist numbered section heading.
 * Mono number on a hard-shadow chip, with the section label stamped next to it.
 */
export default function SectionHeading({ index, label, id }: Props) {
  return (
    <header
      id={id}
      className="flex items-center gap-3 mb-6 scroll-mt-24"
    >
      <span className="inline-flex items-center justify-center min-w-[3rem] px-3 py-1 bg-foreground text-background border-2 border-foreground font-mono text-sm tracking-widest brutal-shadow-sm">
        [{index}]
      </span>
      <h2 className="font-mono text-sm tracking-widest uppercase font-bold">
        {label}
      </h2>
      <span aria-hidden className="flex-1 h-[2px] bg-foreground" />
    </header>
  );
}
