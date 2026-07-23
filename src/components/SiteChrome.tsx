"use client";

import { usePathname } from "next/navigation";

/**
 * The public navbar and footer, withheld from /admin. The panel carries its own
 * header and has no business showing the marketing navigation.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <>{children}</>;
}
