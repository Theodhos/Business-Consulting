import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import PageHero from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { journey } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Private Client Experience",
  description:
    "How a Tide Global engagement runs — six stages from confidential enquiry to long after approval, each led by a dedicated relationship manager.",
};

export default function ExperiencePage() {
  return (
    <>
      <PageHero
        eyebrow="The private client experience"
        title="What it is actually like to be a client here."
        lead="Six stages, one relationship manager, and a defined rhythm of contact. You should never have to ask where your matter stands."
      />

      {/* ── The premise ───────────────────────────────────────────────── */}
      <Section tone="paper" divide={false}>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="The premise" title="Concierge is not a synonym for attentive." />
          </div>

          <div className="space-y-6 lg:col-span-7">
            <p className="text-lg leading-relaxed text-navy/75">
              A concierge does not simply respond quickly when you ask. A concierge removes the need
              for you to ask at all.
            </p>
            <p className="lead">
              That is the operating standard here. Your relationship manager holds the file, tracks
              every deadline, chases every counterparty and drives the matter forward whether or not
              you are thinking about it. Correspondence is drafted for you, not sent to you as a
              task. Documents are obtained on your behalf where they can be. What actually reaches
              you is the short list of things that genuinely require your judgement — and when
              nothing has moved, you are told that too, on schedule, rather than left to wonder.
            </p>
          </div>
        </div>
      </Section>

      {/* ── The six stages ────────────────────────────────────────────── */}
      <Section tone="mist">
        <SectionHeading
          eyebrow="The journey"
          title="Six stages, start to well beyond finish"
          lead="Every engagement follows the same architecture. What changes between clients is the strategy inside it, never the standard of care around it."
        />

        <ol className="mt-16">
          {journey.map((step, i) => (
            <li
              key={step.title}
              className="grid grid-cols-1 gap-8 border-t border-line py-12 lg:grid-cols-12 lg:gap-16"
            >
              <div className="lg:col-span-4">
                <div className="flex items-baseline gap-5">
                  <span className="font-display text-5xl font-light text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="display-md text-navy">{step.title}</h2>
                </div>
              </div>
              <div className="lg:col-span-8">
                <p className="text-lg leading-relaxed text-navy/75">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── What you can expect ───────────────────────────────────────── */}
      <Section tone="navy">
        <SectionHeading
          eyebrow="Our undertakings"
          title="What you can hold us to"
          lead="Service standards are only meaningful if they are specific enough to fail. These are."
          invert
        />

        <div className="mt-14 grid grid-cols-1 gap-px border border-line-invert bg-[rgba(255,255,255,0.16)] md:grid-cols-2">
          {[
            {
              t: "A response within one business day",
              d: "To any enquiry, from the first one onward — including the ones that arrive before you are a client.",
            },
            {
              t: "A named person, not a queue",
              d: "You will not be re-explaining your circumstances to someone new each time you make contact.",
            },
            {
              t: "Updates without being asked",
              d: "On a defined rhythm agreed at the outset, whether or not there is news. Silence is not a status.",
            },
            {
              t: "Fees agreed in writing first",
              d: "Quoted for your specific matter after the assessment, with disbursements itemised separately. No surprises mid-matter.",
            },
            {
              t: "A candid assessment",
              d: "If your application should not succeed, or a cheaper provider would serve you just as well, we will say so before you commit.",
            },
            {
              t: "Confidentiality without exception",
              d: "From first contact, whether or not you instruct us, and limited to the people working on your matter.",
            },
          ].map(({ t, d }) => (
            <div key={t} className="bg-ink p-8">
              <h3 className="display-sm mb-3 text-paper">{t}</h3>
              <p className="text-sm leading-relaxed text-paper/55">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Begin ─────────────────────────────────────────────────────── */}
      <Section tone="paper">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Stage one"
            title="It begins with a conversation, and nothing more than that."
            lead="No obligation, no fee and no file opened. Just a private discussion about what you are trying to achieve and whether we are the right firm to help you achieve it."
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
