"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Container } from "./ui/Section";

/**
 * One photo per person, all three derived from the same Unsplash id so the
 * slider image and the round avatar always show the same face.
 *
 * `portrait` is what desktop uses — the frame there is tall and narrow, so the
 * photo's own proportions suit it. `landscape` is for phones, where the frame
 * is wide and short: cropping that shape out of the middle of a standing
 * portrait decapitates the subject. Both ask Unsplash to crop around the
 * detected face, so every person lands in the same place in the frame however
 * the original was composed.
 */
const photo = (id: string) => ({
  portrait: `https://images.unsplash.com/${id}?q=80&w=900&h=1200&auto=format&fit=crop&crop=faces,center`,
  landscape: `https://images.unsplash.com/${id}?q=80&w=900&h=700&auto=format&fit=crop&crop=faces,center`,
  avatar: `https://images.unsplash.com/${id}?q=80&w=150&h=150&auto=format&fit=facearea&facepad=3`,
});

const testimonials = [
  {
    name: "Marcus Hartley",
    title: "International Investor",
    quote: "Tide Global transformed what we expected to be a frustrating, opaque process into something structured, transparent and ultimately successful. Our relationship manager kept us informed at every stage, and the strategic assessment alone saved us months. The level of discretion and professionalism was exactly what we needed.",
    ...photo("photo-1560250097-0b93528c311a"),
  },
  {
    name: "Naledi Mokoena",
    title: "Corporate Executive",
    quote: "The executive relocation process handled by Tide Global was flawless. Moving an entire family across continents is stressful, but having a dedicated relationship manager made all the difference. They anticipated issues before they arose and managed our case with absolute discretion.",
    ...photo("photo-1531123897727-8f129e1688ce"),
  },
  {
    name: "David Chen",
    title: "Tech Entrepreneur",
    quote: "We needed to establish operations in South Africa quickly. Tide Global aligned our commercial strategy with our immigration needs perfectly. They didn't just fill out forms; they provided genuine advisory services that protected our time and capital.",
    ...photo("photo-1507003211169-0a1dd7228f2d"),
  }
];

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);

  const total = testimonials.length;

  const goTo = (idx: number) => {
    setCurrent((idx + total) % total);
  };

  useEffect(() => {
    const t = setInterval(() => goTo(current + 1), 6000);
    return () => clearInterval(t);
  }, [current]);

  /* Swipe the whole card on touch devices. */
  const touchX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 45) goTo(dx < 0 ? current + 1 : current - 1);
    touchX.current = null;
  };

  return (
    <section className="w-full overflow-hidden bg-paper py-14 sm:py-20 lg:py-28">
      <Container>
        <div className="relative flex flex-col items-center justify-between lg:flex-row lg:items-start">

          {/* Left Side: Image Slider */}
          <div className="relative h-[320px] w-full shrink-0 overflow-hidden bg-navy/5 sm:h-[400px] md:h-[500px] lg:h-[600px] lg:w-[48%]">
            {testimonials.map((t, idx) => (
              /* <picture> rather than a bare <img> so phones fetch the wide,
                 face-cropped file that actually matches this short frame —
                 the tall desktop portrait would have to be cropped to a strip
                 of torso to fill it. */
              <picture
                key={idx}
                className={[
                  "absolute inset-0 block h-full w-full transition-all duration-[10000ms] ease-out",
                  idx === current ? "opacity-100 z-10 scale-110" : "opacity-0 z-0 scale-100",
                ].join(" ")}
              >
                <source media="(min-width: 1024px)" srcSet={t.portrait} />
                <img
                  src={t.landscape}
                  alt={t.name}
                  loading="lazy"
                  className="h-full w-full object-cover object-center"
                />
              </picture>
            ))}
            {/* Reads the card's overlap as deliberate rather than as a crop */}
            <div
              className="absolute inset-x-0 bottom-0 z-20 h-24 lg:hidden"
              style={{ background: "linear-gradient(180deg, rgba(26,58,92,0) 0%, rgba(26,58,92,0.45) 100%)" }}
              aria-hidden
            />
          </div>

          {/* Right Side: Overlapping Content Box */}
          <div className="relative z-20 -mt-12 w-full px-0 sm:-mt-14 lg:absolute lg:right-0 lg:top-12 lg:mt-0 lg:w-[58%] lg:px-0">

            {/* White Testimonial Box */}
            <div
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              className="relative border border-silver/20 bg-white p-6 shadow-[0px_30px_80px_rgba(10,22,40,0.1)] backdrop-blur-sm sm:p-10 md:p-14 lg:p-16"
            >

              {/* Header */}
              <p className="mb-4 font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-navy sm:mb-5 sm:tracking-[0.2em]">
                Testimonial
              </p>
              <div className="mb-7 border-l-[3px] border-gold pl-4 sm:mb-10 sm:pl-5">
                <h2 className="font-display text-[1.75rem] leading-[1.1] sm:text-[2.2rem] md:text-[2.8rem]">
                  <span className="font-light text-slate">Satisfied</span> <span className="font-bold text-navy">Customers</span>
                </h2>
              </div>

              {/* Slider content — stacked in one grid cell so the box always grows
                  to the tallest quote instead of clipping it against a fixed height.
                  overflow-hidden keeps the off-stage slide's 2rem slide-in offset
                  from widening the card on narrow screens. */}
              <div className="grid overflow-hidden">
                {testimonials.map((t, idx) => (
                  <div
                    key={idx}
                    aria-hidden={idx !== current}
                    className={[
                      "col-start-1 row-start-1 w-full transition-all duration-700",
                      idx === current
                        ? "pointer-events-auto translate-x-0 opacity-100"
                        : "pointer-events-none translate-x-8 opacity-0",
                    ].join(" ")}
                  >
                    <div className="mb-5 flex items-center gap-4 sm:mb-6">
                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full sm:h-14 sm:w-14">
                        <img
                          src={t.avatar}
                          alt={t.name}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-sans text-[15px] font-bold text-navy">{t.name}</p>
                        <p className="font-sans text-[12px] font-medium text-slate/70">{t.title}</p>
                      </div>
                    </div>

                    <p className="font-sans text-[14px] leading-[1.8] text-slate/80 sm:text-[14.5px] sm:pr-4">
                      {t.quote}
                    </p>
                  </div>
                ))}
              </div>

              {/* Controls (Dots + Arrows) */}
              <div className="mt-7 flex items-center justify-between gap-4 border-t border-silver/50 pt-6 sm:mt-8 sm:pt-8">
                {/* Progress Bars */}
                <div className="flex gap-2 sm:gap-3">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goTo(idx)}
                      aria-label={`Slide ${idx + 1}`}
                      className="tap relative h-1 w-8 shrink-0 overflow-hidden bg-silver transition-all hover:bg-navy/20 sm:w-10"
                    >
                      <div
                        className={[
                          "absolute inset-y-0 left-0 bg-gold",
                          idx === current
                            ? "w-full transition-[width] duration-[6000ms] ease-linear"
                            : "w-0 transition-none",
                        ].join(" ")}
                      />
                    </button>
                  ))}
                </div>

                {/* Arrows */}
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    onClick={() => goTo(current - 1)}
                    aria-label="Previous slide"
                    className="flex h-11 w-11 items-center justify-center border border-silver/60 text-navy transition-all duration-300 hover:border-gold hover:bg-gold hover:text-white"
                  >
                    <ChevronLeft size={18} strokeWidth={1.5} />
                  </button>
                  <button
                    onClick={() => goTo(current + 1)}
                    aria-label="Next slide"
                    className="flex h-11 w-11 items-center justify-center border border-silver/60 text-navy transition-all duration-300 hover:border-gold hover:bg-gold hover:text-white"
                  >
                    <ChevronRight size={18} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}
