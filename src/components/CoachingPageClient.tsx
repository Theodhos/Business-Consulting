"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Compass, ShieldCheck, Users } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { site } from "@/lib/content";

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
    <section ref={ref as React.RefObject<HTMLElement>} className="relative w-full overflow-hidden bg-navy py-14 sm:py-20 lg:py-28">
      {/* Decorative noise/texture background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} aria-hidden />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-10 sm:gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left Text */}
          <div
            className={[
              "flex flex-col gap-6 transition-all duration-1000 ease-out sm:gap-8",
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-y-6 md:translate-y-0 md:-translate-x-12"
            ].join(" ")}
          >
            <div>
              <p className="eyebrow mb-4 text-gold/90">Our Approach</p>
              <div className="border-l-[3px] border-gold pl-5 sm:pl-6">
                <h2 className="font-display leading-[1.1]">
                  <span className="block text-[clamp(1.65rem,6vw,2.5rem)] font-light text-paper/80">Beyond the paperwork.</span>
                  <span className="block text-[clamp(1.65rem,6vw,2.5rem)] font-bold text-white">Preparing the executive.</span>
                </h2>
              </div>
            </div>

            <p className="font-sans text-[14.5px] leading-[1.85] text-paper/70">
              Securing residence is merely the legal threshold. The operational reality of establishing a life, managing wealth, and leading teams in a new jurisdiction requires deliberate, structured preparation.
            </p>
            <p className="font-sans text-[14.5px] leading-[1.85] text-paper/70">
              Our executive coaching practice bridges the gap between legal immigration and successful integration. We prepare high-net-worth individuals, relocating executives, and their families for the cultural, commercial, and practical nuances of the South African environment.
            </p>

            <div className="mt-2 sm:mt-4">
              <Link href="/book-consultation" className="group inline-flex w-full items-center justify-center gap-4 border border-gold px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-gold transition-all duration-300 hover:bg-gold hover:text-navy sm:w-auto sm:tracking-[0.24em]">
                Book a Session
                <ArrowRight size={14} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>
          </div>

          {/* Right Image Grid */}
          <div
            className={[
              "grid grid-cols-2 gap-3 transition-all duration-1000 delay-200 ease-out sm:gap-4",
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-y-6 md:translate-y-0 md:translate-x-12"
            ].join(" ")}
          >
            <div className="mt-8 flex flex-col gap-3 sm:mt-12 sm:gap-4">
              <div className="aspect-[4/5] overflow-hidden shadow-2xl shadow-black/40">
                <img src="/ph6.png" alt="Executive transition" loading="lazy" className="h-full w-full object-cover grayscale-[20%] transition-transform duration-700 hover:scale-105 hover:grayscale-0" />
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="aspect-[4/5] overflow-hidden shadow-2xl shadow-black/40">
                <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop" alt="Coaching session" loading="lazy" className="h-full w-full object-cover grayscale-[20%] transition-transform duration-700 hover:scale-105 hover:grayscale-0" />
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
    { title: "Network Building", body: "Establishing critical commercial relationships and strategic partnerships.", img: "/businesspeople-having-discussion-office.jpg" },
  ];

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="w-full bg-paper py-14 sm:py-20 lg:py-28 border-t border-silver/40">
      <Container>
        <div
          className={[
            "mb-10 transition-all duration-1000 ease-out sm:mb-16",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          ].join(" ")}
        >
          <p className="eyebrow mb-4 text-gold">Executive Transition</p>
          <div className="border-l-[3px] border-gold pl-5 sm:pl-6">
            <h2 className="font-display leading-[1.1]">
              <span className="block text-[clamp(1.6rem,5.8vw,2.4rem)] font-light text-navy/70">Coaching Modules For</span>
              <span className="block text-[clamp(1.6rem,5.8vw,2.4rem)] font-bold text-navy">Private Clients</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {modules.map((mod, i) => (
            <div 
              key={mod.title} 
              className={[
                "group flex flex-col bg-white border border-silver/40 transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(26,58,92,0.08)]",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              ].join(" ")}
              style={{ transitionDelay: inView ? `${(i % 4) * 150}ms` : "0ms" }}
            >
              <div className="aspect-[16/9] w-full overflow-hidden sm:aspect-[4/3]">
                <img
                  src={mod.img}
                  alt={mod.title}
                  loading="lazy"
                  className={[
                    "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[30%] group-hover:grayscale-0",
                    mod.title === "Network Building" ? "object-[center_82%]" : "object-center",
                  ].join(" ")}
                />
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <h3 className="mb-2.5 font-sans text-[15px] font-bold text-navy sm:mb-3">{mod.title}</h3>
                <p className="mb-5 flex-1 font-sans text-[13px] leading-relaxed text-slate sm:mb-6">{mod.body}</p>
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
    <section ref={ref as React.RefObject<HTMLElement>} className="w-full bg-mist py-14 sm:py-16 lg:py-28 border-t border-silver/40">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-20">
          
          {/* Left: Image with overlapping call box */}
          <div 
            className={[
              "relative transition-all duration-1000 ease-out",
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-y-6 md:translate-y-0 md:-translate-x-12"
            ].join(" ")}
          >
            <div className="aspect-[4/3] w-full overflow-hidden border border-white shadow-[0_20px_50px_rgba(26,58,92,0.15)] sm:aspect-[3/4]">
              <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=800&auto=format&fit=crop" alt="Executive Coach" loading="lazy" className="h-full w-full object-cover" />
            </div>

            {/* Call Us Box — sits under the photo on phones, then overlaps its
                bottom-left corner from md, where there is room to hang outside
                the column without reaching past the viewport. */}
            <div className="-mt-6 w-[92%] border-l-[4px] border-gold bg-white p-5 shadow-[0_20px_50px_rgba(26,58,92,0.15)] sm:p-6 md:absolute md:bottom-8 md:-left-6 md:mt-0 md:w-[260px] lg:-left-12">
              <p className="mb-2 font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-gold sm:tracking-[0.2em]">We build for your comfort</p>
              <p className="mb-1 font-sans text-[14px] text-slate">Call Us :</p>
              <a
                href={site.phoneHref}
                className="block font-display text-[1.45rem] font-bold text-navy transition-colors hover:text-gold sm:text-[1.6rem]"
              >
                {site.phone}
              </a>
            </div>
          </div>

          {/* Right: Text and Progress Bars */}
          <div 
            className={[
              "flex flex-col gap-7 transition-all duration-1000 delay-200 ease-out sm:gap-8",
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-y-6 md:translate-y-0 md:translate-x-12"
            ].join(" ")}
          >
            <div>
              <p className="eyebrow mb-2 text-gold">You will get service</p>
              <div className="border-l-[3px] border-gold pl-5 sm:pl-6">
                <h2 className="font-display leading-[1.1]">
                  <span className="block text-[clamp(1.55rem,5.8vw,2.4rem)] font-light text-navy/70">Get The Best</span>
                  <span className="block text-[clamp(1.55rem,5.8vw,2.4rem)] font-bold text-navy">Coaching Expertise</span>
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
    <section ref={ref as React.RefObject<HTMLElement>} className="relative w-full overflow-hidden bg-navy py-12 sm:py-16">
      {/* Decorative lines/angles similar to image 1 but subtle */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
         <div className="absolute h-[200%] w-[1px] bg-white left-[20%] -top-1/2 -rotate-[30deg]" />
         <div className="absolute h-[200%] w-[1px] bg-white left-[50%] -top-1/2 -rotate-[30deg]" />
         <div className="absolute h-[200%] w-[1px] bg-white left-[80%] -top-1/2 -rotate-[30deg]" />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-2 gap-x-4 gap-y-9 divide-x-0 text-center sm:gap-8 md:grid-cols-4 md:gap-4 md:divide-x md:divide-white/10">
          {stats.map((stat, i) => (
            <div 
              key={stat.label}
              className={[
                "flex flex-col items-center justify-center transition-all duration-1000 ease-out",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              ].join(" ")}
              style={{ transitionDelay: inView ? `${i * 150}ms` : "0ms" }}
            >
              <div className="mb-2 flex items-start text-white">
                <span className="font-display text-[2.2rem] font-bold leading-none sm:text-[2.5rem] md:text-[3rem]">{inView ? stat.num : "0"}</span>
                <span className="ml-1 font-sans text-[1.1rem] font-bold text-gold sm:text-[1.2rem]">{stat.suffix}</span>
              </div>
              <p className="font-sans text-[12px] font-medium uppercase tracking-wide text-paper/70 sm:text-[13px]">{stat.label}</p>
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
    <section ref={ref as React.RefObject<HTMLElement>} className="w-full bg-mist py-14 sm:py-20 lg:py-28 border-t border-silver/40">
      <Container>
        <div className="grid grid-cols-1 gap-10 sm:gap-14 lg:grid-cols-12 lg:items-center">

          {/* Header */}
          <div
            className={[
              "lg:col-span-4 transition-all duration-1000 ease-out",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            ].join(" ")}
          >
            <p className="eyebrow mb-4">Why Tide Global</p>
            <div className="mb-5 border-l-[3px] border-gold pl-5 sm:mb-6 sm:pl-6">
              <h2 className="font-display text-[clamp(1.65rem,6vw,2.4rem)] font-bold leading-[1.1] text-navy">
                Coaching designed for the discerning.
              </h2>
            </div>
            <p className="font-sans text-[14px] leading-[1.85] text-slate">
              We do not offer generic motivational coaching. Our practice delivers highly specific, actionable, and confidential strategic advisory tailored to the high-stakes reality of relocating leaders.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 gap-px border border-silver/40 bg-silver/40 sm:grid-cols-3 lg:col-span-8">
            {differences.map((diff, i) => (
              <div
                key={diff.title}
                className={[
                  "group relative bg-paper p-6 transition-all duration-700 ease-out hover:z-10 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(26,58,92,0.1)] sm:p-8",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                ].join(" ")}
                style={{ transitionDelay: inView ? `${(i * 100) + 200}ms` : "0ms" }}
              >
                <span className="absolute left-0 top-0 h-[3px] w-0 bg-gold transition-all duration-500 group-hover:w-full" aria-hidden />
                <diff.icon size={28} strokeWidth={1.25} className="mb-4 text-gold transition-transform duration-500 group-hover:scale-110 sm:mb-6 sm:size-8" aria-hidden />
                <h3 className="mb-2.5 font-sans text-[14px] font-semibold text-navy sm:mb-3">{diff.title}</h3>
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
   SECTION 5 — CONFIDENTIALITY COMMITMENT (Replaces redundant CTA)
═══════════════════════════════════════════════════════════════ */
function CoachingCommitment() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="w-full overflow-hidden bg-paper pt-14 pb-28 sm:pt-20 sm:pb-32 lg:pt-28 lg:pb-48">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <div
            className={[
              "transition-all duration-1000 ease-out",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            ].join(" ")}
          >
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-silver/60 bg-mist sm:h-16 sm:w-16">
              <ShieldCheck size={28} className="text-gold" strokeWidth={1.5} />
            </div>
            <h2 className="font-display text-[clamp(1.35rem,5.2vw,2.4rem)] font-light leading-[1.35] text-navy sm:leading-[1.3]">
              Executive transitions involve sensitive corporate restructuring and family affairs. Our primary commitment is <span className="font-bold text-gold">absolute discretion</span> before, during, and after your engagement.
            </h2>
            <p className="mt-6 font-sans text-[10.5px] font-bold uppercase tracking-[0.16em] text-slate sm:mt-8 sm:text-[11px] sm:tracking-[0.2em]">
              — The Coaching Advisory Board
            </p>
          </div>
        </div>
      </Container>
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
      <CoachingCommitment />
    </>
  );
}
