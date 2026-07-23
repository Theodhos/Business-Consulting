import type { Metadata } from "next";

import PageHero from "@/components/PageHero";
import { LegalArticle, type LegalClause } from "@/components/ui/Legal";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Tide Global Private Client Services collects, uses, protects and retains personal information, in line with the Protection of Personal Information Act, 2013.",
  robots: { index: true, follow: false },
};

const clauses: LegalClause[] = [
  {
    heading: "Who we are",
    body: [
      `${site.name} ${site.division} ("Tide Global", "we", "us") is a private client immigration advisory firm with its office at ${site.address.full}.`,
      `We are the responsible party for the personal information described in this policy. Questions about it, or about how your information is handled, should be directed to ${site.emails.privateClients}.`,
    ],
  },
  {
    heading: "Scope of this policy",
    body: [
      "This policy applies to personal information we collect through this website and through enquiries made to us by email, telephone or in person.",
      "Where you instruct the firm on a matter, the engagement letter and the confidentiality terms agreed with you govern the handling of your information. Where those terms and this policy differ, the engagement terms prevail.",
    ],
  },
  {
    heading: "Information we collect",
    body: [
      "Information you give us: your name, email address, telephone number, country of residence and the details of your circumstances that you choose to share in an enquiry, consultation request or newsletter subscription.",
      "Information relating to a matter: where you instruct us, the documentation and personal information necessary to advise on and conduct your matter. This will frequently include special personal information — identity documents, financial records and family details — collected only to the extent an application genuinely requires it.",
      "Technical information: standard server logs generated when you visit this site. We do not use advertising or cross-site tracking technologies on this website.",
    ],
  },
  {
    heading: "How we use it",
    body: [
      "To respond to your enquiry and arrange a consultation.",
      "To advise on, prepare and conduct a matter you have instructed us on, including submissions to the relevant authorities.",
      "To send you the briefings you have subscribed to, until you unsubscribe.",
      "To meet our legal, regulatory and record-keeping obligations.",
      "We do not sell your personal information, and we do not share it for anyone else's marketing.",
    ],
  },
  {
    heading: "Lawful basis",
    body: [
      "We process personal information where it is necessary to perform a contract with you, where processing is necessary to pursue a legitimate interest of yours or ours, where the law requires it, or where you have consented.",
      "Where processing rests on your consent — newsletter subscriptions, for example — you may withdraw it at any time without affecting anything done before you withdrew it.",
    ],
  },
  {
    heading: "Who we share it with",
    body: [
      "Government authorities and their agents, where a submission on your matter requires it.",
      "Professional counterparties instructed on your matter — for example translators, sworn officials, or foreign counsel — and then only what the specific task requires.",
      "Service providers who operate our systems under written confidentiality obligations and may not use your information for their own purposes.",
      "Access is limited to the people working on your matter. Discretion is how this practice is arranged, not a courtesy layered on top of it.",
    ],
  },
  {
    heading: "Cross-border transfers",
    body: [
      "Our clients and their affairs frequently span jurisdictions, so your information may be transferred outside South Africa — for instance where a document must be obtained or legalised abroad.",
      "Where we transfer personal information across borders, we do so only where the recipient is subject to a law, binding agreement or corporate rules affording protection substantially similar to the Protection of Personal Information Act, 2013, or where you have consented to the transfer.",
    ],
  },
  {
    heading: "Retention",
    body: [
      "Enquiries that do not proceed to an engagement are retained for up to 24 months and then deleted.",
      "Matter records are retained for the period required by law and by our professional obligations, and thereafter securely destroyed. Where an immigration status has ongoing renewal or conversion consequences, retention supports the continuity of your advice.",
    ],
  },
  {
    heading: "Security",
    body: [
      "We apply technical and organisational measures appropriate to the sensitivity of what we hold: access limited to the people working on your matter, encrypted storage and transmission, and structured case management so that your records are not scattered across personal inboxes.",
      "No system is beyond compromise. Where a breach affects your personal information, we will notify you and the Information Regulator as the Act requires.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "You may request access to the personal information we hold about you, request correction or deletion of information that is inaccurate, irrelevant, excessive or out of date, object to processing, and withdraw consent where processing rests on it.",
      `To exercise any of these, write to ${site.emails.privateClients}. We may need to verify your identity before we act, and some information must be retained where the law requires it.`,
      "You also have the right to complain to the Information Regulator of South Africa.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "We may update this policy as the practice or the law changes. The date above reflects the current version, and material changes will be brought to the attention of clients with active matters.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy Policy"
        title="What we hold, why we hold it, and who can see it."
        lead="Our clients come to us precisely because their affairs are private. This policy sets out how that principle is applied to your personal information."
        image="https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1600&auto=format&fit=crop"
      />

      <LegalArticle
        updated="16 July 2026"
        intro="Tide Global advises clients whose privacy is not negotiable. That commitment governs how we collect, use, protect and eventually destroy the personal information you entrust to us — and it applies from your first enquiry, whether or not you go on to instruct the firm."
        clauses={clauses}
      />
    </>
  );
}
