"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Compass, ShieldCheck, Users } from "lucide-react";
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
   SECTION 1 — THE COACHING APPROACH (Navy Intro)
═══════════════════════════════════════════════════════════════ */
function CoachingApproach() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="w-full bg-navy py-20 lg:py-28 relative overflow-hidden">
      {/* Decorative noise/texture background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} aria-hidden />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left Text */}
          <div 
            className={[
              "flex flex-col gap-8 transition-all duration-1000 ease-out",
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            ].join(" ")}
          >
            <div>
              <p className="eyebrow mb-4 text-gold/90">Our Approach</p>
              <div className="border-l-[3px] border-gold pl-6">
                <h2 className="font-display leading-[1.1]">
                  <span className="block text-[clamp(1.8rem,3vw,2.5rem)] font-light text-paper/80">Beyond the paperwork.</span>
                  <span className="block text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-white">Preparing the executive.</span>
                </h2>
              </div>
            </div>
            
            <p className="font-sans text-[14.5px] leading-[1.85] text-paper/70">
              Securing residence is merely the legal threshold. The operational reality of establishing a life, managing wealth, and leading teams in a new jurisdiction requires deliberate, structured preparation.
            </p>
            <p className="font-sans text-[14.5px] leading-[1.85] text-paper/70">
              Our executive coaching practice bridges the gap between legal immigration and successful integration. We prepare high-net-worth individuals, relocating executives, and their families for the cultural, commercial, and practical nuances of the South African environment.
            </p>
            
            <div className="mt-4">
              <Link href="/book-consultation" className="group inline-flex items-center gap-4 border border-gold px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-gold transition-all duration-300 hover:bg-gold hover:text-navy">
                Book a Session
                <ArrowRight size={14} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>
          </div>

          {/* Right Image Grid */}
          <div 
            className={[
              "grid grid-cols-2 gap-4 transition-all duration-1000 delay-200 ease-out",
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            ].join(" ")}
          >
            <div className="flex flex-col gap-4 mt-12">
              <div className="aspect-[4/5] overflow-hidden shadow-2xl shadow-black/40">
                <img src="/ph6.png" alt="Executive transition" className="h-full w-full object-cover grayscale-[20%] transition-transform duration-700 hover:scale-105 hover:grayscale-0" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="aspect-[4/5] overflow-hidden shadow-2xl shadow-black/40">
                <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop" alt="Coaching session" className="h-full w-full object-cover grayscale-[20%] transition-transform duration-700 hover:scale-105 hover:grayscale-0" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 2 — COACHING MODULES (Grid from Image 3)
