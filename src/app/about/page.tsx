import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import PageHero from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { mission, vision, values, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "About the firm",
  description:
    "Tide Global is a boutique private client immigration advisory firm in Johannesburg, founded to serve individuals for whom conventional immigration consultancy was never designed.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Tide Global"
        title="Founded to close a gap that the market had simply left open."
        lead="A boutique private client immigration advisory practice, headquartered in Johannesburg and built around a single conviction: sophisticated clients deserve advice, not administration."
      />

      {/* ── The gap ───────────────────────────────────────────────────── */}
      <Section tone="paper" divide={false}>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Why the firm exists" title="The observation behind Tide Global" />
          </div>

          <div className="space-y-6 lg:col-span-7">
            <p className="text-lg leading-relaxed text-navy/75">
              A significant number of affluent individuals possess every means to invest, relocate
              or establish themselves in South Africa. Very few possess the time, the specialist
              knowledge or the administrative capacity that the country&apos;s immigration
              legislation quietly assumes of them.
            </p>
            <p className="lead">
              That gap is not a knowledge problem that a longer FAQ would solve. It is a structural
              one. The immigration market is built for volume, and volume requires standardisation —
              standard questions, standard routes, standard timelines. It works, and for many
              applicants it is exactly right. But it cannot accommodate the client whose affairs are
              complex, whose privacy is not negotiable, and for whom a delayed approval is not an
              inconvenience but a cost measured in opportunity.
            </p>
            <p className="lead">
              Tide Global was established as an independent private immigration advisory firm
              dedicated exclusively to those clients. Not a department inside a larger consultancy.
              Not a premium tier of a standard service. A separate practice, with a separate model,
              serving discerning clients through a highly personalised, concierge-driven approach.
            </p>
          </div>
        </div>
      </Section>

      {/* ── Mission & vision ──────────────────────────────────────────── */}
      <Section tone="navy">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-6">Our mission</p>
            <p className="display-md text-paper">{mission}</p>
          </div>
          <div className="border-t border-line-invert pt-10 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
            <p className="eyebrow mb-6">Our vision</p>
            <p className="display-md text-paper">{vision}</p>
          </div>
        </div>
      </Section>

      {/* ── Values ────────────────────────────────────────────────────── */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="Company values"
          title="Ten words, and the discipline to mean them"
          lead="Values are worth nothing as a wall poster. These are the ones we are prepared to be measured against — including when it costs us the engagement."
        />

        <div className="mt-14 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {values.map((v, i) => (
            <div key={v} className="bg-paper p-6">
              <span className="eyebrow mb-4 block">{String(i + 1).padStart(2, "0")}</span>
              <p className="font-display text-xl text-navy">{v}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── The practice today ────────────────────────────────────────── */}
      <Section tone="mist">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="The practice"
              title="What that model looks like in daily practice"
            />
          </div>

          <div className="lg:col-span-7">
            <dl>
              {[
                {
                  t: "One named relationship manager",
                  d: "Your matter belongs to a person, not a queue. They know your file, your objectives and your constraints, and you can reach them directly.",
                },
                {
                  t: "Strategy before process",
                  d: "Every engagement opens with an assessment of every route genuinely open to you — and a written recommendation with the reasoning against the alternatives.",
                },
                {
                  t: "End-to-end coordination",
                  d: "Documents, verification, translation, legalisation, submission, follow-up and correspondence are carried by the firm. What reaches you is a decision, not an errand.",
                },
                {
                  t: "Technology where it belongs",
                  d: "Structured case management so nothing depends on memory. Judgement stays human; administration does not.",
                },
                {
                  t: "Confidentiality as structure",
                  d: "Discretion is not a promise we make, it is how the practice is arranged. Access to your matter is limited to the people working on it.",
                },
              ].map(({ t, d }) => (
                <div key={t} className="border-t border-line py-7 first:border-t-0 first:pt-0">
                  <dt className="display-sm mb-2 text-navy">{t}</dt>
                  <dd className="text-sm leading-relaxed text-navy/65">{d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* ── Where we are ──────────────────────────────────────────────── */}
      <Section tone="paper">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Headquarters"
              title="Johannesburg, and wherever your affairs are."
              lead="The firm is South African by specialisation and international by clientele. Most of our clients instruct us from abroad and the practice is built to run that way."
            />
            <Button href="/contact" variant="outline" className="mt-10">
              Contact the firm
              <ArrowRight size={14} strokeWidth={1.5} />
            </Button>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
              <div className="bg-paper p-8">
                <p className="eyebrow mb-4">Office</p>
                <address className="not-italic leading-relaxed text-navy/70">
                  {site.address.line1}
                  <br />
                  {site.address.city} {site.address.postal}
                  <br />
                  {site.address.country}
                </address>
              </div>
              <div className="bg-paper p-8">
                <p className="eyebrow mb-4">Private clients</p>
                <a
                  href={site.phoneHref}
                  className="block text-navy/70 transition-colors hover:text-gold"
                >
                  {site.phone}
                </a>
                <a
                  href={`mailto:${site.emails.privateClients}`}
                  className="mt-1 block break-all text-navy/70 transition-colors hover:text-gold"
                >
                  {site.emails.privateClients}
                </a>
                <p className="mt-4 text-xs text-navy/50">{site.hours}</p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
