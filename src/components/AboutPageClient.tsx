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
   SECTION 1 — GLOBAL PRACTICE (Map and Text)
═══════════════════════════════════════════════════════════════ */
function GlobalPractice() {
  const { ref, inView } = useInView();
  
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative w-full bg-navy py-16 lg:py-28 overflow-hidden">
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
   SECTION 2 — THE PRACTICE TODAY (Elegant Vertical/Staggered Layout)
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
    <section ref={ref as React.RefObject<HTMLElement>} className="w-full bg-paper py-20 lg:py-32 overflow-hidden">
      <Container>
        <div 
          className={[
            "mb-20 text-center transition-all duration-1000 ease-out",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          ].join(" ")}
        >
          <p className="eyebrow mb-4">The practice today</p>
          <h2 className="font-display text-[clamp(2rem,3.3vw,2.8rem)] font-light leading-[1.05] text-navy mx-auto max-w-2xl">
            What that model looks like in <span className="font-bold text-gold">daily practice</span>
          </h2>
        </div>

        {/* Vertical Sleek Timeline */}
        <div className="relative mx-auto max-w-3xl">
          {/* Connecting vertical line */}
          <div className="absolute left-[27px] sm:left-1/2 top-0 bottom-0 w-px bg-silver/40 sm:-translate-x-1/2" aria-hidden />

          <div className="space-y-16 sm:space-y-24">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <div 
                  key={step.title} 
                  className={[
                    "relative flex flex-col sm:flex-row items-start sm:items-center gap-10 group transition-all duration-700 ease-out",
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
                  ].join(" ")}
                  style={{ transitionDelay: inView ? `${i * 150}ms` : "0ms" }}
                >
                  {/* Content Left (on desktop) */}
                  <div className={`hidden sm:block w-1/2 pr-16 text-right ${isEven ? "" : "order-3 pl-16 text-left pr-0"}`}>
                    <h3 className="font-display text-[1.4rem] font-semibold text-navy mb-3 transition-colors duration-300 group-hover:text-gold">{step.title}</h3>
                    <p className="font-sans text-[14px] leading-relaxed text-slate/80">{step.body}</p>
                  </div>

                  {/* Node */}
                  <div className={`relative z-10 shrink-0 bg-paper ${isEven ? "sm:order-2" : "sm:order-2"}`}>
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white border border-silver/50 shadow-[0_8px_20px_rgba(26,58,92,0.04)] transition-all duration-500 group-hover:border-gold group-hover:shadow-[0_12px_30px_rgba(182,143,82,0.2)] group-hover:scale-110">
                      <span className="font-sans text-[12px] font-bold tracking-widest text-navy transition-colors duration-500 group-hover:text-gold">0{i + 1}</span>
                    </div>
                  </div>

                  {/* Content Right (or mobile) */}
                  <div className={`w-full sm:w-1/2 pl-6 sm:pl-16 ${isEven ? "sm:order-3" : "hidden sm:block sm:order-1"}`}>
                    <div className={isEven ? "" : "hidden"}>
                      <h3 className="font-display text-[1.4rem] font-semibold text-navy mb-3 transition-colors duration-300 group-hover:text-gold">{step.title}</h3>
                      <p className="font-sans text-[14px] leading-relaxed text-slate/80">{step.body}</p>
                    </div>
                  </div>

                  {/* Mobile content block (shows only on small screens) */}
                  <div className="sm:hidden pl-20 -mt-16 w-full">
                    <h3 className="font-display text-[1.3rem] font-semibold text-navy mb-2 transition-colors duration-300 group-hover:text-gold">{step.title}</h3>
                    <p className="font-sans text-[13.5px] leading-relaxed text-slate/80">{step.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
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
      <AboutLeadership />
    </>
  );
}
