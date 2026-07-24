import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Calendar, Tag } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { site } from "@/lib/content";
import { getPublishedArticles } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

/**
 * Articles now come from the store on disk, which admin publishing writes to at
 * runtime — so the set of slugs is not known at build time and the page cannot
 * be prerendered.
 */
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = (await getPublishedArticles()).find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: `${article.title} | ${site.name}`,
    description: article.excerpt,
  };
}

/* ── Minimal markdown → HTML renderer (headings, bold, lists) ── */

/**
 * Article bodies are now written in /admin rather than committed to source, so
 * every line is escaped before any markup is added. Only the tags this renderer
 * emits itself can reach the page.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inline(value: string): string {
  return escapeHtml(value).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

function renderContent(raw: string): string {
  const lines = raw.split("\n");
  const output: string[] = [];
  let inList = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("## ")) {
      if (inList) { output.push("</ul>"); inList = false; }
      output.push(`<h2>${escapeHtml(trimmed.slice(3))}</h2>`);
    } else if (trimmed.startsWith("- ")) {
      if (!inList) { output.push("<ul>"); inList = true; }
      output.push(`<li>${inline(trimmed.slice(2))}</li>`);
    } else if (trimmed === "") {
      if (inList) { output.push("</ul>"); inList = false; }
      output.push("");
    } else {
      if (inList) { output.push("</ul>"); inList = false; }
      output.push(`<p>${inline(trimmed)}</p>`);
    }
  }
  if (inList) output.push("</ul>");
  return output.join("\n");
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const articles = await getPublishedArticles();
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const currentIdx = articles.findIndex((a) => a.slug === slug);
  const prev = currentIdx > 0 ? articles[currentIdx - 1] : null;
  const next = currentIdx < articles.length - 1 ? articles[currentIdx + 1] : null;

  const htmlContent = renderContent(article.content);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <header className="relative w-full overflow-hidden bg-navy pb-0 pt-28 sm:pt-32 md:pt-44">
        {/* Background image */}
        <img
          src={article.image}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-center opacity-30"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(26,58,92,0.88) 0%, rgba(26,58,92,0.96) 70%, rgba(12,24,42,1) 100%)",
          }}
          aria-hidden
        />

        <Container className="relative z-10 pb-12 sm:pb-16 md:pb-20">
          <div className="mb-6 flex flex-wrap items-center gap-4 sm:mb-8 sm:gap-6">
            {/* Back link */}
            <Link
              href="/articles"
              className="group inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50 transition-colors hover:text-gold sm:tracking-[0.22em]"
            >
              <ArrowLeft
                size={13}
                strokeWidth={2}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              All Articles
            </Link>

            {/* Category badge */}
            <div className="inline-flex items-center gap-2 border border-gold/30 bg-gold/10 px-3 py-1.5">
              <Tag size={10} strokeWidth={2.5} className="text-gold" />
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                {article.category}
              </span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="max-w-4xl font-display text-[clamp(1.7rem,6.5vw,3.5rem)] font-bold leading-[1.1] text-white">
            {article.title}
          </h1>

          {/* Excerpt */}
          <p className="mt-5 max-w-2xl font-sans text-[14.5px] leading-[1.85] text-white/70 sm:mt-6 sm:text-[15px]">
            {article.excerpt}
          </p>

          {/* Meta row */}
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-5 sm:mt-8 sm:gap-6 sm:pt-6">
            <div className="flex items-center gap-2.5 font-sans text-[12px] text-white/50">
              <Calendar size={13} strokeWidth={1.8} className="text-gold/70" />
              {article.date}
            </div>
            <div className="flex items-center gap-2.5 font-sans text-[12px] text-white/50">
              <Clock size={13} strokeWidth={1.8} className="text-gold/70" />
              {article.readTime}
            </div>
            <div className="font-sans text-[12px] text-white/50">
              By <span className="text-white/80">{article.author}</span>
            </div>
          </div>
        </Container>
      </header>

      {/* ── ARTICLE BODY ─────────────────────────────────────── */}
      {/* A plain <div>, not a second <main>: the layout already renders one, and
          nesting a second made the footer-clearance rule in globals.css match
          both it and its own last child, stacking the gap above the footer twice.
          Bottom spacing comes from that rule alone. */}
      <div className="w-full bg-paper">
        <Container>
          <div className="grid grid-cols-1 gap-12 py-12 sm:gap-16 sm:py-16 lg:grid-cols-[1fr_340px] lg:py-24">

            {/* Main content column */}
            <article className="min-w-0">
              <span className="mb-8 block h-[3px] w-14 bg-gold sm:mb-12" />
              <div
                className="article-body"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </article>

            {/* Sidebar */}
            <aside className="flex flex-col gap-8 sm:gap-10">

              {/* About the author */}
              <div className="border border-silver/40 bg-mist p-6 sm:p-8">
                <p className="mb-4 font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-navy/50">
                  About the author
                </p>
                <h3 className="font-display text-[1.1rem] font-semibold text-navy">
                  {article.author}
                </h3>
                <p className="mt-3 font-sans text-[13px] leading-[1.8] text-slate">
                  Tide Global is a boutique private client immigration advisory
                  practice headquartered in Sandton. Every article reflects
                  actual advisory work and active regulatory analysis.
                </p>
                <span className="mt-5 block h-px w-10 bg-gold" />
              </div>

              {/* Book consultation CTA */}
              <div className="border-l-[3px] border-gold bg-navy p-6 sm:p-8">
                <p className="mb-3 font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-gold/80">
                  Private Advisory
                </p>
                <h3 className="font-display text-[1.1rem] font-semibold leading-[1.2] text-white">
                  A question about your specific position?
                </h3>
                <p className="mt-4 font-sans text-[13px] leading-[1.8] text-white/65">
                  A confidential conversation costs nothing and commits you to
                  nothing. Your enquiry reaches a relationship manager, not a
                  queue.
                </p>
                <Link
                  href="/contact"
                  className="group mt-6 inline-flex w-full items-center justify-center gap-3 border border-gold px-5 py-3.5 font-sans text-[10.5px] font-semibold uppercase tracking-[0.16em] text-gold transition-all duration-300 hover:bg-gold hover:text-navy sm:mt-7 sm:w-auto sm:py-3 sm:tracking-[0.22em]"
                >
                  Book a consultation
                  <ArrowRight
                    size={12}
                    strokeWidth={2}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>

              {/* Continue reading — prev/next thumbnails */}
              {(prev || next) && (
                <div>
                  <p className="mb-5 font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-navy/50">
                    Continue reading
                  </p>
                  <div className="flex flex-col gap-4">
                    {[prev, next].filter(Boolean).map((a) => (
                      <Link
                        key={a!.slug}
                        href={`/articles/${a!.slug}`}
                        className="group flex items-start gap-4 border border-silver/40 p-4 transition-all duration-300 hover:border-gold/40 hover:bg-mist"
                      >
                        <div className="h-16 w-16 shrink-0 overflow-hidden">
                          <img
                            src={a!.image}
                            alt={a!.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-sans text-[9.5px] font-bold uppercase tracking-[0.16em] text-gold sm:tracking-[0.2em]">
                            {a!.category}
                          </p>
                          <p className="mt-1 font-display text-[13px] font-semibold leading-[1.3] text-navy transition-colors group-hover:text-gold line-clamp-2">
                            {a!.title}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </Container>

        {/* ── Prev / Next Minimal Navigation ─────────────── */}
        {(prev || next) && (
          <div className="border-t border-silver/40 py-12 sm:py-16 md:py-24">
            <Container>
              <div className="grid grid-cols-1 gap-9 sm:gap-12 md:grid-cols-2 md:gap-8">
                {/* Previous (Left) */}
                {prev ? (
                  <Link
                    href={`/articles/${prev.slug}`}
                    className="group flex flex-col items-start gap-3 text-left transition-colors"
                  >
                    <span className="inline-flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-slate/50 transition-colors group-hover:text-gold">
                      <ArrowLeft size={11} strokeWidth={2.5} className="transition-transform duration-300 group-hover:-translate-x-1" />
                      Previous Article
                    </span>
                    <p className="max-w-md font-display text-[1.35rem] font-semibold leading-[1.25] text-navy transition-colors group-hover:text-gold sm:text-[1.6rem]">
                      {prev.title}
                    </p>
                  </Link>
                ) : (
                  <div className="hidden md:block" />
                )}
                
                {/* Next (Right) */}
                {next ? (
                  <Link
                    href={`/articles/${next.slug}`}
                    className="group flex flex-col items-end gap-3 text-right transition-colors"
                  >
                    <span className="inline-flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-slate/50 transition-colors group-hover:text-gold">
                      Next Article
                      <ArrowRight size={11} strokeWidth={2.5} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <p className="max-w-md font-display text-[1.35rem] font-semibold leading-[1.25] text-navy transition-colors group-hover:text-gold sm:text-[1.6rem]">
                      {next.title}
                    </p>
                  </Link>
                ) : (
                  <div className="hidden md:block" />
                )}
              </div>
            </Container>
          </div>
        )}
      </div>
    </>
  );
}
