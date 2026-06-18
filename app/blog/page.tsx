import type { Metadata } from "next";
import { getPublishedBlogPosts } from "@/lib/db";
import { portfolio } from "@/data/portfolio";
import { SITE_URL } from "@/lib/seo";
import SectionHeading from "@/components/SectionHeading";
import BlogPostCard from "@/components/blog/BlogPostCard";

const title = "Blog";
const description = `Writing on engineering, product, and building software by ${portfolio.name}.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/blog`,
    type: "website",
    siteName: portfolio.name,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${title} — ${portfolio.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
  },
};

export const dynamic = "force-dynamic";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: `${SITE_URL}/blog`,
    },
  ],
};

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
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
    </>
  );
}
