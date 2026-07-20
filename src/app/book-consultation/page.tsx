import type { Metadata } from "next";

import PageHero from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import EnquiryForm from "@/components/EnquiryForm";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Book a confidential consultation",
  description:
    "Request a confidential consultation with a Tide Global relationship manager. No obligation, no fee, and confidential from first contact.",
};

const expectations = [
  {
    t: "It costs nothing",
    d: "The initial consultation carries no fee and no obligation. Nothing is filed and no matter is opened.",
  },
  {
    t: "It is confidential",
    d: "From the moment your enquiry arrives, whether or not you go on to instruct the firm.",
  },
  {
    t: "It is candid",
    d: "If your objective is not achievable, or a volume consultancy would serve you just as well, you will be told.",
  },
  {
    t: "Within one business day",
    d: "A relationship manager will contact you to arrange a time that suits your schedule and time zone.",
  },
];

export default function BookConsultationPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a confidential consultation"
        title="Begin with a conversation, not a commitment."
        lead="A private discussion about what you are trying to achieve, what is realistically open to you, and whether this is the right firm to help you get there."
      />

      {/* ── Request ───────────────────────────────────────────────────── */}
      <Section tone="paper" divide={false}>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="What to expect"
              title="Four things you can count on."
            />

            <dl className="mt-12">
              {expectations.map(({ t, d }) => (
                <div key={t} className="border-t border-line py-6 first:border-t-0 first:pt-0">
                  <dt className="display-sm mb-2 text-navy">{t}</dt>
                  <dd className="text-sm leading-relaxed text-navy/65">{d}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-12 border border-line p-8">
              <p className="eyebrow mb-4">Prefer to call</p>
              <a
                href={site.phoneHref}
                className="font-display text-2xl text-navy transition-colors hover:text-gold"
              >
                {site.phone}
              </a>
              <p className="mt-3 text-xs text-navy/55">{site.hours}</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="border border-line p-8 md:p-10">
              <p className="eyebrow mb-4">Consultation request</p>
              <h2 className="display-md mb-8 text-navy">
                A few details, and we will take it from there.
              </h2>
              <EnquiryForm variant="consultation" />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
