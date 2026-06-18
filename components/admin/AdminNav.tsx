"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";

const TABS = [
  { href: "/admin", label: "Inbox" },
  { href: "/admin/blog", label: "Blog" },
];

export default function AdminNav() {
  const pathname = usePathname();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <header className="border-b-[3px] border-foreground bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-6 py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          {TABS.map((tab) => {
            const active =
              tab.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={[
                  "border-2 border-background px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase transition-colors",
                  active
                    ? "bg-accent text-foreground"
                    : "bg-background text-foreground hover:bg-accent",
                ].join(" ")}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 self-start border-2 border-background px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase hover:bg-accent hover:text-foreground transition-colors"
        >
          <LogOut className="h-3 w-3" strokeWidth={2.5} />
          Logout
        </button>
      </div>
    </header>
  );
}
