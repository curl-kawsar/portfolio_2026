import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { portfolio } from "@/data/portfolio";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="border-b-[3px] border-foreground bg-foreground text-background">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase hover:text-accent transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2.5} />
            {portfolio.name}
          </Link>
          <Link
            href="/blog"
            className="font-mono text-[10px] tracking-widest uppercase font-bold hover:text-accent transition-colors"
          >
            Blog
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}
