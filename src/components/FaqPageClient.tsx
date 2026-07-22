"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, CheckCircle2, Mail, Phone, CheckSquare } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { faqs, site } from "@/lib/content";

/* ─── Shared hook ──────────────────────────────────────────── */
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
   SECTION 1 — FAQ SPLIT LAYOUT (Accordion + Checklist + Support)
═══════════════════════════════════════════════════════════════ */
function FaqSplitSection() {
  const { ref, inView } = useInView();
  const [openIdx, setOpenIdx] = useState(0);

  // Split FAQs into left accordion and right checklist (Balanced 4 and 4)
  const accordionFaqs = faqs.slice(0, 4);
  const checklistFaqs = faqs.slice(4, 8);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="w-full bg-paper py-16 lg:py-28 border-t border-silver/40">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">

          {/* LEFT — Eyebrow + Heading + Accordion */}
          <div
            className={[
              "flex flex-col gap-8 transition-all duration-1000 ease-out",
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            ].join(" ")}
          >
            <div>
              <p className="eyebrow mb-4 text-gold">FAQ</p>
              <div className="border-l-[3px] border-gold pl-5 sm:pl-6">
                <h2 className="font-display leading-[1.1]">
                  <span className="block text-[clamp(1.5rem,3vw,2.4rem)] font-light text-navy/70">Our Clients</span>
                  <span className="block text-[clamp(1.5rem,3vw,2.4rem)] font-bold text-navy">Questions</span>
                </h2>
              </div>
              <p className="font-sans text-[14px] leading-[1.85] text-slate mt-5">
                Straight answers on how Tide Global works — the model, confidentiality, timelines, fees and what we will and will not promise. If a question is not here, ask it directly.
              </p>
            </div>

            {/* Accordion */}
            <div className="flex flex-col gap-3">
              {accordionFaqs.map((faq, i) => {
                const isOpen = i === openIdx;
                return (
                  <div key={faq.q} className="flex flex-col">
                    <button
                      onClick={() => setOpenIdx(isOpen ? -1 : i)}
                      className={[
                        "w-full flex items-center gap-4 py-4 px-5 text-left font-sans text-[14px] sm:text-[15px] font-semibold transition-all duration-300 border",
                        isOpen ? "bg-navy text-white border-navy" : "bg-white text-navy border-silver/40 hover:border-gold/60"
                      ].join(" ")}
                    >
                      <ChevronDown
                        size={18}
                        className={[
                          "shrink-0 transition-transform duration-300",
                          isOpen ? "text-gold rotate-0" : "text-gold -rotate-90"
                        ].join(" ")}
                      />
                      <span>{faq.q}</span>
                    </button>
                    <div
                      className={[
                        "overflow-hidden transition-all duration-500 ease-out",
                        isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                      ].join(" ")}
                    >
                      <p className="py-5 px-5 font-sans text-[13.5px] leading-[1.85] text-slate">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT — Extended Questions Checklist + Support */}
          <div
            className={[
              "flex flex-col gap-10 transition-all duration-1000 delay-200 ease-out mt-8 lg:mt-0",
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            ].join(" ")}
          >
            {/* Checklist Questions */}
            {checklistFaqs.length > 0 && (
              <div>
                <h3 className="font-display text-[1.3rem] font-bold text-navy mb-6">Extended questions</h3>
                <p className="font-sans text-[14px] leading-[1.85] text-slate mb-6">
                  The ones that matter are rarely on a list like this. A confidential conversation costs nothing and commits you to nothing.
                </p>
                <ul className="space-y-4">
                  {checklistFaqs.map((faq) => (
                    <li key={faq.q} className="flex items-start gap-3">
                      <CheckSquare size={18} strokeWidth={2} className="shrink-0 mt-0.5 text-navy" />
                      <span className="font-sans text-[14px] font-medium text-navy">{faq.q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Support Box */}
            <div className="border-t border-silver/40 pt-8">
              <h3 className="font-display text-[1.3rem] font-bold text-navy mb-4">Support</h3>
              <p className="font-sans text-[14px] leading-[1.85] text-slate mb-6">
                Need immediate assistance? Our relationship managers are available during business hours and respond to all enquiries within one business day.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href={`mailto:${site.emails.general}`}
                  className="flex items-center gap-3 border border-silver/40 p-4 transition-all duration-300 hover:border-gold/40 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(26,58,92,0.06)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center bg-navy text-gold shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="font-sans text-[11px] font-bold uppercase tracking-wider text-navy">Email</p>
                    <p className="font-sans text-[12px] text-slate">{site.emails.general}</p>
                  </div>
                </a>
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-3 border border-silver/40 p-4 transition-all duration-300 hover:border-gold/40 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(26,58,92,0.06)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center bg-navy text-gold shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="font-sans text-[11px] font-bold uppercase tracking-wider text-navy">Phone</p>
                    <p className="font-sans text-[12px] text-slate">{site.phone}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 2 — CTA BANNER
═══════════════════════════════════════════════════════════════ */
function FaqBanner() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="w-full bg-mist pt-14 lg:pt-20 pb-32 lg:pb-40 border-t border-silver/40">
      <Container>
        <div
          className={[
            "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between transition-all duration-1000 ease-out",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          ].join(" ")}
        >
          <div>
            <p className="eyebrow mb-4 text-gold">Not answered here</p>
            <div className="border-l-[3px] border-gold pl-5 sm:pl-6">
              <h2 className="font-display leading-[1.1]">
                <span className="block text-[clamp(1.5rem,3vw,2.2rem)] font-light text-navy/70">Ask the question you</span>
                <span className="block text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-navy">actually came with.</span>
              </h2>
            </div>
            <p className="font-sans text-[14px] leading-[1.85] text-slate mt-4 max-w-xl">
              A confidential conversation costs nothing and commits you to nothing. Your enquiry reaches a relationship manager, not a queue.
            </p>
          </div>
          <Link
            href="/contact"
            className="group shrink-0 inline-flex items-center gap-3 border border-navy px-6 sm:px-8 py-3.5 sm:py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-navy transition-all duration-300 hover:bg-navy hover:text-white"
          >
            Book a consultation
            <ArrowRight size={14} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   EXPORT
═══════════════════════════════════════════════════════════════ */
export default function FaqPageClient() {
  return (
    <>
      <FaqSplitSection />
      <FaqBanner />
    </>
  );
}
