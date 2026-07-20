"use client";

import { useState } from "react";
import { Field, SelectField, TextareaField } from "./ui/Field";
import { SubmitButton } from "./ui/Button";
import { services } from "@/lib/content";

const interests = [...services.map((s) => s.title), "I am not yet sure"] as const;

const timelines = [
  "As soon as possible",
  "Within 3 months",
  "Within 6 months",
  "Within 12 months",
  "Exploring options",
] as const;

const contactTimes = ["Morning (SAST)", "Afternoon (SAST)", "Either"] as const;

/**
 * The enquiry form, used for both the general contact page and the consultation
 * booking. `variant` only changes which fields are asked for — never the styling.
 */
export default function EnquiryForm({
  variant = "contact",
  invert = false,
}: {
  variant?: "contact" | "consultation";
  invert?: boolean;
}) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const booking = variant === "consultation";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");

    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: variant, ...data }),
      });
      if (!res.ok) throw new Error("Request failed");
      setState("done");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className={`border p-10 ${invert ? "border-gold/40" : "border-gold/50"}`}>
        <p className="eyebrow mb-4">Enquiry received</p>
        <h3 className={`display-md mb-4 ${invert ? "text-paper" : "text-navy"}`}>
          Thank you. Your enquiry is with us.
        </h3>
        <p className={`text-sm leading-relaxed ${invert ? "text-paper/60" : "text-navy/65"}`}>
          A relationship manager will contact you within one business day to arrange your
          confidential consultation. Everything you have shared is held in confidence.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field label="Full name" name="name" required invert={invert} autoComplete="name" placeholder="Your full name" />
        <Field label="Email address" name="email" type="email" required invert={invert} autoComplete="email" placeholder="you@example.com" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field label="Telephone" name="phone" type="tel" required invert={invert} autoComplete="tel" placeholder="Include country code" />
        <Field label="Country of residence" name="country" required invert={invert} autoComplete="country-name" placeholder="Where you are based" />
      </div>

      {booking ? (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <SelectField label="Area of interest" name="interest" options={interests} required invert={invert} />
            <SelectField label="Intended timeline" name="timeline" options={timelines} required invert={invert} />
          </div>
          <SelectField label="Preferred time to be reached" name="preferredTime" options={contactTimes} invert={invert} />
        </>
      ) : (
        <Field label="Subject" name="subject" invert={invert} placeholder="What your enquiry concerns" />
      )}

      <TextareaField
        label={booking ? "Your circumstances" : "Message"}
        name="message"
        required
        invert={invert}
        placeholder={
          booking
            ? "Briefly outline your situation and what you are hoping to achieve. Detail is helpful but never required at this stage."
            : "How can we assist you?"
        }
      />

      <p className={`text-xs leading-relaxed ${invert ? "text-paper/40" : "text-navy/45"}`}>
        Your enquiry is confidential from the moment it reaches us, whether or not you go on to
        instruct the firm. See our{" "}
        <a href="/privacy" className="underline underline-offset-2 hover:text-gold">
          Privacy Policy
        </a>
        .
      </p>

      {state === "error" && (
        <p className="border border-gold/50 px-4 py-3 text-sm text-gold">
          We could not send your enquiry. Please try again, or email{" "}
          <a href="mailto:privateclients@tide-global.com" className="underline underline-offset-2">
            privateclients@tide-global.com
          </a>
          .
        </p>
      )}

      <SubmitButton variant={invert ? "invert" : "solid"} disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : booking ? "Request consultation" : "Send enquiry"}
      </SubmitButton>
    </form>
  );
}
