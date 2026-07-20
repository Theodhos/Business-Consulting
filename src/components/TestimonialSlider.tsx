"use client";

import { useState, useEffect } from "react";
import { Container } from "./ui/Section";

const testimonials = [
  {
    name: "Marcus Hartley",
    title: "International Investor",
    quote: "Tide Global transformed what we expected to be a frustrating, opaque process into something structured, transparent and ultimately successful. Our relationship manager kept us informed at every stage, and the strategic assessment alone saved us months. The level of discretion and professionalism was exactly what we needed.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=900&auto=format&fit=crop",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
  },
  {
    name: "Elena Rostova",
    title: "Corporate Executive",
    quote: "The executive relocation process handled by Tide Global was flawless. Moving an entire family across continents is stressful, but having a dedicated relationship manager made all the difference. They anticipated issues before they arose and managed our case with absolute discretion.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=900&auto=format&fit=crop",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop",
  },
  {
    name: "David Chen",
    title: "Tech Entrepreneur",
    quote: "We needed to establish operations in South Africa quickly. Tide Global aligned our commercial strategy with our immigration needs perfectly. They didn't just fill out forms; they provided genuine advisory services that protected our time and capital.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=900&auto=format&fit=crop",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
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
                  "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000",
                  idx === current ? "opacity-100 z-10" : "opacity-0 z-0",
                ].join(" ")}
              />
            ))}
          </div>

          {/* Right Side: Overlapping Content Box & Stats */}
          <div className="w-full lg:w-[58%] relative lg:absolute lg:right-0 lg:top-12 z-20 mt-[-60px] lg:mt-0 px-4 lg:px-0">
            
            {/* White Testimonial Box */}
            <div className="bg-white shadow-[0px_20px_60px_rgba(0,0,0,0.06)] p-8 md:p-14 lg:p-16 relative">
              
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

              {/* Dots Controls */}
              <div className="mt-8 flex gap-2 border-t border-silver/50 pt-8">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goTo(idx)}
                    aria-label={`Slide ${idx + 1}`}
                    className={[
                      "h-1.5 rounded-full transition-all duration-300",
                      idx === current ? "w-6 bg-gold" : "w-2 bg-silver hover:bg-navy/40",
                    ].join(" ")}
                  />
                ))}
              </div>
            </div>

            {/* Stats below the box, aligned like the photo */}
            <div className="flex flex-col sm:flex-row gap-12 sm:gap-20 mt-12 lg:mt-16 pl-4 lg:pl-16">
              <div className="text-left md:text-center">
                <p className="font-display text-[3.5rem] font-bold text-navy leading-none">
                  53<span className="text-gold font-sans font-medium text-[2.5rem] align-top relative top-1 ml-0.5">+</span>
                </p>
                <p className="font-sans text-[13px] text-slate/70 mt-2 font-medium">Years of Experience</p>
              </div>
              <div className="text-left md:text-center">
                <p className="font-display text-[3.5rem] font-bold text-navy leading-none">
                  975<span className="text-gold font-sans font-medium text-[2.5rem] align-top relative top-1 ml-0.5">+</span>
                </p>
                <p className="font-sans text-[13px] text-slate/70 mt-2 font-medium">Project Completed</p>
              </div>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}
