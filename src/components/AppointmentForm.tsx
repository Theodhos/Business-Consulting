"use client";

import { useState } from "react";
import { Field, TextareaField } from "./ui/Field";
import { SubmitButton } from "./ui/Button";

/**
 * The compact "Book appointment now" form used in the Why-Choose-Us band.
 * Same field treatment and intake endpoint as the rest of the site — only the
 * set of fields is trimmed to a quick booking (name, email, date, subject, note).
 */
export default function AppointmentForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");

    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "consultation", ...data }),
      });
      if (!res.ok) throw new Error("Request failed");
      setState("done");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="border border-gold/50 p-8">
        <p className="eyebrow mb-3">Appointment requested</p>
        <h3 className="mb-3 font-display text-[1.5rem] font-bold text-navy">
          Thank you — we will be in touch.
        </h3>
        <p className="font-sans text-[13.5px] leading-relaxed text-slate">
          A relationship manager will contact you within one business day to confirm your
          appointment. Everything you share is held in confidence.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Your name" name="name" required autoComplete="name" placeholder="Your full name" />
        <Field label="Email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" />
      </div>

      <Field label="Booking date" name="date" type="date" required />

      <Field label="Subject" name="subject" placeholder="What your enquiry concerns" />

      <TextareaField
        label="Message"
        name="message"
        required
        rows={4}
        placeholder="Briefly outline what you would like to discuss."
      />

      {state === "error" && (
        <p className="border border-gold/50 px-4 py-3 text-sm text-gold">
          We could not send your request. Please try again, or email{" "}
          <a href="mailto:info@tide-global.com" className="underline underline-offset-2">
            info@tide-global.com
          </a>
          .
        </p>
      )}

      <SubmitButton variant="solid" disabled={state === "sending"} className="w-full">
        {state === "sending" ? "Sending…" : "Make Appointment"}
      </SubmitButton>
    </form>
  );
}
