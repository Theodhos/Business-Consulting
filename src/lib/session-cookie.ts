/**
 * The session cookie name, kept in its own module so `proxy.ts` can read it
 * without pulling in `lib/auth` — and with it `next/headers` and `node:crypto`,
 * neither of which belongs in the proxy layer.
 */
export const SESSION_COOKIE = "tg_admin_session";
