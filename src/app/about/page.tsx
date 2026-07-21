import type { Metadata } from "next";

import PageHero from "@/components/PageHero";
import AboutPageClient from "@/components/AboutPageClient";

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
        image="/ph9.png"
      />
      <AboutPageClient />
    </>
  );
}
