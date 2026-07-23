"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Container } from "./ui/Section";

// One photo per person: the large slider image and the small round avatar are
// generated from the same Unsplash id so they always show the same face.
const photo = (id: string) => ({
  image: `https://images.unsplash.com/${id}?q=80&w=900&auto=format&fit=crop`,
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

  return (
    <section className="w-full bg-paper py-20 lg:py-28 overflow-hidden">
      <Container>
        <div className="relative flex flex-col lg:flex-row items-center lg:items-start justify-between">
          
          {/* Left Side: Image Slider */}
          <div className="w-full lg:w-[48%] h-[400px] md:h-[500px] lg:h-[600px] relative shrink-0 overflow-hidden">
            {testimonials.map((t, idx) => (
              <img
                key={idx}
                src={t.image}
                alt={t.name}
                className={[
                  "absolute inset-0 h-full w-full object-cover transition-all duration-[10000ms] ease-out",
                  idx === current ? "opacity-100 z-10 scale-110" : "opacity-0 z-0 scale-100",
                ].join(" ")}
              />
            ))}
          </div>

          {/* Right Side: Overlapping Content Box & Stats */}
          <div className="w-full lg:w-[58%] relative lg:absolute lg:right-0 lg:top-12 z-20 mt-[-60px] lg:mt-0 px-4 lg:px-0">
            
            {/* White Testimonial Box */}
            <div className="bg-white shadow-[0px_30px_80px_rgba(10,22,40,0.1)] p-8 md:p-14 lg:p-16 relative border border-silver/20 backdrop-blur-sm">
              
              {/* Header */}
              <p className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-navy mb-5">
                Testimonial
              </p>
              <div className="border-l-[3px] border-gold pl-5 mb-10">
                <h2 className="font-display text-[2.2rem] md:text-[2.8rem] leading-[1.1]">
                  <span className="font-light text-slate">Satisfied</span> <span className="font-bold text-navy">Customers</span>
                </h2>
              </div>

              {/* Slider Content */}
              <div className="relative min-h-[180px]">
                {testimonials.map((t, idx) => (
                  <div
                    key={idx}
                    className={[
                      "absolute inset-0 transition-all duration-700 w-full",
                      idx === current 
                        ? "opacity-100 translate-x-0 pointer-events-auto" 
                        : "opacity-0 translate-x-8 pointer-events-none",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-14 w-14 overflow-hidden rounded-full shrink-0">
                        <img
                          src={t.avatar}
                          alt={t.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-sans text-[15px] font-bold text-navy">{t.name}</p>
                        <p className="font-sans text-[12px] font-medium text-slate/70">{t.title}</p>
                      </div>
                    </div>

                    <p className="font-sans text-[14.5px] leading-[1.8] text-slate/80 pr-4">
                      {t.quote}
                    </p>
                  </div>
                ))}
              </div>

              {/* Controls (Dots + Arrows) */}
              <div className="mt-8 flex items-center justify-between border-t border-silver/50 pt-8">
                {/* Progress Bars */}
                <div className="flex gap-3">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goTo(idx)}
                      aria-label={`Slide ${idx + 1}`}
                      className="relative h-1 w-10 overflow-hidden bg-silver transition-all hover:bg-navy/20"
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
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => goTo(current - 1)}
                    aria-label="Previous slide"
                    className="flex h-10 w-10 items-center justify-center border border-silver/60 text-navy transition-all duration-300 hover:border-gold hover:bg-gold hover:text-white"
                  >
                    <ChevronLeft size={18} strokeWidth={1.5} />
                  </button>
                  <button
                    onClick={() => goTo(current + 1)}
                    aria-label="Next slide"
                    className="flex h-10 w-10 items-center justify-center border border-silver/60 text-navy transition-all duration-300 hover:border-gold hover:bg-gold hover:text-white"
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
