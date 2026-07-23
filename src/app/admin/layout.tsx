import type { Metadata } from "next";

/**
 * The admin panel reads the article store from disk and the session from a
 * cookie, so nothing under /admin may be prerendered or cached.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s — Admin" },
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-[100dvh] w-full bg-paper">{children}</div>;
}
