import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import PageHero from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { services, audiences, professions } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Eleven core practice areas across South African residence, work authorisation and remedy — advised for high-net-worth individuals, investors, executives and families.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Core practice areas"
        title="Eleven practice areas. One standard of advice."
        lead="South African residence, work authorisation and remedy. Each matter is led by a specialist and coordinated end to end by your relationship manager."
      />

      {/* ── The eleven ────────────────────────────────────────────────── */}
      <Section tone="paper" divide={false}>
        <SectionHeading
          eyebrow="What we advise on"
          title="The practice in full"
          lead="Several of these routes may be open to you at once, and they are not equivalent in duration, evidentiary burden or risk. Choosing correctly before anything is filed is the advisory work."
        />

        <div className="mt-16">
          {services.map((s, i) => (
            <article
              key={s.slug}
              id={s.slug}
              className="grid scroll-mt-32 grid-cols-1 gap-8 border-t border-line py-12 lg:grid-cols-12 lg:gap-16"
            >
              <div className="lg:col-span-4">
                <div className="flex items-start gap-5">
                  <span className="eyebrow mt-2 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <s.icon size={22} strokeWidth={1.25} className="mb-5 text-gold" aria-hidden />
                    <h2 className="display-md text-navy">{s.title}</h2>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 lg:pt-2">
                <p className="mb-5 text-lg leading-relaxed text-navy/75">{s.summary}</p>
                <p className="text-sm leading-relaxed text-navy/60">{s.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ── Who instructs us ──────────────────────────────────────────── */}
      <Section tone="mist">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Private client profiles"
              title="Who these services are built for"
              lead="A select audience of individuals, families, executives and investors who value precision, confidentiality and a strategy tailored to their circumstances."
            />
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
              {audiences.map((a) => (
                <div key={a.title} className="bg-mist p-6">
                  <h3 className="mb-2 font-sans text-sm font-semibold text-navy">{a.title}</h3>
                  <p className="text-xs leading-relaxed text-navy/60">{a.body}</p>
                </div>
              ))}
            </div>

            <p className="eyebrow mb-4 mt-10">Typically</p>
            <p className="text-base leading-relaxed text-navy/70">{professions.join(" · ")}</p>
          </div>
        </div>
      </Section>

      {/* ── Next step ─────────────────────────────────────────────────── */}
      <Section tone="paper">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="The next step"
            title="Which route is right is not a question you should answer alone."
            lead="A confidential consultation costs you nothing and commits you to nothing. If we do not believe your application should succeed, we will tell you before you spend money on it."
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
