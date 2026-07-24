"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useState } from "react";
import { ExternalLink } from "lucide-react";

import type { ActionResult } from "@/app/admin/actions";

import ActionDialog from "./ActionDialog";

/**
 * Holds the outcome dialog for the whole dashboard.
 *
 * It lives above the article list on purpose: deleting an article removes its
 * row, and a dialog owned by that row would vanish with it before it could say
 * the deletion worked.
 *
 * Two things feed it — actions run from a row, through `useConsoleNotice`, and
 * the `?saved=&state=` the editor redirects back with after a save.
 */

const NoticeContext = createContext<(notice: ActionResult) => void>(() => {});

/** Report an outcome to the dashboard dialog. */
export function useConsoleNotice(): (notice: ActionResult) => void {
  return useContext(NoticeContext);
}

export default function ConsoleFeedback({
  initial,
  children,
}: {
  /** The outcome carried in the URL after a save, if there was one. */
  initial?: ActionResult | null;
  children: React.ReactNode;
}) {
  const [notice, setNotice] = useState<ActionResult | null>(initial ?? null);
  const router = useRouter();
  const pathname = usePathname();

  const close = useCallback(() => {
    setNotice(null);
    // The save outcome lives in the query string; drop it so reloading the
    // dashboard does not announce the same save a second time.
    if (window.location.search) router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  return (
    <NoticeContext.Provider value={setNotice}>
      {children}

      <ActionDialog
        open={Boolean(notice?.title)}
        tone={notice?.ok ? "success" : "error"}
        title={notice?.title ?? ""}
        message={notice?.message ?? ""}
        confirmLabel="Close"
        onConfirm={close}
      >
        {notice?.href && (
          <Link
            href={notice.href}
            target="_blank"
            className="inline-flex items-center gap-2 border border-line-strong px-5 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-navy transition-colors hover:border-navy hover:bg-navy hover:text-paper"
          >
            <ExternalLink size={12} strokeWidth={2} />
            Open it on the site
          </Link>
        )}
      </ActionDialog>
    </NoticeContext.Provider>
  );
}
