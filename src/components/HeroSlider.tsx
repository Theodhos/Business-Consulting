"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "./ui/Section";

/* ─── Slide data ──────────────────────────────────────────────── */
const slides = [
  {
    image: "/ph5.png",
    eyebrow: "JOHANNESBURG • EXPERT ADVISORY",
    heading1: "Immigration & Visa",
    heading2: "Agency Worldwide",
    desc: "We provide comprehensive assistance with visa applications, residency programs, and citizenship by investment across the globe.",
  },
  {
    image: "/ph3.png",
    eyebrow: "CAPE TOWN • PRIVATE CLIENTS",
    heading1: "Your Gateway To",
    heading2: "A Better Future",
    desc: "Specialized in High-Net-Worth Individuals seeking seamless residence solutions structured around their existing affairs.",
  },
  {
    image: "/ph4.png",
    eyebrow: "PRETORIA • SECURE FUTURE",
    heading1: "Strategic & Discreet",
    heading2: "Residence Planning",
    desc: "Confidentiality from first contact onward. Your matter, your capital and your identity are protected at every stage.",
  },
  {
    image: "/ph7.png",
    eyebrow: "DURBAN • LONG-TERM VISION",
    heading1: "Advising Investors",
    heading2: "And Entrepreneurs",
    desc: "Residence tied to establishing or investing in a South African business, supporting your commercial opportunity and its timetable.",
  }
];

