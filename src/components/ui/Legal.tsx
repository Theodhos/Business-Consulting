import React from "react";
import { Section } from "./Section";

export type LegalClause = { heading: string; body: string[] };

/**
 * Renders a legal document as a numbered, anchored clause list with a contents
 * rail. Privacy and Terms share this so the two read as one document family.
 */
export function LegalArticle({
  updated,
  intro,
  clauses,
}: {
  updated: string;
  intro: string;
  clauses: LegalClause[];
}) {
  const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  return (
    <Section tone="paper" divide={false}>
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
        {/* Contents */}
        <nav aria-label="Contents" className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow mb-5">Contents</p>
            <ol className="space-y-2.5">
              {clauses.map((c, i) => (
                <li key={c.heading} className="flex gap-3 text-sm">
                  <span className="shrink-0 tabular-nums text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <a
                    href={`#${slug(c.heading)}`}
                    className="text-navy/60 transition-colors hover:text-gold"
                  >
                    {c.heading}
                  </a>
                </li>
              ))}
            </ol>
            <p className="mt-8 border-t border-line pt-6 text-xs text-navy/45">
              Last updated {updated}
            </p>
          </div>
        </nav>

        {/* Document */}
        <div className="lg:col-span-8">
          <p className="mb-14 text-lg leading-relaxed text-navy/75">{intro}</p>

          {clauses.map((c, i) => (
            <section
              key={c.heading}
              id={slug(c.heading)}
              className="scroll-mt-32 border-t border-line py-10 first:border-t-0 first:pt-0"
            >
              <div className="mb-4 flex items-baseline gap-4">
                <span className="eyebrow shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="display-md text-navy">{c.heading}</h2>
              </div>
              <div className="space-y-4">
                {c.body.map((p, j) => (
                  <p key={j} className="text-sm leading-relaxed text-navy/65">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </Section>
  );
}
