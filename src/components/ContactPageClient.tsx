"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, MapPin, Phone, Clock, Mail, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Section";
import EnquiryForm from "@/components/EnquiryForm";
import { site } from "@/lib/content";

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

/* ── Contact details sidebar ─────────────────────────────────── */
const contactDetails = [
  {
    icon: Phone,
    label: "Telephone",
    value: site.phone,
    href: site.phoneHref,
  },
  {
    icon: Mail,
    label: "Private Client Email",
    value: site.emails.privateClients,
    href: `mailto:${site.emails.privateClients}`,
  },
  {
    icon: MapPin,
    label: "Office",
    value: site.address.full,
    href: site.address.mapsHref,
  },
  {
    icon: Clock,
    label: "Hours",
    value: site.hours,
    href: null,
  },
];

/* ── Assurances ─────────────────────────────────────────────── */
const assurances = [
  { title: "Confidential from first contact", body: "Everything you share is held in confidence whether or not you go on to instruct us." },
  { title: "Response within one business day", body: "Your enquiry reaches a relationship manager, not a queue." },
  { title: "No obligation", body: "An initial conversation carries no commitment — it is an assessment, not a sales process." },
];

export default function ContactPageClient() {
  const formSection = useInView();
  const mapSection = useInView();
  const assurancesSection = useInView();

  return (
    <>
      {/* ── ENQUIRY SECTION ─────────────────────────────────────── */}
      <section
        ref={formSection.ref as React.RefObject<HTMLElement>}
        className="w-full bg-paper py-14 sm:py-20 lg:py-28 border-t border-silver/40"
      >
        <Container>
          <div className="grid grid-cols-1 gap-10 sm:gap-16 lg:grid-cols-12">

            {/* LEFT — contact info */}
            <div
              className={[
                "lg:col-span-4 transition-all duration-1000 ease-out",
                formSection.inView ? "opacity-100 translate-x-0" : "opacity-0 translate-y-6 md:translate-y-0 md:-translate-x-10",
              ].join(" ")}
            >
              <p className="eyebrow mb-4 sm:mb-5">Send an enquiry</p>
              <div className="mb-7 border-l-[3px] border-gold pl-5 sm:mb-8 sm:pl-6">
                <h2 className="font-display leading-[1.1]">
                  <span className="block text-[clamp(1.55rem,5.6vw,2.3rem)] font-light text-navy/70">Tell us what</span>
                  <span className="block text-[clamp(1.55rem,5.6vw,2.3rem)] font-bold text-navy">you are trying to achieve.</span>
                </h2>
              </div>
              <p className="mb-8 font-sans text-[14.5px] leading-[1.85] text-slate sm:mb-10">
                A few details are enough to begin. Your enquiry reaches a relationship manager, not a queue.
              </p>

              {/* Contact detail cards */}
              <dl className="space-y-5">
                {contactDetails.map(({ icon: Icon, label, value, href }, i) => (
                  <div
                    key={label}
                    className={[
                      "group flex items-start gap-4 border border-silver/40 p-5 transition-all duration-700 ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(26,58,92,0.06)] hover:border-gold/30",
                      formSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                    ].join(" ")}
                    style={{ transitionDelay: formSection.inView ? `${(i + 1) * 100}ms` : "0ms" }}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-gold/10 transition-colors duration-300 group-hover:bg-gold">
                      <Icon size={18} strokeWidth={1.5} className="text-gold transition-colors duration-300 group-hover:text-navy" />
                    </div>
                    <div className="min-w-0">
                      <dt className="mb-1 font-sans text-[10.5px] font-bold uppercase tracking-[0.16em] text-slate/60 sm:tracking-[0.2em]">{label}</dt>
                      <dd>
                        {href ? (
                          <a
                            href={href}
                            target={href.startsWith("http") ? "_blank" : undefined}
                            rel={href.startsWith("http") ? "noreferrer" : undefined}
                            className="group/a relative block w-fit max-w-full break-words font-display text-[1.05rem] leading-snug text-navy transition-colors hover:text-gold sm:text-[1.1rem]"
                          >
                            {value}
                            <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-gold transition-all duration-500 group-hover/a:w-full" />
                          </a>
                        ) : (
                          <address className="not-italic font-sans text-[13.5px] leading-relaxed text-navy/70">{value}</address>
                        )}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>

            {/* RIGHT — form */}
            <div
              className={[
                "lg:col-span-8 transition-all duration-1000 delay-200 ease-out",
                formSection.inView ? "opacity-100 translate-x-0" : "opacity-0 translate-y-6 md:translate-y-0 md:translate-x-10",
              ].join(" ")}
            >
              <div className="border border-silver/20 bg-white p-6 shadow-[0_30px_80px_rgba(26,58,92,0.08)] transition-all duration-700 hover:-translate-y-0.5 hover:shadow-[0_40px_100px_rgba(26,58,92,0.12)] sm:p-8 md:p-12">
                {/* Form header */}
                <div className="mb-7 flex items-center gap-4 border-b border-silver/40 pb-7 sm:mb-8 sm:pb-8">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-gold sm:h-12 sm:w-12">
                    <ShieldCheck size={22} strokeWidth={1.5} className="text-navy" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-sans text-[10.5px] font-bold uppercase tracking-[0.16em] text-gold sm:tracking-[0.22em]">Confidential</p>
                    <p className="font-display text-[1.15rem] font-semibold text-navy sm:text-[1.25rem]">Private Client Enquiry</p>
                  </div>
                </div>
                <EnquiryForm variant="contact" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── ASSURANCES STRIP ─────────────────────────────────────── */}
      <section
        ref={assurancesSection.ref as React.RefObject<HTMLElement>}
        className="relative w-full overflow-hidden border-t border-white/10 bg-navy py-14 sm:py-24"
      >
        {/* Subtle background glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[800px] max-w-none -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-gold/5 blur-[120px]" />

        <Container className="relative z-10">
          <div className="grid grid-cols-1 gap-10 sm:gap-12 md:grid-cols-3 lg:gap-16">
            {assurances.map((a, i) => (
              <div
                key={a.title}
                className={[
                  "group flex flex-col items-center text-center transition-all duration-700 ease-out",
                  assurancesSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
                ].join(" ")}
                style={{ transitionDelay: assurancesSection.inView ? `${i * 150}ms` : "0ms" }}
              >
                {/* Decorative Top Element */}
                <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-gold/50 group-hover:bg-gold/10 group-hover:shadow-[0_10px_30px_rgba(182,143,82,0.15)] sm:mb-8 sm:h-16 sm:w-16">
                  <span className="font-display text-[1.2rem] font-bold text-gold/60 transition-colors duration-500 group-hover:text-gold">0{i + 1}</span>
                  {/* Subtle spinning dashed border on hover */}
                  <div className="absolute inset-[-4px] rounded-full border border-dashed border-gold/0 transition-all duration-700 group-hover:border-gold/40 group-hover:animate-[spin_10s_linear_infinite]" />
                </div>

                <h3 className="mb-3 font-display text-[1.25rem] font-semibold text-white transition-colors duration-300 group-hover:text-gold sm:mb-4 sm:text-[1.3rem]">{a.title}</h3>
                <p className="font-sans text-[14px] leading-relaxed text-paper/60 sm:px-4">{a.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── MAP SECTION ─────────────────────────────────────────── */}
      <section
        ref={mapSection.ref as React.RefObject<HTMLElement>}
        className="w-full bg-mist pt-14 pb-28 sm:pt-20 sm:pb-32 lg:pt-28 lg:pb-48 border-t border-silver/40"
      >
        <Container>
          {/* Header */}
          <div
            className={[
              "mb-9 grid grid-cols-1 gap-6 transition-all duration-1000 ease-out sm:mb-12 sm:gap-8 lg:grid-cols-2 lg:items-end",
              mapSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            ].join(" ")}
          >
            <div>
              <p className="eyebrow mb-4">Find us</p>
              <div className="border-l-[3px] border-gold pl-5 sm:pl-6">
                <h2 className="font-display leading-[1.1]">
                  <span className="block text-[clamp(1.55rem,5.6vw,2.4rem)] font-light text-navy/70">Where the firm</span>
                  <span className="block text-[clamp(1.55rem,5.6vw,2.4rem)] font-bold text-navy">is based</span>
                </h2>
              </div>
            </div>
            <div className="lg:text-right">
              <p className="max-w-sm font-sans text-[14.5px] leading-[1.85] text-slate lg:ml-auto">
                Our offices are in Sandton. Most clients instruct us remotely, but you are welcome by appointment.
              </p>
              <div className="mt-5 sm:mt-6">
                <a
                  href={site.phoneHref}
                  className="group inline-flex w-full items-center justify-center gap-3 border border-navy px-6 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-navy transition-all duration-300 hover:bg-navy hover:text-white sm:w-auto sm:py-3 sm:tracking-[0.22em]"
                >
                  Call us now
                  <ArrowRight size={13} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Map container */}
          <div
            className={[
              "overflow-hidden shadow-[0_20px_50px_rgba(26,58,92,0.07)] border border-silver/40 group relative transition-all duration-1000 delay-200 ease-out",
              mapSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            ].join(" ")}
          >
            {/* Gold top bar on hover */}
            <span className="absolute left-0 top-0 z-10 h-[3px] w-0 bg-gold transition-all duration-700 group-hover:w-full" aria-hidden />
            <iframe
              title={`${site.name} — office location`}
              src={site.address.mapsEmbedSrc}
              className="block h-[320px] w-full opacity-80 contrast-125 grayscale transition-all duration-700 group-hover:contrast-100 group-hover:opacity-100 group-hover:grayscale-0 sm:h-[420px] md:h-[520px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Address badge */}
            <a
              href={site.address.mapsHref}
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-3 left-3 right-3 z-10 bg-navy/90 px-4 py-3 backdrop-blur-sm transition-colors hover:bg-navy sm:bottom-4 sm:left-4 sm:right-auto sm:px-5"
            >
              <p className="mb-0.5 font-sans text-[10.5px] font-bold uppercase tracking-[0.16em] text-gold sm:text-[11px] sm:tracking-[0.2em]">Office Address</p>
              <p className="font-sans text-[12px] text-paper/80">{site.address.line1}, {site.address.city} {site.address.postal}</p>
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
