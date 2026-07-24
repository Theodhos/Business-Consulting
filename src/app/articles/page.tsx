import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Section";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/content";
import { getPublishedArticles } from "@/lib/posts";

/** The article store is read from disk on each request, so nothing is prerendered. */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Articles & Insights | ${site.name}`,
  description:
    "In-depth articles on South African immigration strategy, permanent residence, executive relocation, and private client advisory from Tide Global.",
};

export default async function ArticlesPage() {
  const articles = await getPublishedArticles();

  return (
    <>
      <PageHero
        eyebrow="Articles & Insights"
        title="Clarity on matters that move."
        lead="Authoritative commentary on South African immigration strategy, regulatory change, and the private client decisions that surround it."
        image="/ph7.png"
      />

      {/* A plain <div>, not a second <main>: the layout already renders one, and
          nesting a second made the footer-clearance rule in globals.css match
          both it and the section inside, stacking the gap above the footer twice.
          Bottom spacing comes from that rule alone. */}
      <div className="w-full bg-paper">
        <section className="pt-14 sm:pt-20 lg:pt-28">
          <Container>
            <div className="grid grid-cols-1 gap-10 sm:gap-12 md:grid-cols-2 lg:gap-16">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  className="group flex flex-col bg-paper transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Image container */}
                  <div className="relative mb-6 aspect-[16/10] w-full overflow-hidden border border-silver/40 sm:mb-8">
                    <img
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-navy/0 transition-colors duration-500 group-hover:bg-navy/5" />
                  </div>

                  {/* Meta row */}
                  <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-slate/60 sm:mb-4 sm:gap-4 sm:tracking-[0.2em]">
                    <span className="text-gold">{article.category}</span>
                    <span className="h-1 w-1 rounded-full bg-silver/60" />
                    <span>{article.readTime}</span>
                  </div>

                  {/* Title */}
                  <h2 className="mb-3 font-display text-[1.4rem] font-semibold leading-[1.25] text-navy transition-colors duration-300 group-hover:text-gold sm:mb-4 sm:text-[1.6rem]">
                    {article.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="mb-5 font-sans text-[14px] leading-[1.8] text-slate/80 line-clamp-3 sm:mb-6">
                    {article.excerpt}
                  </p>

                  {/* Read Link */}
                  <span className="mt-auto inline-flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-navy transition-colors group-hover:text-gold">
                    Read Article
                    <ArrowRight
                      size={13}
                      strokeWidth={2}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}
