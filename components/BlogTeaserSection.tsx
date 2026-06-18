import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import { getPublishedBlogPosts } from "@/lib/db";
import BlogPostCard from "@/components/blog/BlogPostCard";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default async function BlogTeaserSection() {
  const posts = await getPublishedBlogPosts();
  const latest = posts.slice(0, 3);

  return (
    <section
      id="blog"
      className="mx-auto w-full max-w-5xl px-6 py-12 sm:py-14 scroll-mt-28"
    >
      <SectionHeading index="07" label="Writing" />

      <Reveal>
        <div className="mb-5 flex flex-col gap-3 border-[3px] border-foreground bg-card px-4 py-3 brutal-shadow sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] tracking-widest uppercase text-muted inline-flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5" strokeWidth={2.5} />
            Latest from the blog
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 border-2 border-foreground bg-background px-3 py-1 font-mono text-[10px] tracking-widest uppercase hover:bg-accent transition-colors"
          >
            All posts
            <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
          </Link>
        </div>
      </Reveal>

      {latest.length === 0 ? (
        <Reveal>
          <div className="border-[3px] border-foreground bg-card p-10 text-center brutal-shadow">
            <p className="text-lg font-black">Posts coming soon</p>
            <p className="mt-2 text-sm text-muted">
              Engineering notes and write-ups will land here first.
            </p>
            <Link
              href="/blog"
              className="mt-6 inline-flex items-center gap-1.5 border-[3px] border-foreground bg-accent px-4 py-2 font-mono text-xs tracking-widest uppercase brutal-shadow-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-[transform,box-shadow]"
            >
              Visit /blog
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
            </Link>
          </div>
        </Reveal>
      ) : (
        <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((post, i) => (
            <Reveal key={post.id} delay={i * 60} className="h-full">
              <BlogPostCard post={post} index={i} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
