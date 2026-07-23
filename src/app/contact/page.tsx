import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactPageClient from "@/components/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Tide Global Private Client Services in Sandton — direct lines, private client email and confidential enquiries.",
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
      <ContactPageClient />
    </>
  );
}
