"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, MoveRight, ShieldCheck, Compass, ClipboardList, BookOpen, CreditCard, BookMarked } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { mission, vision, values, site, advantages } from "@/lib/content";

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
   SECTION 0 — ABOUT INTRO (Photo Layout with Single Image)
═══════════════════════════════════════════════════════════════ */
function AboutIntro() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="w-full bg-paper py-20 lg:py-28 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          
          {/* Left: Single Image */}
          <div 
            className={[
              "relative w-full h-[500px] lg:h-[650px] overflow-hidden shadow-[0_20px_50px_rgba(26,58,92,0.15)] transition-all duration-1000 ease-out",
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            ].join(" ")}
          >
            <img 
              src="/ph3.png" 
              alt="Travel and Immigration" 
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105" 
            />
          </div>

          {/* Right: Content */}
          <div 
            className={[
              "flex flex-col justify-center transition-all duration-1000 delay-200 ease-out",
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            ].join(" ")}
          >
            <p className="eyebrow text-navy mb-4 tracking-[0.2em]">ABOUT {site.name.toUpperCase()}</p>
            <div className="border-l-[4px] border-gold pl-5 sm:pl-6 mb-8">
              <h1 className="font-display leading-[1.1]">
                <span className="block text-[clamp(1.8rem,3vw,2.6rem)] font-light text-navy/70">Immigration Services From</span>
                <span className="block text-[clamp(1.8rem,3vw,2.6rem)] font-bold text-navy">Experienced Advisors</span>
              </h1>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-10 text-slate text-[14px] leading-[1.85]">
              <p>A significant number of affluent individuals possess every means to invest, relocate or establish themselves in South Africa. Very few possess the time or the specialist knowledge the legislation quietly assumes of them.</p>
              <p>That gap is a structural one. The immigration market is built for volume, but we serve the client whose affairs are complex, whose privacy is not negotiable, and for whom a delayed approval is a measured cost.</p>
            </div>

            {/* Mission & Vision blocks */}
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-5 group">
                <div className="flex shrink-0 h-16 w-16 items-center justify-center rounded bg-mist border border-silver/40 transition-colors duration-500 group-hover:border-gold">
                   <ShieldCheck size={26} className="text-gold transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h4 className="font-display text-[1.25rem] font-bold text-navy mb-2">Our Mission</h4>
                  <p className="font-sans text-[13.5px] leading-relaxed text-slate">{mission}</p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="flex shrink-0 h-16 w-16 items-center justify-center rounded bg-mist border border-silver/40 transition-colors duration-500 group-hover:border-gold">
                   <Compass size={26} className="text-gold transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h4 className="font-display text-[1.25rem] font-bold text-navy mb-2">Our Vision</h4>
                  <p className="font-sans text-[13.5px] leading-relaxed text-slate">{vision}</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 1 — GLOBAL PRACTICE (Map and Text)
