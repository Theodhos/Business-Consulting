import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { CONSOLE_LOGIN_PATH, CONSOLE_PATH } from "@/lib/console-path";
import { SESSION_COOKIE } from "@/lib/session-cookie";

/**
 * Optimistic gate on the editorial console — it only checks that a session
 * cookie is present, which is enough to bounce anonymous visitors to the login
 * screen without a flash of the panel. The signature is verified server-side on
 * every console page and every action via `requireSession()`; this is not the
 * security boundary.
 *
 * The console is deliberately absent from `robots.txt`: a `Disallow` line would
 * publish the path to anyone who reads the file, which is the opposite of what
 * an unlisted URL is for. `X-Robots-Tag` keeps it out of indexes instead, and is
 * set here so it covers the login page too — the one console route a crawler can
 * actually reach.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const response =
    pathname === CONSOLE_LOGIN_PATH || request.cookies.has(SESSION_COOKIE)
      ? NextResponse.next()
      : redirectToLogin(request, pathname, search);

  response.headers.set("x-robots-tag", "noindex, nofollow, noarchive");
  return response;
}

function redirectToLogin(request: NextRequest, pathname: string, search: string) {
  const url = new URL(CONSOLE_LOGIN_PATH, request.url);
  if (pathname !== CONSOLE_PATH) url.searchParams.set("from", `${pathname}${search}`);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*"],
};
