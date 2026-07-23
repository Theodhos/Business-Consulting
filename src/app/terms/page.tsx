import type { Metadata } from "next";

import PageHero from "@/components/PageHero";
import { LegalArticle, type LegalClause } from "@/components/ui/Legal";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms governing use of the Tide Global Private Client Services website.",
  robots: { index: true, follow: false },
};

const clauses: LegalClause[] = [
  {
    heading: "These terms",
    body: [
      `This website is operated by ${site.name} ${site.division}, of ${site.address.full}.`,
      "By accessing or using this website you agree to these terms. If you do not agree to them, please do not use the site.",
    ],
  },
  {
    heading: "No advice, and no relationship",
    body: [
      "Everything on this website is general information about the firm and its practice areas. It is not immigration, legal, tax or financial advice, and it is not a substitute for advice on your own circumstances.",
      "Immigration outcomes turn on facts specific to the individual and on the law and published policy as they stand at the time. Nothing here should be relied on as applying to your matter.",
      "Using this site, submitting an enquiry or attending an initial consultation does not create a professional relationship with the firm. That relationship begins only when we have agreed the engagement and its fees with you in writing.",
    ],
  },
  {
    heading: "Enquiries and confidentiality",
    body: [
      "We treat enquiries as confidential from the moment they reach us, whether or not you go on to instruct the firm. How your information is handled is set out in our Privacy Policy.",
      "You should nevertheless not send highly sensitive documents through this website's forms before an engagement is agreed. Your relationship manager will provide a secure channel for them.",
    ],
  },
  {
    heading: "No guaranteed outcome",
    body: [
      "The decision on any application rests with the relevant authority. Neither this firm nor any other can guarantee an outcome or a processing time, and any content on this site that describes timelines or eligibility is indicative only.",
    ],
  },
  {
    heading: "Accuracy and availability",
    body: [
      "We take care to keep this site accurate and current, but immigration legislation and published policy change, sometimes with little notice. We make no warranty that the content is complete or up to date at the moment you read it.",
      "We do not warrant that the site will be uninterrupted or error-free, and we may change, suspend or withdraw any part of it without notice.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      "All content on this site — text, design, graphics, marks and the arrangement of them — belongs to Tide Global or is used with permission, and is protected by copyright and trade mark law.",
      "You may view and print pages for your own personal, non-commercial use. Any other reproduction, distribution or republication requires our prior written permission.",
    ],
  },
  {
    heading: "External links",
    body: [
      "Where we link to third-party sites, we do so for convenience. We do not control them, do not endorse them, and are not responsible for their content or their handling of your information.",
    ],
  },
  {
    heading: "Limitation of liability",
    body: [
      "To the fullest extent permitted by law, Tide Global is not liable for any loss or damage arising from your use of, or reliance on, this website or its content.",
      "Nothing in these terms excludes or limits liability that cannot lawfully be excluded or limited, including under the Consumer Protection Act, 2008 where it applies to you.",
    ],
  },
  {
    heading: "Governing law",
    body: [
      "These terms are governed by the law of the Republic of South Africa, and the South African courts have jurisdiction over any dispute arising from them or from your use of this site.",
    ],
  },
  {
    heading: "Contact",
    body: [
      `Questions about these terms may be sent to ${site.emails.general}, or to ${site.address.full}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Terms of Use"
        title="The terms on which this site is offered."
        lead="Short, and worth reading — particularly the part explaining that nothing here is advice on your own matter."
        image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&auto=format&fit=crop"
      />

      <LegalArticle
        updated="16 July 2026"
        intro="This website exists to introduce the firm and its practice. It does not advise you, and it does not make you a client. These terms set out that boundary, along with the ordinary matters of copyright, accuracy and liability that govern your use of the site."
        clauses={clauses}
      />
    </>
  );
}