═══════════════════════════════════════════════════════════════ */
function GlobalPractice() {
  const { ref, inView } = useInView();
  
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative w-full bg-navy py-2 lg:py-4 overflow-hidden">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left side content */}
          <div 
            className={[
              "flex flex-col gap-8 transition-all duration-1000 ease-out",
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            ].join(" ")}
          >
            <div>
              <p className="eyebrow mb-4 text-gold/90">The Practice</p>
              <div className="border-l-[3px] border-gold pl-5 sm:pl-6">
                <h2 className="font-display leading-[1.1]">
                  <span className="block text-[clamp(1.5rem,3vw,2.4rem)] font-light text-paper/80">Johannesburg, and</span>
                  <span className="block text-[clamp(1.5rem,3vw,2.4rem)] font-bold text-white">wherever your affairs are.</span>
                </h2>
              </div>
            </div>

            <div className="space-y-4">
              <p className="font-sans text-[14px] leading-[1.85] text-paper/70">
                Tide Global was established exclusively for discerning clients. A separate practice, serving through a highly personalised, concierge-driven approach where every matter is overseen by seasoned professionals.
              </p>
            </div>
          </div>

          {/* Right side: Map */}
          <div 
            className={[
              "relative w-full h-[400px] lg:h-[600px] flex items-center justify-center transition-all duration-1000 delay-300 ease-out",
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            ].join(" ")}
          >
            <div className="relative w-full max-w-[800px]">
              <img 
                src="/maps-overlay-scaled.webp" 
                alt="World Map" 
                className="w-full h-auto object-contain opacity-40 mix-blend-screen drop-shadow-2xl"
              />
              
              {/* South Africa Pin */}
              <div 
                className={[
                  "absolute flex flex-col items-center gap-1.5 transition-all duration-1000 ease-out",
                  inView ? "scale-100 opacity-100" : "scale-0 opacity-0"
                ].join(" ")}
                style={{ top: "72%", left: "54.5%", transitionDelay: "800ms" }}
              >
                <span className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gold bg-navy/80 px-2 py-0.5 rounded backdrop-blur-sm -ml-4 whitespace-nowrap shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                  South Africa
                </span>
                <div className="relative flex h-3.5 w-3.5 sm:h-4 sm:w-4 items-center justify-center -ml-4">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-gold shadow-[0_0_15px_3px_rgba(182,143,82,0.8)]"></span>
                </div>
              </div>

              {/* Other subtle dots around the world to make it look active */}
              {[
                { top: "25%", left: "20%" }, // NA
                { top: "28%", left: "48%" }, // EU
                { top: "45%", left: "75%" }, // Asia
                { top: "75%", left: "85%" }, // Aus
                { top: "40%", left: "60%" }, // ME
              ].map((dot, i) => (
                <div 
                  key={i}
                  className={[
                    "absolute h-1.5 w-1.5 rounded-full bg-white/30 transition-all duration-1000 ease-out",
                    inView ? "scale-100 opacity-100" : "scale-0 opacity-0"
                  ].join(" ")}
                  style={{ top: dot.top, left: dot.left, transitionDelay: `${1000 + i * 150}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 2 — THE PRACTICE TODAY (Horizontal Process Layout)
═══════════════════════════════════════════════════════════════ */
function PracticeSteps() {
  const { ref, inView } = useInView();
  
  // Customizing steps to match the 4-step layout from the photo
  const steps = [
    { 
      icon: <ClipboardList size={28} strokeWidth={1.2} />,
      title: "Strategy before process", 
      body: "Every engagement opens with an assessment of every route open to you." 
    },
    { 
      icon: <BookOpen size={28} strokeWidth={1.2} />,
      title: "End-to-end coordination", 
      body: "Documents, verification and submission are carried by the firm." 
    },
    { 
      icon: <CreditCard size={28} strokeWidth={1.2} />,
      title: "Technology integration", 
      body: "Structured case management so nothing depends on memory." 
    },
    { 
      icon: <BookMarked size={28} strokeWidth={1.2} />,
      title: "Confidentiality structure", 
      body: "Access to your matter is limited to the people working on it." 
    },
  ];

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="w-full bg-paper py-20 lg:py-28 overflow-hidden">
      <Container>
        {/* Top Header Section */}
        <div 
          className={[
            "grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mb-20 transition-all duration-1000 ease-out",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          ].join(" ")}
        >
          <div>
            <p className="eyebrow mb-4 text-navy font-bold uppercase tracking-widest text-[11px]">THE PRACTICE TODAY</p>
            <div className="border-l-[3px] border-gold pl-5">
              <h2 className="font-display text-[clamp(1.8rem,3vw,2.5rem)] font-light leading-[1.1] text-navy">
                What that model looks like in <span className="font-bold">daily practice</span>
              </h2>
            </div>
          </div>
          <div className="flex items-center">
            <p className="font-sans text-[14px] leading-[1.85] text-slate">
              Our service model is built entirely around the needs of the private client. We have engineered out the friction of traditional immigration processes to provide a streamlined, highly coordinated engagement from assessment to approval.
            </p>
          </div>
        </div>

        {/* Steps Grid */}
        <div 
          className={[
            "relative flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-4 lg:gap-8 transition-all duration-1000 delay-200 ease-out",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          ].join(" ")}
        >
          {steps.map((step, i) => (
            <React.Fragment key={step.title}>
              {/* Step Item */}
              <div className="flex flex-col items-center text-center w-full md:w-1/4 group cursor-default">
                {/* Square Icon Box */}
                <div className="mb-6 flex h-28 w-28 items-center justify-center border border-navy/20 bg-white transition-all duration-500 group-hover:border-gold group-hover:shadow-[0_10px_30px_rgba(182,143,82,0.15)] group-hover:-translate-y-2">
                  <div className="text-navy transition-colors duration-500 group-hover:text-gold">
                    {step.icon}
                  </div>
                </div>
                {/* Text */}
                <h3 className="font-display text-[1.1rem] font-bold text-navy mb-3 leading-snug px-2">
                  {step.title}
                </h3>
                <p className="font-sans text-[13px] leading-relaxed text-slate px-2">
                  {step.body}
                </p>
              </div>

              {/* Arrow (hidden on last item and mobile) */}
              {i < steps.length - 1 && (
                <div className="hidden md:flex shrink-0 -mt-20">
                  <ArrowRight size={28} className="text-navy/40" strokeWidth={1} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Bottom CTA */}
        <div 
          className={[
            "mt-20 text-center transition-all duration-1000 delay-500 ease-out",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          ].join(" ")}
        >
          <p className="font-sans text-[14px] text-slate">
            Would you like to speak to one of our consultants? <Link href="/contact" className="font-bold text-navy hover:text-gold transition-colors">Contact Us Now.</Link>
          </p>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 3 — VALUES GRID
═══════════════════════════════════════════════════════════════ */
function ValuesSection() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative w-full bg-mist py-24 lg:py-32 border-t border-silver/30 overflow-visible">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Sticky Left Sidebar for Title and Intro */}
          <div 
            className={[
              "lg:col-span-5 lg:sticky lg:top-32 transition-all duration-1000 ease-out",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            ].join(" ")}
          >
            <p className="eyebrow mb-5 text-gold tracking-[0.2em] uppercase">Company values</p>
            <h2 className="font-display text-[clamp(2.2rem,4vw,3.2rem)] font-light leading-[1.1] text-navy mb-6">
              Ten words, and the <span className="font-bold">discipline</span> to mean them.
            </h2>
            <p className="font-sans text-[15px] leading-[1.9] text-slate max-w-md">
              Values are worth nothing as a wall poster. These are the ones we are prepared to be measured against — including when it costs us the engagement.
            </p>
          </div>

          {/* Scrollable Right List: Editorial Index */}
          <div className="lg:col-span-7 flex flex-col mt-8 lg:mt-0">
            {values.map((v, i) => (
              <div 
                key={v} 
                className={[
                  "group relative flex items-baseline gap-6 py-8 border-b border-navy/10 transition-all duration-700 ease-out hover:border-gold",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                ].join(" ")}
                style={{ transitionDelay: inView ? `${(i % 5) * 100}ms` : "0ms" }}
              >
                {/* Index Number */}
                <div className="w-12 shrink-0">
                  <span className="font-sans text-[13px] font-bold uppercase tracking-[0.2em] text-navy/30 transition-colors duration-500 group-hover:text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                
                {/* Value Text */}
                <h3 className="font-display text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-navy transition-all duration-500 group-hover:text-gold group-hover:translate-x-2">
                  {v}
                </h3>
              </div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 4 — LEADERSHIP STATEMENT (Replaces redundant CTA)
═══════════════════════════════════════════════════════════════ */
function AboutLeadership() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="w-full bg-paper pt-20 lg:pt-28 pb-32 lg:pb-48 overflow-hidden">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <div 
            className={[
              "transition-all duration-1000 ease-out",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            ].join(" ")}
          >
            <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-mist border border-silver/60">
              <span className="font-display text-2xl font-bold text-navy">”</span>
            </div>
            <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-light leading-[1.3] text-navy">
              Our firm was built on a single, uncompromising principle: that <span className="font-bold text-gold">high-net-worth immigration</span> requires the exact same level of strategic rigor, privacy, and white-glove execution as elite wealth management.
            </h2>
            <p className="mt-8 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-slate">
              — The Managing Partners, Tide Global
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 5 — OUR ADVISORS (Alternating Layout)
═══════════════════════════════════════════════════════════════ */
function OurAdvisors() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="w-full bg-mist py-20 lg:py-28 border-t border-silver/40 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: Text */}
          <div 
            className={[
              "flex flex-col gap-6 transition-all duration-1000 ease-out",
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            ].join(" ")}
          >
            <p className="eyebrow mb-2">Specialist Advisors</p>
            <div className="border-l-[3px] border-gold pl-6">
              <h2 className="font-display leading-[1.1]">
                <span className="block text-[clamp(1.7rem,3vw,2.4rem)] font-light text-navy/70">Led by specialists.</span>
                <span className="block text-[clamp(1.7rem,3vw,2.4rem)] font-bold text-navy">Never generalists.</span>
              </h2>
            </div>
            <p className="font-sans text-[14.5px] leading-[1.85] text-slate mt-2">
              Unlike volume-driven consultancies where files are passed between generic processing teams, Tide Global operates a strict specialist-led model. Your matter is assigned to an advisor with deep, singular expertise in your specific residence category.
            </p>
            <p className="font-sans text-[14.5px] leading-[1.85] text-slate">
              This structural decision ensures that the advice you receive is nuanced, battle-tested, and aware of the unwritten operational realities of the Department of Home Affairs, not just the published legislation.
            </p>
            <div className="mt-4">
              <Link 
                href="/services" 
                className="group inline-flex items-center gap-3 border border-navy px-6 py-3 font-sans text-[10.5px] font-semibold uppercase tracking-[0.24em] text-navy transition-all duration-300 hover:bg-navy hover:text-white"
              >
                Explore our services
                <ArrowRight size={13} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>
          </div>

          {/* Right: Premium Corporate Image */}
          <div 
            className={[
              "relative w-full aspect-[4/5] overflow-hidden shadow-[0_20px_50px_rgba(26,58,92,0.15)] transition-all duration-1000 delay-200 ease-out",
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            ].join(" ")}
          >
            <img 
              src="/ph4.png" 
              alt="Corporate advisors" 
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[10s] hover:scale-110"
            />
            {/* Elegant overlay frame */}
            <div className="absolute inset-4 border border-white/20 pointer-events-none" aria-hidden />
            <div className="absolute inset-0 bg-navy/10 mix-blend-multiply pointer-events-none" aria-hidden />
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 6 — WHY TIDE GLOBAL (Advantages)
═══════════════════════════════════════════════════════════════ */
function WhyTideGlobalSection() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="w-full bg-paper py-20 lg:py-28 overflow-hidden">
      <Container>
        <div 
          className={[
            "transition-all duration-1000 ease-out",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          ].join(" ")}
        >
          <div className="mb-14">
            <p className="eyebrow mb-4 text-gold/90">Why Tide Global</p>
            <div className="border-l-[3px] border-gold pl-5 sm:pl-6 max-w-3xl">
              <h2 className="font-display leading-[1.1]">
                <span className="block text-[clamp(1.8rem,3vw,2.4rem)] font-light text-navy/70">Nine structural</span>
                <span className="block text-[clamp(1.8rem,3vw,2.4rem)] font-bold text-navy">differences.</span>
              </h2>
              <p className="font-sans text-[15px] leading-[1.8] text-slate mt-5">
                Each of these is a consequence of the boutique model, not a promise layered on top of it. That is precisely why a volume practice cannot simply match them.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-px border border-silver/40 bg-silver/40 md:grid-cols-2 lg:grid-cols-3">
            {advantages.map((a, i) => (
              <div key={a.title} className="bg-paper p-8 lg:p-10 transition-colors duration-500 hover:bg-mist">
                <div className="mb-6 flex items-center justify-between">
                  <a.icon size={26} strokeWidth={1.5} className="text-gold" aria-hidden />
                  <span className="font-sans text-[11px] font-bold text-slate/40">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="font-display text-[1.2rem] font-semibold text-navy mb-3">{a.title}</h3>
                <p className="font-sans text-[14px] leading-[1.75] text-slate/80">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN ABOUT PAGE EXPORT
═══════════════════════════════════════════════════════════════ */
export default function AboutPageClient() {
  return (
    <>
      <AboutIntro />
      <GlobalPractice />
      <WhyTideGlobalSection />
      <OurAdvisors />
      <PracticeSteps />
      <ValuesSection />
      <AboutLeadership />
    </>
  );
}
