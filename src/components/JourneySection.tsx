"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { journey } from "@/lib/content";
import { Container } from "./ui/Section";

/* One background image per journey step */
const STEP_IMAGES = [
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1400&auto=format&fit=crop", // confidential enquiry
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1400&auto=format&fit=crop", // strategic assessment
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1400&auto=format&fit=crop", // tailored strategy
  "https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=1400&auto=format&fit=crop", // preparation & documentation
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1400&auto=format&fit=crop", // submission & case management
  "https://images.unsplash.com/photo-1521791055366-0d553872952f?q=80&w=1400&auto=format&fit=crop", // outcome & beyond
];

export default function JourneySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3); // Start with 3 visible
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  /* ── Intersection Observer: track which step is most in view ── */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((el, idx) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(idx);
          }
        },
        {
          root: null,
          rootMargin: "-40% 0px -40% 0px", // triggers when item is ~centred in viewport
          threshold: 0,
        }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [visibleCount]); // re-run when more items are revealed

  /* ── Scroll listener: reveal more items as user scrolls down ── */
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const scrolledIntoSection = -rect.top; // px scrolled past section top
      if (scrolledIntoSection < 0) return;

      // Reveal one more item every ~180px of scroll inside the section
      const newCount = Math.min(
        journey.length,
        3 + Math.floor(scrolledIntoSection / 180)
      );
      setVisibleCount(newCount);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-mist">

      {/* ── Sticky left panel with background image ─────────────── */}
      <div className="hidden lg:block">
        <div className="sticky top-0 float-left h-screen w-[42%] overflow-hidden">
          {/* Background images — crossfade on activeIndex change */}
          {STEP_IMAGES.map((src, idx) => (
            <div
              key={idx}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: idx === activeIndex ? 1 : 0 }}
            >
              <img
                src={src}
                alt=""
                aria-hidden
                className="h-full w-full object-cover object-center"
              />
              {/* Navy scrim so it doesn't compete with text */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(26,58,92,0.70) 0%, rgba(26,58,92,0.45) 100%)",
                }}
              />
            </div>
          ))}

          {/* Overlay text on the left sticky panel */}
          <div className="relative z-10 flex h-full flex-col justify-end p-12 pb-16">
            {/* Eyebrow */}
            <p className="eyebrow mb-5 text-gold/90">The private client experience</p>
            {/* Cormorant Garamond Bold — heading */}
            <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.1] text-white">
              How an engagement runs
            </h2>
            {/* Inter Regular — lead */}
            <p className="mt-5 max-w-xs font-sans text-[14.5px] leading-relaxed text-white/70">
              Six stages from first conversation to long after approval. You always know which one
              you are in.
            </p>
            {/* Gold rule */}
            <span className="mt-8 block h-[2px] w-10 bg-gold" />
            {/* CTA */}
            <Link
              href="/experience"
              className="group mt-8 inline-flex items-center gap-3 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:text-gold"
            >
              The full journey
              <ArrowRight size={14} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Right scrollable step list ───────────────────────────── */}
      <div className="lg:ml-[42%]">
        {/* Mobile heading (hidden on desktop — left panel has it) */}
        <div className="border-b border-silver px-8 py-12 lg:hidden">
          <p className="eyebrow mb-4">The private client experience</p>
          <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-navy">
            How an engagement runs
          </h2>
          <p className="lead mt-4">
            Six stages from first conversation to long after approval. You always know which one
            you are in.
          </p>
        </div>

        <ol>
          {journey.map((step, i) => {
            const visible = i < visibleCount;
            return (
              <li
                key={step.title}
                ref={(el) => { itemRefs.current[i] = el; }}
                className={[
                  "flex gap-8 border-b border-silver px-8 py-10 lg:px-14 lg:py-14",
                  "transition-all duration-700",
                  visible
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-8 opacity-0",
                  activeIndex === i ? "bg-paper" : "bg-mist",
                ].join(" ")}
                style={{ transitionDelay: visible ? `${(i - 3) * 80}ms` : "0ms" }}
              >
                {/* Gold step number — Inter Bold */}
                <span
                  className={[
                    "mt-1 shrink-0 font-sans text-[13px] font-bold tracking-[0.12em] transition-colors duration-300",
                    activeIndex === i ? "text-gold" : "text-silver",
                  ].join(" ")}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div>
                  {/* Cormorant Garamond SemiBold — step title */}
                  <h3
                    className={[
                      "font-display text-[1.3rem] font-semibold leading-snug transition-colors duration-300",
                      activeIndex === i ? "text-navy" : "text-navy/60",
                    ].join(" ")}
                  >
                    {step.title}
                  </h3>
                  {/* Inter Regular — step body */}
                  <p
                    className={[
                      "mt-2 font-sans text-[14px] leading-relaxed transition-colors duration-300",
                      activeIndex === i ? "text-slate" : "text-slate/50",
                    ].join(" ")}
                  >
                    {step.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Bottom spacer so last item can scroll to centre */}
        <div className="h-24 bg-mist" />
      </div>

      {/* Clearfix for the float */}
      <div className="clear-both" />
    </section>
  );
}
