"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Mail,
  Loader2,
  Trash2,
  MailOpen,
  MailCheck,
  RefreshCw,
  ArrowUpRight,
} from "lucide-react";
import type { ContactMessage } from "@/lib/db";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function AdminPanel() {
  const router = useRouter();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/messages");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Failed to load messages.");
        return;
      }
      setMessages(json.messages);
      setSelectedId((current) => {
        if (json.messages.length === 0) return null;
        if (current && json.messages.some((m: ContactMessage) => m.id === current)) {
          return current;
        }
        return json.messages[0].id;
      });
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const selected = messages.find((m) => m.id === selectedId) ?? null;
  const unreadCount = messages.filter((m) => !m.read).length;

  async function toggleRead(id: number, read: boolean) {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read }),
      });
      if (!res.ok) return;
      const json = await res.json();
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? json.message : m))
      );
    } finally {
      setActionLoading(null);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this message permanently?")) return;
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) return;
      setMessages((prev) => {
        const next = prev.filter((m) => m.id !== id);
        if (selectedId === id) {
          setSelectedId(next[0]?.id ?? null);
        }
        return next;
      });
    } finally {
      setActionLoading(null);
    }
  }

  return (
    <>
      <div className="border-b-[3px] border-foreground bg-foreground text-background">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] tracking-widest uppercase opacity-70">
              Admin / Inbox
            </p>
            <h1 className="text-xl font-black tracking-tight">
              Contact Messages
              {unreadCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center bg-accent text-foreground border-2 border-background px-2 py-0.5 font-mono text-[10px] tracking-widest">
                  {unreadCount} new
                </span>
              )}
            </h1>
          </div>
          <button
            type="button"
            onClick={fetchMessages}
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

      <main className="mx-auto max-w-6xl px-6 py-8">
        {loading && messages.length === 0 ? (
          <div className="flex items-center justify-center gap-2 py-20 text-muted font-mono text-sm">
            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.5} />
            Loading messages...
          </div>
        ) : error ? (
          <div className="border-[3px] border-foreground bg-accent/20 p-6 text-center">
            <p>{error}</p>
            <button
              type="button"
              onClick={fetchMessages}
              className="mt-4 font-mono text-xs tracking-widest uppercase underline"
            >
              Retry
            </button>
          </div>
        ) : messages.length === 0 ? (
          <div className="border-[3px] border-foreground bg-card brutal-shadow p-12 text-center">
            <Mail className="mx-auto h-10 w-10 text-muted" strokeWidth={2} />
            <p className="mt-4 text-lg font-black">No messages yet</p>
            <p className="mt-2 text-sm text-muted">
              Contact form submissions will appear here.
            </p>
            <Link
              href="/#contact"
              className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs tracking-widest uppercase text-muted hover:text-foreground"
            >
              <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
              View contact form
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
            <aside className="border-[3px] border-foreground bg-card brutal-shadow">
              <div className="border-b-[2px] border-foreground bg-foreground text-background px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase">
                {messages.length} message{messages.length !== 1 ? "s" : ""}
              </div>
              <ul className="max-h-[70vh] overflow-y-auto">
                {messages.map((msg) => (
                  <li key={msg.id} className="border-b-2 border-foreground last:border-b-0">
                    <button
                      type="button"
                      onClick={() => setSelectedId(msg.id)}
                      className={`w-full text-left px-4 py-3 hover:bg-foreground hover:text-background transition-colors ${
                        selectedId === msg.id
                          ? "bg-accent text-foreground"
                          : msg.read
                            ? "bg-card"
                            : "bg-background font-semibold"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm truncate">{msg.name}</span>
                        {!msg.read && (
                          <span className="shrink-0 h-2 w-2 bg-accent border border-foreground" />
                        )}
                      </div>
                      <p className="mt-0.5 text-[11px] text-muted truncate font-mono">
                        {msg.subject || msg.email}
                      </p>
                      <p className="mt-1 text-[10px] font-mono tracking-wide opacity-70">
                        {formatDate(msg.created_at)}
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            </aside>

            {selected && (
              <article className="border-[3px] border-foreground bg-card brutal-shadow">
                <div className="flex items-center justify-between border-b-[2px] border-foreground bg-foreground text-background px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase">
                  <span>msg #{selected.id}</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleRead(selected.id, !selected.read)}
                      disabled={actionLoading === selected.id}
                      className="inline-flex items-center gap-1 hover:text-accent transition-colors disabled:opacity-60"
                    >
                      {selected.read ? (
                        <>
                          <MailOpen className="h-3 w-3" strokeWidth={2.5} />
                          Mark unread
                        </>
                      ) : (
                        <>
                          <MailCheck className="h-3 w-3" strokeWidth={2.5} />
                          Mark read
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(selected.id)}
                      disabled={actionLoading === selected.id}
                      className="inline-flex items-center gap-1 hover:text-accent transition-colors disabled:opacity-60"
                    >
                      <Trash2 className="h-3 w-3" strokeWidth={2.5} />
                      Delete
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <p className="font-mono text-[10px] tracking-widest uppercase text-muted">
                      From
                    </p>
                    <p className="mt-1 text-lg font-black">{selected.name}</p>
                    <a
                      href={`mailto:${selected.email}`}
                      className="text-sm text-muted hover:text-accent underline underline-offset-2"
                    >
                      {selected.email}
                    </a>
                  </div>

                  {selected.subject && (
                    <div>
                      <p className="font-mono text-[10px] tracking-widest uppercase text-muted">
                        Subject
                      </p>
                      <p className="mt-1 font-medium">{selected.subject}</p>
                    </div>
                  )}

                  <div>
                    <p className="font-mono text-[10px] tracking-widest uppercase text-muted">
                      Message
                    </p>
                    <p className="mt-2 text-[15px] leading-relaxed whitespace-pre-wrap">
                      {selected.message}
                    </p>
                  </div>

                  <p className="pt-2 font-mono text-[10px] tracking-widest uppercase text-muted">
                    Received {formatDate(selected.created_at)}
                  </p>
                </div>
              </article>
            )}
          </div>
        )}
      </main>
    </>
  );
}
