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

const directLines = [
  {
    label: "Private clients",
    email: site.emails.privateClients,
    note: "Confidential enquiries and existing matters. Answered within one business day.",
  },
  {
    label: "General enquiries",
    email: site.emails.general,
    note: "Anything that is not a client matter.",
  },
  {
    label: "Office of the CEO",
    email: site.emails.ceo,
    note: "Escalations, partnerships and press.",
  },
  {
    label: "Client support",
    email: site.emails.support,
    note: "Portal access and document questions.",
  },
  {
    label: "Accounts",
    email: site.emails.accounts,
    note: "Invoicing, disbursements and payment.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Reach the firm directly."
        lead="Every enquiry is confidential from the moment it arrives, whether or not you go on to instruct us. You will hear back within one business day."
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

      {/* ── Direct lines ──────────────────────────────────────────────── */}
      <Section tone="mist">
        <SectionHeading
          eyebrow="Direct lines"
          title="Reach the right desk first time"
          lead="Each of these is monitored by the people it belongs to, so a message sent to the right one is a message that moves faster."
        />

        <div className="mt-14 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {directLines.map((d) => (
            <div key={d.email} className="bg-mist p-8">
              <p className="eyebrow mb-4">{d.label}</p>
              <a
                href={`mailto:${d.email}`}
                className="block break-all font-sans text-sm font-medium text-navy transition-colors hover:text-gold"
              >
                {d.email}
              </a>
              <p className="mt-3 text-xs leading-relaxed text-navy/55">{d.note}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
