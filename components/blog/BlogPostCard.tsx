import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import type { BlogPost } from "@/lib/db";

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

type Props = {
  post: BlogPost;
  index: number;
};

export default function BlogPostCard({ post, index }: Props) {
  return (
    <article className="relative border-[3px] border-foreground bg-card brutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-[transform,box-shadow]">
      <span className="absolute -top-3 left-4 z-10 inline-flex items-center gap-1.5 border-2 border-foreground bg-accent px-2 py-0.5 font-mono text-[10px] tracking-widest uppercase">
        <FileText className="h-3 w-3" strokeWidth={2.5} />
        [ POST / {String(index + 1).padStart(2, "0")} ]
      </span>

      <div className="p-5 sm:p-6">
        <p className="font-mono text-[10px] tracking-widest uppercase text-muted">
          {formatDate(post.published_at ?? post.created_at)}
        </p>
        <h2 className="mt-2 text-xl font-black tracking-tight sm:text-2xl">
          <Link href={`/blog/${post.slug}`} className="hover:text-accent">
            {post.title}
          </Link>
        </h2>
        {post.excerpt && (
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            {post.excerpt}
          </p>
        )}
        <Link
          href={`/blog/${post.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 border-[3px] border-foreground bg-background px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase brutal-shadow-sm hover:bg-accent transition-colors"
        >
          Read post
          <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
        </Link>
      </div>
    </article>
  );
}
