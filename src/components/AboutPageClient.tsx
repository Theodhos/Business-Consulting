"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, MoveRight } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { mission, vision, values, site } from "@/lib/content";

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
   SECTION 1 — THE GLOBAL PRACTICE (Map with dots)
═══════════════════════════════════════════════════════════════ */
function GlobalPractice() {
  const { ref, inView } = useInView();
  
  // Coordinates for the glowing dots on the map (percentages)
  const branches = [
    { top: "25%", left: "18%" }, // North America
    { top: "35%", left: "28%" }, // US East Coast
    { top: "20%", left: "52%" }, // UK / Europe
    { top: "45%", left: "62%" }, // Middle East
    { top: "75%", left: "56%" }, // South Africa (Johannesburg)
    { top: "82%", left: "85%" }, // Australia
    { top: "35%", left: "75%" }, // Asia
  ];

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative w-full bg-navy py-16 lg:py-28 overflow-hidden">
      {/* Decorative world map with dots — hidden on mobile for clarity */}
      <div 
        className={[
          "absolute right-[-10%] top-1/2 w-full max-w-[800px] -translate-y-1/2 transition-all duration-1000 ease-out lg:w-[60%] lg:right-[-5%] hidden md:block",
          inView ? "opacity-100" : "opacity-0"
        ].join(" ")}
      >
        <img 
          src="/maps-overlay-scaled.webp" 
          alt="World Map" 
          className="w-full h-auto object-contain opacity-40 mix-blend-screen"
        />
        {/* Branch dots */}
        {branches.map((b, i) => (
          <div 
            key={i} 
            className={[
              "absolute w-2 h-2 rounded-full bg-gold shadow-[0_0_15px_3px_rgba(182,143,82,0.8)] transition-all duration-700 ease-out",
              inView ? "scale-100 opacity-100" : "scale-0 opacity-0"
            ].join(" ")}
            style={{ top: b.top, left: b.left, transitionDelay: `${800 + i * 150}ms` }}
          />
        ))}
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
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
                A significant number of affluent individuals possess every means to invest, relocate or establish themselves in South Africa. Very few possess the time, the specialist knowledge or the administrative capacity that the country&apos;s immigration legislation quietly assumes of them.
              </p>
              <p className="font-sans text-[14px] leading-[1.85] text-paper/70">
                That gap is not a knowledge problem that a longer FAQ would solve. It is a structural one. The immigration market is built for volume, and volume requires standardisation. But it cannot accommodate the client whose affairs are complex, whose privacy is not negotiable, and for whom a delayed approval is a cost measured in opportunity.
              </p>
              <p className="font-sans text-[14px] leading-[1.85] text-paper/70">
                Tide Global was established exclusively for those clients. A separate practice, serving discerning clients through a highly personalised, concierge-driven approach.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 border-t border-white/15 pt-8 sm:grid-cols-2">
              <div>
                <p className="eyebrow mb-3 text-gold">Our mission</p>
                <p className="font-display text-[1.15rem] leading-snug text-white">{mission}</p>
              </div>
              <div>
                <p className="eyebrow mb-3 text-gold">Our vision</p>
                <p className="font-display text-[1.15rem] leading-snug text-white">{vision}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 2 — THE PRACTICE TODAY (Steps with arrows)
═══════════════════════════════════════════════════════════════ */
function PracticeSteps() {
  const { ref, inView } = useInView();
  const steps = [
    { title: "One named relationship manager", body: "Your matter belongs to a person, not a queue. You can reach them directly." },
    { title: "Strategy before process", body: "Every engagement opens with an assessment of every route open to you." },
    { title: "End-to-end coordination", body: "Documents, verification and submission are carried by the firm." },
    { title: "Technology where it belongs", body: "Structured case management so nothing depends on memory." },
    { title: "Confidentiality as structure", body: "Access to your matter is limited to the people working on it." },
  ];

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="w-full bg-paper py-20 lg:py-28">
      <Container>
        <div 
          className={[
            "mb-16 text-center transition-all duration-1000 ease-out",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          ].join(" ")}
        >
          <p className="eyebrow mb-4">The practice today</p>
          <h2 className="font-display text-[clamp(2rem,3.3vw,2.8rem)] font-light leading-[1.05] text-navy mx-auto max-w-2xl">
            What that model looks like in <span className="font-bold">daily practice</span>
          </h2>
          <span className="mx-auto mt-7 block h-[2px] w-14 bg-gold" aria-hidden />
        </div>

        {/* Steps container */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-4 w-full">
          {steps.map((step, i) => (
            <div key={step.title} className="flex flex-col lg:flex-row items-center gap-6 lg:gap-4 flex-1 w-full lg:w-auto">
              
              {/* Step Card */}
              <div 
                className={[
                  "group flex-1 flex flex-col items-center text-center bg-white border border-silver/40 p-8 shadow-[0_10px_30px_rgba(26,58,92,0.04)] w-full min-h-[260px] transition-all duration-700 ease-out hover:-translate-y-2 hover:border-gold/30 hover:shadow-[0_20px_40px_rgba(26,58,92,0.08)]",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                ].join(" ")}
                style={{ transitionDelay: inView ? `${i * 150}ms` : "0ms" }}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-mist mb-6 border border-silver transition-colors duration-500 group-hover:bg-navy group-hover:border-navy">
                  <span className="font-display text-xl font-bold text-navy transition-colors duration-500 group-hover:text-gold">0{i + 1}</span>
                </div>
                <h3 className="font-sans text-[13.5px] font-semibold text-navy mb-3 uppercase tracking-wide">{step.title}</h3>
                <p className="font-sans text-[13px] leading-relaxed text-slate">{step.body}</p>
              </div>

              {/* Connecting Arrow (hidden on last item) */}
              {i < steps.length - 1 && (
                <div 
                  className={[
                    "hidden lg:flex shrink-0 transition-all duration-700 ease-out",
                    inView ? "opacity-100" : "opacity-0"
                  ].join(" ")}
                  style={{ transitionDelay: inView ? `${(i * 150) + 100}ms` : "0ms" }}
                >
                  <MoveRight size={24} className="text-silver" strokeWidth={1} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <p className="font-sans text-[14px] text-slate/80">
            Would you like to speak to our consultant over phone?{" "}
            <Link href="/contact" className="font-semibold text-navy underline underline-offset-2 hover:text-gold">Contact Us Now.</Link>
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
    <section ref={ref as React.RefObject<HTMLElement>} className="w-full bg-mist py-20 lg:py-28 border-t border-silver/40">
      <Container>
        <div 
          className={[
            "mb-12 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-end transition-all duration-1000 ease-out",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          ].join(" ")}
        >
          <div>
            <p className="eyebrow mb-4">Company values</p>
            <div className="border-l-[3px] border-gold pl-6">
              <h2 className="font-display leading-[1.1]">
                <span className="block text-[clamp(1.6rem,2.8vw,2.4rem)] font-light text-navy/70">Ten words, and the</span>
                <span className="block text-[clamp(1.6rem,2.8vw,2.4rem)] font-bold text-navy">discipline to mean them</span>
              </h2>
            </div>
          </div>
          <p className="font-sans text-[14.5px] leading-[1.85] text-slate lg:text-right max-w-sm lg:ml-auto">
            Values are worth nothing as a wall poster. These are the ones we are prepared to be measured against — including when it costs us the engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px border border-silver/40 bg-silver/40 sm:grid-cols-2 lg:grid-cols-5">
          {values.map((v, i) => (
            <div 
              key={v} 
              className={[
                "group relative bg-paper p-8 transition-all duration-500 ease-out hover:-translate-y-1 hover:z-10 hover:shadow-[0_20px_40px_rgba(26,58,92,0.1)]",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              ].join(" ")}
              style={{ transitionDelay: inView ? `${i * 50}ms` : "0ms" }}
            >
              <span className="absolute left-0 top-0 h-[3px] w-0 bg-gold transition-all duration-500 group-hover:w-full" aria-hidden />
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-slate/40 mb-4 block group-hover:text-gold transition-colors">{String(i + 1).padStart(2, "0")}</span>
              <p className="font-display text-[1.4rem] font-semibold text-navy">{v}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 4 — CTA BANNER (Full bleed image)
═══════════════════════════════════════════════════════════════ */
function EstimateBanner() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative w-full min-h-[480px] overflow-hidden">
      {/* Background image */}
      <img 
        src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop" 
        alt="Modern corporate office" 
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[20s] ease-linear hover:scale-110 grayscale-[30%]" 
      />
      {/* Dark overlay */}
      <div 
        className="absolute inset-0 bg-navy/85 backdrop-blur-[2px]" 
        style={{ background: "radial-gradient(circle at center, rgba(18,26,38,0.75) 0%, rgba(18,26,38,0.95) 100%)" }}
      />
      
      <div className="relative z-10 flex h-full min-h-[480px] flex-col items-center justify-center text-center px-6 md:px-8">
        <div 
          className={[
            "flex flex-col items-center transition-all duration-1000 ease-out",
            inView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
          ].join(" ")}
        >
          <p className="eyebrow mb-6 text-paper/85 tracking-[0.3em]">Ready to instruct?</p>
          <h2 className="font-display text-[clamp(2.2rem,4vw,3.8rem)] leading-[1.05] text-white">
            Get Started With <span className="font-bold">A Confidential Consultation</span>
          </h2>
          <p className="mt-8 max-w-xl font-sans text-[15px] leading-[1.9] text-paper/75">
            Discuss your objectives, timeline, and the most effective South African residence routes available to you. Completely confidential from first contact.
          </p>
          <div className="mt-12">
            <Link 
              href="/contact" 
              className="group inline-flex items-center gap-4 border border-white/40 px-9 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-white transition-all duration-300 hover:border-gold hover:bg-gold hover:text-navy"
            >
              Request Consultation
              <ArrowRight size={14} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 5 — OUR ADVISORS (Alternating Layout)
═══════════════════════════════════════════════════════════════ */
function OurAdvisors() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="w-full bg-paper py-20 lg:py-28 border-t border-silver/40 overflow-hidden">
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
              src="/businessman-cupped-his-hands-blue-tone.jpg" 
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
   MAIN ABOUT PAGE EXPORT
═══════════════════════════════════════════════════════════════ */
export default function AboutPageClient() {
  return (
    <>
      <GlobalPractice />
      <OurAdvisors />
      <PracticeSteps />
      <ValuesSection />
      <EstimateBanner />
    </>
  );
}
