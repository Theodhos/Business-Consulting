import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Calendar, Tag } from "lucide-react";
import { Container } from "@/components/ui/Section";
import PageHero from "@/components/PageHero";
import { articles, site } from "@/lib/content";

export const metadata: Metadata = {
  title: `Articles & Insights | ${site.name}`,
  description:
    "In-depth articles on South African immigration strategy, permanent residence, executive relocation, and private client advisory from Tide Global.",
};

const featured = articles.filter((a) => (a as any).featured);
const rest = articles.filter((a) => !(a as any).featured);

/* ── Category badge ─────────────────────────────────────────── */
function CategoryBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
      <Tag size={9} strokeWidth={2.5} />
      {label}
    </span>
  );
}

/* ── Meta row (date + read time) ─────────────────────────────── */
function MetaRow({ date, readTime }: { date: string; readTime: string }) {
  return (
    <div className="flex items-center gap-5 font-sans text-[11.5px] text-slate/70">
      <span className="flex items-center gap-1.5">
        <Calendar size={11} strokeWidth={2} />
        {date}
      </span>
      <span className="flex items-center gap-1.5">
        <Clock size={11} strokeWidth={2} />
        {readTime}
      </span>
    </div>
  );
}

export default function ArticlesPage() {
  return (
    <>
      <PageHero
        eyebrow="Articles & Insights"
        title="Clarity on matters that move."
        lead="Authoritative commentary on South African immigration strategy, regulatory change, and the private client decisions that surround it."
        image="/ph7.png"
      />

      <main className="w-full bg-paper">

        {/* ── Featured articles ────────────────────────────────── */}
        {featured.length > 0 && (
          <section className="border-b border-silver/40 py-20 lg:py-28">
            <Container>
              <p className="eyebrow mb-12 text-navy/60">Featured</p>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {featured.map((article, i) => (
                  <Link
                    key={article.slug}
                    href={`/articles/${article.slug}`}
                    className="group relative flex flex-col overflow-hidden border border-silver/40 bg-paper transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_56px_rgba(26,58,92,0.10)] hover:border-gold/30"
                  >
                    {/* Image */}
                    <div className="relative h-[280px] overflow-hidden">
                      <img
                        src={(article as any).image}
                        alt={article.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Gradient */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, transparent 30%, rgba(26,58,92,0.65) 100%)",
                        }}
                      />
                      {/* Category on image */}
                      <div className="absolute bottom-5 left-6">
                        <CategoryBadge label={(article as any).category} />
                      </div>
                      {/* Gold accent bar */}
                      <span className="absolute left-0 top-0 h-[3px] w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                    </div>

                    {/* Body */}
                    <div className="flex flex-1 flex-col p-8">
                      <MetaRow date={article.date} readTime={article.readTime} />
                      <h2 className="mt-4 font-display text-[1.35rem] font-semibold leading-[1.2] text-navy transition-colors duration-300 group-hover:text-gold">
                        {article.title}
                      </h2>
                      <p className="mt-3 font-sans text-[13.5px] leading-[1.85] text-slate line-clamp-3">
                        {article.excerpt}
                      </p>
                      <span className="mt-auto pt-6 inline-flex items-center gap-2 font-sans text-[10.5px] font-semibold uppercase tracking-[0.22em] text-gold transition-colors group-hover:text-navy">
                        Read Article{" "}
                        <ArrowRight
                          size={12}
                          strokeWidth={2}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* ── All other articles ───────────────────────────────── */}
        <section className="py-20 lg:py-28">
          <Container>
            <p className="eyebrow mb-12 text-navy/60">All Articles</p>

            {/* Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {rest.map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  className="group flex flex-col overflow-hidden border border-silver/40 bg-paper transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(26,58,92,0.08)] hover:border-gold/30"
                >
                  {/* Image */}
                  <div className="relative h-[200px] overflow-hidden">
                    <img
                      src={(article as any).image}
                      alt={article.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-0 top-0 h-[3px] w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-6 lg:p-7">
                    <CategoryBadge label={(article as any).category} />
                    <MetaRow
                      date={article.date}
                      readTime={article.readTime}
                    />
                    <h3 className="mt-3 font-display text-[1.1rem] font-semibold leading-[1.25] text-navy transition-colors duration-300 group-hover:text-gold">
                      {article.title}
                    </h3>
                    <p className="mt-3 flex-1 font-sans text-[13px] leading-[1.85] text-slate line-clamp-3">
                      {article.excerpt}
                    </p>
                    <span className="mt-auto pt-5 inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-gold transition-colors group-hover:text-navy">
                      Read Article{" "}
                      <ArrowRight
                        size={11}
                        strokeWidth={2}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>

      </main>

    </>
  );
}
