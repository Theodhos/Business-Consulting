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
    <section ref={ref as React.RefObject<HTMLElement>} className="w-full bg-paper py-20 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">

          {/* LEFT — image collage */}
          <div
            className={[
              "flex items-stretch gap-4 transition-all duration-1000 ease-out",
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12",
            ].join(" ")}
          >
            <div className="flex w-[46%] flex-col gap-4">
              <div className="aspect-square overflow-hidden shadow-[0_20px_50px_rgba(26,58,92,0.15)]">
                <img src="/ph1.png" alt="Private client documents" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
              </div>
              <div className="aspect-square overflow-hidden shadow-[0_20px_50px_rgba(26,58,92,0.15)]">
                <img src="/ph2.png" alt="Corporate advisory" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            </div>
            <div className="relative w-[54%] overflow-hidden shadow-[0_20px_50px_rgba(26,58,92,0.15)]">
              <img
                src="/ph9.png"
                alt="Sandton Johannesburg skyline"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                style={{ minHeight: "100%", objectPosition: "center top" }}
              />
              {/* Gold badge overlay */}
              <div className="absolute bottom-5 right-5 bg-gold px-4 py-2 shadow-lg">
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-navy">Est. 2009</p>
              </div>
            </div>
          </div>

          {/* RIGHT — content */}
          <div
            className={[
              "flex flex-col gap-7 transition-all duration-1000 delay-200 ease-out",
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12",
            ].join(" ")}
          >
            <p className="eyebrow">Who we are</p>

            <div className="border-l-[3px] border-gold pl-6">
              <h2 className="font-display leading-[1.1]">
                <span className="block text-[clamp(1.7rem,3vw,2.6rem)] font-light text-navy/70">Not an immigration consultancy.</span>
                <span className="block text-[clamp(1.7rem,3vw,2.6rem)] font-bold text-navy">A Private Client Practice.</span>
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
                <div key={feat.title} className="group flex items-start gap-5 transition-transform duration-300 hover:translate-x-1">
                  {feat.icon}
                  <div>
                    <h3 className="mb-1 font-sans text-[15px] font-semibold text-navy">{feat.title}</h3>
                    <p className="font-sans text-[13.5px] leading-relaxed text-slate">{feat.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="group mt-2 inline-flex w-fit items-center gap-3 border border-navy px-7 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-navy transition-all duration-300 hover:bg-navy hover:text-white"
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
    <section ref={ref as React.RefObject<HTMLElement>} className="w-full bg-mist py-20 lg:py-28 border-t border-silver/40">
      <Container>
        {/* Header row */}
        <div
          className={[
            "mb-12 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_2fr] lg:items-end transition-all duration-1000 ease-out",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          ].join(" ")}
        >
          <div>
            <p className="eyebrow mb-4">What we do</p>
            <div className="border-l-[3px] border-gold pl-6">
              <h2 className="font-display leading-[1.1]">
                <span className="block text-[clamp(1.7rem,3vw,2.6rem)] font-light text-navy/70">Core</span>
                <span className="block text-[clamp(1.7rem,3vw,2.6rem)] font-bold text-navy">Practice Areas</span>
              </h2>
            </div>
          </div>
          <div className="flex items-end justify-between gap-6">
            <p className="max-w-lg font-sans text-[14.5px] leading-[1.85] text-slate">
              Boutique South African immigration advisory for high-net-worth individuals, investors and executives — where every matter is led by a named specialist.
            </p>
            <Link
              href="/services"
              className="group shrink-0 inline-flex items-center gap-3 border border-navy px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-navy transition-all duration-300 hover:bg-navy hover:text-white"
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
              "relative flex flex-col justify-between overflow-hidden bg-navy p-10 transition-all duration-1000 delay-100 ease-out",
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
            <Link href="/services" className="group mt-10 inline-flex items-center gap-3 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-gold transition-colors hover:text-white">
              View All Services
              <ArrowRight size={14} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>

          {services.slice(0, 2).map((s, i) => (
            <div
              key={s.slug}
              className={[
                "group relative flex flex-col bg-paper p-8 border border-transparent transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(26,58,92,0.08)] hover:border-gold/20",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              ].join(" ")}
              style={{ transitionDelay: inView ? `${(i + 2) * 100}ms` : "0ms" }}
            >
              <span className="absolute left-0 top-0 h-[3px] w-0 bg-gold transition-all duration-500 group-hover:w-full" aria-hidden />
              <s.icon size={44} strokeWidth={1.0} className="mb-6 text-gold transition-transform duration-500 group-hover:scale-110" aria-hidden />
              <span className="mb-6 block h-px w-full bg-silver" />
              <h3 className="font-display text-[1.2rem] font-semibold text-navy">{s.title}</h3>
              <p className="mt-3 font-sans text-[13.5px] leading-relaxed text-slate">{s.summary}</p>
              <Link href={`/services#${s.slug}`} className="group/lnk mt-auto pt-6 inline-flex items-center gap-2 font-sans text-[10.5px] font-semibold uppercase tracking-[0.22em] text-gold transition-colors hover:text-navy">
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
                "group relative flex flex-col bg-paper p-8 border border-transparent transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(26,58,92,0.08)] hover:border-gold/20",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              ].join(" ")}
              style={{ transitionDelay: inView ? `${(i + 4) * 80}ms` : "0ms" }}
            >
              <span className="absolute left-0 top-0 h-[3px] w-0 bg-gold transition-all duration-500 group-hover:w-full" aria-hidden />
              <s.icon size={44} strokeWidth={1.0} className="mb-6 text-gold transition-transform duration-500 group-hover:scale-110" aria-hidden />
              <span className="mb-6 block h-px w-full bg-silver" />
              <h3 className="font-display text-[1.15rem] font-semibold text-navy">{s.title}</h3>
              <p className="mt-3 font-sans text-[13px] leading-relaxed text-slate">{s.summary}</p>
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
    { title: "High-Net-Worth Individuals", body: "Residence solutions for the globally mobile, structured around existing affairs.", img: "/businessman-cupped-his-hands-blue-tone.jpg", href: "/services#financial-independence" },
    { title: "Investors & Entrepreneurs", body: "Immigration that supports the commercial opportunity and its timetable.", img: "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=700&auto=format&fit=crop", href: "/services#business-visas" },
    { title: "Corporate Executives", body: "Executive relocation and the full family transition that comes with it.", img: "/ph6.png", href: "/services#executive-relocation" },
    { title: "Families & Affluent Retirees", body: "Long-horizon planning across generations and jurisdictions.", img: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?q=80&w=700&auto=format&fit=crop", href: "/services#family-immigration" },
  ];

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="w-full bg-paper py-20 lg:py-28 border-t border-silver/40">
      <Container>
        {/* 3-col header */}
        <div className={["mb-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:items-end transition-all duration-1000 ease-out", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"].join(" ")}>
          <div>
            <span className="mb-4 inline-block border border-silver px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-navy">Who We Serve</span>
            <h2 className="font-display text-[clamp(1.9rem,3.2vw,2.6rem)] font-bold leading-[1.1] text-navy">A select audience by specialist advisors.</h2>
          </div>
          <p className="font-sans text-[15px] leading-[1.85] text-slate md:pt-10">
            High-net-worth individuals, investors and families for whom the cost of a delayed or misjudged application substantially exceeds the cost of advice.
          </p>
          <div className="flex justify-end">
            <div className="relative p-6">
              <span className="absolute left-0 top-0 block h-5 w-5 border-l-2 border-t-2 border-gold" />
              <span className="absolute bottom-0 right-0 block h-5 w-5 border-b-2 border-r-2 border-gold" />
              <div className="flex items-center gap-4">
                <span className="font-display text-[4rem] font-bold leading-none text-navy">15+</span>
                <div className="flex flex-col">
                  <span className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-navy">Years</span>
                  <span className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-navy">Specialist</span>
                  <span className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-gold">Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Photo cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => (
            <Link
              key={card.title}
              href={card.href}
              className={[
                "group relative flex min-h-[340px] flex-col justify-end overflow-hidden transition-all duration-700 ease-out",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              ].join(" ")}
              style={{ transitionDelay: inView ? `${i * 100}ms` : "0ms" }}
            >
              <img src={card.img} alt={card.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-108" />
              <div className="absolute inset-0 transition-all duration-500" style={{ background: "linear-gradient(180deg, rgba(26,58,92,0.05) 0%, rgba(26,58,92,0.55) 50%, rgba(26,58,92,0.92) 100%)" }} />
              {/* Gold top bar on hover */}
              <span className="absolute left-0 top-0 h-[3px] w-0 bg-gold transition-all duration-500 group-hover:w-full" aria-hidden />
              <div className="relative z-10 p-6">
                <h3 className="font-display text-[1.15rem] font-semibold text-white leading-snug">{card.title}</h3>
                <p className="mt-2 font-sans text-[13px] leading-relaxed text-white/75">{card.body}</p>
                <span className="mt-4 inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-gold transition-colors group-hover:text-white">
                  <ArrowRight size={13} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1" />
                  Learn More
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/services" className="group inline-flex items-center gap-4 bg-navy px-10 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:bg-gold hover:text-navy">
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
      <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
        <div className={["grid min-h-[420px] grid-cols-1 lg:grid-cols-2 transition-all duration-1000 ease-out", inView ? "opacity-100" : "opacity-0"].join(" ")}>
          {/* Left: content */}
          <div className={["flex flex-col justify-center px-0 py-16 lg:py-20 lg:pr-16 transition-all duration-1000 ease-out", inView ? "translate-x-0" : "-translate-x-8"].join(" ")}>
            <p className="eyebrow mb-6">We are ready to help you</p>
            <div className="border-l-[3px] border-gold pl-6">
              <h2 className="font-display leading-[1.1]">
                <span className="block text-[clamp(1.8rem,3.2vw,2.8rem)] font-light text-navy/70">Private Client</span>
                <span className="block text-[clamp(1.8rem,3.2vw,2.8rem)] font-bold text-navy">Residence Advisory</span>
              </h2>
            </div>
            <p className="mt-7 max-w-md font-sans text-[15px] leading-[1.85] text-slate">
              Our specialists advise high-net-worth individuals and families on South African residence — from financial independence permits to complex refused matters — with absolute discretion and a named relationship manager throughout.
            </p>
            <div className="mt-8">
              <Link href="/contact" className="group inline-flex items-center gap-4 border border-navy px-7 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-navy transition-all duration-300 hover:bg-navy hover:text-white">
                Contact Us
                <ArrowRight size={14} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>
          </div>
          {/* Right: photo */}
          <div className={["relative min-h-[280px] overflow-hidden lg:min-h-full transition-all duration-1000 delay-200 ease-out", inView ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"].join(" ")}>
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop"
              alt="Corporate building"
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-paper to-transparent" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 5 — WHY TIDE GLOBAL (advantages grid)
═══════════════════════════════════════════════════════════════ */
function WhyTideGlobal() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative w-full overflow-hidden bg-navy py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} aria-hidden />
      <Container className="relative z-10">
        <div className={["mb-14 text-center transition-all duration-1000 ease-out", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"].join(" ")}>
          <p className="eyebrow mb-4 text-gold/90">Why Tide Global</p>
          <div className="border-l-[3px] border-gold pl-6 mx-auto w-fit text-left">
            <h2 className="font-display text-[clamp(1.9rem,3vw,2.9rem)] font-bold leading-[1.1] text-white">
              What the difference actually is
            </h2>
          </div>
          <p className="mx-auto mt-6 max-w-xl font-sans text-[14.5px] leading-[1.85] text-paper/65">
            Nine things a boutique practice can do that a volume consultancy structurally cannot.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px bg-white/10 md:grid-cols-2 lg:grid-cols-3">
          {advantages.map((a, i) => (
            <div
              key={a.title}
              className={[
                "group flex flex-col bg-charcoal p-8 transition-all duration-700 ease-out hover:bg-[#1e2e42] hover:-translate-y-1",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              ].join(" ")}
              style={{ transitionDelay: inView ? `${i * 60}ms` : "0ms" }}
            >
              <a.icon size={24} strokeWidth={1.25} className="mb-5 text-gold transition-transform duration-500 group-hover:scale-110" aria-hidden />
              <h3 className="mb-3 font-sans text-[14px] font-semibold text-white">{a.title}</h3>
              <p className="font-sans text-[13.5px] leading-relaxed text-white/65">{a.body}</p>
            </div>
          ))}
        </div>

        <div className={["mt-12 flex justify-center transition-all duration-1000 delay-500 ease-out", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"].join(" ")}>
          <Link href="/why-tide-global" className="group inline-flex items-center gap-4 border border-gold px-10 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-gold transition-all duration-300 hover:bg-gold hover:text-navy">
            Why discerning clients choose us
            <ArrowRight size={14} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1.5" />
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
    { country: "United Kingdom", desc: "High-net-worth clients relocating from London, advising on South African residence routes aligned to their existing structures.", img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=700&auto=format&fit=crop" },
    { country: "United States", desc: "US-based investors and entrepreneurs establishing South African residence alongside their global financial planning.", img: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=700&auto=format&fit=crop" },
    { country: "United Arab Emirates", desc: "UAE residents and GCC nationals seeking South African permanent residence as a secondary base or investment destination.", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=700&auto=format&fit=crop" },
    { country: "Australia & Canada", desc: "Clients from Commonwealth nations pursuing South African residence for lifestyle, business or family reasons.", img: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=700&auto=format&fit=crop" },
  ];

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative w-full overflow-hidden border-t border-silver/40 bg-paper py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(26,58,92,0.04),transparent_65%)]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-[center_60%] bg-no-repeat mix-blend-multiply" style={{ backgroundImage: `url("/maps-overlay-scaled.webp")`, backgroundSize: "92%", opacity: 0.28 }} aria-hidden />

      <Container className="relative z-10">
        <div className={["mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between transition-all duration-1000 ease-out", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"].join(" ")}>
          <div>
            <p className="eyebrow mb-5">International markets</p>
            <div className="border-l-[3px] border-gold pl-6">
              <h2 className="font-display leading-[1.1]">
                <span className="block text-[clamp(1.8rem,3.2vw,2.8rem)] font-light text-navy/70">Advised from Johannesburg.</span>
                <span className="block text-[clamp(1.8rem,3.2vw,2.8rem)] font-bold text-navy">Instructed from Everywhere.</span>
              </h2>
            </div>
          </div>
          <Link href="/contact" className="group inline-flex shrink-0 items-center gap-3 border border-navy px-5 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-navy transition-all duration-300 hover:bg-navy hover:text-white">
            All Countries <ArrowRight size={13} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
              <div className="relative h-[185px] overflow-hidden">
                <img src={dest.img} alt={dest.country} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0" />
                <span className="absolute left-0 bottom-0 h-[3px] w-0 bg-gold transition-all duration-500 group-hover:w-full" aria-hidden />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-[1.2rem] font-semibold text-navy">{dest.country}</h3>
                <span className="my-4 block h-px w-full bg-silver" />
                <p className="flex-1 font-sans text-[13px] leading-relaxed text-slate">{dest.desc}</p>
                <span className="relative mt-5 inline-flex w-fit items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-gold transition-colors group-hover:text-navy">
                  Read More
                  <ArrowRight size={12} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1" />
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <p className={["mt-14 text-center font-sans text-[14px] text-slate/80 transition-all duration-1000 delay-400 ease-out", inView ? "opacity-100" : "opacity-0"].join(" ")}>
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
    <section ref={ref as React.RefObject<HTMLElement>} className="relative w-full overflow-hidden min-h-[520px]">
      <img src="/ph8.png" alt="South African passport" className="absolute inset-0 h-full w-full object-cover object-[70%_50%]" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(18,26,38,0.94) 0%, rgba(18,26,38,0.65) 45%, rgba(18,26,38,0.10) 100%)" }} aria-hidden />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-8">
        <div
          className={[
            "flex min-h-[440px] max-w-2xl flex-col justify-center py-20 md:min-h-[520px] md:py-24 transition-all duration-1000 ease-out",
            inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10",
          ].join(" ")}
        >
          <p className="eyebrow mb-6 text-paper/85">We provide the best service</p>
          <div className="border-l-[3px] border-gold pl-6">
            <h2 className="font-display leading-[1.08]">
              <span className="block text-[clamp(2rem,3.4vw,3.25rem)] font-light text-paper/90">We Provide The Best Way To</span>
              <span className="block text-[clamp(2rem,3.4vw,3.25rem)] font-bold text-white">Success Your Migration</span>
            </h2>
          </div>
          <p className="mt-7 max-w-md font-sans text-[15px] leading-[1.9] text-paper/75">
            Dedicated private client support for residence, relocation and complex immigration matters. We lead with strategy, protect your time, and manage every stage with discretion.
          </p>
          <div className="mt-9">
            <Link href="/contact" className="group inline-flex items-center gap-4 border border-paper/70 px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-paper transition-all duration-300 hover:border-gold hover:bg-gold hover:text-navy">
              Contact Us
              <ArrowRight size={14} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 8 — NEWS & ARTICLES
═══════════════════════════════════════════════════════════════ */
function NewsSection() {
  const { ref, inView } = useInView();
  const posts = [
    { title: "Great Value For Your Visa Job Seeker Immigration", body: "Practical guidance for applicants balancing timing, evidence and route selection.", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=900&auto=format&fit=crop" },
    { title: "Make Student Visa Over Years With Other Country", body: "How to structure a long-term study pathway with fewer surprises at the border.", img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=900&auto=format&fit=crop" },
  ];
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="w-full bg-paper py-20 lg:py-28 border-t border-silver/40">
      <Container>
        <div className={["mb-14 flex flex-col items-center text-center transition-all duration-1000 ease-out", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"].join(" ")}>
          <p className="eyebrow mb-4 text-navy/80">The news</p>
          <h2 className="font-display text-[clamp(2rem,3.3vw,3.2rem)] font-light leading-[1.05] text-navy">
            News & <span className="font-bold text-navy">Articles</span>
          </h2>
          <span className="mt-7 block h-px w-14 bg-gold" aria-hidden />
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <div className="flex flex-col gap-5 xl:col-span-8">
            {posts.map((post, i) => (
              <article
                key={post.title}
                className={[
                  "group grid flex-1 grid-cols-1 overflow-hidden border border-silver/40 bg-paper transition-all duration-700 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(26,58,92,0.08)] md:grid-cols-[200px_minmax(0,1fr)]",
                  inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8",
                ].join(" ")}
                style={{ transitionDelay: inView ? `${i * 150}ms` : "0ms" }}
              >
                <div className="relative min-h-[210px] overflow-hidden bg-silver md:min-h-full">
                  <img src={post.img} alt={post.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute left-0 top-0 h-[3px] w-0 bg-gold transition-all duration-500 group-hover:w-full" aria-hidden />
                </div>
                <div className="flex flex-col justify-center p-6 md:p-8">
                  <h3 className="max-w-md font-display text-[1.15rem] font-semibold leading-[1.25] text-navy transition-colors duration-300 group-hover:text-gold">{post.title}</h3>
                  <p className="mt-4 max-w-md font-sans text-[13.5px] leading-[1.85] text-slate">{post.body}</p>
                  <Link href="/insights" className="mt-6 inline-flex items-center gap-2 font-sans text-[10.5px] font-semibold uppercase tracking-[0.22em] text-gold transition-colors group-hover:text-navy">
                    Read More <ArrowRight size={13} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <article
            className={[
              "group relative min-h-[500px] overflow-hidden border border-silver/40 xl:col-span-4 transition-all duration-1000 delay-300 ease-out",
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8",
            ].join(" ")}
          >
            <img src="https://images.unsplash.com/photo-1519452575417-564c1401ecc0?q=80&w=1200&auto=format&fit=crop" alt="Visa application" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 transition-all duration-700 group-hover:opacity-90" style={{ background: "linear-gradient(180deg, rgba(26,58,92,0.06) 0%, rgba(26,58,92,0.32) 42%, rgba(26,58,92,0.92) 100%)" }} />
            <div className="relative z-10 flex h-full flex-col justify-end p-7 md:p-8">
              <p className="eyebrow mb-4 text-paper/80">Feature story</p>
              <h3 className="max-w-sm font-display text-[clamp(1.7rem,2.6vw,2.5rem)] font-bold leading-[1.04] text-white">How To Ensure A Direct Hassle Free Visa Application</h3>
              <p className="mt-5 max-w-sm font-sans text-[14px] leading-[1.8] text-white/72">A private client approach to file preparation, evidence quality and decision-ready applications.</p>
              <Link href="/insights" className="group/btn mt-8 inline-flex items-center gap-3 border border-white/30 px-6 py-3 font-sans text-[10.5px] font-semibold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:border-gold hover:bg-gold hover:text-navy">
                Read More <ArrowRight size={13} strokeWidth={2} className="transition-transform duration-300 group-hover/btn:translate-x-1.5" />
              </Link>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN HOME PAGE EXPORT
═══════════════════════════════════════════════════════════════ */
export default function HomePageClient() {
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
      <NewsSection />
    </>
  );
}
