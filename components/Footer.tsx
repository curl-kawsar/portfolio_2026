import { portfolio } from "@/data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mx-auto w-full max-w-3xl px-6 pb-12">
      <div className="border-t-[3px] border-foreground pt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between font-mono text-[11px] tracking-widest uppercase">
        <p>
          <span className="bg-foreground text-background px-1">©</span> {year}{" "}
          {portfolio.name}
        </p>
        <p>
          <a href="#top" className="border-2 border-foreground px-2 py-1 hover:bg-foreground hover:text-background">
            ↑ BACK_TO_TOP
          </a>
        </p>
      </div>
    </footer>
  );
}
