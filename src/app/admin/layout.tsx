import type { Metadata } from "next";

/**
 * The console reads the article store from disk, accounts from MongoDB and the
 * session from a cookie, so nothing here may be prerendered or cached.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { default: "Editorial", template: "%s — Editorial" },
  robots: { index: false, follow: false, nocache: true, noarchive: true },
};

export default function ConsoleLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-[100dvh] w-full bg-paper">{children}</div>;
}
