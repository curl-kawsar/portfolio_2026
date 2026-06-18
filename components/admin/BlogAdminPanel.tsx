"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FileText,
  Loader2,
  Plus,
  RefreshCw,
  Save,
  Trash2,
  Eye,
  EyeOff,
  ArrowUpRight,
} from "lucide-react";
import type { BlogPost } from "@/lib/db";
import { slugify } from "@/lib/slug";
import TipTapEditor from "./TipTapEditor";

const EMPTY_DRAFT = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  published: false,
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function BlogAdminPanel() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState<number | "new" | null>(null);
  const [draft, setDraft] = useState(EMPTY_DRAFT);
  const [saving, setSaving] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [slugTouched, setSlugTouched] = useState(false);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/posts");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Failed to load posts.");
        return;
      }
      setPosts(json.posts);
      setSelectedId((current) => {
        if (current === "new") return current;
        if (json.posts.length === 0) return null;
        if (current && json.posts.some((p: BlogPost) => p.id === current)) {
          return current;
        }
        return json.posts[0].id;
      });
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const selected = posts.find((p) => p.id === selectedId) ?? null;

  useEffect(() => {
    if (selectedId === "new") {
      setDraft(EMPTY_DRAFT);
      setSlugTouched(false);
      return;
    }
    if (selected) {
      setDraft({
        title: selected.title,
        slug: selected.slug,
        excerpt: selected.excerpt ?? "",
        content: selected.content,
        published: selected.published,
      });
      setSlugTouched(true);
    }
  }, [selected, selectedId]);

  function startNewPost() {
    setSelectedId("new");
    setDraft(EMPTY_DRAFT);
    setSlugTouched(false);
  }

  async function handleSave() {
    const title = draft.title.trim();
    const slug = slugify(draft.slug.trim() || title);
    const content = draft.content.trim();

    if (!title || !slug || !content) {
      setError("Title, slug, and content are required.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const payload = {
        title,
        slug,
        excerpt: draft.excerpt.trim() || null,
        content,
        published: draft.published,
      };

      const isNew = selectedId === "new";
      const res = await fetch(
        isNew ? "/api/admin/posts" : `/api/admin/posts/${selectedId}`,
        {
          method: isNew ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Failed to save post.");
        return;
      }

      const saved = json.post as BlogPost;
      setPosts((prev) => {
        if (isNew) return [saved, ...prev];
        return prev.map((p) => (p.id === saved.id ? saved : p));
      });
      setSelectedId(saved.id);
    } catch {
      setError("Network error while saving.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (selectedId === "new" || !selected) return;
    if (!confirm("Delete this post permanently?")) return;

    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/posts/${selected.id}`, {
        method: "DELETE",
      });
      if (!res.ok) return;
      setPosts((prev) => {
        const next = prev.filter((p) => p.id !== selected.id);
        setSelectedId(next[0]?.id ?? null);
        return next;
      });
    } finally {
      setActionLoading(false);
    }
  }

  return (
    <>
      <div className="border-b-[3px] border-foreground bg-foreground text-background">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] tracking-widest uppercase opacity-70">
              Admin / Blog
            </p>
            <h1 className="text-xl font-black tracking-tight">Blog Posts</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={startNewPost}
              className="inline-flex items-center gap-1.5 border-2 border-background bg-accent text-foreground px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase hover:bg-background transition-colors"
            >
              <Plus className="h-3 w-3" strokeWidth={2.5} />
              New post
            </button>
            <button
              type="button"
              onClick={fetchPosts}
              disabled={loading}
              className="inline-flex items-center gap-1.5 border-2 border-background bg-background text-foreground px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase hover:bg-accent transition-colors disabled:opacity-60"
            >
              <RefreshCw
                className={`h-3 w-3 ${loading ? "animate-spin" : ""}`}
                strokeWidth={2.5}
              />
              Refresh
            </button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {error && (
          <div className="mb-6 border-[3px] border-foreground bg-accent/20 px-4 py-3 font-mono text-sm">
            {error}
          </div>
        )}

        {loading && posts.length === 0 && selectedId !== "new" ? (
          <div className="flex items-center justify-center gap-2 py-20 text-muted font-mono text-sm">
            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.5} />
            Loading posts...
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
            <aside className="border-[3px] border-foreground bg-card brutal-shadow">
              <div className="border-b-[2px] border-foreground bg-foreground text-background px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase">
                {posts.length} post{posts.length !== 1 ? "s" : ""}
              </div>
              <ul className="max-h-[75vh] overflow-y-auto">
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="border-b-2 border-foreground last:border-b-0"
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedId(post.id)}
                      className={`w-full text-left px-4 py-3 transition-colors ${
                        selectedId === post.id
                          ? "bg-accent text-foreground"
                          : "hover:bg-foreground hover:text-background"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold truncate">
                          {post.title}
                        </span>
                        {post.published ? (
                          <Eye className="h-3 w-3 shrink-0" strokeWidth={2.5} />
                        ) : (
                          <EyeOff
                            className="h-3 w-3 shrink-0 opacity-60"
                            strokeWidth={2.5}
                          />
                        )}
                      </div>
                      <p className="mt-0.5 font-mono text-[10px] tracking-wide opacity-70 truncate">
                        /blog/{post.slug}
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            </aside>

            {(selected || selectedId === "new") && (
              <article className="border-[3px] border-foreground bg-card brutal-shadow">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-[2px] border-foreground bg-foreground text-background px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase">
                  <span>
                    {selectedId === "new"
                      ? "new post"
                      : `post #${selected?.id}`}
                  </span>
                  <div className="flex items-center gap-2">
                    {selected?.published && (
                      <Link
                        href={`/blog/${selected.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 hover:text-accent"
                      >
                        View
                        <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
                      </Link>
                    )}
                    {selectedId !== "new" && (
                      <button
                        type="button"
                        onClick={handleDelete}
                        disabled={actionLoading}
                        className="inline-flex items-center gap-1 hover:text-accent disabled:opacity-60"
                      >
                        <Trash2 className="h-3 w-3" strokeWidth={2.5} />
                        Delete
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={saving}
                      className="inline-flex items-center gap-1 hover:text-accent disabled:opacity-60"
                    >
                      <Save className="h-3 w-3" strokeWidth={2.5} />
                      {saving ? "Saving…" : "Save"}
                    </button>
                  </div>
                </div>

                <div className="space-y-5 p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="font-mono text-[10px] tracking-widest uppercase text-muted">
                        Title
                      </span>
                      <input
                        type="text"
                        value={draft.title}
                        onChange={(e) => {
                          const title = e.target.value;
                          setDraft((d) => ({
                            ...d,
                            title,
                            slug: slugTouched ? d.slug : slugify(title),
                          }));
                        }}
                        className="mt-1 w-full border-2 border-foreground bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </label>
                    <label className="block">
                      <span className="font-mono text-[10px] tracking-widest uppercase text-muted">
                        Slug
                      </span>
                      <input
                        type="text"
                        value={draft.slug}
                        onChange={(e) => {
                          setSlugTouched(true);
                          setDraft((d) => ({
                            ...d,
                            slug: slugify(e.target.value),
                          }));
                        }}
                        className="mt-1 w-full border-2 border-foreground bg-background px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="font-mono text-[10px] tracking-widest uppercase text-muted">
                      Excerpt
                    </span>
                    <textarea
                      value={draft.excerpt}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, excerpt: e.target.value }))
                      }
                      rows={2}
                      className="mt-1 w-full resize-y border-2 border-foreground bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={draft.published}
                      onChange={(e) =>
                        setDraft((d) => ({
                          ...d,
                          published: e.target.checked,
                        }))
                      }
                      className="h-4 w-4 border-2 border-foreground accent-accent"
                    />
                    <span className="font-mono text-[10px] tracking-widest uppercase">
                      Published
                    </span>
                  </label>

                  <div>
                    <p className="mb-2 font-mono text-[10px] tracking-widest uppercase text-muted">
                      Content (markdown)
                    </p>
                    <TipTapEditor
                      value={draft.content}
                      onChange={(content) =>
                        setDraft((d) => ({ ...d, content }))
                      }
                    />
                  </div>

                  {selected && (
                    <p className="font-mono text-[10px] tracking-widest uppercase text-muted">
                      Updated {formatDate(selected.updated_at)}
                    </p>
                  )}
                </div>
              </article>
            )}

            {!selected && selectedId !== "new" && posts.length === 0 && (
              <div className="border-[3px] border-foreground bg-card brutal-shadow p-12 text-center">
                <FileText
                  className="mx-auto h-10 w-10 text-muted"
                  strokeWidth={2}
                />
                <p className="mt-4 text-lg font-black">No posts yet</p>
                <p className="mt-2 text-sm text-muted">
                  Create your first blog post from the admin panel.
                </p>
                <button
                  type="button"
                  onClick={startNewPost}
                  className="mt-6 inline-flex items-center gap-1.5 border-[3px] border-foreground bg-accent px-4 py-2 font-mono text-xs tracking-widest uppercase brutal-shadow"
                >
                  <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                  New post
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </>
  );
}
