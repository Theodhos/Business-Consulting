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

const STEP_H = 158; // px — height of a single step row
const VISIBLE = 4; // steps shown in the window at once (only up to 04 at first)
const CARD_H = STEP_H * VISIBLE; // 632px

export default function JourneySection() {
  const wrapRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  /* Only pin + drive on desktop; mobile shows a simple stacked list */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  /* While the section is pinned, map scroll progress → active step.
     The section is taller than the viewport; as you scroll through it the
     card stays fixed, only the photo and the step window change. */
  useEffect(() => {
    if (!isDesktop) {
      setActive(0);
      return;
    }
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), total);
      const progress = total > 0 ? scrolled / total : 0;
      const idx = Math.min(journey.length - 1, Math.floor(progress * journey.length));
      setActive(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isDesktop]);

  /* Slide the list up once we pass step 04, so 05 then 06 appear in the
     bottom slot where 04 was. */
  const shift = isDesktop ? Math.max(0, active - (VISIBLE - 1)) * STEP_H : 0;

  return (
    <section
      ref={wrapRef}
      className="relative w-full border-t border-line bg-mist"
      style={isDesktop ? { height: `${journey.length * 55}vh` } : undefined}
    >
      <div className={isDesktop ? "sticky top-0 flex h-screen items-center" : "py-20 md:py-28"}>
        <Container className="w-full">
          <div className="grid grid-cols-1 overflow-hidden border border-line bg-paper lg:grid-cols-[42%_1fr]">

            {/* ── Left image — crossfades to the active step ─────────── */}
            <div
              className="relative min-h-[420px] overflow-hidden"
              style={isDesktop ? { height: CARD_H } : undefined}
            >
              {STEP_IMAGES.map((src, idx) => (
                <div
                  key={idx}
                  className="absolute inset-0 transition-opacity duration-700 ease-out"
                  style={{ opacity: idx === active ? 1 : 0 }}
                >
                  <img src={src} alt="" aria-hidden className="h-full w-full object-cover object-center" />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(26,58,92,0.28) 0%, rgba(26,58,92,0.42) 48%, rgba(26,58,92,0.86) 100%)",
                    }}
                  />
                </div>
              ))}

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

            {/* ── Right step window — advances on scroll ─────────────── */}
            <div
              className={isDesktop ? "relative overflow-hidden" : "relative"}
              style={isDesktop ? { height: CARD_H } : undefined}
            >
              <ol
                className="transition-transform duration-500 ease-out"
                style={{ transform: `translateY(-${shift}px)` }}
              >
                {journey.map((step, i) => {
                  const activeStep = active === i;
                  const lit = activeStep || !isDesktop;
                  return (
                    <li
                      key={step.title}
                      className={[
                        "flex flex-col justify-center border-l-2 px-8 transition-all duration-500 lg:px-12",
                        i < journey.length - 1 ? "border-b border-b-silver" : "",
                        activeStep ? "border-l-gold bg-paper" : "border-l-transparent bg-mist",
                      ].join(" ")}
                      style={isDesktop ? { height: STEP_H } : { minHeight: STEP_H, paddingTop: 28, paddingBottom: 28 }}
                    >
                      <div className="flex items-start gap-5">
                        <span
                          className={[
                            "mt-1 shrink-0 font-sans text-[13px] font-bold tracking-[0.12em] transition-colors duration-300",
                            lit ? "text-gold" : "text-silver/70",
                          ].join(" ")}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h3
                            className={[
                              "font-display text-[1.3rem] font-semibold leading-snug transition-colors duration-300",
                              lit ? "text-navy" : "text-navy/40",
                            ].join(" ")}
                          >
                            {step.title}
                          </h3>
                          <p
                            className={[
                              "mt-2 font-sans text-[13.5px] leading-relaxed transition-colors duration-300",
                              lit ? "text-slate" : "text-slate/40",
                            ].join(" ")}
                          >
                            {step.body}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

          </div>
        </Container>
      </div>
    </section>
  );
}
