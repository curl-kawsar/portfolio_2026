import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getPublishedBlogPostBySlug } from "@/lib/db";
import BlogMarkdown from "@/components/blog/BlogMarkdown";

type Props = {
  params: Promise<{ slug: string }>;
};

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.excerpt ?? post.title,
  };
}

export const dynamic = "force-dynamic";

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);

  if (!post) notFound();

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12 sm:py-14">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase text-muted hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2.5} />
        All posts
      </Link>

      <article className="border-[3px] border-foreground bg-card brutal-shadow">
        <header className="border-b-[2px] border-foreground bg-foreground px-5 py-4 text-background sm:px-8">
          <p className="font-mono text-[10px] tracking-widest uppercase opacity-70">
            {formatDate(post.published_at ?? post.created_at)}
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-3 max-w-2xl text-sm leading-relaxed opacity-80">
              {post.excerpt}
            </p>
          )}
        </header>

        <div className="px-5 py-8 sm:px-8">
          <BlogMarkdown content={post.content} />
        </div>
      </article>
    </main>
  );
}
