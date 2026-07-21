import type { Metadata } from "next";

import PageHero from "@/components/PageHero";
import ServicesPage from "@/components/ServicesPage";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Eleven core practice areas across South African residence, work authorisation and remedy — advised for high-net-worth individuals, investors, executives and families.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Core practice areas"
        title="Eleven practice areas. One standard of advice."
        lead="South African residence, work authorisation and remedy. Each matter is led by a specialist and coordinated end to end by your relationship manager."
        image="/businessman-cupped-his-hands-blue-tone.jpg"
      />
      <ServicesPage />
    </>
  );
}
