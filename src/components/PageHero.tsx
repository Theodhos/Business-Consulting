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
  image,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  /** Optional background photo. When set, a navy scrim keeps the type crisp. */
  image?: string;
}) {
  return (
    <section className="relative w-full overflow-hidden bg-ink pb-14 pt-32 md:pb-24 md:pt-48">
      {image && (
        <>
          <img
            src={image}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          {/* Left-weighted navy scrim so the heading and lead stay highly legible */}
          <div
            className="absolute inset-0 backdrop-blur-[2px]"
            style={{
              background:
                "linear-gradient(90deg, rgba(26,58,92,0.98) 0%, rgba(26,58,92,0.92) 60%, rgba(26,58,92,0.70) 100%)",
            }}
            aria-hidden
          />
        </>
      )}
      <Container className="relative z-10">
        <p className="eyebrow mb-4 md:mb-6">{eyebrow}</p>
        <h1 className="font-display font-bold text-paper leading-[1.1] text-[clamp(1.8rem,5vw,3.25rem)] max-w-3xl">{title}</h1>
        {lead &&
          (image ? (
            <p className="mt-5 md:mt-7 max-w-2xl font-sans text-[14px] md:text-[15.5px] leading-[1.85] text-paper/90">
              {lead}
            </p>
          ) : (
            <p className="lead mt-5 md:mt-7 max-w-2xl text-paper/60">{lead}</p>
          ))}
        <span className="mt-8 md:mt-10 block h-px w-14 bg-gold" aria-hidden />
      </Container>
    </section>
  );
}

