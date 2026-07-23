import Link from "next/link";
import { CheckCircle2, Eye, FileEdit, PenLine, Trash2 } from "lucide-react";

import ConsoleHeader from "@/components/console/ConsoleHeader";
import ConfirmSubmit from "@/components/console/ConfirmSubmit";
import { requireSession } from "@/lib/auth";
import { getAllPosts } from "@/lib/posts";

import { deletePostAction, togglePublishAction } from "./actions";

const NOTICES: Record<string, string> = {
  published: "Published. It is live on /articles.",
  draft: "Saved as a draft. It is not visible on the site.",
  unpublished: "Unpublished. It has been removed from /articles.",
  deleted: "Deleted.",
};

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

  return (
    <>
      <ConsoleHeader username={session.username} />

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

        {saved && state && NOTICES[state] && (
          <p
            role="status"
            className="mb-10 flex items-center gap-3 border-l-2 border-gold bg-gold/5 px-5 py-4 font-sans text-[13px] text-navy"
          >
            <CheckCircle2 size={15} strokeWidth={2} className="shrink-0 text-gold" />
            <span>
              <span className="font-semibold">{saved}</span> — {NOTICES[state]}
            </span>
          </p>
        )}

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

                  <form action={togglePublishAction}>
                    <input type="hidden" name="slug" value={post.slug} />
                    <input type="hidden" name="publish" value={post.published ? "false" : "true"} />
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 border border-line px-3.5 py-2.5 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-navy transition-colors hover:border-gold hover:bg-gold hover:text-ink"
                    >
                      {post.published ? "Unpublish" : "Publish"}
                    </button>
                  </form>

                  <form action={deletePostAction}>
                    <input type="hidden" name="slug" value={post.slug} />
                    <ConfirmSubmit
                      message={`Delete “${post.title}”? This cannot be undone.`}
                      className="inline-flex items-center gap-2 border border-line px-3.5 py-2.5 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-red-700 transition-colors hover:border-red-700 hover:bg-red-700 hover:text-paper"
                    >
                      <Trash2 size={12} strokeWidth={2} />
                      <span className="sr-only">Delete</span>
                    </ConfirmSubmit>
                  </form>
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
    </>
  );
}
