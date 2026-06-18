import type { MetadataRoute } from "next";
import { getPublishedBlogPosts } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: "https://imkawsar.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://imkawsar.com/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  try {
    const posts = await getPublishedBlogPosts();
    const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `https://imkawsar.com/blog/${post.slug}`,
      lastModified: new Date(post.updated_at),
      changeFrequency: "monthly",
      priority: 0.7,
    }));
    return [...staticPages, ...blogEntries];
  } catch {
    return staticPages;
  }
}
