import Image from "next/image";

type Props = {
  size?: "sm" | "md" | "lg";
};

const CORNER_SIZE = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
} as const;

const CENTER_SIZE = {
  sm: "h-10 w-10 opacity-[0.2]",
  md: "h-16 w-16 opacity-[0.22]",
  lg: "h-24 w-24 opacity-[0.25]",
} as const;

export default function ImageWatermark({ size = "md" }: Props) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[5] overflow-hidden select-none"
    >
      <Image
        src="/favicon.png"
        alt=""
        width={160}
        height={160}
        className={[
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          CENTER_SIZE[size],
        ].join(" ")}
      />
      <div className="absolute bottom-1.5 right-1.5 border border-foreground/50 bg-background/70 p-0.5 brutal-shadow-sm">
        <Image
          src="/favicon.png"
          alt=""
          width={32}
          height={32}
          className={CORNER_SIZE[size]}
        />
      </div>
    </div>
  );
}
