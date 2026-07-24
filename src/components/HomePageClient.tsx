"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import JourneySection from "@/components/JourneySection";
import TestimonialSlider from "@/components/TestimonialSlider";
import StatsSection from "@/components/StatsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import HeroSlider from "@/components/HeroSlider";
import { advantages, services } from "@/lib/content";
import type { Article } from "@/lib/posts";
import { Container } from "@/components/ui/Section";

/* ─── Shared hook: fire animation once in viewport ──────────── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 1 — WHO WE ARE
═══════════════════════════════════════════════════════════════ */
function WhoWeAre() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="w-full bg-paper py-14 sm:py-20 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 sm:gap-14 lg:grid-cols-2 lg:gap-20">

          {/* LEFT — image collage */}
          <div
            className={[
              "grid grid-cols-2 gap-2.5 transition-all duration-1000 ease-out sm:gap-3",
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-y-6 md:translate-y-0 md:-translate-x-12",
            ].join(" ")}
          >
            <div className="flex flex-col gap-2.5 sm:gap-3">
              <div className="aspect-square overflow-hidden shadow-[0_20px_50px_rgba(26,58,92,0.15)]">
                <img src="/ph1.png" alt="Private client documents" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
              </div>
              <div className="aspect-square overflow-hidden shadow-[0_20px_50px_rgba(26,58,92,0.15)]">
                <img src="/ph2.png" alt="Corporate advisory" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            </div>
            <div className="relative overflow-hidden shadow-[0_20px_50px_rgba(26,58,92,0.15)]">
              <img
                src="/ph9.png"
                alt="Sandton skyline"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                style={{ objectPosition: "center top" }}
              />
              {/* Gold badge overlay */}
              <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 bg-gold px-3 py-1.5 sm:px-4 sm:py-2 shadow-lg">
                <p className="font-sans text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.22em] text-navy">Est. 2009</p>
              </div>
            </div>
          </div>

          {/* RIGHT — content */}
          <div
            className={[
              "flex flex-col gap-6 transition-all duration-1000 delay-200 ease-out sm:gap-7",
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-y-6 md:translate-y-0 md:translate-x-12",
            ].join(" ")}
          >
            <p className="eyebrow">Who we are</p>

            <div className="border-l-[3px] border-gold pl-5 sm:pl-6">
              <h2 className="font-display leading-[1.1]">
                <span className="block text-[clamp(1.6rem,6vw,2.6rem)] font-light text-navy/70">Not an immigration consultancy.</span>
                <span className="block text-[clamp(1.6rem,6vw,2.6rem)] font-bold text-navy">A Private Client Practice.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <p className="font-sans text-[14.5px] leading-[1.85] text-slate">
                Tide Global was founded on a straightforward observation: a great many people have the means to invest, relocate or establish themselves in South Africa — and almost none have the time or specialist knowledge the legislation demands.
              </p>
              <p className="font-sans text-[14.5px] leading-[1.85] text-slate">
                Conventional consultancies answer that with volume. We answer it with a boutique practice — a limited number of matters, each led by a named relationship manager, each advised on strategy before a single form is filed.
              </p>
            </div>

            <div className="mt-2 flex flex-col gap-6 border-t border-silver pt-6">
              {[
                {
                  title: "Specialist Guidance",
                  body: "Every matter is led by a named specialist with deep knowledge of South African residence legislation — not a generalist processing volume.",
                  icon: (
                    <svg className="h-9 w-9 shrink-0 text-gold transition-transform duration-500 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="6" /><path d="M9 12l2 2 4-4" /><path d="M6.26 18.01A9 9 0 0 0 21 12" /><path d="M3 12a9 9 0 0 0 3.26 6.93" />
                    </svg>
                  ),
                },
                {
                  title: "Absolute Discretion",
                  body: "Confidentiality from first contact onward. Your matter, your capital and your identity are protected at every stage of the engagement.",
                  icon: (
                    <svg className="h-9 w-9 shrink-0 text-gold transition-transform duration-500 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="0" /><path d="M9 9h6M9 13h6M9 17h4" /><path d="M3 7h18" />
                    </svg>
                  ),
                },
              ].map((feat) => (
                <div key={feat.title} className="group flex items-start gap-4 transition-transform duration-300 hover:translate-x-1 sm:gap-5">
                  {feat.icon}
                  <div className="min-w-0">
                    <h3 className="mb-1 font-sans text-[15px] font-semibold text-navy">{feat.title}</h3>
                    <p className="font-sans text-[13.5px] leading-relaxed text-slate">{feat.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="group mt-2 inline-flex w-full items-center justify-center gap-3 border border-navy px-7 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-navy transition-all duration-300 hover:bg-navy hover:text-white sm:w-fit sm:py-3.5 sm:tracking-[0.22em]"
            >
              About the practice
              <ArrowRight size={13} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>

        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 2 — WHAT WE DO (services grid)
═══════════════════════════════════════════════════════════════ */
function WhatWeDo() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="w-full bg-mist py-14 sm:py-20 lg:py-28 border-t border-silver/40">
      <Container>
        {/* Header row */}
        <div
          className={[
            "mb-9 grid grid-cols-1 gap-6 sm:mb-12 sm:gap-8 lg:grid-cols-[1fr_2fr] lg:items-end transition-all duration-1000 ease-out",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          ].join(" ")}
        >
          <div>
            <p className="eyebrow mb-4">What we do</p>
            <div className="border-l-[3px] border-gold pl-5 sm:pl-6">
              <h2 className="font-display leading-[1.1]">
                <span className="block text-[clamp(1.6rem,6vw,2.6rem)] font-light text-navy/70">Core</span>
                <span className="block text-[clamp(1.6rem,6vw,2.6rem)] font-bold text-navy">Practice Areas</span>
              </h2>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-end justify-between gap-5">
            <p className="max-w-lg font-sans text-[14.5px] leading-[1.85] text-slate">
              Boutique South African immigration advisory for high-net-worth individuals, investors and executives — where every matter is led by a named specialist.
            </p>
            <Link
              href="/services"
              className="group inline-flex shrink-0 items-center justify-center gap-3 border border-navy px-6 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-navy transition-all duration-300 hover:bg-navy hover:text-white sm:py-3 sm:tracking-[0.22em]"
            >
              View All
              <ArrowRight size={13} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>

        {/* Row 1: intro dark card + 2 service cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Dark intro card */}
          <div
            className={[
              "relative flex flex-col justify-between overflow-hidden bg-navy p-7 transition-all duration-1000 delay-100 ease-out sm:p-10",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            ].join(" ")}
          >
            {/* Corner accent */}
            <span className="absolute right-0 top-0 h-20 w-20 bg-gold/10" style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }} aria-hidden />
            <div>
              <span className="mb-6 block h-[2px] w-10 bg-gold" />
              <p className="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-gold/90 mb-4">South African Law</p>
              <p className="font-sans text-[14.5px] leading-relaxed text-white/65">
                Boutique South African immigration advisory — residence, work authorisation and remedy — each matter led by a named specialist.
              </p>
            </div>
            <Link href="/services" className="group mt-8 inline-flex items-center gap-3 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-gold transition-colors hover:text-white sm:mt-10 sm:tracking-[0.22em]">
              View All Services
              <ArrowRight size={14} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>

          {services.slice(0, 2).map((s, i) => (
            <div
              key={s.slug}
              className={[
                "group relative flex flex-col bg-paper p-6 border border-transparent transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(26,58,92,0.08)] hover:border-gold/20 sm:p-8",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              ].join(" ")}
              style={{ transitionDelay: inView ? `${(i + 2) * 100}ms` : "0ms" }}
            >
              <span className="absolute left-0 top-0 h-[3px] w-0 bg-gold transition-all duration-500 group-hover:w-full" aria-hidden />
              <s.icon size={40} strokeWidth={1.0} className="mb-5 text-gold transition-transform duration-500 group-hover:scale-110 sm:mb-6 sm:size-11" aria-hidden />
              <span className="mb-5 block h-px w-full bg-silver sm:mb-6" />
              <h3 className="font-display text-[1.2rem] font-semibold text-navy">{s.title}</h3>
              <p className="mt-3 font-sans text-[13.5px] leading-relaxed text-slate">{s.summary}</p>
              <Link href={`/services#${s.slug}`} className="group/lnk mt-auto pt-6 inline-flex items-center gap-2 font-sans text-[10.5px] font-semibold uppercase tracking-[0.18em] text-gold transition-colors hover:text-navy sm:tracking-[0.22em]">
                Learn More <ArrowRight size={12} strokeWidth={2} className="transition-transform duration-300 group-hover/lnk:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>

        {/* Row 2: 4 service cards */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.slice(2, 6).map((s, i) => (
            <div
              key={s.slug}
              className={[
                "group relative flex flex-col bg-paper p-6 border border-transparent transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(26,58,92,0.08)] hover:border-gold/20 sm:p-8",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              ].join(" ")}
              style={{ transitionDelay: inView ? `${(i + 4) * 80}ms` : "0ms" }}
            >
              <span className="absolute left-0 top-0 h-[3px] w-0 bg-gold transition-all duration-500 group-hover:w-full" aria-hidden />
              <s.icon size={40} strokeWidth={1.0} className="mb-5 text-gold transition-transform duration-500 group-hover:scale-110 sm:mb-6 sm:size-11" aria-hidden />
              <span className="mb-5 block h-px w-full bg-silver sm:mb-6" />
              <h3 className="font-display text-[1.15rem] font-semibold text-navy">{s.title}</h3>
              <p className="mt-3 font-sans text-[13px] leading-relaxed text-slate">{s.summary}</p>
              <Link href={`/services#${s.slug}`} className="group/lnk mt-auto pt-6 inline-flex items-center gap-2 font-sans text-[10.5px] font-semibold uppercase tracking-[0.18em] text-gold transition-colors hover:text-navy sm:tracking-[0.22em]">
                Learn More <ArrowRight size={12} strokeWidth={2} className="transition-transform duration-300 group-hover/lnk:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 3 — WHO WE SERVE (audience photo cards)
═══════════════════════════════════════════════════════════════ */
function WhoWeServe() {
  const { ref, inView } = useInView();
  const cards = [
    { title: "High-Net-Worth Individuals", body: "Residence solutions for the globally mobile, structured around existing affairs.", img: "/ph3.png", href: "/services#financial-independence" },
    { title: "Investors & Entrepreneurs", body: "Immigration that supports the commercial opportunity and its timetable.", img: "/ph4.png", href: "/services#business-visas" },
    { title: "Corporate Executives", body: "Executive relocation and the full family transition that comes with it.", img: "/ph6.png", href: "/services#executive-relocation" },
    { title: "Families & Affluent Retirees", body: "Long-horizon planning across generations and jurisdictions.", img: "/ph5.png", href: "/services#family-immigration" },
  ];

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="w-full bg-paper py-14 sm:py-20 lg:py-28 border-t border-silver/40">
      <Container>
        {/* 3-col header */}
        <div className={["mb-10 grid grid-cols-1 gap-8 sm:mb-14 sm:gap-10 md:grid-cols-3 md:items-end transition-all duration-1000 ease-out", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"].join(" ")}>
          <div>
            <span className="mb-4 inline-block border border-silver px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-navy sm:tracking-[0.24em]">Who We Serve</span>
            <h2 className="font-display text-[clamp(1.7rem,6vw,2.6rem)] font-bold leading-[1.1] text-navy">A select audience by specialist advisors.</h2>
          </div>
          <p className="font-sans text-[14.5px] leading-[1.85] text-slate sm:text-[15px] md:pt-10">
            High-net-worth individuals, investors and families for whom the cost of a delayed or misjudged application substantially exceeds the cost of advice.
          </p>
          <div className="flex justify-start md:justify-end">
            <div className="relative p-5 sm:p-6">
              <span className="absolute left-0 top-0 block h-5 w-5 border-l-2 border-t-2 border-gold" />
              <span className="absolute bottom-0 right-0 block h-5 w-5 border-b-2 border-r-2 border-gold" />
              <div className="flex items-center gap-4">
                <span className="font-display text-[3.2rem] font-bold leading-none text-navy sm:text-[4rem]">25+</span>
                <div className="flex flex-col">
                  <span className="font-sans text-[10.5px] font-bold uppercase tracking-[0.14em] text-navy sm:text-[11px] sm:tracking-[0.18em]">Years Combined</span>
                  <span className="font-sans text-[10.5px] font-bold uppercase tracking-[0.14em] text-gold sm:text-[11px] sm:tracking-[0.18em]">Specialist Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Photo cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {cards.map((card, i) => (
            <Link
              key={card.title}
              href={card.href}
              className={[
                "group relative flex min-h-[260px] flex-col justify-end overflow-hidden transition-all duration-700 ease-out sm:min-h-[340px]",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              ].join(" ")}
              style={{ transitionDelay: inView ? `${i * 100}ms` : "0ms" }}
            >
              <img src={card.img} alt={card.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-108" />
              <div className="absolute inset-0 transition-all duration-500" style={{ background: "linear-gradient(180deg, rgba(26,58,92,0.05) 0%, rgba(26,58,92,0.55) 50%, rgba(26,58,92,0.92) 100%)" }} />
              {/* Gold top bar on hover */}
              <span className="absolute left-0 top-0 h-[3px] w-0 bg-gold transition-all duration-500 group-hover:w-full" aria-hidden />
              <div className="relative z-10 p-5 sm:p-6">
                <h3 className="font-display text-[1.15rem] font-semibold text-white leading-snug">{card.title}</h3>
                <p className="mt-2 font-sans text-[13px] leading-relaxed text-white/75">{card.body}</p>
                <span className="mt-4 inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-gold transition-colors group-hover:text-white sm:tracking-[0.22em]">
                  <ArrowRight size={13} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1" />
                  Learn More
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-9 flex justify-center sm:mt-12">
          <Link href="/services" className="group inline-flex w-full items-center justify-center gap-4 bg-navy px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-gold hover:text-navy sm:w-auto sm:px-10 sm:tracking-[0.22em]">
            View More Services
            <ArrowRight size={14} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 4 — CTA BANNER (Private Client Residence Advisory)
═══════════════════════════════════════════════════════════════ */
function CtaBanner() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="w-full border-t border-silver/40 bg-paper">
      <Container>
        <div className={["grid grid-cols-1 lg:min-h-[420px] lg:grid-cols-2 transition-all duration-1000 ease-out", inView ? "opacity-100" : "opacity-0"].join(" ")}>
          {/* Left: content */}
          <div className={["flex flex-col justify-center px-0 py-14 sm:py-16 lg:py-20 lg:pr-16 transition-all duration-1000 ease-out", inView ? "translate-x-0" : "translate-y-6 md:translate-y-0 md:-translate-x-8"].join(" ")}>
            <p className="eyebrow mb-5 sm:mb-6">We are ready to help you</p>
            <div className="border-l-[3px] border-gold pl-5 sm:pl-6">
              <h2 className="font-display leading-[1.1]">
                <span className="block text-[clamp(1.7rem,6.4vw,2.8rem)] font-light text-navy/70">Private Client</span>
                <span className="block text-[clamp(1.7rem,6.4vw,2.8rem)] font-bold text-navy">Residence Advisory</span>
              </h2>
            </div>
            <p className="mt-6 max-w-md font-sans text-[14.5px] leading-[1.85] text-slate sm:mt-7 sm:text-[15px]">
              Our specialists advise high-net-worth individuals and families on South African residence — from financial independence permits to complex refused matters — with absolute discretion and a named relationship manager throughout.
            </p>
            <div className="mt-7 sm:mt-8">
              <Link href="/contact" className="group inline-flex w-full items-center justify-center gap-4 border border-navy px-7 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-navy transition-all duration-300 hover:bg-navy hover:text-white sm:w-auto sm:py-3.5 sm:tracking-[0.22em]">
                Contact Us
                <ArrowRight size={14} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>
          </div>
          {/* Right: photo — full-bleed band on phones, side panel from lg */}
          <div className={["relative -mx-5 min-h-[240px] overflow-hidden pb-0 sm:-mx-6 md:-mx-8 sm:min-h-[300px] lg:mx-0 lg:min-h-full transition-all duration-1000 delay-200 ease-out", inView ? "translate-x-0 opacity-100" : "translate-y-6 opacity-0 md:translate-y-0 md:translate-x-8"].join(" ")}>
            <img
              src="/ph7.png"
              alt="Corporate building"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-paper to-transparent lg:block" aria-hidden />
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 5 — WHY TIDE GLOBAL (advantages grid)
═══════════════════════════════════════════════════════════════ */
function WhyTideGlobal() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative w-full overflow-hidden bg-navy py-14 sm:py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} aria-hidden />
      <Container className="relative z-10">
        <div className={["mb-10 text-center transition-all duration-1000 ease-out sm:mb-14", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"].join(" ")}>
          <p className="eyebrow mb-4 text-gold/90">Why Tide Global</p>
          <div className="mx-auto w-fit border-l-[3px] border-gold pl-5 text-left sm:pl-6">
            <h2 className="font-display text-[clamp(1.7rem,6vw,2.9rem)] font-bold leading-[1.1] text-white">
              What the difference actually is
            </h2>
          </div>
          <p className="mx-auto mt-5 max-w-xl font-sans text-[14.5px] leading-[1.85] text-paper/65 sm:mt-6">
            Nine things a boutique practice can do that a volume consultancy structurally cannot.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px bg-white/10 md:grid-cols-2 lg:grid-cols-3">
          {advantages.map((a, i) => (
            <div
              key={a.title}
              className={[
                "group flex flex-col bg-charcoal p-6 transition-all duration-700 ease-out hover:bg-[#1e2e42] hover:-translate-y-1 sm:p-8",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              ].join(" ")}
              style={{ transitionDelay: inView ? `${i * 60}ms` : "0ms" }}
            >
              <a.icon size={24} strokeWidth={1.25} className="mb-4 text-gold transition-transform duration-500 group-hover:scale-110 sm:mb-5" aria-hidden />
              <h3 className="mb-2.5 font-sans text-[14px] font-semibold text-white sm:mb-3">{a.title}</h3>
              <p className="font-sans text-[13.5px] leading-relaxed text-white/65">{a.body}</p>
            </div>
          ))}
        </div>

        <div className={["mt-9 flex justify-center transition-all duration-1000 delay-500 ease-out sm:mt-12", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"].join(" ")}>
          <Link href="/why-tide-global" className="group inline-flex w-full items-center justify-center gap-3 border border-gold px-6 py-4 text-center font-sans text-[10.5px] font-semibold uppercase tracking-[0.16em] text-gold transition-all duration-300 hover:bg-gold hover:text-navy sm:w-auto sm:gap-4 sm:px-10 sm:text-[11px] sm:tracking-[0.22em]">
            Why discerning clients choose us
            <ArrowRight size={14} strokeWidth={2} className="shrink-0 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 6 — GLOBAL REACH (destination cards)
═══════════════════════════════════════════════════════════════ */
function GlobalReach() {
  const { ref, inView } = useInView();
  const destinations = [
    { country: "United Kingdom", desc: "High-net-worth clients relocating from London, advising on South African residence routes aligned to their existing structures.", img: "/ph1.png" },
    { country: "United States", desc: "US-based investors and entrepreneurs establishing South African residence alongside their global financial planning.", img: "/ph2.png" },
    { country: "United Arab Emirates", desc: "UAE residents and GCC nationals seeking South African permanent residence as a secondary base or investment destination.", img: "/ph3.png" },
    { country: "Australia & Canada", desc: "Clients from Commonwealth nations pursuing South African residence for lifestyle, business or family reasons.", img: "/ph4.png" },
  ];

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative w-full overflow-hidden border-t border-silver/40 bg-paper py-14 sm:py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(26,58,92,0.04),transparent_65%)]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-[center_60%] bg-no-repeat mix-blend-multiply max-md:hidden" style={{ backgroundImage: `url("/maps-overlay-scaled.webp")`, backgroundSize: "92%", opacity: 0.28 }} aria-hidden />

      <Container className="relative z-10">
        <div className={["mb-10 flex flex-col gap-6 sm:mb-14 md:flex-row md:items-end md:justify-between transition-all duration-1000 ease-out", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"].join(" ")}>
          <div>
            <p className="eyebrow mb-4 sm:mb-5">International markets</p>
            <div className="border-l-[3px] border-gold pl-5 sm:pl-6">
              <h2 className="font-display leading-[1.1]">
                <span className="block text-[clamp(1.6rem,6vw,2.8rem)] font-light text-navy/70">Advised from Sandton.</span>
                <span className="block text-[clamp(1.6rem,6vw,2.8rem)] font-bold text-navy">Instructed from Everywhere.</span>
              </h2>
            </div>
          </div>
          <Link href="/contact" className="group inline-flex shrink-0 items-center justify-center gap-3 border border-navy px-5 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-navy transition-all duration-300 hover:bg-navy hover:text-white sm:py-3 sm:tracking-[0.22em]">
            All Countries <ArrowRight size={13} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {destinations.map((dest, i) => (
            <Link
              key={dest.country}
              href="/contact"
              className={[
                "group flex flex-col border border-silver/40 bg-paper transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(26,58,92,0.08)] hover:border-silver/60",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              ].join(" ")}
              style={{ transitionDelay: inView ? `${i * 100}ms` : "0ms" }}
            >
              <div className="relative h-[165px] overflow-hidden sm:h-[185px]">
                <img src={dest.img} alt={dest.country} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0" />
                <span className="absolute left-0 bottom-0 h-[3px] w-0 bg-gold transition-all duration-500 group-hover:w-full" aria-hidden />
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="font-display text-[1.2rem] font-semibold text-navy">{dest.country}</h3>
                <span className="my-3.5 block h-px w-full bg-silver sm:my-4" />
                <p className="flex-1 font-sans text-[13px] leading-relaxed text-slate">{dest.desc}</p>
                <span className="relative mt-5 inline-flex w-fit items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-gold transition-colors group-hover:text-navy sm:tracking-[0.2em]">
                  Read More
                  <ArrowRight size={12} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1" />
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <p className={["mt-10 text-center font-sans text-[14px] leading-relaxed text-slate/80 transition-all duration-1000 delay-400 ease-out sm:mt-14", inView ? "opacity-100" : "opacity-0"].join(" ")}>
          Would you like to speak with one of our specialists?{" "}
          <Link href="/contact" className="font-semibold text-navy underline underline-offset-2 hover:text-gold">Contact Us Now.</Link>
        </p>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 7 — PASSPORT BANNER
═══════════════════════════════════════════════════════════════ */
function PassportBanner() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative w-full overflow-hidden">
      <img src="/ph8.png" alt="South African passport" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-[62%_50%]" />
      {/* Phones read a vertical scrim (the copy sits over the whole width);
          from md the original left-weighted horizontal one returns. */}
      <div className="absolute inset-0 md:hidden" style={{ background: "linear-gradient(180deg, rgba(18,26,38,0.88) 0%, rgba(18,26,38,0.80) 55%, rgba(18,26,38,0.72) 100%)" }} aria-hidden />
      <div className="absolute inset-0 hidden md:block" style={{ background: "linear-gradient(90deg, rgba(18,26,38,0.94) 0%, rgba(18,26,38,0.65) 45%, rgba(18,26,38,0.10) 100%)" }} aria-hidden />
      <Container className="relative z-10">
        <div
          className={[
            "flex max-w-2xl flex-col justify-center py-16 sm:py-20 md:min-h-[520px] md:py-24 transition-all duration-1000 ease-out",
            inView ? "opacity-100 translate-x-0" : "opacity-0 translate-y-6 md:translate-y-0 md:-translate-x-10",
          ].join(" ")}
        >
          <p className="eyebrow mb-5 text-paper/85 sm:mb-6">We provide the best service</p>
          <div className="border-l-[3px] border-gold pl-5 sm:pl-6">
            <h2 className="font-display leading-[1.08]">
              <span className="block text-[clamp(1.75rem,6.6vw,3.25rem)] font-light text-paper/90">We Provide The Best Way To</span>
              <span className="block text-[clamp(1.75rem,6.6vw,3.25rem)] font-bold text-white">Success Your Migration</span>
            </h2>
          </div>
          <p className="mt-6 max-w-md font-sans text-[14.5px] leading-[1.85] text-paper/75 sm:mt-7 sm:text-[15px] sm:leading-[1.9]">
            Dedicated private client support for residence, relocation and complex immigration matters. We lead with strategy, protect your time, and manage every stage with discretion.
          </p>
          <div className="mt-8 sm:mt-9">
            <Link href="/about" className="group inline-flex w-full items-center justify-center gap-4 border border-paper/70 px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-paper transition-all duration-300 hover:border-gold hover:bg-gold hover:text-navy sm:w-auto sm:tracking-[0.22em]">
              Learn About Us
              <ArrowRight size={14} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 8 — NEWS & ARTICLES
═══════════════════════════════════════════════════════════════ */
function NewsSection({ articles }: { articles: Article[] }) {
  const { ref, inView } = useInView();
  
  // Published posts first, then the articles that shipped with the site.
  const featuredArticle = articles.find((a) => a.featured) ?? articles[0];
  const standardArticles = articles.filter((a) => a.slug !== featuredArticle?.slug).slice(0, 2);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="w-full border-t border-silver/40 bg-paper pt-14 sm:pt-20 lg:pt-28">
      <Container>
        <div className={["mb-10 flex flex-col items-center text-center transition-all duration-1000 ease-out sm:mb-14", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"].join(" ")}>
          <p className="eyebrow mb-4 text-navy/80">The news</p>
          <h2 className="font-display text-[clamp(1.9rem,7vw,3.2rem)] font-light leading-[1.05] text-navy">
            News & <span className="font-bold text-navy">Articles</span>
          </h2>
          <span className="mt-6 block h-px w-14 bg-gold sm:mt-7" aria-hidden />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-12">
          {/* The feature runs first on phones — it is the strongest card and
              should not sit at the bottom of a stack. */}
          <article
            className={[
              "group relative min-h-[420px] overflow-hidden border border-silver/40 transition-all duration-1000 delay-300 ease-out sm:min-h-[500px] xl:order-2 xl:col-span-4",
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-y-6 md:translate-y-0 md:translate-x-8",
            ].join(" ")}
          >
            <img src={featuredArticle.image} alt={featuredArticle.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 transition-all duration-700 group-hover:opacity-90" style={{ background: "linear-gradient(180deg, rgba(26,58,92,0.06) 0%, rgba(26,58,92,0.32) 42%, rgba(26,58,92,0.92) 100%)" }} />
            <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-7 md:p-8">
              <p className="eyebrow mb-3 text-paper/80 sm:mb-4">Feature story</p>
              <h3 className="max-w-sm font-display text-[clamp(1.5rem,6vw,2.5rem)] font-bold leading-[1.06] text-white">{featuredArticle.title}</h3>
              <p className="mt-4 max-w-sm font-sans text-[13.5px] leading-[1.8] text-white/72 line-clamp-3 sm:mt-5 sm:text-[14px]">{featuredArticle.excerpt}</p>
              <Link href={`/articles/${featuredArticle.slug}`} className="group/btn mt-6 inline-flex items-center justify-center gap-3 border border-white/30 px-6 py-3.5 font-sans text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:border-gold hover:bg-gold hover:text-navy sm:mt-8 sm:w-fit sm:py-3 sm:tracking-[0.22em]">
                Read More <ArrowRight size={13} strokeWidth={2} className="transition-transform duration-300 group-hover/btn:translate-x-1.5" />
              </Link>
            </div>
          </article>

          <div className="flex flex-col gap-4 sm:gap-5 xl:order-1 xl:col-span-8">
            {standardArticles.map((post, i) => (
              <article
                key={post.title}
                className={[
                  "group grid flex-1 grid-cols-1 overflow-hidden border border-silver/40 bg-paper transition-all duration-700 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(26,58,92,0.08)] sm:grid-cols-[180px_minmax(0,1fr)] md:grid-cols-[200px_minmax(0,1fr)]",
                  inView ? "opacity-100 translate-x-0" : "opacity-0 translate-y-6 md:translate-y-0 md:-translate-x-8",
                ].join(" ")}
                style={{ transitionDelay: inView ? `${i * 150}ms` : "0ms" }}
              >
                <div className="relative min-h-[190px] overflow-hidden bg-silver sm:min-h-full">
                  <img src={post.image} alt={post.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute left-0 top-0 h-[3px] w-0 bg-gold transition-all duration-500 group-hover:w-full" aria-hidden />
                </div>
                <div className="flex min-w-0 flex-col justify-center p-5 sm:p-6 md:p-8">
                  <h3 className="max-w-md font-display text-[1.15rem] font-semibold leading-[1.25] text-navy transition-colors duration-300 group-hover:text-gold">{post.title}</h3>
                  <p className="mt-3 max-w-md font-sans text-[13.5px] leading-[1.8] text-slate line-clamp-2 sm:mt-4 sm:leading-[1.85]">{post.excerpt}</p>
                  <Link href={`/articles/${post.slug}`} className="mt-5 inline-flex items-center gap-2 font-sans text-[10.5px] font-semibold uppercase tracking-[0.18em] text-gold transition-colors group-hover:text-navy sm:mt-6 sm:tracking-[0.22em]">
                    Read More <ArrowRight size={13} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN HOME PAGE EXPORT
═══════════════════════════════════════════════════════════════ */
export default function HomePageClient({ articles }: { articles: Article[] }) {
  return (
    <>
      <HeroSlider />
      <WhoWeAre />
      <WhatWeDo />
      <CtaBanner />
      <WhoWeServe />
      <JourneySection />
      <WhyTideGlobal />
      <TestimonialSlider />
      <StatsSection />
      <WhyChooseUs />
      <GlobalReach />
      <PassportBanner />
      <NewsSection articles={articles} />
    </>
  );
}
