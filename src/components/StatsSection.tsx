"use client";

import { useState, useEffect, useRef } from "react";
import { Container } from "./ui/Section";
import { Briefcase, FolderCheck, ShieldCheck, Users } from "lucide-react";

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
      <span className="font-sans font-medium text-[2.2rem] align-top relative top-1.5 ml-0.5">{suffix}</span>
    </span>
  );
}

const stats = [
  {
    icon: Briefcase,
    num: 53,
    suffix: "+",
    label: "Years of Experience",
    highlight: false,
  },
  {
    icon: FolderCheck,
    num: 975,
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
  {
    icon: Users,
    num: 15,
    suffix: "+",
    label: "Specialist Advisors",
    highlight: false,
  }
];

export default function StatsSection() {
  return (
    <section className="w-full bg-paper py-20 lg:py-24 border-t border-silver/50 relative overflow-hidden">
      {/* Optional faint background element for texture */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,rgba(0,0,0,1),transparent_70%)]" 
        aria-hidden 
      />
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 shadow-[0px_10px_40px_rgba(26,58,92,0.06)] bg-white rounded-sm">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={[
                "group flex flex-col items-center text-center p-10 xl:p-14 transition-all duration-700 ease-out",
                stat.highlight 
                  ? "bg-navy scale-105 shadow-[0_20px_50px_rgba(26,58,92,0.4)] z-20 py-12 xl:py-16" // The highlighted block pops out
                  : "bg-white hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(26,58,92,0.08)] z-10 border-b lg:border-b-0 lg:border-r border-silver/30 last:border-0",
              ].join(" ")}
            >
              {/* Icon */}
              <stat.icon 
                size={42} 
                strokeWidth={1.25} 
                className={["mb-5 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3", stat.highlight ? "text-gold" : "text-gold"].join(" ")} 
              />
              
              {/* Number */}
              <p className={["font-display text-[3.2rem] xl:text-[3.8rem] font-bold leading-none mb-3", stat.highlight ? "text-white" : "text-navy"].join(" ")}>
                <AnimatedCounter end={stat.num} suffix={stat.suffix} />
              </p>
              
              {/* Label */}
              <p className={["font-sans text-[13.5px] font-semibold tracking-wide uppercase mt-1", stat.highlight ? "text-white/80" : "text-slate"].join(" ")}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
