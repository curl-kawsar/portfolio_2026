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
    <article className="relative flex h-full flex-col border-[3px] border-foreground bg-card brutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-[transform,box-shadow]">
      <span className="absolute -top-3 left-4 z-10 inline-flex items-center gap-1.5 border-2 border-foreground bg-accent px-2 py-0.5 font-mono text-[10px] tracking-widest uppercase">
        <FileText className="h-3 w-3" strokeWidth={2.5} />
        [ POST / {String(index + 1).padStart(2, "0")} ]
      </span>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="font-mono text-[10px] tracking-widest uppercase text-muted">
          {formatDate(post.published_at ?? post.created_at)}
        </p>
        <h2 className="mt-2 min-h-[4.5rem] text-xl font-black tracking-tight line-clamp-3 sm:min-h-[5.25rem] sm:text-2xl">
          <Link href={`/blog/${post.slug}`} className="hover:text-accent">
            {post.title}
          </Link>
        </h2>
        <div className="mt-3 min-h-[6.5rem] flex-1">
          {post.excerpt && (
            <p className="text-[15px] leading-relaxed text-muted line-clamp-4">
              {post.excerpt}
            </p>
          )}
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-5 inline-flex w-fit shrink-0 items-center gap-1.5 border-[3px] border-foreground bg-background px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase brutal-shadow-sm hover:bg-accent transition-colors"
        >
          Read post
          <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
        </Link>
      </div>
    </article>
  );
}
