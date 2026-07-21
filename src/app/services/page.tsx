import type { Metadata } from "next";
import { UserCheck, Lightbulb, Lock, Award } from "lucide-react";

import PageHero from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services, audiences, professions } from "@/lib/content";

/* What holds true across all eleven routes — shown in place of a second CTA */
const engagementIncludes = [
  {
    icon: UserCheck,
    title: "A named relationship manager",
    body: "One specialist owns your matter end to end — reachable directly, never a queue.",
  },
  {
    icon: Lightbulb,
    title: "Strategy before a form is filed",
    body: "A written strategy: the recommended route, the reasoning against the alternatives and a realistic timeline.",
  },
  {
    icon: Lock,
    title: "Absolute confidentiality",
    body: "Discretion is structural. Access to your matter is limited to the people working on it.",
  },
  {
    icon: Award,
    title: "Specialist-led throughout",
    body: "Advised by people who work on South African immigration law daily, not occasionally.",
  },
];

export const metadata: Metadata = {
  title: "Services",
  description:
    "Eleven core practice areas across South African residence, work authorisation and remedy — advised for high-net-worth individuals, investors, executives and families.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Core practice areas"
        title="Eleven practice areas. One standard of advice."
        lead="South African residence, work authorisation and remedy. Each matter is led by a specialist and coordinated end to end by your relationship manager."
        image="/businessman-cupped-his-hands-blue-tone.jpg"
      />

      {/* ── The eleven ────────────────────────────────────────────────── */}
      <Section tone="paper" divide={false}>
        <SectionHeading
          eyebrow="What we advise on"
          title="The practice in full"
          lead="Several of these routes may be open to you at once, and they are not equivalent in duration, evidentiary burden or risk. Choosing correctly before anything is filed is the advisory work."
        />

        <div className="mt-16 border-t border-line">
          {services.map((s, i) => (
            <article
              key={s.slug}
              id={s.slug}
              className="group relative grid scroll-mt-32 grid-cols-1 gap-8 border-b border-line py-12 transition-colors duration-300 hover:bg-mist/70 lg:grid-cols-12 lg:gap-12 lg:px-8"
            >
              {/* Gold accent bar — grows from the top on hover */}
              <span
                className="pointer-events-none absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-gold transition-transform duration-500 ease-out group-hover:scale-y-100"
                aria-hidden
              />

              <div className="lg:col-span-4">
                <div className="flex items-start gap-5">
                  {/* Ghosted index numeral — Cormorant */}
                  <span className="font-display text-[2.75rem] font-light leading-none text-navy/15 transition-colors duration-300 group-hover:text-gold/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    {/* Icon tile — fills gold on hover */}
                    <span className="mb-5 flex h-12 w-12 items-center justify-center border border-line text-gold transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-navy">
                      <s.icon size={22} strokeWidth={1.25} aria-hidden />
                    </span>
                    <h2 className="display-md text-navy">{s.title}</h2>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 lg:pt-2">
                <p className="mb-5 text-lg leading-relaxed text-navy/80">{s.summary}</p>
                <p className="text-sm leading-relaxed text-navy/60">{s.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ── Who instructs us ──────────────────────────────────────────── */}
      <Section tone="mist">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-stretch lg:gap-16">
          {/* Left — heading at top, profession tags at the bottom so the
              column carries the same visual weight as the cards opposite. */}
          <div className="flex flex-col justify-between">
            <SectionHeading
              eyebrow="Private client profiles"
              title="Who these services are built for"
              lead="A select audience of individuals, families, executives and investors who value precision, confidentiality and a strategy tailored to their circumstances."
            />

            <div className="mt-12">
              <p className="eyebrow mb-5">Typically</p>
              <div className="flex flex-wrap gap-2.5">
                {professions.map((p) => (
                  <span
                    key={p}
                    className="border border-line px-4 py-2 font-sans text-[12px] font-medium tracking-wide text-navy/75 transition-colors duration-300 hover:border-gold hover:text-navy"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — audience cards */}
          <div className="grid grid-cols-1 gap-px self-stretch border border-line bg-line sm:grid-cols-2">
            {audiences.map((a) => (
              <div
                key={a.title}
                className="group flex flex-col bg-mist p-7 transition-colors duration-300 hover:bg-paper"
              >
                <a.icon size={26} strokeWidth={1.2} className="mb-4 text-gold" aria-hidden />
                <h3 className="mb-2 font-display text-[1.2rem] font-semibold leading-snug text-navy">
                  {a.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-navy/60">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── What every engagement includes ────────────────────────────── */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="One standard of advice"
          title="What every engagement includes"
          lead="Whichever of the eleven routes applies to you, the depth of advice and the way your matter is run do not change."
        />

        <div className="mt-14 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {engagementIncludes.map((f) => (
            <div key={f.title} className="flex flex-col bg-paper p-8">
              <f.icon size={28} strokeWidth={1.25} className="mb-6 text-gold" aria-hidden />
              <h3 className="mb-3 font-display text-[1.2rem] font-semibold leading-snug text-navy">
                {f.title}
              </h3>
              <p className="text-[13.5px] leading-relaxed text-slate">{f.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
