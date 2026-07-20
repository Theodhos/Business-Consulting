import type { Metadata } from "next";
import { ArrowRight, Plus } from "lucide-react";

import PageHero from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description:
    "Straight answers on how Tide Global works — the model, confidentiality, timelines, fees and what we will and will not promise.",
};

/** Structured data so the answers can surface directly in search results. */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHero
        eyebrow="Frequently asked questions"
        title="Straight answers, including the unflattering ones."
        lead="If a question you have is not here, ask it directly. You will get the same candour by email that you would get in the room."
      />

      {/* ── The questions ─────────────────────────────────────────────── */}
      <Section tone="paper" divide={false}>
        <div className="mx-auto max-w-3xl">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-line first:border-t">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-7 [&::-webkit-details-marker]:hidden">
                <h2 className="display-sm text-navy transition-colors group-hover:text-gold">
                  {f.q}
                </h2>
                <Plus
                  size={18}
                  strokeWidth={1.25}
                  aria-hidden
                  className="mt-1 shrink-0 text-gold transition-transform duration-300 group-open:rotate-45"
                />
              </summary>
              <p className="max-w-2xl pb-8 text-sm leading-relaxed text-navy/65">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* ── Still asking ──────────────────────────────────────────────── */}
      <Section tone="mist">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Not answered here"
            title="Ask the question you actually came with."
            lead="The ones that matter are rarely on a list like this. A confidential conversation costs nothing and commits you to nothing."
          />
          <Button href="/book-consultation" className="shrink-0">
            Book a consultation
            <ArrowRight size={14} strokeWidth={1.5} />
          </Button>
        </div>
      </Section>
    </>
  );
}
