import type { Metadata } from "next";

import PageHero from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import EnquiryForm from "@/components/EnquiryForm";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Tide Global Private Client Services in Johannesburg — direct lines, private client email and confidential enquiries.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Reach the firm directly."
        lead="Every enquiry is confidential from the moment it arrives, whether or not you go on to instruct us. You will hear back within one business day."
        image="/asian-call-operator-working-at-desk-e1617160474474.webp"
      />

      {/* ── Enquiry ───────────────────────────────────────────────────── */}
      <Section tone="paper" divide={false}>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Send an enquiry"
              title="Tell us what you are trying to achieve."
              lead="A few details are enough to begin. Your enquiry reaches a relationship manager, not a queue."
            />

            <dl className="mt-12 space-y-8">
              <div>
                <dt className="eyebrow mb-3">Telephone</dt>
                <dd>
                  <a
                    href={site.phoneHref}
                    className="font-display text-2xl text-navy transition-colors hover:text-gold"
                  >
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow mb-3">Office</dt>
                <dd>
                  <address className="not-italic leading-relaxed text-navy/70">
                    {site.address.line1}
                    <br />
                    {site.address.city} {site.address.postal}
                    <br />
                    {site.address.country}
                  </address>
                </dd>
              </div>
              <div>
                <dt className="eyebrow mb-3">Hours</dt>
                <dd className="text-navy/70">{site.hours}</dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-7">
            <div className="border border-line p-8 md:p-10">
              <EnquiryForm variant="contact" />
            </div>
          </div>
        </div>
      </Section>

      {/* ── Find us — map ─────────────────────────────────────────────── */}
      <Section tone="mist">
        <SectionHeading
          eyebrow="Find us"
          title="Where the firm is based"
          lead="Our offices are in Johannesburg. Most clients instruct us remotely, but you are welcome by appointment."
        />

        <div className="mt-14 overflow-hidden border border-line">
          <iframe
            title={`${site.name} — office location`}
            src="https://maps.google.com/maps?q=173%20Oxford%20Road%2C%20Johannesburg%2C%20South%20Africa&t=&z=14&ie=UTF8&iwloc=&output=embed"
            className="block h-[420px] w-full md:h-[520px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <p className="mt-6 font-sans text-[13.5px] leading-relaxed text-navy/60">
          {site.address.line1}, {site.address.city} {site.address.postal}, {site.address.country}
        </p>
      </Section>
    </>
  );
}
