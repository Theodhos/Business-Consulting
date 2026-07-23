import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { SESSION_COOKIE } from "@/lib/session-cookie";

/**
 * Optimistic gate on /admin — it only checks that a session cookie is present,
 * which is enough to bounce anonymous visitors to the login screen without a
 * flash of the panel. The signature is verified server-side on every admin page
 * and every action via `requireSession()`; this is not the security boundary.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname === "/admin/login") return NextResponse.next();

  if (!request.cookies.has(SESSION_COOKIE)) {
    const url = new URL("/admin/login", request.url);
    if (pathname !== "/admin") url.searchParams.set("from", `${pathname}${search}`);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
