import Link from "next/link";
import { Eye, FileEdit, PenLine } from "lucide-react";

import ConsoleFeedback from "@/components/console/ConsoleFeedback";
import ConsoleHeader from "@/components/console/ConsoleHeader";
import PostRowActions from "@/components/console/PostRowActions";
import { requireSession } from "@/lib/auth";
import { getAllPosts, type Post } from "@/lib/posts";

import type { ActionResult } from "./actions";

/**
 * The outcome of a save, which the editor hands back through the URL.
 *
 * Deletions and publish toggles report themselves from the client instead — they
 * happen on this page, so there is nothing to redirect back from.
 */
function saveNotice(state: string, slug: string, posts: Post[]): ActionResult | null {
  const name = posts.find((p) => p.slug === slug)?.title ?? slug;
  const href = `/articles/${slug}`;

  switch (state) {
    case "published":
      return {
        ok: true,
        title: "Published",
        message: `“${name}” is now live on the articles page.`,
        href,
        at: 0,
      };
    case "updated":
      return {
        ok: true,
        title: "Updated",
        message: `The changes to “${name}” are live on the articles page.`,
        href,
        at: 0,
      };
    case "draft":
      return {
        ok: true,
        title: "Saved as a draft",
        message: `“${name}” is stored here but is not on the site. Publish it when it is ready.`,
        at: 0,
      };
    case "draft-updated":
      return {
        ok: true,
        title: "Draft updated",
        message: `The changes to “${name}” are saved. It is still a draft, so nothing on the site has changed.`,
        at: 0,
      };
    default:
      return null;
  }
}

export default async function ConsoleDashboard({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; state?: string }>;
}) {
  const session = await requireSession();
  const { saved, state } = await searchParams;
  const posts = await getAllPosts();

  const live = posts.filter((p) => p.published).length;
  const drafts = posts.length - live;

  const notice = saved && state ? saveNotice(state, saved, posts) : null;

  return (
    <>
      <ConsoleHeader username={session.username} />

      {/* Keyed on the outcome so a fresh save always opens the dialog, even when
          the previous one was dismissed without leaving the page. */}
      <ConsoleFeedback key={`${saved ?? ""}:${state ?? ""}`} initial={notice}>
        <main className="mx-auto w-full max-w-6xl px-6 py-14 md:px-8 md:py-20">
          {/* Heading */}
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b border-silver/50 pb-8">
            <div>
              <p className="eyebrow mb-3">Articles</p>
              <h1 className="font-display text-[2.2rem] font-bold leading-tight text-navy">
                All articles
              </h1>
              <p className="mt-3 font-sans text-[13.5px] text-slate/75">
                {posts.length === 0
                  ? "Nothing here yet — write the first article."
                  : `${live} live · ${drafts} draft${drafts === 1 ? "" : "s"}`}
              </p>
            </div>
            <Link
              href="/admin/posts/new"
              className="inline-flex items-center gap-3 bg-navy px-7 py-4 font-sans text-[10.5px] font-semibold uppercase tracking-[0.18em] text-paper transition-colors hover:bg-gold hover:text-ink"
            >
              <PenLine size={13} strokeWidth={2} />
              New article
            </Link>
          </div>

          {/* List */}
          {posts.length === 0 ? (
            <div className="border border-dashed border-silver/70 px-8 py-20 text-center">
              <h2 className="font-display text-[1.5rem] font-semibold text-navy">
                No articles yet
              </h2>
              <p className="mx-auto mt-3 max-w-md font-sans text-[13.5px] leading-relaxed text-slate/75">
                Anything you publish here is added to the top of the articles page.
              </p>
              <Link
                href="/admin/posts/new"
                className="mt-8 inline-flex items-center gap-3 border border-line-strong px-7 py-4 font-sans text-[10.5px] font-semibold uppercase tracking-[0.18em] text-navy transition-colors hover:border-navy hover:bg-navy hover:text-paper"
              >
                <PenLine size={13} strokeWidth={2} />
                Write the first one
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col">
              {posts.map((post) => (
                <li
                  key={post.slug}
                  className="flex flex-wrap items-center gap-6 border-b border-silver/40 py-6 first:border-t"
                >
                  {/* Thumbnail */}
                  <div className="h-[74px] w-[110px] shrink-0 overflow-hidden border border-silver/50 bg-mist">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.image} alt="" className="h-full w-full object-cover" />
                  </div>

                  {/* Detail */}
                  <div className="min-w-[240px] flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-3">
                      <span
                        className={`font-sans text-[9.5px] font-bold uppercase tracking-[0.2em] ${
                          post.published ? "text-gold" : "text-slate/50"
                        }`}
                      >
                        {post.published ? "Live" : "Draft"}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-silver" aria-hidden />
                      <span className="font-sans text-[9.5px] font-bold uppercase tracking-[0.2em] text-slate/50">
                        {post.category}
                      </span>
                      {post.featured && (
                        <>
                          <span className="h-1 w-1 rounded-full bg-silver" aria-hidden />
                          <span className="font-sans text-[9.5px] font-bold uppercase tracking-[0.2em] text-navy/70">
                            Feature
                          </span>
                        </>
                      )}
                      {post.origin === "seed" && (
                        <>
                          <span className="h-1 w-1 rounded-full bg-silver" aria-hidden />
                          <span
                            className="font-sans text-[9.5px] font-bold uppercase tracking-[0.2em] text-slate/40"
                            title="Shipped with the site. Editable and deletable like any other."
                          >
                            Original
                          </span>
                        </>
                      )}
                    </div>
                    <Link
                      href={`/admin/posts/${post.slug}`}
                      className="font-display text-[1.2rem] font-semibold leading-snug text-navy transition-colors hover:text-gold"
                    >
                      {post.title}
                    </Link>
                    <p className="mt-1.5 font-sans text-[12px] text-slate/60">
                      {post.date} · {post.readTime} · /articles/{post.slug}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2">
                    {post.published && (
                      <Link
                        href={`/articles/${post.slug}`}
                        target="_blank"
                        title="View on the site"
                        className="inline-flex items-center gap-2 border border-line px-3.5 py-2.5 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-navy transition-colors hover:border-navy hover:bg-navy hover:text-paper"
                      >
                        <Eye size={12} strokeWidth={2} />
                        <span className="sr-only sm:not-sr-only">View</span>
                      </Link>
                    )}

                    <Link
                      href={`/admin/posts/${post.slug}`}
                      className="inline-flex items-center gap-2 border border-line px-3.5 py-2.5 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-navy transition-colors hover:border-navy hover:bg-navy hover:text-paper"
                    >
                      <FileEdit size={12} strokeWidth={2} />
                      <span className="sr-only sm:not-sr-only">Edit</span>
                    </Link>

                    <PostRowActions
                      slug={post.slug}
                      title={post.title}
                      published={post.published}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}

          <p className="mt-12 border-t border-silver/40 pt-8 font-sans text-[12px] leading-relaxed text-slate/60">
            Every article is stored in <code className="text-navy">data/posts.json</code>, including
            the six the site launched with. Deleting one here removes it for good — there is no
            undo, and it will not come back from source.
          </p>
        </main>
      </ConsoleFeedback>
    </>
  );
}