═══════════════════════════════════════════════════════════════ */
function CoachingModules() {
  const { ref, inView } = useInView();
  const modules = [
    { title: "Corporate Governance", body: "Mastering the local compliance imperatives and boardroom dynamics.", img: "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=600&auto=format&fit=crop" },
    { title: "Cross-Cultural Fluency", body: "Navigating the unspoken rules of South African business etiquette.", img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=600&auto=format&fit=crop" },
    { title: "Wealth Transition", body: "Aligning immigration timelines with global financial planning.", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop" },
    { title: "Spousal Integration", body: "Dedicated coaching for family stability and residential security.", img: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?q=80&w=600&auto=format&fit=crop" },
    { title: "B-BBEE Compliance", body: "Strategic advisory on Broad-Based Black Economic Empowerment.", img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600&auto=format&fit=crop" },
    { title: "Executive Presence", body: "Establishing authority and trust within a new corporate culture.", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop" },
    { title: "Market Entry Strategy", body: "Contextual knowledge required to lead effectively in South Africa.", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop" },
    { title: "Network Building", body: "Establishing critical commercial relationships and strategic partnerships.", img: "https://images.unsplash.com/photo-1556761175-5973dc0f32b7?q=80&w=600&auto=format&fit=crop" },
  ];

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="w-full bg-paper py-20 lg:py-28 border-t border-silver/40">
      <Container>
        <div 
          className={[
            "mb-16 transition-all duration-1000 ease-out",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          ].join(" ")}
        >
          <p className="eyebrow mb-4 text-gold">Executive Transition</p>
          <div className="border-l-[3px] border-gold pl-6">
            <h2 className="font-display leading-[1.1]">
              <span className="block text-[clamp(1.7rem,3vw,2.4rem)] font-light text-navy/70">Coaching Modules For</span>
              <span className="block text-[clamp(1.7rem,3vw,2.4rem)] font-bold text-navy">Private Clients</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {modules.map((mod, i) => (
            <div 
              key={mod.title} 
              className={[
                "group flex flex-col bg-white border border-silver/40 transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(26,58,92,0.08)]",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              ].join(" ")}
              style={{ transitionDelay: inView ? `${(i % 4) * 150}ms` : "0ms" }}
            >
              <div className="w-full aspect-[4/3] overflow-hidden">
                <img src={mod.img} alt={mod.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[30%] group-hover:grayscale-0" />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="font-sans text-[15px] font-bold text-navy mb-3">{mod.title}</h3>
                <p className="font-sans text-[13px] leading-relaxed text-slate mb-6 flex-1">{mod.body}</p>
                <Link href="/contact" className="inline-flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-navy transition-colors hover:text-gold">
                  Read More <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 3 — COACHING EXPERTISE (Split layout with Call Us)
═══════════════════════════════════════════════════════════════ */
function CoachingExpertise() {
  const { ref, inView } = useInView();
  
  const expertise = [
    { title: "Executive Coaching", percent: "95%" },
    { title: "Family & Spousal Integration", percent: "90%" },
    { title: "Corporate Governance Advisory", percent: "85%" },
    { title: "Wealth Structuring Nuances", percent: "98%" },
  ];

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="w-full bg-mist py-16 lg:py-28 border-t border-silver/40">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          
          {/* Left: Image with overlapping call box */}
          <div 
            className={[
              "relative transition-all duration-1000 ease-out",
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            ].join(" ")}
          >
            <div className="w-full aspect-[4/3] sm:aspect-[3/4] overflow-hidden shadow-[0_20px_50px_rgba(26,58,92,0.15)] border border-white">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" alt="Executive Coach" className="h-full w-full object-cover" />
            </div>
            
            {/* Call Us Box — positioned inside image bottom-left on tablet+ */}
            <div className="mt-4 sm:mt-0 sm:absolute sm:bottom-8 sm:-left-8 lg:-left-12 w-full sm:w-[260px] bg-white p-6 shadow-[0_20px_50px_rgba(26,58,92,0.15)] border-l-[4px] border-gold">
              <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-gold mb-2">We build for your comfort</p>
              <p className="font-sans text-[14px] text-slate mb-1">Call Us :</p>
              <p className="font-display text-[1.6rem] font-bold text-navy">+62-864-349-1</p>
            </div>
          </div>

          {/* Right: Text and Progress Bars */}
          <div 
            className={[
              "flex flex-col gap-8 transition-all duration-1000 delay-200 ease-out",
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            ].join(" ")}
          >
            <div>
              <p className="eyebrow mb-2 text-gold">You will get service</p>
              <div className="border-l-[3px] border-gold pl-6">
                <h2 className="font-display leading-[1.1]">
                  <span className="block text-[clamp(1.6rem,3vw,2.4rem)] font-light text-navy/70">Get The Best</span>
                  <span className="block text-[clamp(1.6rem,3vw,2.4rem)] font-bold text-navy">Coaching Expertise</span>
                </h2>
              </div>
              <p className="font-sans text-[14px] leading-[1.85] text-slate mt-5">
                Our bespoke advisory is built on decades of lived experience in the South African corporate landscape. We don&apos;t just process applications; we ensure you thrive upon arrival.
              </p>
            </div>

            {/* Expertise Progress Bars */}
            <div className="flex flex-col gap-5">
              {expertise.map((exp, i) => (
                <div key={exp.title} className="w-full">
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-sans text-[13px] sm:text-[13.5px] font-bold text-navy">{exp.title}</span>
                    <span className="font-sans text-[12px] font-bold text-slate/70">{exp.percent}</span>
                  </div>
                  <div className="h-[2px] w-full bg-silver/50 relative overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-gold transition-all duration-[1500ms] ease-out" 
                      style={{ width: inView ? exp.percent : "0%", transitionDelay: `${i * 200 + 400}ms` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 4 — COACHING STATS (Stats Banner from Image 1)
═══════════════════════════════════════════════════════════════ */
function CoachingStats() {
  const { ref, inView } = useInView();
  
  const stats = [
    { num: "25", suffix: "+", label: "Years of Experience" },
    { num: "450", suffix: "+", label: "Executives Transitioned" },
    { num: "12", suffix: "", label: "Global Jurisdictions" },
    { num: "100", suffix: "%", label: "Confidentiality Record" },
  ];

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="w-full bg-navy py-16 relative overflow-hidden">
      {/* Decorative lines/angles similar to image 1 but subtle */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
         <div className="absolute h-[200%] w-[1px] bg-white left-[20%] -top-1/2 -rotate-[30deg]" />
         <div className="absolute h-[200%] w-[1px] bg-white left-[50%] -top-1/2 -rotate-[30deg]" />
         <div className="absolute h-[200%] w-[1px] bg-white left-[80%] -top-1/2 -rotate-[30deg]" />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x md:divide-white/10 text-center">
          {stats.map((stat, i) => (
            <div 
              key={stat.label}
              className={[
                "flex flex-col items-center justify-center transition-all duration-1000 ease-out",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              ].join(" ")}
              style={{ transitionDelay: inView ? `${i * 150}ms` : "0ms" }}
            >
              <div className="flex items-start text-white mb-2">
                <span className="font-display text-[2.5rem] md:text-[3rem] font-bold leading-none">{inView ? stat.num : "0"}</span>
                <span className="font-sans text-[1.2rem] font-bold text-gold ml-1">{stat.suffix}</span>
              </div>
              <p className="font-sans text-[13px] text-paper/70 font-medium uppercase tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 3 — THE DIFFERENCE (Premium Cards)
═══════════════════════════════════════════════════════════════ */
function CoachingDifference() {
  const { ref, inView } = useInView();
  
  const differences = [
    { icon: ShieldCheck, title: "Absolute Discretion", body: "Coaching sessions are conducted under strict confidentiality. Your challenges and strategic discussions never leave the room." },
    { icon: Compass, title: "Bespoke Curriculum", body: "There is no standard syllabus. Every engagement begins with an audit of your specific corporate and family needs." },
    { icon: Users, title: "1-on-1 Advisory", body: "Direct, unfiltered access to senior advisors who have navigated these exact transitions for decades." }
  ];

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="w-full bg-mist py-20 lg:py-28 border-t border-silver/40">
      <Container>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center">
          
          {/* Header */}
          <div 
            className={[
              "lg:col-span-4 transition-all duration-1000 ease-out",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            ].join(" ")}
          >
            <p className="eyebrow mb-4">Why Tide Global</p>
            <div className="border-l-[3px] border-gold pl-6 mb-6">
              <h2 className="font-display text-[clamp(1.8rem,3vw,2.4rem)] font-bold leading-[1.1] text-navy">
                Coaching designed for the discerning.
              </h2>
            </div>
            <p className="font-sans text-[14px] leading-[1.85] text-slate">
              We do not offer generic motivational coaching. Our practice delivers highly specific, actionable, and confidential strategic advisory tailored to the high-stakes reality of relocating leaders.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-px bg-silver/40 border border-silver/40">
            {differences.map((diff, i) => (
              <div 
                key={diff.title}
                className={[
                  "group relative bg-paper p-8 transition-all duration-700 ease-out hover:-translate-y-2 hover:z-10 hover:shadow-[0_20px_40px_rgba(26,58,92,0.1)]",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                ].join(" ")}
                style={{ transitionDelay: inView ? `${(i * 100) + 200}ms` : "0ms" }}
              >
                <span className="absolute left-0 top-0 h-[3px] w-0 bg-gold transition-all duration-500 group-hover:w-full" aria-hidden />
                <diff.icon size={32} strokeWidth={1.25} className="text-gold mb-6 transition-transform duration-500 group-hover:scale-110" aria-hidden />
                <h3 className="font-sans text-[14px] font-semibold text-navy mb-3">{diff.title}</h3>
                <p className="font-sans text-[13px] leading-relaxed text-slate">{diff.body}</p>
              </div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 4 — CTA BANNER (Full bleed image)
═══════════════════════════════════════════════════════════════ */
function CoachingBanner() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative w-full min-h-[480px] overflow-hidden">
      {/* Background image */}
      <img 
        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop" 
        alt="Corporate skyline" 
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[20s] ease-linear hover:scale-110 grayscale-[20%]" 
      />
      {/* Dark overlay */}
      <div 
        className="absolute inset-0 bg-navy/85 backdrop-blur-[2px]" 
        style={{ background: "radial-gradient(circle at center, rgba(18,26,38,0.7) 0%, rgba(18,26,38,0.95) 100%)" }}
      />
      
      <div className="relative z-10 flex h-full min-h-[480px] flex-col items-center justify-center text-center px-6 md:px-8">
        <div 
          className={[
            "flex flex-col items-center transition-all duration-1000 ease-out",
            inView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
          ].join(" ")}
        >
          <p className="eyebrow mb-6 text-paper/85 tracking-[0.3em]">Ready to begin?</p>
          <h2 className="font-display text-[clamp(2.2rem,4vw,3.8rem)] leading-[1.05] text-white">
            Secure Your <span className="font-bold">Strategic Advantage</span>
          </h2>
          <p className="mt-8 max-w-xl font-sans text-[15px] leading-[1.9] text-paper/75">
            Discuss your transition objectives with a specialist advisor. Every coaching session is structured around your specific operational realities and conducted in strict confidence.
          </p>
          <div className="mt-12">
            <Link 
              href="/book-consultation" 
              className="group inline-flex items-center gap-4 border border-white/40 px-9 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-white transition-all duration-300 hover:border-gold hover:bg-gold hover:text-navy"
            >
              Request a Session
              <ArrowRight size={14} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COACHING PAGE EXPORT
═══════════════════════════════════════════════════════════════ */
export default function CoachingPageClient() {
  return (
    <>
      <CoachingApproach />
      <CoachingModules />
      <CoachingExpertise />
      <CoachingStats />
      <CoachingDifference />
      <CoachingBanner />
    </>
  );
}
