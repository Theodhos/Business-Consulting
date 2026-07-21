import type { Metadata } from "next";

import PageHero from "@/components/PageHero";
import FaqPageClient from "@/components/FaqPageClient";
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
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop"
      />

      <FaqPageClient />
    </>
  );
}
