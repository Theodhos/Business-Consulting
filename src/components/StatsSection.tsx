"use client";

import { useState, useEffect, useRef } from "react";
import { Container } from "./ui/Section";
import { Briefcase, FolderCheck, ShieldCheck } from "lucide-react";

function AnimatedCounter({ end, suffix = "", duration = 2500 }: { end: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let startTime: number;
    let animationFrame: number;

    const updateCounter = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo for smooth deceleration
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCounter);
      }
    };

    animationFrame = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animationFrame);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {/* Suffix is smaller and top-aligned */}
      <span className="relative top-1 ml-0.5 align-top font-sans text-[1.8rem] font-medium sm:top-1.5 sm:text-[2.2rem]">{suffix}</span>
    </span>
  );
}

const stats = [
  {
    icon: Briefcase,
    num: 25,
    suffix: "+",
    label: "Years Combined Experience",
    highlight: false,
  },
  {
    icon: FolderCheck,
    num: 300,
    suffix: "+",
    label: "Projects Completed",
    highlight: false,
  },
  {
    icon: ShieldCheck,
    num: 100,
    suffix: "%",
    label: "Absolute Discretion",
    highlight: true, // The 3rd block is highlighted
  },
];

export default function StatsSection() {
  return (
    <section className="w-full bg-paper py-14 sm:py-20 lg:py-24 border-t border-silver/50 relative overflow-hidden">
      {/* Optional faint background element for texture */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,rgba(0,0,0,1),transparent_70%)]" 
        aria-hidden 
      />
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 shadow-[0px_10px_40px_rgba(26,58,92,0.06)] bg-white rounded-sm">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={[
                "group flex flex-col items-center p-8 text-center transition-all duration-700 ease-out sm:p-10 xl:p-14",
                stat.highlight
                  // Pops forward from md up. On a single-column phone stack the
                  // scale-up would simply overhang the other two cards.
                  ? "z-20 bg-navy py-10 shadow-[0_20px_50px_rgba(26,58,92,0.4)] sm:py-12 md:scale-105 xl:py-16"
                  : "z-10 border-b border-silver/30 bg-white last:border-0 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(26,58,92,0.08)] md:border-b-0 md:border-r",
              ].join(" ")}
            >
              {/* Icon */}
              <stat.icon
                size={38}
                strokeWidth={1.25}
                className="mb-4 text-gold transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3 sm:mb-5 sm:size-[42px]"
              />

              {/* Number */}
              <p className={["mb-3 font-display text-[2.7rem] font-bold leading-none sm:text-[3.2rem] xl:text-[3.8rem]", stat.highlight ? "text-white" : "text-navy"].join(" ")}>
                <AnimatedCounter end={stat.num} suffix={stat.suffix} />
              </p>

              {/* Label */}
              <p className={["mt-1 font-sans text-[12.5px] font-semibold uppercase tracking-wide sm:text-[13.5px]", stat.highlight ? "text-white/80" : "text-slate"].join(" ")}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
