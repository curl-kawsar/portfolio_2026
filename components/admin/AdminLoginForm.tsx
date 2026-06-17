"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? "Login failed.");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md border-[3px] border-foreground bg-card brutal-shadow">
        <div className="flex items-center justify-between border-b-[2px] border-foreground bg-foreground text-background px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase">
          <span>~/admin/login</span>
          <span className="inline-flex items-center gap-1.5">
            <Lock className="h-3 w-3" strokeWidth={2.5} />
            auth
          </span>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight">Admin Panel</h1>
            <p className="mt-1 text-sm text-muted">
              Enter your password to view contact messages.
            </p>
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="block font-mono text-[10px] tracking-widest uppercase text-muted mb-1.5"
            >
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full border-2 border-foreground bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1"
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          {error && (
            <p className="text-sm text-accent font-medium">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 border-[3px] border-foreground bg-accent text-foreground px-5 py-3 font-mono text-xs tracking-widest uppercase brutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-[transform,box-shadow] disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.5} />
                Signing in...
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" strokeWidth={2.5} />
                Sign In
              </>
            )}
          </button>
        </form>

        <div className="border-t-[2px] border-foreground px-4 py-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase text-muted hover:text-foreground"
          >
            <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
            Back to portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
