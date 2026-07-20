"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { journey } from "@/lib/content";
import { Section } from "./ui/Section";

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
  /* Which step is highlighted — driven by scroll position */
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  /* ── As the user scrolls, the step nearest the viewport centre becomes
        active — which lights it up and crossfades the left-hand photo. ── */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    itemRefs.current.forEach((el, idx) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(idx);
        },
        {
          root: null,
          rootMargin: "-45% 0px -45% 0px", // a thin band across the viewport centre
          threshold: 0,
        }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <Section tone="mist">
      {/* Contained card: left image panel + right step list.
          The grid stretches the image column to the full height of all six
          steps, so the list never spills below the photo. */}
      <div className="grid grid-cols-1 overflow-hidden border border-line bg-paper lg:grid-cols-[42%_1fr]">

        {/* ── Left image panel — crossfades to the scrolled-to step ──── */}
        <div className="relative min-h-[380px] overflow-hidden">
          {STEP_IMAGES.map((src, idx) => (
            <div
              key={idx}
              className="absolute inset-0 transition-opacity duration-700 ease-out"
              style={{ opacity: idx === activeIndex ? 1 : 0 }}
            >
              <img
                src={src}
                alt=""
                aria-hidden
                className="h-full w-full object-cover object-center"
              />
              {/* Lighter scrim up top so the photo reads clearly, deeper at
                  the bottom so the overlay text stays legible. */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(26,58,92,0.28) 0%, rgba(26,58,92,0.42) 48%, rgba(26,58,92,0.86) 100%)",
                }}
              />
            </div>
          ))}

          {/* Overlay text — bottom-aligned */}
          <div className="relative z-10 flex h-full flex-col justify-end p-10 lg:p-12">
            <p className="eyebrow mb-5 text-gold/90">The private client experience</p>
            <h2 className="font-display text-[clamp(1.9rem,3vw,2.7rem)] font-bold leading-[1.1] text-white">
              How an engagement runs
            </h2>
            <p className="mt-5 max-w-xs font-sans text-[14.5px] leading-relaxed text-white/75">
              Six stages from first conversation to long after approval. You always know which one
              you are in.
            </p>
            <span className="mt-8 block h-[2px] w-10 bg-gold" />
            <Link
              href="/experience"
              className="group mt-8 inline-flex items-center gap-3 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:text-gold"
            >
              The full journey
              <ArrowRight size={14} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>

        {/* ── Right step list — the active step lights up on scroll ──── */}
        <ol className="flex flex-col">
          {journey.map((step, i) => {
            const active = activeIndex === i;
            return (
              <li
                key={step.title}
                ref={(el) => { itemRefs.current[i] = el; }}
                className={[
                  "flex flex-1 gap-6 border-l-2 px-8 py-8 lg:px-12 transition-all duration-500",
                  i < journey.length - 1 ? "border-b border-b-silver" : "",
                  active ? "border-l-gold bg-paper" : "border-l-transparent bg-mist",
                ].join(" ")}
              >
                {/* Gold step number — Inter Bold */}
                <span
                  className={[
                    "mt-1 shrink-0 font-sans text-[13px] font-bold tracking-[0.12em] transition-colors duration-300",
                    active ? "text-gold" : "text-silver/70",
                  ].join(" ")}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div>
                  {/* Cormorant Garamond SemiBold — step title */}
                  <h3
                    className={[
                      "font-display text-[1.3rem] font-semibold leading-snug transition-colors duration-300",
                      active ? "text-navy" : "text-navy/40",
                    ].join(" ")}
                  >
                    {step.title}
                  </h3>
                  {/* Inter Regular — step body */}
                  <p
                    className={[
                      "mt-2 font-sans text-[14px] leading-relaxed transition-colors duration-300",
                      active ? "text-slate" : "text-slate/40",
                    ].join(" ")}
                  >
                    {step.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