/* ─── Card data — PCS brand palette ──────────────────────────── */
const heroCards = [
  {
    num: "01.",
    title: "Financial Independence",
    body: "Permanent residence for individuals who meet the prescribed net-worth threshold.",
    href: "/services#financial-independence",
    /* White card */
    cardBg:   "bg-white",
    cardBorder: "border-t-[3px] border-white",
    titleColor: "text-navy",
    bodyColor:  "text-slate",
    numBg:    "bg-navy text-white",        /* PCS Navy badge */
    linkColor:"text-navy hover:text-gold",
  },
  {
    num: "02.",
    title: "Business & Investment",
    body: "Residence tied to establishing or investing in a South African business.",
    href: "/services#business-visas",
    /* Navy card */
    cardBg:   "bg-navy",
    cardBorder: "border-t-[3px] border-gold",
    titleColor: "text-white",
    bodyColor:  "text-white/70",
    numBg:    "bg-gold text-navy",         /* PCS Gold badge */
    linkColor:"text-gold hover:text-white",
  },
  {
    num: "03.",
    title: "Complex & Refused Matters",
    body: "Specialist intervention where a matter has stalled, been refused or gone wrong.",
    href: "/services#remediation",
    /* Charcoal card */
    cardBg:   "bg-charcoal",
    cardBorder: "border-t-[3px] border-navy",
    titleColor: "text-white",
    bodyColor:  "text-white/60",
    numBg:    "bg-navy text-white",        /* PCS Navy badge */
    linkColor:"text-silver hover:text-white",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const total = slides.length;

  const goTo = (idx: number) => {
    if (animating) return;
    setAnimating(true);
    setCurrent((idx + total) % total);
    setTimeout(() => setAnimating(false), 800);
  };

  /* Auto-advance */
  useEffect(() => {
    const t = setInterval(() => goTo(current + 1), 7000);
    return () => clearInterval(t);
  }, [current]);   // eslint-disable-line react-hooks/exhaustive-deps

  /* Touch swipe — the only slider affordance on phones, where the side arrows
     would sit on top of the headline. */
  const touchX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 45) goTo(dx < 0 ? current + 1 : current - 1);
    touchX.current = null;
  };

  return (
    <>
      {/* ── Hero Section ─────────────────────────────────────────── */}
      <section
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-charcoal lg:min-h-[88vh]"
        aria-label="Hero slider"
      >
        {/* Slides */}
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={[
              "absolute inset-0 transition-opacity duration-1000",
              idx === current ? "opacity-100 z-10" : "opacity-0 z-0",
            ].join(" ")}
            aria-hidden={idx !== current}
          >
            {/* Background photo */}
            <div
              className={[
                "absolute inset-0 bg-cover bg-center",
                "transition-transform duration-[12000ms] ease-out",
                idx === current ? "scale-110" : "scale-100",
              ].join(" ")}
              style={{ backgroundImage: `url('${slide.image}')` }}
            />
            {/* Gradient scrim */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(105deg, rgba(26,58,92,0.95) 0%, rgba(26,58,92,0.82) 45%, rgba(26,58,92,0.50) 75%, rgba(26,58,92,0.25) 100%)",
              }}
            />
          </div>
        ))}

        {/* Slide content */}
        <Container className="relative z-20 pb-28 pt-24 sm:pb-44 sm:pt-40 md:pb-60">
          <div className="w-full max-w-3xl border border-white/10 bg-navy/30 p-5 backdrop-blur-md shadow-[0_30px_60px_rgba(26,58,92,0.4)] sm:p-10 md:p-14">
            {/* Eyebrow */}
            <p className="mb-3 font-sans text-[9.5px] font-semibold uppercase tracking-[0.16em] text-gold sm:mb-4 sm:text-[11px] sm:tracking-[0.28em]">
              {slides[current].eyebrow}
            </p>

            {/* Heading */}
            <div className="border-l-[3px] border-gold pl-4 sm:pl-7 md:pl-10">
              <h1 className="font-display leading-[1.08]">
                <span className="block text-[clamp(1.85rem,8vw,4.5rem)] font-light text-white/75">
                  {slides[current].heading1}
                </span>
                <span className="block text-[clamp(1.85rem,8vw,4.5rem)] font-bold text-white">
                  {slides[current].heading2}
                </span>
              </h1>
            </div>

            {/* Body */}
            <p className="mt-4 max-w-xl font-sans text-[13.5px] font-normal leading-[1.7] text-white/75 sm:mt-8 sm:text-[16px] sm:leading-relaxed">
              {slides[current].desc}
            </p>

            {/* CTA — full-width stacked buttons on phones */}
            <div className="mt-7 grid grid-cols-1 gap-2.5 sm:mt-12 sm:flex sm:flex-wrap sm:gap-3">
              <Link
                href="/book-consultation"
                className="group inline-flex items-center justify-center gap-3 bg-gold px-6 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-navy transition-all duration-300 hover:bg-white sm:px-8 sm:py-4 sm:text-[12px] sm:tracking-[0.22em]"
              >
                Book a consultation
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
              <Link
                href="/about"
                className="group inline-flex items-center justify-center gap-3 border border-white/80 px-6 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:border-gold hover:bg-gold hover:text-navy sm:px-8 sm:py-4 sm:text-[12px] sm:tracking-[0.22em]"
              >
                Discover More
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>
          </div>
        </Container>

        {/* Slide indicators (progress bars) */}
        <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 sm:bottom-10 sm:gap-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              aria-label={`Slide ${idx + 1}`}
              className="tap relative h-1 w-9 overflow-hidden bg-white/20 transition-all hover:bg-white/40 sm:h-1.5 sm:w-12"
            >
              <div
                className={[
                  "absolute inset-y-0 left-0 bg-gold",
                  idx === current
                    ? "w-full transition-[width] duration-[7000ms] ease-linear"
                    : "w-0 transition-none",
                ].join(" ")}
              />
            </button>
          ))}
        </div>

        {/* Prev / Next arrows — hidden on phones, where they would land on the
            headline; swipe covers the same job there. */}
        <button
          onClick={() => goTo(current - 1)}
          aria-label="Previous slide"
          className="absolute left-5 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/25 text-white backdrop-blur-sm transition-all hover:border-gold hover:bg-gold hover:text-navy lg:flex"
        >
          <ChevronLeft size={20} strokeWidth={1.5} />
        </button>
        <button
          onClick={() => goTo(current + 1)}
          aria-label="Next slide"
          className="absolute right-5 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/25 text-white backdrop-blur-sm transition-all hover:border-gold hover:bg-gold hover:text-navy lg:flex"
        >
          <ChevronRight size={20} strokeWidth={1.5} />
        </button>
      </section>

      {/* ── Hero Cards ───────────────────────────────────────────────
          Phones get a swipeable rail with a peek of the next card, so three
          full-bleed blocks don't cost a screen and a half of scrolling.
          From md the original overlapping three-up grid returns.
      ──────────────────────────────────────────────────────────────── */}
      <div className="relative z-30 mt-0 md:-mt-28 lg:-mt-36">
        <Container className="max-md:px-0">
          <div className="hide-scrollbar flex snap-x snap-mandatory scroll-pl-5 gap-3 overflow-x-auto px-5 pb-1 sm:scroll-pl-6 sm:px-6 md:grid md:grid-cols-3 md:gap-0 md:overflow-visible md:px-0 md:pb-0 md:shadow-2xl">
            {heroCards.map((card) => (
              <Link
                key={card.num}
                href={card.href}
                className={[
                  "group flex w-[84%] shrink-0 snap-start flex-col p-7 sm:w-[70%] md:w-auto md:px-10 md:py-10 lg:px-12 lg:py-12",
                  "transition-all duration-300 md:hover:-translate-y-1.5 md:hover:shadow-2xl",
                  card.cardBg, card.cardBorder,
                ].join(" ")}
              >
                {/* Header row: title + number badge */}
                <div className="flex items-start justify-between gap-4">
                  {/* Cormorant Garamond SemiBold — card title */}
                  <h3 className={`font-display text-[1.35rem] font-semibold leading-snug sm:text-[1.55rem] ${card.titleColor}`}>
                    {card.title}
                  </h3>
                  <span
                    className={[
                      "mt-1 flex h-8 w-8 shrink-0 items-center justify-center sm:h-9 sm:w-9",
                      "font-sans text-[12px] font-bold sm:text-[13px]",
                      card.numBg,
                    ].join(" ")}
                  >
                    {card.num}
                  </span>
                </div>

                {/* Body — Inter Regular */}
                <p className={`mt-4 font-sans text-[13.5px] leading-relaxed sm:mt-5 sm:text-[14.5px] ${card.bodyColor}`}>
                  {card.body}
                </p>

                {/* Read more link — Inter SemiBold */}
                <span className={`mt-auto inline-flex items-center gap-2.5 pt-6 font-sans text-[10.5px] font-semibold uppercase tracking-[0.18em] transition-colors sm:pt-8 sm:text-[11px] sm:tracking-[0.2em] ${card.linkColor}`}>
                  Read More
                  <ArrowRight
                    size={14}
                    strokeWidth={2}
                    className="transition-transform duration-300 group-hover:translate-x-1.5"
                  />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}
