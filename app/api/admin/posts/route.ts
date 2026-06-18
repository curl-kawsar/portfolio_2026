import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getAllBlogPosts, insertBlogPost } from "@/lib/db";
import { slugify } from "@/lib/slug";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const posts = await getAllBlogPosts();
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Fetch blog posts error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const title = String(body.title ?? "").trim();
    const content = String(body.content ?? "").trim();
    const excerpt = body.excerpt ? String(body.excerpt).trim() : null;
    const published = Boolean(body.published);
    const slugInput = String(body.slug ?? "").trim();
    const slug = slugInput ? slugify(slugInput) : slugify(title);

    if (!title) {
      return NextResponse.json({ error: "Title is required." }, { status: 400 });
    }
    if (!content) {
      return NextResponse.json(
        { error: "Content is required." },
        { status: 400 }
      );
    }
    if (!slug) {
      return NextResponse.json({ error: "Valid slug is required." }, { status: 400 });
    }

    const post = await insertBlogPost({
      slug,
      title,
      excerpt,
      content,
      published,
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error("Create blog post error:", error);
    const message =
      error instanceof Error && error.message.includes("unique")
        ? "A post with this slug already exists."
        : "Failed to create blog post.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
