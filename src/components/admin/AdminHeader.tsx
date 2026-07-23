import Link from "next/link";
import { ExternalLink, LogOut, PenLine } from "lucide-react";

import { logoutAction } from "@/app/admin/actions";
import { site } from "@/lib/content";

export default function AdminHeader({ username }: { username: string }) {
  return (
    <header className="border-b border-silver/50 bg-navy">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5 md:px-8">
        <Link href="/admin" className="group flex items-baseline gap-3">
          <span className="font-display text-[1.25rem] font-semibold text-paper transition-colors group-hover:text-gold">
            {site.name}
          </span>
          <span className="font-sans text-[9.5px] font-bold uppercase tracking-[0.24em] text-gold">
            Editorial
          </span>
        </Link>

        <div className="flex flex-wrap items-center gap-5">
          <Link
            href="/articles"
            target="_blank"
            className="inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-paper/55 transition-colors hover:text-gold"
          >
            <ExternalLink size={12} strokeWidth={2} />
            View site
          </Link>

          <Link
            href="/admin/posts/new"
            className="inline-flex items-center gap-2 border border-gold px-5 py-2.5 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-gold transition-colors hover:bg-gold hover:text-navy"
          >
            <PenLine size={12} strokeWidth={2} />
            New article
          </Link>

          <form action={logoutAction}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-paper/55 transition-colors hover:text-gold"
            >
              <LogOut size={12} strokeWidth={2} />
              Sign out
              <span className="sr-only"> as {username}</span>
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
