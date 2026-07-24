import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import PageHero from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { insightTopics } from "@/lib/content";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Briefings on South African immigration policy, investment migration and private client planning from Tide Global Private Client Services.",
};

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Published when the change is material. Not on a content calendar."
        lead="Our editorial programme covers South African immigration policy and private client planning — written by the people who advise on it, for the people it affects."
      />

      {/* ── The programme ─────────────────────────────────────────────── */}
      <Section tone="paper" divide={false}>
        <SectionHeading
          eyebrow="Editorial programme"
          title="What we write about"
          lead="Six areas where the gap between what the legislation says and how it is applied is wide enough to be worth writing about."
        />

        <div className="mt-10 grid grid-cols-1 gap-px border border-line bg-line sm:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {insightTopics.map((t, i) => (
            <div key={t.title} className="bg-paper p-6 sm:p-8">
              <span className="eyebrow mb-5 block sm:mb-6">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="display-sm mb-2.5 text-navy sm:mb-3">{t.title}</h2>
              <p className="text-[13.5px] leading-relaxed text-navy/65 sm:text-sm">{t.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Standing state ───────────────────────────────────────────── */}
      <Section tone="mist">
        <div className="grid grid-cols-1 gap-10 sm:gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="First briefings"
              title="The first briefings are in preparation."
            />
          </div>

          <div className="space-y-5 sm:space-y-6 lg:col-span-7">
            <p className="text-[16px] leading-relaxed text-navy/75 sm:text-lg">
              We would rather publish nothing than publish filler. The first pieces are being written
              now and will appear here as they are ready.
            </p>
            <p className="lead">
              If you would like them when they land, subscribe below. It is a short list, sent a few
              times a year, and never shared with anyone. If a policy change affects a matter of
              yours that we are already handling, you will hear from your relationship manager
              directly — long before it reaches this page.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button href="/book-consultation" variant="outline" className="w-full sm:w-auto">
                Speak to an adviser instead
                <ArrowRight size={14} strokeWidth={1.5} />
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
