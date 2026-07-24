import { ArrowRight, ShieldCheck, UserCheck } from "lucide-react";
import { Container } from "./ui/Section";
import AppointmentForm from "./AppointmentForm";

/* Two reasons-to-choose, echoing the reference layout but in the practice's own voice */
const features = [
  {
    icon: ShieldCheck,
    title: "Credibility & Specialist Experience",
    body: "Complex South African residence and remediation matters, advised by specialists who work on the legislation daily — not occasionally.",
  },
  {
    icon: UserCheck,
    title: "Personalised Service & In-Depth Consultation",
    body: "A dedicated relationship manager who knows your matter end to end, so what reaches you is a decision to make, not an errand to run.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative w-full overflow-hidden border-t border-line">
      {/* Background — a trusted-advisor handshake, kept subtle under a navy wash */}
      <img
        src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1800&auto=format&fit=crop"
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {/* Phones read the copy across the full width, so the scrim runs vertical
          there and only becomes left-weighted once there are two columns. */}
      <div
        className="absolute inset-0 lg:hidden"
        style={{ background: "linear-gradient(180deg, rgba(26,58,92,0.97) 0%, rgba(26,58,92,0.93) 100%)" }}
        aria-hidden
      />
      <div
        className="absolute inset-0 hidden lg:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(26,58,92,0.98) 0%, rgba(26,58,92,0.85) 50%, rgba(26,58,92,0.60) 100%)",
        }}
        aria-hidden
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 gap-10 py-14 sm:gap-12 sm:py-20 md:py-28 lg:grid-cols-2 lg:items-center lg:gap-16">

          {/* ── Left: why choose us ─────────────────────────────────── */}
          <div>
            {/* Eyebrow with a small gold marker */}
            <p className="eyebrow mb-5 flex items-center gap-2 sm:mb-6">
              <ArrowRight size={12} strokeWidth={3} className="shrink-0 text-gold" />
              Why Choose Us
            </p>

            {/* Heading — gold left border, light + bold */}
            <div className="border-l-[3px] border-gold pl-5 sm:pl-6">
              <h2 className="font-display leading-[1.1]">
                <span className="block text-[clamp(1.7rem,6vw,2.9rem)] font-light text-paper/85">
                  Your Trusted
                </span>
                <span className="block text-[clamp(1.7rem,6vw,2.9rem)] font-bold text-white">
                  Private Client Advisor
                </span>
              </h2>
            </div>

            {/* Body */}
            <p className="mt-6 max-w-md font-sans text-[14.5px] leading-[1.85] text-paper/75 sm:mt-7">
              A boutique South African immigration practice built around a limited number of matters —
              each led by a named specialist who advises on strategy before a single form is filed.
            </p>

            {/* Two feature items */}
            <div className="mt-8 flex flex-col gap-6 border-t border-white/12 pt-7 sm:mt-10 sm:gap-7 sm:pt-9">
              {features.map((feat) => (
                <div key={feat.title} className="group flex items-start gap-4 transition-transform duration-500 hover:translate-x-2 sm:gap-5">
                  <feat.icon size={26} strokeWidth={1.4} className="mt-0.5 shrink-0 text-gold transition-transform duration-500 group-hover:scale-110 sm:size-[30px]" aria-hidden />
                  <div className="min-w-0">
                    <h3 className="font-display text-[1.15rem] font-semibold text-white sm:text-[1.2rem]">{feat.title}</h3>
                    <p className="mt-1.5 font-sans text-[13.5px] leading-relaxed text-paper/70">
                      {feat.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: booking card ─────────────────────────────────── */}
          <div className="w-full lg:max-w-md lg:justify-self-end">
            <div className="border border-white/5 bg-paper p-6 shadow-[0_40px_100px_-20px_rgba(10,22,40,0.8)] sm:p-8 md:p-10">
              <h3 className="font-display text-[1.5rem] font-bold leading-tight text-navy sm:text-[1.7rem]">
                Book appointment now
              </h3>
              <span className="mb-7 mt-4 block h-px w-12 bg-gold sm:mb-8" aria-hidden />
              <AppointmentForm />
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
