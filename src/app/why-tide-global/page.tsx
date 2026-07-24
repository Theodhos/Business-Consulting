import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import PageHero from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { advantages } from "@/lib/content";

export const metadata: Metadata = {
  title: "Why Tide Global",
  description:
    "The difference between a boutique private client immigration practice and a volume consultancy — and how to tell which one your matter actually needs.",
};

const comparison = [
  {
    dimension: "Model",
    volume: "Applications processed at scale",
    boutique: "A limited number of matters at any one time",
  },
  {
    dimension: "Point of contact",
    volume: "A team inbox or case reference",
    boutique: "One named relationship manager, reachable directly",
  },
  {
    dimension: "Starting point",
    volume: "Which form applies to you",
    boutique: "Which route serves your objectives, and why not the others",
  },
  {
    dimension: "Your role",
    volume: "You gather, submit and follow up",
    boutique: "The firm carries it; you make decisions",
  },
  {
    dimension: "Updates",
    volume: "On request",
    boutique: "On a defined rhythm, including when nothing has moved",
  },
  {
    dimension: "Measured by",
    volume: "Applications filed",
    boutique: "Your time, capital and opportunity protected",
  },
];

export default function WhyTideGlobalPage() {
  return (
    <>
      <PageHero
        eyebrow="Why Tide Global"
        title="Why discerning clients choose a boutique practice."
        lead="Not because it is more expensive, and not because it is more attentive. Because a different model makes different things possible."
      />

      {/* ── The honest framing ────────────────────────────────────────── */}
      <Section tone="paper" divide={false}>
        <div className="grid grid-cols-1 gap-10 sm:gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Plainly" title="You may not need us." />
          </div>

          <div className="space-y-5 sm:space-y-6 lg:col-span-7">
            <p className="text-[16px] leading-relaxed text-navy/75 sm:text-lg">
              If your circumstances are straightforward, your timeline is comfortable and price is
              the deciding factor, a volume consultancy will serve you perfectly well. We will tell
              you so rather than take the engagement.
            </p>
            <p className="lead">
              The case for a boutique practice appears when the variables multiply — when your
              affairs span jurisdictions, when your privacy is not negotiable, when a business or a
              family is waiting on the outcome, or when the matter has already gone wrong somewhere
              else. At that point standardisation stops being efficiency and starts being risk. What
              follows is what changes when the model changes.
            </p>
          </div>
        </div>
      </Section>

      {/* ── The nine advantages ───────────────────────────────────────── */}
      <Section tone="mist">
        <SectionHeading
          eyebrow="USP & advantages"
          title="Nine structural differences"
          lead="Each of these is a consequence of the model, not a promise layered on top of it. That is precisely why a volume practice cannot simply match them."
        />

        <div className="mt-10 grid grid-cols-1 gap-px border border-line bg-line sm:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {advantages.map((a, i) => (
            <div key={a.title} className="bg-mist p-6 sm:p-8">
              <div className="mb-5 flex items-center justify-between sm:mb-6">
                <a.icon size={22} strokeWidth={1.25} className="text-gold" aria-hidden />
                <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="display-sm mb-2.5 text-navy sm:mb-3">{a.title}</h3>
              <p className="text-[13.5px] leading-relaxed text-navy/65 sm:text-sm">{a.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Side by side ──────────────────────────────────────────────── */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="Side by side"
          title="The two models, without the marketing"
          lead="Both are legitimate. They are simply built for different clients."
        />

        {/* Phones: one stacked card per dimension. A three-column table only
            fits here by scrolling sideways, which hides the comparison that is
            the entire point of the section. */}
        <div className="mt-10 flex flex-col gap-3 md:hidden">
          {comparison.map((row) => (
            <div key={row.dimension} className="border border-line">
              <p className="border-b border-line bg-mist px-5 py-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-navy">
                {row.dimension}
              </p>
              <div className="px-5 py-4">
                <p className="eyebrow mb-1.5 text-navy/35">Volume consultancy</p>
                <p className="text-[13.5px] leading-relaxed text-navy/45">{row.volume}</p>
              </div>
              <div className="border-t border-line border-l-[3px] border-l-gold px-5 py-4">
                <p className="eyebrow mb-1.5">Tide Global</p>
                <p className="text-[13.5px] leading-relaxed text-navy/80">{row.boutique}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 hidden overflow-x-auto md:block">
          <table className="w-full min-w-[46rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-line-strong">
                <th className="eyebrow py-4 pr-6 font-semibold">Dimension</th>
                <th className="eyebrow py-4 pr-6 font-semibold text-navy/40">
                  Volume consultancy
                </th>
                <th className="eyebrow py-4 font-semibold">Tide Global</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.dimension} className="border-b border-line align-top">
                  <td className="py-6 pr-6 font-sans text-sm font-semibold text-navy">
                    {row.dimension}
                  </td>
                  <td className="py-6 pr-6 text-sm leading-relaxed text-navy/45">{row.volume}</td>
                  <td className="py-6 text-sm leading-relaxed text-navy/80">{row.boutique}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ── Decide ────────────────────────────────────────────────────── */}
      <Section tone="navy">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-10">
          <SectionHeading
            eyebrow="Find out"
            title="The quickest way to know which you need is to ask us."
            lead="A confidential consultation, no obligation, and a candid answer — including if that answer is that your matter does not warrant a boutique practice."
            invert
          />
          <Button href="/book-consultation" variant="invert" className="w-full shrink-0 md:w-auto">
            Book a consultation
            <ArrowRight size={14} strokeWidth={1.5} />
          </Button>
        </div>
      </Section>
    </>
  );
}
