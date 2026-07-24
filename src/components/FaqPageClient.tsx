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
    <section ref={ref as React.RefObject<HTMLElement>} className="w-full bg-paper py-14 sm:py-16 lg:py-28 border-t border-silver/40">
      <Container>
        <div className="grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-20">

          {/* LEFT — Eyebrow + Heading + Accordion */}
          <div
            className={[
              "flex flex-col gap-8 transition-all duration-1000 ease-out",
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-y-6 md:translate-y-0 md:-translate-x-12"
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
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenIdx(isOpen ? -1 : i)}
                      className={[
                        "flex w-full items-center gap-3 border px-4 py-4 text-left font-sans text-[14px] font-semibold transition-all duration-300 sm:gap-4 sm:px-5 sm:text-[15px]",
                        isOpen ? "border-navy bg-navy text-white" : "border-silver/40 bg-white text-navy hover:border-gold/60"
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
                    {/* Row-fraction transition rather than a max-height guess —
                        a fixed max-height clipped the longer answers on phones,
                        where the same text runs to twice as many lines. */}
                    <div
                      className={[
                        "grid overflow-hidden transition-all duration-500 ease-out",
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      ].join(" ")}
                    >
                      <div className="min-h-0">
                        <p className="px-4 py-5 font-sans text-[13.5px] leading-[1.85] text-slate sm:px-5">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT — Extended Questions Checklist + Support */}
          <div
            className={[
              "mt-2 flex flex-col gap-9 transition-all duration-1000 delay-200 ease-out sm:mt-8 sm:gap-10 lg:mt-0",
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-y-6 md:translate-y-0 md:translate-x-12"
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
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-navy text-gold">
                    <Mail size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-sans text-[11px] font-bold uppercase tracking-wider text-navy">Email</p>
                    <p className="break-all font-sans text-[12px] text-slate">{site.emails.general}</p>
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
    <section ref={ref as React.RefObject<HTMLElement>} className="w-full border-t border-silver/40 bg-mist py-12 sm:py-14 lg:py-20">
      <Container>
        <div
          className={[
            "flex flex-col gap-6 transition-all duration-1000 ease-out sm:flex-row sm:items-end sm:justify-between",
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
            className="group inline-flex w-full shrink-0 items-center justify-center gap-3 border border-navy px-6 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-navy transition-all duration-300 hover:bg-navy hover:text-white sm:w-auto sm:px-8 sm:tracking-[0.22em]"
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
   SECTION 3 — NEWS & ARTICLES
═══════════════════════════════════════════════════════════════ */
function NewsSection() {
  const { ref, inView } = useInView();
  const posts = [
    { title: "Great Value For Your Visa Job Seeker Immigration", body: "Practical guidance for applicants balancing timing, evidence and route selection.", img: "/ph5.png" },
    { title: "Make Student Visa Over Years With Other Country", body: "How to structure a long-term study pathway with fewer surprises at the border.", img: "/ph6.png" },
  ];
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="w-full border-t border-silver/40 bg-paper pt-14 sm:pt-20 lg:pt-28">
      <Container>
        <div className={["mb-10 flex flex-col items-center text-center transition-all duration-1000 ease-out sm:mb-14", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"].join(" ")}>
          <p className="eyebrow mb-4 text-navy/80">The news</p>
          <h2 className="font-display text-[clamp(1.9rem,7vw,3.2rem)] font-light leading-[1.05] text-navy">
            News & <span className="font-bold text-navy">Articles</span>
          </h2>
          <span className="mt-6 block h-px w-14 bg-gold sm:mt-7" aria-hidden />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-12">
          <article
            className={[
              "group relative min-h-[420px] overflow-hidden border border-silver/40 transition-all duration-1000 delay-300 ease-out sm:min-h-[500px] xl:order-2 xl:col-span-4",
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-y-6 md:translate-y-0 md:translate-x-8",
            ].join(" ")}
          >
            <img src="/ph8.png" alt="Visa application" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 transition-all duration-700 group-hover:opacity-90" style={{ background: "linear-gradient(180deg, rgba(26,58,92,0.06) 0%, rgba(26,58,92,0.32) 42%, rgba(26,58,92,0.92) 100%)" }} />
            <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-7 md:p-8">
              <p className="eyebrow mb-3 text-paper/80 sm:mb-4">Feature story</p>
              <h3 className="max-w-sm font-display text-[clamp(1.5rem,6vw,2.5rem)] font-bold leading-[1.06] text-white">How To Ensure A Direct Hassle Free Visa Application</h3>
              <p className="mt-4 max-w-sm font-sans text-[13.5px] leading-[1.8] text-white/72 sm:mt-5 sm:text-[14px]">A private client approach to file preparation, evidence quality and decision-ready applications.</p>
              <Link href="/insights" className="group/btn mt-6 inline-flex items-center justify-center gap-3 border border-white/30 px-6 py-3.5 font-sans text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:border-gold hover:bg-gold hover:text-navy sm:mt-8 sm:w-fit sm:py-3 sm:tracking-[0.22em]">
                Read More <ArrowRight size={13} strokeWidth={2} className="transition-transform duration-300 group-hover/btn:translate-x-1.5" />
              </Link>
            </div>
          </article>

          <div className="flex flex-col gap-4 sm:gap-5 xl:order-1 xl:col-span-8">
            {posts.map((post, i) => (
              <article
                key={post.title}
                className={[
                  "group grid flex-1 grid-cols-1 overflow-hidden border border-silver/40 bg-paper transition-all duration-700 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(26,58,92,0.08)] sm:grid-cols-[180px_minmax(0,1fr)] md:grid-cols-[200px_minmax(0,1fr)]",
                  inView ? "opacity-100 translate-x-0" : "opacity-0 translate-y-6 md:translate-y-0 md:-translate-x-8",
                ].join(" ")}
                style={{ transitionDelay: inView ? `${i * 150}ms` : "0ms" }}
              >
                <div className="relative min-h-[190px] overflow-hidden bg-silver sm:min-h-full">
                  <img src={post.img} alt={post.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute left-0 top-0 h-[3px] w-0 bg-gold transition-all duration-500 group-hover:w-full" aria-hidden />
                </div>
                <div className="flex min-w-0 flex-col justify-center p-5 sm:p-6 md:p-8">
                  <h3 className="max-w-md font-display text-[1.15rem] font-semibold leading-[1.25] text-navy transition-colors duration-300 group-hover:text-gold">{post.title}</h3>
                  <p className="mt-3 max-w-md font-sans text-[13.5px] leading-[1.8] text-slate sm:mt-4 sm:leading-[1.85]">{post.body}</p>
                  <Link href="/insights" className="mt-5 inline-flex items-center gap-2 font-sans text-[10.5px] font-semibold uppercase tracking-[0.18em] text-gold transition-colors group-hover:text-navy sm:mt-6 sm:tracking-[0.22em]">
                    Read More <ArrowRight size={13} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
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
      <NewsSection />
    </>
  );
}
