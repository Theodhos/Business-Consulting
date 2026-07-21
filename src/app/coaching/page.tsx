import type { Metadata } from "next";

import PageHero from "@/components/PageHero";
import CoachingPageClient from "@/components/CoachingPageClient";

export const metadata: Metadata = {
  title: "Coaching",
  description:
    "Tide Global provides executive coaching and integration support for high-net-worth individuals and corporate leaders relocating to South Africa.",
};

export default function CoachingPage() {
  return (
    <>
      <PageHero
        eyebrow="Private Client Coaching"
        title="Securing residence is the baseline. Integration is the objective."
        lead="Our coaching practice prepares incoming executives and their families for the cultural, commercial, and operational nuances of the South African environment."
        image="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1600&auto=format&fit=crop"
      />
      <CoachingPageClient />
    </>
  );
}
