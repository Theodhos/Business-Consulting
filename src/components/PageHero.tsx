import React from "react";
import { Container } from "./ui/Section";

/**
 * Every page below the homepage opens with this and nothing else — same height,
 * same ground, same type. The homepage has its own taller hero; this is the
 * quiet version for everything after it.
 */
export default function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <section className="w-full bg-ink pb-20 pt-40 md:pb-24 md:pt-48">
      <Container>
        <p className="eyebrow mb-6">{eyebrow}</p>
        <h1 className="display-lg max-w-3xl text-paper">{title}</h1>
        {lead && <p className="lead mt-7 max-w-2xl text-paper/60">{lead}</p>}
        <span className="mt-10 block h-px w-14 bg-gold" aria-hidden />
      </Container>
    </section>
  );
}
