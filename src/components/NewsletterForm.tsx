"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind: "newsletter", email }),
    }).catch(() => {});
    setState("done");
    setEmail("");
  }

  if (state === "done") {
    return (
      <p className="border border-gold/40 px-4 py-3.5 font-sans text-sm text-gold md:justify-self-end md:w-full md:max-w-sm">
        Thank you — you are subscribed.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex md:justify-self-end md:w-full md:max-w-sm">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        autoComplete="email"
        className="min-w-0 flex-1 border border-line-invert bg-transparent px-4 py-3.5 font-sans text-sm text-paper placeholder:text-paper/25 transition-colors focus:border-gold focus:outline-none"
      />
      <button
        type="submit"
        disabled={state === "sending"}
        aria-label="Subscribe"
        className="flex shrink-0 items-center justify-center border border-l-0 border-line-invert px-5 text-paper transition-colors hover:border-gold hover:bg-gold hover:text-ink disabled:opacity-50"
      >
        <ArrowRight size={16} strokeWidth={1.5} />
      </button>
    </form>
  );
}
