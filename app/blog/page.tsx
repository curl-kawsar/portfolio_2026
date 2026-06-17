import type { Metadata } from "next";
import { getPublishedBlogPosts } from "@/lib/db";
import { portfolio } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import BlogPostCard from "@/components/blog/BlogPostCard";

export const metadata: Metadata = {
  title: `Blog — ${portfolio.name}`,
  description: `Writing on engineering, product, and building software by ${portfolio.name}.`,
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12 sm:py-14">
      <SectionHeading index="BLOG" label="Posts" />
      {posts.length === 0 ? (
        <div className="border-[3px] border-foreground bg-card brutal-shadow p-10 text-center">
          <p className="text-lg font-black">No posts yet</p>
          <p className="mt-2 text-sm text-muted">
            Check back soon for new writing.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post, i) => (
            <BlogPostCard key={post.id} post={post} index={i} />
          ))}
        </div>
      )}
    </main>
  );
}
