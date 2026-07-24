"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { journey } from "@/lib/content";
import { Container } from "./ui/Section";

/* One background image per journey step */
const STEP_IMAGES = [
  "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1400&auto=format&fit=crop", // Step 1: Initial Consultation
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&auto=format&fit=crop", // Step 2: Strategic Assessment
  "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1400&auto=format&fit=crop", // Step 3: Tailored Strategy
  "/Preparation%20%26%20documentation.jpg", // Step 4: Preparation & Documentation
  "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1400&auto=format&fit=crop", // Step 5: Submission & Case Management
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1400&auto=format&fit=crop", // Step 6: Outcome & Beyond
];

const STEP_H = 158; // px — height of a single step row
const VISIBLE = 4; // steps shown in the window at once (only up to 04 at first)
const CARD_H = STEP_H * VISIBLE; // 632px

export default function JourneySection() {
  const wrapRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  /**
   * Mobile is the server-rendered default. Assuming desktop instead made phones
   * paint a ~330vh empty block (the pinned-scroll height) for the frame before
   * hydration; the reverse costs desktop one frame of the stacked layout.
   */
  const [isDesktop, setIsDesktop] = useState(false);

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
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = Number(entry.target.getAttribute("data-index"));
              setActive(index);
            }
          });
        },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      const elements = document.querySelectorAll(".journey-step");
      elements.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
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
      <div className={isDesktop ? "sticky top-0 flex h-screen items-center" : "py-14 sm:py-16 md:py-20"}>
        <Container className="w-full">
          <div className="grid grid-cols-1 overflow-visible border border-line bg-paper lg:grid-cols-[42%_1fr] lg:overflow-hidden">

            {/* ── Left image — crossfades to the active step ─────────── */}
            {/* On phones it pins just under the fixed navbar, so the photo keeps
                pace with whichever step is being read. */}
            <div
              className={isDesktop ? "relative overflow-hidden" : "sticky top-[68px] z-20 h-[210px] overflow-hidden shadow-md sm:top-[76px] sm:h-[250px]"}
              style={isDesktop ? { height: CARD_H } : undefined}
            >
              {STEP_IMAGES.map((src, idx) => (
                <div
                  key={idx}
                  className="absolute inset-0 transition-opacity duration-700 ease-out"
                  style={{ opacity: idx === active ? 1 : 0 }}
                >
                  <img src={src} alt="" aria-hidden loading="lazy" className="h-full w-full object-cover object-center" />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(26,58,92,0.28) 0%, rgba(26,58,92,0.42) 48%, rgba(26,58,92,0.86) 100%)",
                    }}
                  />
                </div>
              ))}

              <div className="relative z-10 flex h-full flex-col justify-end p-5 sm:p-8 lg:p-12">
                {isDesktop && (
                  <>
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
                  </>
                )}
                {!isDesktop && (
                  <div>
                    <p className="eyebrow mb-2 text-gold/90">The private client experience</p>
                    <h2 className="font-display text-[1.6rem] font-bold leading-[1.1] text-white sm:text-[1.8rem]">
                      How an engagement runs
                    </h2>
                    {/* Step counter — tells you where you are while the list scrolls */}
                    <p className="mt-2 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
                      Step {String(active + 1).padStart(2, "0")} of {String(journey.length).padStart(2, "0")}
                    </p>
                  </div>
                )}
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
                      data-index={i}
                      className={[
                        "journey-step flex flex-col justify-center border-l-2 px-5 py-6 transition-all duration-500 sm:px-8 sm:py-7 lg:px-12 lg:py-0",
                        i < journey.length - 1 ? "border-b border-b-silver" : "",
                        activeStep ? "border-l-gold bg-paper shadow-[-4px_0_15px_-3px_rgba(201,160,80,0.4)]" : "border-l-transparent bg-mist",
                      ].join(" ")}
                      style={isDesktop ? { height: STEP_H } : undefined}
                    >
                      <div className="flex items-start gap-4 sm:gap-5">
                        <span
                          className={[
                            "mt-0.5 shrink-0 font-sans text-[13px] font-bold tracking-[0.12em] transition-colors duration-300 sm:mt-1",
                            lit ? "text-gold" : "text-silver/70",
                          ].join(" ")}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0">
                          <h3
                            className={[
                              "font-display text-[1.2rem] font-semibold leading-snug transition-colors duration-300 sm:text-[1.3rem]",
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

          {/* Phones lose the CTA that lives inside the desktop photo panel */}
          {!isDesktop && (
            <Link
              href="/experience"
              className="group mt-4 inline-flex w-full items-center justify-center gap-3 border border-navy px-6 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-navy transition-all duration-300 hover:bg-navy hover:text-white"
            >
              The full journey
              <ArrowRight size={14} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          )}
        </Container>
      </div>
    </section>
  );
}
