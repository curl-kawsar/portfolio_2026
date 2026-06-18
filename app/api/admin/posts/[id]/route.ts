import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import {
  deleteBlogPost,
  getBlogPostById,
  updateBlogPost,
} from "@/lib/db";
import { slugify } from "@/lib/slug";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id: idParam } = await context.params;
  const id = Number(idParam);
  if (!Number.isInteger(id) || id < 1) {
    return NextResponse.json({ error: "Invalid post ID." }, { status: 400 });
  }

  try {
    const post = await getBlogPostById(id);
    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }
    return NextResponse.json({ post });
  } catch (error) {
    console.error("Fetch blog post error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id: idParam } = await context.params;
  const id = Number(idParam);
  if (!Number.isInteger(id) || id < 1) {
    return NextResponse.json({ error: "Invalid post ID." }, { status: 400 });
  }

  try {
    const body = await request.json();
    const data: {
      slug?: string;
      title?: string;
      excerpt?: string | null;
      content?: string;
      published?: boolean;
    } = {};

    if (body.title !== undefined) {
      const title = String(body.title).trim();
      if (!title) {
        return NextResponse.json({ error: "Title cannot be empty." }, { status: 400 });
      }
      data.title = title;
    }

    if (body.slug !== undefined) {
      const slug = slugify(String(body.slug).trim());
      if (!slug) {
        return NextResponse.json({ error: "Valid slug is required." }, { status: 400 });
      }
      data.slug = slug;
    }

    if (body.excerpt !== undefined) {
      data.excerpt = body.excerpt ? String(body.excerpt).trim() : null;
    }

    if (body.content !== undefined) {
      const content = String(body.content).trim();
      if (!content) {
        return NextResponse.json(
          { error: "Content cannot be empty." },
          { status: 400 }
        );
      }
      data.content = content;
    }

    if (body.published !== undefined) {
      data.published = Boolean(body.published);
    }

    const post = await updateBlogPost(id, data);
    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Update blog post error:", error);
    return NextResponse.json(
      { error: "Failed to update blog post." },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id: idParam } = await context.params;
  const id = Number(idParam);
  if (!Number.isInteger(id) || id < 1) {
    return NextResponse.json({ error: "Invalid post ID." }, { status: 400 });
  }

  try {
    const deleted = await deleteBlogPost(id);
    if (!deleted) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete blog post error:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post." },
      { status: 500 }
    );
  }
}
