import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import JourneySection from "@/components/JourneySection";
import {
  advantages,
  services,
} from "@/lib/content";

import HeroSlider from "@/components/HeroSlider";
import TestimonialSlider from "@/components/TestimonialSlider";
import StatsSection from "@/components/StatsSection";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function HomePage() {
  return (
    <>
      <HeroSlider />

      {/* ── Who we are ─────────────────────────────────────────────── */}
      <Section tone="paper" divide={false}>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ── Left: image collage ─────────────────────────────────
              Exact layout from reference:
              [passport small]  [tall couple]
              [travel items  ]
          ─────────────────────────────────────────────────────────── */}
          <div className="flex items-stretch gap-4">
            {/* Column A — two stacked small images (passport + travel accessories) */}
            <div className="flex w-[46%] flex-col gap-4">
              {/* Photo 4 — Passports on wooden surface */}
              <div className="aspect-square overflow-hidden">
                <img
                  src="/ph1.png"
                  alt="Corporate passport and documents"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              {/* Photo 5 — Travel accessories: hat, notebook, sunglasses */}
              <div className="aspect-square overflow-hidden">
                <img
                  src="/ph2.png"
                  alt="Executive travel accessories"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

            {/* Column B — tall portrait image (couple with luggage) */}
            <div className="w-[54%] overflow-hidden">
              {/* Photo 3 — Couple with backpacks and luggage */}
              <img
                src="/ph9.png"
                alt="Sandton, Johannesburg at sunrise, South Africa"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                style={{ minHeight: "100%", objectPosition: "center top" }}
              />
            </div>
          </div>


          {/* ── Right: content ──────────────────────────────────────── */}
          <div className="flex flex-col gap-7">
            {/* Eyebrow — Inter SemiBold, PCS Gold */}
            <p className="eyebrow">Who we are</p>

            {/* Heading with gold left border — Cormorant Garamond */}
            <div className="border-l-[3px] border-gold pl-6">
              <h2 className="font-display leading-[1.1]">
                {/* Regular line */}
                <span className="block text-[clamp(1.7rem,3vw,2.6rem)] font-light text-navy/70">
                  Not an immigration consultancy.
                </span>
                {/* Bold emphasis line */}
                <span className="block text-[clamp(1.7rem,3vw,2.6rem)] font-bold text-navy">
                  A Private Client Practice.
                </span>
              </h2>
            </div>

            {/* Two-column body text — Inter Regular, PCS Slate */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <p className="font-sans text-[14.5px] leading-[1.85] text-slate">
                Tide Global was founded on a straightforward observation: a great many people have
                the means to invest, relocate or establish themselves in South Africa — and almost
                none have the time or specialist knowledge the legislation demands.
              </p>
              <p className="font-sans text-[14.5px] leading-[1.85] text-slate">
                Conventional consultancies answer that with volume. We answer it with a boutique
                practice — a limited number of matters, each led by a named relationship manager,
                each advised on strategy before a single form is filed.
              </p>
            </div>

            {/* Feature items — icon + title + body */}
            <div className="mt-2 flex flex-col gap-6 border-t border-silver pt-6">
              {[
                {
                  icon: (
                    <svg className="h-9 w-9 shrink-0 text-gold" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="6" />
                      <path d="M9 12l2 2 4-4" />
                      <path d="M6.26 18.01A9 9 0 0 0 21 12" />
                      <path d="M3 12a9 9 0 0 0 3.26 6.93" />
                    </svg>
                  ),
                  title: "Specialist Guidance",
                  body: "Every matter is led by a named specialist with deep knowledge of South African residence legislation — not a generalist processing volume.",
                },
                {
                  icon: (
                    <svg className="h-9 w-9 shrink-0 text-gold" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="0" />
                      <path d="M9 9h6M9 13h6M9 17h4" />
                      <path d="M3 7h18" />
                    </svg>
                  ),
                  title: "Absolute Discretion",
                  body: "Confidentiality from first contact onward. Your matter, your capital and your identity are protected at every stage of the engagement.",
                },
              ].map((feat) => (
                <div key={feat.title} className="flex items-start gap-5">
                  {feat.icon}
                  <div>
                    {/* Inter SemiBold — feature title */}
                    <h3 className="mb-1 font-sans text-[15px] font-semibold text-navy">{feat.title}</h3>
                    {/* Inter Regular — feature body, PCS Slate */}
                    <p className="font-sans text-[13.5px] leading-relaxed text-slate">{feat.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </Section>


      {/* ── Practice areas ─────────────────────────────────────────── */}
      {/*
          Layout (matches reference photo):
          Row 1: [Dark intro card] [Service card 1] [Service card 2]
          Row 2: [Service card 3] [Service card 4] [Service card 5] [Service card 6]
      */}
      <Section tone="mist">
        {/* Row 1 — intro card + first 2 service cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          {/* Intro card — PCS Navy, occupies 1 column */}
          <div className="flex flex-col justify-between bg-navy p-10">
            {/* Gold underline rule */}
            <div>
              {/* Cormorant Garamond Bold — section title */}
              <h2 className="font-display text-[clamp(2rem,3.5vw,2.75rem)] font-bold leading-[1.1] text-white">
                <span className="text-gold">What</span> We Do
              </h2>
              {/* Gold hairline rule */}
              <span className="mt-5 block h-[2px] w-10 bg-gold" />
              {/* Inter Regular — lead text */}
              <p className="mt-6 font-sans text-[14.5px] leading-relaxed text-white/65">
                Boutique South African immigration advisory for high-net-worth individuals, investors
                and executives — where every matter is led by a named specialist.
              </p>
            </div>
            {/* View all link — Inter SemiBold */}
            <Link
              href="/services"
              className="group mt-10 inline-flex items-center gap-3 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-gold transition-colors hover:text-white"
            >
              View All
              <ArrowRight size={14} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>

          {/* Service cards 1 & 2 */}
          {services.slice(0, 2).map((s) => (
            <div
              key={s.slug}
              className="group flex flex-col bg-paper p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Gold icon — large, centered above title */}
              <s.icon
                size={48}
                strokeWidth={1.0}
                className="mb-6 text-gold"
                aria-hidden
              />
              {/* Silver hairline below icon */}
              <span className="mb-6 block h-px w-full bg-silver" />
              {/* Cormorant Garamond SemiBold — service title */}
              <h3 className="font-display text-[1.2rem] font-semibold text-navy">{s.title}</h3>
              {/* Inter Regular — summary */}
              <p className="mt-3 font-sans text-[13.5px] leading-relaxed text-slate">{s.summary}</p>
            </div>
          ))}
        </div>

        {/* Row 2 — 4 service cards across full width */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.slice(2, 6).map((s) => (
            <div
              key={s.slug}
              className="group flex flex-col bg-paper p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <s.icon
                size={48}
                strokeWidth={1.0}
                className="mb-6 text-gold"
                aria-hidden
              />
              <span className="mb-6 block h-px w-full bg-silver" />
              <h3 className="font-display text-[1.2rem] font-semibold text-navy">{s.title}</h3>
              <p className="mt-3 font-sans text-[13.5px] leading-relaxed text-slate">{s.summary}</p>
            </div>
          ))}
        </div>
      </Section>


      {/* ── Consultation CTA banner ─────────────────────────────────
          Layout: left content (eyebrow + heading + body + CTA)
                  right full-height photo
          No container — bleeds edge to edge within Section.
      ──────────────────────────────────────────────────────────── */}
      <section className="w-full border-t border-silver bg-paper">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
          <div className="grid min-h-[340px] grid-cols-1 lg:grid-cols-2">

            {/* Left — text content */}
            <div className="flex flex-col justify-center px-0 py-16 lg:py-20 lg:pr-16">

              {/* Eyebrow — Inter SemiBold 600, PCS Gold */}
              <p className="eyebrow mb-6">We are ready to help you</p>

              {/* Heading — Cormorant Garamond, gold left border */}
              <div className="border-l-[3px] border-gold pl-6">
                <h2 className="font-display leading-[1.1]">
                  {/* Light first part */}
                  <span className="block text-[clamp(1.8rem,3.2vw,2.8rem)] font-light text-navy/70">
                    Private Client
                  </span>
                  {/* Bold emphasis */}
                  <span className="block text-[clamp(1.8rem,3.2vw,2.8rem)] font-bold text-navy">
                    Residence Advisory
                  </span>
                </h2>
              </div>

              {/* Body — Inter Regular 400, PCS Slate */}
              <p className="mt-7 max-w-md font-sans text-[15px] leading-[1.85] text-slate">
                Our specialists advise high-net-worth individuals and families on South African
                residence — from financial independence permits to complex refused matters — with
                absolute discretion and a named relationship manager throughout.
              </p>

              {/* CTA button — outlined, PCS Navy */}
              <div className="mt-8">
                <Link
                  href="/book-consultation"
                  className="group inline-flex items-center gap-4 border border-navy px-7 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-navy transition-all duration-300 hover:bg-navy hover:text-white"
                >
                  Contact Us
                  <ArrowRight size={14} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                </Link>
              </div>
            </div>

            {/* Right — full-height photo */}
            <div className="relative min-h-[280px] overflow-hidden lg:min-h-full">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop"
                alt="Corporate building and skyline"
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              {/* Subtle left-to-right gradient to blend with the white content side */}
              <div
                className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-paper to-transparent"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Who we serve ───────────────────────────────────────────── */}
      <Section tone="paper">

        {/* ─── Top row: 3 columns ─────────────────────────────────────
            [Eyebrow + Heading] | [Body paragraph] | [Experience stat]
        ──────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:items-start">

          {/* Col 1 — eyebrow + heading */}
          <div>
            {/* Inter SemiBold — eyebrow tag pill */}
            <span className="mb-4 inline-block border border-silver px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-navy">
              Who We Serve
            </span>
            {/* Cormorant Garamond Bold — large heading */}
            <h2 className="font-display text-[clamp(1.9rem,3.2vw,2.6rem)] font-bold leading-[1.1] text-navy">
              A select audience by specialist advisors.
            </h2>
          </div>

          {/* Col 2 — body paragraph */}
          {/* Inter Regular 400, PCS Slate */}
          <p className="font-sans text-[15px] leading-[1.85] text-slate md:pt-14">
            High-net-worth individuals, investors and families for whom the cost of a delayed or
            misjudged application substantially exceeds the cost of advice. We take on a limited
            number of matters — every one led by a named specialist — and advise on strategy before
            a single form is filed.
          </p>

          {/* Col 3 — experience stat */}
          <div className="flex items-start justify-center md:justify-end md:pt-10">
            {/* Decorative corner-bracket box — gold */}
            <div className="relative p-6">
              {/* Top-left corner */}
              <span className="absolute left-0 top-0 block h-5 w-5 border-l-2 border-t-2 border-gold" />
              {/* Bottom-right corner */}
              <span className="absolute bottom-0 right-0 block h-5 w-5 border-b-2 border-r-2 border-gold" />

              <div className="flex items-center gap-4">
                {/* Cormorant Garamond Bold — large numeral */}
                <span className="font-display text-[4rem] font-bold leading-none text-navy">
                  15+
                </span>
                <div className="flex flex-col">
                  {/* Inter Bold — stat label */}
                  <span className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-navy">
                    Years
                  </span>
                  <span className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-navy">
                    specialist
                  </span>
                  <span className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
                    experience
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Photo cards row ────────────────────────────────────────
            4 portrait cards, each a full photo with gradient overlay
            and white text + "LEARN MORE" at the bottom.
        ──────────────────────────────────────────────────────────── */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "High-Net-Worth Individuals",
              body: "Residence solutions for the globally mobile, structured around existing affairs.",
              img: "/businessman-cupped-his-hands-blue-tone.jpg",
              href: "/services#financial-independence",
            },
            {
              title: "Investors & Entrepreneurs",
              body: "Immigration that supports the commercial opportunity and its timetable.",
              img: "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=700&auto=format&fit=crop",
              href: "/services#business-visas",
            },
            {
              title: "Corporate Executives",
              body: "Executive relocation and the full family transition that comes with it.",
              img: "/ph6.png",
              href: "/services#executive-relocation",
            },
            {
              title: "Families & Affluent Retirees",
              body: "Long-horizon planning across generations and jurisdictions.",
              img: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?q=80&w=700&auto=format&fit=crop",
              href: "/services#family-immigration",
            },
          ].map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group relative flex min-h-[320px] flex-col justify-end overflow-hidden"
            >
              {/* Background photo */}
              <img
                src={card.img}
                alt={card.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Dark gradient overlay — stronger at bottom */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(26,58,92,0.05) 0%, rgba(26,58,92,0.55) 50%, rgba(26,58,92,0.92) 100%)",
                }}
              />
              {/* Text content over the image */}
              <div className="relative z-10 p-6">
                {/* Cormorant Garamond SemiBold — card title */}
                <h3 className="font-display text-[1.15rem] font-semibold text-white leading-snug">
                  {card.title}
                </h3>
                {/* Inter Regular — short body */}
                <p className="mt-2 font-sans text-[13px] leading-relaxed text-white/75">
                  {card.body}
                </p>
                {/* Learn more link — Inter SemiBold */}
                <span className="mt-4 inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-gold transition-colors group-hover:text-white">
                  <ArrowRight size={13} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1" />
                  Learn More
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* ─── View more button — centered ────────────────────────── */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/services"
            className="group inline-flex items-center gap-4 bg-navy px-10 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:bg-gold hover:text-navy"
          >
            View More Services
            <ArrowRight size={14} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>

      </Section>



      {/* ── How an engagement runs ─────────────────────────────────── */}
      <JourneySection />

      {/* ── Why Tide Global — dark Navy section ───────────────────── */}
      <Section tone="navy">
        <SectionHeading
          eyebrow="Why Tide Global"
          title="What the difference actually is"
          lead="Nine things a boutique practice can do that a volume consultancy structurally cannot."
          invert
        />

        {/* Charcoal cards on a Navy section */}
        <div className="mt-14 grid grid-cols-1 gap-px border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
          {advantages.map((a) => (
            <div key={a.title} className="bg-charcoal p-8">
              <a.icon size={22} strokeWidth={1.25} className="mb-6 text-gold" aria-hidden />
              {/* Inter SemiBold — advantage title on dark */}
              <h3 className="mb-3 font-sans text-[14px] font-semibold text-white">{a.title}</h3>
              {/* Inter Regular — advantage body on dark */}
              <p className="font-sans text-[13.5px] leading-relaxed text-white/65">{a.body}</p>
            </div>
          ))}
        </div>

        <Button href="/why-tide-global" variant="invert" className="mt-12">
          Why discerning clients choose us
          <ArrowRight size={14} strokeWidth={1.5} />
        </Button>
      </Section>

      {/* ── Testimonial Slider ─────────────────────────────────────── */}
      <TestimonialSlider />

      {/* ── Stats Section ──────────────────────────────────────────── */}
      <StatsSection />

      {/* ── Why choose us + booking ────────────────────────────────── */}
      <WhyChooseUs />

      {/* ── Global reach — destination cards ───────────────────────── */}
      <section className="relative w-full overflow-hidden border-t border-silver bg-paper py-20 md:py-28">

        {/* Soft brand wash behind the world map */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(26,58,92,0.05),transparent_65%)]"
          aria-hidden
        />

        {/* Faint world-map watermark */}
        <div
          className="pointer-events-none absolute inset-0 bg-[center_60%] bg-no-repeat mix-blend-multiply"
          style={{
            backgroundImage: `url("/maps-overlay-scaled.webp")`,
            backgroundSize: "92%",
            opacity: 0.32,
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-8">

          {/* ─── Section header row ─────────────────────────────────── */}
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

            {/* Left — heading with gold border */}
            <div>
              {/* Gold eyebrow */}
              <p className="eyebrow mb-5">International markets</p>
              <div className="border-l-[3px] border-gold pl-6">
                <h2 className="font-display leading-[1.1]">
                  <span className="block text-[clamp(1.8rem,3.2vw,2.8rem)] font-light text-navy/70">
                    Advised from Johannesburg.
                  </span>
                  <span className="block text-[clamp(1.8rem,3.2vw,2.8rem)] font-bold text-navy">
                    Instructed from Everywhere.
                  </span>
                </h2>
              </div>
            </div>

            {/* Right — ALL COUNTRIES button */}
            <Link
              href="/contact"
              className="group inline-flex shrink-0 items-center gap-3 border border-navy px-5 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-navy transition-all duration-300 hover:bg-navy hover:text-white"
            >
              All Countries
              <ArrowRight size={13} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>

          {/* ─── 4 destination cards ────────────────────────────────── */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                country: "United Kingdom",
                desc: "High-net-worth clients relocating from London, advising on South African residence routes aligned to their existing structures.",
                img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=700&auto=format&fit=crop",
                href: "/contact",
              },
              {
                country: "United States",
                desc: "US-based investors and entrepreneurs establishing South African residence alongside their global financial planning.",
                img: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=700&auto=format&fit=crop",
                href: "/contact",
              },
              {
                country: "United Arab Emirates",
                desc: "UAE residents and GCC nationals seeking South African permanent residence as a secondary base or investment destination.",
                img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=700&auto=format&fit=crop",
                href: "/contact",
              },
              {
                country: "Australia & Canada",
                desc: "Clients from Commonwealth nations pursuing South African residence for lifestyle, business or family reasons.",
                img: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=700&auto=format&fit=crop",
                href: "/contact",
              },
            ].map((dest) => (
              <Link
                key={dest.country}
                href={dest.href}
                className="group flex flex-col border border-silver bg-paper transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
              >
                {/* Photo */}
                <div className="h-[185px] overflow-hidden">
                  <img
                    src={dest.img}
                    alt={dest.country}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Card body */}
                <div className="flex flex-1 flex-col p-6">
                  {/* Cormorant Garamond SemiBold — country name */}
                  <h3 className="font-display text-[1.2rem] font-semibold text-navy">
                    {dest.country}
                  </h3>
                  {/* Silver hairline */}
                  <span className="my-4 block h-px w-full bg-silver" />
                  {/* Inter Regular — description */}
                  <p className="flex-1 font-sans text-[13px] leading-relaxed text-slate">
                    {dest.desc}
                  </p>
                  {/* READ MORE — Inter SemiBold, Gold */}
                  <span className="mt-5 inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-gold transition-colors group-hover:text-navy">
                    Read More
                    <ArrowRight size={12} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* ─── Contact nudge ──────────────────────────────────────── */}
          <p className="mt-14 text-center font-sans text-[14px] text-slate/80">
            Would you like to speak with one of our specialists?{" "}
            <Link href="/contact" className="font-semibold text-navy underline underline-offset-2 hover:text-gold">
              Contact Us Now.
            </Link>
          </p>

        </div>
      </section>


      {/* ── We provide the best service — full-bleed passport banner ──
          Full-width hero: US passport photo bleeding edge to edge, with a
          left-weighted dark wash so the heading + CTA read cleanly on top.
      ──────────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden">
        {/* Background — US passport on charcoal, passport kept to the right */}
        <img
          src="/ph8.png"
          alt="South African passport"
          className="absolute inset-0 h-full w-full object-cover object-[70%_50%]"
        />
        {/* Left-weighted dark wash for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(18,26,38,0.9) 0%, rgba(18,26,38,0.62) 42%, rgba(18,26,38,0.12) 100%)",
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-8">
          <div className="flex min-h-[440px] max-w-2xl flex-col justify-center py-20 md:min-h-[520px] md:py-24">
            {/* Eyebrow — white on the dark banner */}
            <p className="eyebrow mb-6 text-paper/85">We provide the best service</p>

            {/* Heading — gold left border, light first line + bold emphasis */}
            <div className="border-l-[3px] border-gold pl-6">
              <h2 className="font-display leading-[1.08]">
                <span className="block text-[clamp(2rem,3.4vw,3.25rem)] font-light text-paper/90">
                  We Provide The Best Way To
                </span>
                <span className="block text-[clamp(2rem,3.4vw,3.25rem)] font-bold text-white">
                  Success Your Migration
                </span>
              </h2>
            </div>

            {/* Body */}
            <p className="mt-7 max-w-md font-sans text-[15px] leading-[1.9] text-paper/75">
              Dedicated private client support for residence, relocation and complex immigration
              matters. We lead with strategy, protect your time, and manage every stage with
              discretion.
            </p>

            {/* CTA */}
            <div className="mt-9">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-4 border border-paper/70 px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-paper transition-all duration-300 hover:border-gold hover:bg-gold hover:text-navy"
              >
                Contact Us
                <ArrowRight size={14} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Section tone="paper" divide={false}>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="eyebrow mb-4 text-navy/80">The news</p>
          <h2 className="font-display text-[clamp(2rem,3.3vw,3.2rem)] font-light leading-[1.05] text-navy">
            News &amp; <span className="font-bold text-navy">Article</span>
          </h2>
          <span className="mt-7 block h-px w-14 bg-gold" aria-hidden />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 xl:grid-cols-12">
          <div className="flex flex-col gap-5 xl:col-span-8">
            {[
              {
                title: "Great Value For Your Visa Job Seeker Immigration",
                body: "Practical guidance for applicants balancing timing, evidence and route selection.",
                img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=900&auto=format&fit=crop",
              },
              {
                title: "Make Student Visa Over Years With Other Country",
                body: "How to structure a long-term study pathway with fewer surprises at the border.",
                img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=900&auto=format&fit=crop",
              },
            ].map((post) => (
              <article
                key={post.title}
                className="group grid flex-1 grid-cols-1 overflow-hidden border border-line/80 bg-paper transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(26,58,92,0.08)] md:grid-cols-[170px_minmax(0,1fr)]"
              >
                <div className="min-h-[210px] overflow-hidden bg-silver md:min-h-full">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center p-6 md:p-7">
                  <h3 className="max-w-md font-display text-[1.15rem] font-semibold leading-[1.25] text-navy">
                    {post.title}
                  </h3>
                  <p className="mt-4 max-w-md font-sans text-[13.5px] leading-[1.85] text-slate">
                    {post.body}
                  </p>
                  <Link
                    href="/insights"
                    className="mt-6 inline-flex items-center gap-2 font-sans text-[10.5px] font-semibold uppercase tracking-[0.22em] text-gold transition-colors group-hover:text-navy"
                  >
                    Read More
                    <ArrowRight size={13} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <article className="group relative min-h-[540px] overflow-hidden border border-line/80 xl:col-span-4">
            <img
              src="https://images.unsplash.com/photo-1519452575417-564c1401ecc0?q=80&w=1200&auto=format&fit=crop"
              alt="Visa application documentation"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(26,58,92,0.06) 0%, rgba(26,58,92,0.32) 42%, rgba(26,58,92,0.92) 100%)",
              }}
            />
            <div className="relative z-10 flex h-full flex-col justify-end p-7 md:p-8">
              <p className="eyebrow mb-4 text-paper/80">Feature story</p>
              <h3 className="max-w-sm font-display text-[clamp(1.7rem,2.6vw,2.5rem)] font-bold leading-[1.04] text-white">
                How To Ensure A Direct Hassle Free Visa Application
              </h3>
              <p className="mt-5 max-w-sm font-sans text-[14px] leading-[1.8] text-white/72">
                A private client approach to file preparation, evidence quality and decision-ready
                applications.
              </p>
              <Link
                href="/insights"
                className="group mt-8 inline-flex items-center gap-3 border border-white/30 px-6 py-3 font-sans text-[10.5px] font-semibold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:border-gold hover:bg-gold hover:text-navy"
              >
                Read More
                <ArrowRight size={13} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>
          </article>
        </div>
      </Section>
    </>
  );
}
