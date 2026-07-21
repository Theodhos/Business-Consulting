"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, UserCheck, Lightbulb, Lock, Award, ChevronDown } from "lucide-react";
import { services, audiences, professions } from "@/lib/content";
import { Container } from "@/components/ui/Section";

/* ─── Hook: trigger animation once element enters viewport ──── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── Animated service card (alternating layout) ──────────── */
const SERVICE_IMAGES = [
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1450101499163-c8848c66cb85?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=900&auto=format&fit=crop",
];

function ServiceRow({ service, index }: { service: typeof services[number]; index: number }) {
  const { ref, inView } = useInView();
  const isEven = index % 2 === 0;
  const imgSrc = SERVICE_IMAGES[index] ?? SERVICE_IMAGES[0];

  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      id={service.slug}
      className="scroll-mt-32 border-b border-silver/40 last:border-0"
    >
      <div
        className={[
          "grid grid-cols-1 lg:grid-cols-2 items-stretch transition-all duration-1000 ease-out",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        ].join(" ")}
      >
        {/* Image side */}
        <div
          className={[
            "relative overflow-hidden min-h-[340px] lg:min-h-[440px]",
            isEven ? "lg:order-1" : "lg:order-2",
          ].join(" ")}
        >
          <img
            src={imgSrc}
            alt={service.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[8000ms] ease-out hover:scale-110"
          />
          {/* Navy overlay with gold accent corner */}
          <div
            className="absolute inset-0"
            style={{
              background: isEven
                ? "linear-gradient(135deg, rgba(26,58,92,0.80) 0%, rgba(26,58,92,0.30) 60%, transparent 100%)"
                : "linear-gradient(225deg, rgba(26,58,92,0.80) 0%, rgba(26,58,92,0.30) 60%, transparent 100%)",
            }}
          />
          {/* Index numeral watermark */}
          <span
            className="absolute bottom-6 right-8 font-display text-[5rem] font-bold leading-none text-white/10 select-none"
            aria-hidden
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          {/* Gold corner accent */}
          <span
            className={[
              "absolute top-0 h-16 w-16 bg-gold",
              isEven ? "left-0 clip-triangle-tl" : "right-0 clip-triangle-tr",
            ].join(" ")}
            style={{
              clipPath: isEven ? "polygon(0 0, 100% 0, 0 100%)" : "polygon(100% 0, 0 0, 100% 100%)",
            }}
            aria-hidden
          />
          {/* Icon badge */}
          <div className={["absolute top-6 flex h-14 w-14 items-center justify-center bg-gold", isEven ? "left-0" : "right-0"].join(" ")}>
            <service.icon size={24} strokeWidth={1.25} className="text-navy" />
          </div>
        </div>

        {/* Content side */}
        <div
          className={[
            "flex flex-col justify-center bg-paper px-8 py-14 lg:px-14 lg:py-16",
            isEven ? "lg:order-2" : "lg:order-1",
          ].join(" ")}
        >
          {/* Step tag */}
          <span className="mb-6 inline-block font-sans text-[10.5px] font-bold uppercase tracking-[0.28em] text-gold">
            Practice Area {String(index + 1).padStart(2, "0")}
          </span>

          {/* Title with gold left border */}
          <div className="border-l-[3px] border-gold pl-6">
            <h2 className="font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-bold leading-[1.1] text-navy">
              {service.title}
            </h2>
          </div>

          {/* Hairline rule */}
          <span className="my-6 block h-px w-10 bg-gold" />

          {/* Summary */}
          <p className="font-sans text-[15.5px] leading-[1.85] text-navy/75">
            {service.summary}
          </p>

          {/* Detail paragraph */}
          <p className="mt-4 font-sans text-[13.5px] leading-[1.85] text-slate">
            {service.detail}
          </p>

          {/* CTA link */}
          <Link
            href="/contact"
            className="group mt-9 inline-flex w-fit items-center gap-3 border border-navy px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-navy transition-all duration-300 hover:bg-navy hover:text-white"
          >
            Enquire Now
            <ArrowRight size={13} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ─── Engagement includes — 4 animated cards ─────────────── */
const engagementIncludes = [
  {
    icon: UserCheck,
    title: "A named relationship manager",
    body: "One specialist owns your matter end to end — reachable directly, never a queue.",
  },
  {
    icon: Lightbulb,
    title: "Strategy before a form is filed",
    body: "A written strategy: the recommended route, the reasoning against the alternatives and a realistic timeline.",
  },
  {
    icon: Lock,
    title: "Absolute confidentiality",
    body: "Discretion is structural. Access to your matter is limited to the people working on it.",
  },
  {
    icon: Award,
    title: "Specialist-led throughout",
    body: "Advised by people who work on South African immigration law daily, not occasionally.",
  },
];

/* ─── Audience grid ──────────────────────────────────────── */
function AudienceSection() {
  const { ref, inView } = useInView();
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="w-full border-t border-silver/40 bg-paper py-20 lg:py-28"
    >
      <Container>
        <div className="mb-16 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-end">
          <div
            className={[
              "transition-all duration-1000 ease-out",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            ].join(" ")}
          >
            <p className="eyebrow mb-5">Private client profiles</p>
            <div className="border-l-[3px] border-gold pl-6">
              <h2 className="font-display leading-[1.1]">
                <span className="block text-[clamp(1.8rem,3vw,2.8rem)] font-light text-navy/70">Who these services</span>
                <span className="block text-[clamp(1.8rem,3vw,2.8rem)] font-bold text-navy">are built for</span>
              </h2>
            </div>
            <p className="mt-6 max-w-md font-sans text-[14.5px] leading-[1.85] text-slate">
              A select audience of individuals, families, executives and investors who value precision, confidentiality and a strategy tailored to their circumstances.
            </p>
          </div>

          {/* Profession tags */}
          <div
            className={[
              "transition-all duration-1000 delay-200 ease-out",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            ].join(" ")}
          >
            <p className="eyebrow mb-4">Typically</p>
            <div className="flex flex-wrap gap-2.5">
              {professions.map((p) => (
                <span
                  key={p}
                  className="border border-silver px-4 py-2 font-sans text-[12px] font-medium tracking-wide text-navy/75 transition-all duration-300 hover:border-gold hover:bg-gold/5 hover:text-navy cursor-default"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Audience cards grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a, i) => (
            <div
              key={a.title}
              className={[
                "group relative flex flex-col bg-mist p-7 border border-transparent transition-all duration-700 ease-out hover:-translate-y-2 hover:bg-white hover:border-silver/40 hover:shadow-[0_20px_40px_rgba(26,58,92,0.07)]",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              ].join(" ")}
              style={{ transitionDelay: inView ? `${i * 80}ms` : "0ms" }}
            >
              {/* Gold top border reveal on hover */}
              <span className="absolute left-0 top-0 h-[3px] w-0 bg-gold transition-all duration-500 group-hover:w-full" aria-hidden />
              <a.icon size={28} strokeWidth={1.2} className="mb-4 text-gold transition-transform duration-500 group-hover:scale-110" aria-hidden />
              <h3 className="mb-2 font-display text-[1.15rem] font-semibold leading-snug text-navy">{a.title}</h3>
              <p className="font-sans text-[13px] leading-relaxed text-slate">{a.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ─── Engagement standards — dark navy section ───────────── */
function EngagementSection() {
  const { ref, inView } = useInView();
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative w-full overflow-hidden bg-navy pt-20 lg:pt-28 pb-32 lg:pb-48"
    >
      {/* Subtle noise/texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
        aria-hidden
      />
      <Container className="relative z-10">
        <div
          className={[
            "mb-16 text-center transition-all duration-1000",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          ].join(" ")}
        >
          <p className="eyebrow mb-4 text-gold/90">One standard of advice</p>
          <h2 className="font-display text-[clamp(1.9rem,3vw,2.9rem)] font-bold leading-[1.1] text-white">
            What every engagement includes
          </h2>
          <span className="mx-auto mt-6 block h-[2px] w-10 bg-gold" />
          <p className="mx-auto mt-6 max-w-xl font-sans text-[14.5px] leading-[1.85] text-paper/70">
            Whichever of the eleven routes applies to you, the depth of advice and the way your matter is run do not change.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {engagementIncludes.map((f, i) => (
            <div
              key={f.title}
              className={[
                "group flex flex-col bg-charcoal p-8 transition-all duration-700 ease-out hover:bg-[#1e2e42] hover:-translate-y-1",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              ].join(" ")}
              style={{ transitionDelay: inView ? `${i * 100}ms` : "0ms" }}
            >
              <f.icon
                size={30}
                strokeWidth={1.25}
                className="mb-5 text-gold transition-transform duration-500 group-hover:scale-110"
                aria-hidden
              />
              <h3 className="mb-3 font-display text-[1.15rem] font-semibold leading-snug text-white">{f.title}</h3>
              <p className="font-sans text-[13.5px] leading-relaxed text-paper/65">{f.body}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className={[
            "mt-14 flex justify-center transition-all duration-1000 delay-400",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          ].join(" ")}
        >
          <Link
            href="/faq"
            className="group inline-flex items-center gap-4 border border-gold px-10 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-gold transition-all duration-300 hover:bg-gold hover:text-navy"
          >
            Read Frequently Asked Questions
            <ArrowRight size={14} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

/* ─── Quick nav / accordion for mobile ───────────────────── */
function ServiceNav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="sticky top-[72px] z-40 w-full border-b border-silver/40 bg-paper/95 backdrop-blur-md">
      <Container>
        {/* Mobile toggle */}
        <button
          className="flex w-full items-center justify-between py-3 lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-navy">Jump to practice area</span>
          <ChevronDown
            size={16}
            strokeWidth={2}
            className={["text-gold transition-transform duration-300", open ? "rotate-180" : ""].join(" ")}
          />
        </button>

        {/* Desktop row */}
        <div className={["hidden-sm gap-1 py-2 lg:flex lg:flex-wrap", open ? "flex flex-wrap py-3" : "hidden"].join(" ")}>
          {services.map((s, i) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 font-sans text-[11px] font-medium tracking-wide text-slate transition-colors hover:text-gold"
            >
              <span className="text-[9px] font-bold text-gold/60">{String(i + 1).padStart(2, "0")}</span>
              {s.title}
            </a>
          ))}
        </div>
      </Container>
    </div>
  );
}

/* ─── Main export ─────────────────────────────────────────── */
export default function ServicesPage() {
  return (
    <>
      <ServiceNav />

      {/* ── All eleven services, alternating layout ──── */}
      <section className="w-full bg-paper">
        {services.map((s, i) => (
          <ServiceRow key={s.slug} service={s} index={i} />
        ))}
      </section>

      {/* ── Who we serve ───────────────────────────── */}
      <AudienceSection />

      {/* ── Engagement standard — navy ─────────────── */}
      <EngagementSection />
    </>
  );
}
