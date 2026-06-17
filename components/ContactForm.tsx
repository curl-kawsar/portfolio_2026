"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";

type FormState = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full border-2 border-foreground bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1";

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setErrorMessage(json.error ?? "Something went wrong.");
        setFormState("error");
        return;
      }

      form.reset();
      setFormState("success");
    } catch {
      setErrorMessage("Network error. Please try again.");
      setFormState("error");
    }
  }

  return (
    <div className="border-[3px] border-foreground bg-card brutal-shadow">
      <div className="flex items-center justify-between border-b-[2px] border-foreground bg-foreground text-background px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase">
        <span>~/kawsar/contact-form.tsx</span>
        <span className="inline-flex items-center gap-1.5">
          <Send className="h-3 w-3" strokeWidth={2.5} />
          POST /api/contact
        </span>
      </div>

      {formState === "success" ? (
        <div className="p-6 sm:p-8 text-center">
          <CheckCircle2
            className="mx-auto h-10 w-10 text-accent"
            strokeWidth={2.5}
          />
          <p className="mt-4 text-xl font-black tracking-tight">
            Message sent.
          </p>
          <p className="mt-2 text-sm text-muted">
            Thanks for reaching out — I&rsquo;ll get back to you soon.
          </p>
          <button
            type="button"
            onClick={() => setFormState("idle")}
            className="mt-6 inline-flex items-center gap-2 border-[3px] border-foreground bg-background px-5 py-2.5 font-mono text-xs tracking-widest uppercase brutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-[transform,box-shadow]"
          >
            Send another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="contact-name"
                className="block font-mono text-[10px] tracking-widest uppercase text-muted mb-1.5"
              >
                Name *
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                maxLength={255}
                autoComplete="name"
                className={inputClass}
                placeholder="Your name"
                disabled={formState === "submitting"}
              />
            </div>
            <div>
              <label
                htmlFor="contact-email"
                className="block font-mono text-[10px] tracking-widest uppercase text-muted mb-1.5"
              >
                Email *
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                maxLength={255}
                autoComplete="email"
                className={inputClass}
                placeholder="you@example.com"
                disabled={formState === "submitting"}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="contact-subject"
              className="block font-mono text-[10px] tracking-widest uppercase text-muted mb-1.5"
            >
              Subject
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              maxLength={500}
              className={inputClass}
              placeholder="What's this about?"
              disabled={formState === "submitting"}
            />
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="block font-mono text-[10px] tracking-widest uppercase text-muted mb-1.5"
            >
              Message *
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              minLength={10}
              maxLength={5000}
              rows={5}
              className={`${inputClass} resize-y min-h-[120px]`}
              placeholder="Tell me about your project, role, or idea..."
              disabled={formState === "submitting"}
            />
          </div>

          {formState === "error" && errorMessage && (
            <div className="flex items-start gap-2 border-2 border-foreground bg-accent/20 px-3 py-2.5 text-sm">
              <AlertCircle
                className="h-4 w-4 shrink-0 mt-0.5"
                strokeWidth={2.5}
              />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={formState === "submitting"}
            className="inline-flex items-center justify-center gap-2 border-[3px] border-foreground bg-accent text-foreground px-5 py-3 font-mono text-xs tracking-widest uppercase brutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-[transform,box-shadow] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[6px_6px_0_0_var(--foreground)]"
          >
            {formState === "submitting" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.5} />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" strokeWidth={2.5} />
                Send Message
              </>
            )}
          </button>
        </form>
      )}

      <div className="flex items-center justify-between border-t-[2px] border-foreground bg-foreground text-background px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase">
        <span>UTF-8</span>
        <span>application/json</span>
        <span>4 fields</span>
      </div>
    </div>
  );
}
