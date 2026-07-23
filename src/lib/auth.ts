import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { recordLogin, verifyAdminUser } from "./admin-users";
import { isMongoConfigured } from "./mongodb";
import { CONSOLE_LOGIN_PATH } from "./console-path";
import { SESSION_COOKIE } from "./session-cookie";

/**
 * Console session.
 *
 * Credentials live in MongoDB (`admin_users`), not in the environment — see
 * `admin-users.ts`. This module owns only the session that follows a successful
 * check: a cookie carrying a username and an expiry, signed with HMAC-SHA256 so
 * it cannot be forged.
 *
 * Required in production: MONGODB_URI and ADMIN_SESSION_SECRET.
 */

export { SESSION_COOKIE };

const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours

const DEV_SECRET = "tide-global-development-secret-not-for-production";

const isProduction = process.env.NODE_ENV === "production";

type Session = { username: string; exp: number };

export type AuthConfigError = "missing-database" | "missing-secret" | null;

/* ── Configuration ──────────────────────────────────────────────── */

function sessionSecret(): string | null {
  const configured = process.env.ADMIN_SESSION_SECRET?.trim();
  if (configured) return configured;
  // A signing key is not a credential, so a development fallback is safe — the
  // password still has to match the one in MongoDB.
  return isProduction ? null : DEV_SECRET;
}

/** Surfaced on the login screen so a misconfigured deployment is obvious. */
export function authConfigError(): AuthConfigError {
  if (!isMongoConfigured()) return "missing-database";
  if (!sessionSecret()) return "missing-secret";
  return null;
}

/* ── Credential check ───────────────────────────────────────────── */

export type LoginOutcome =
  | { ok: true; username: string }
  | { ok: false; reason: "rejected" | "unavailable" };

/**
 * Checks the submitted credentials against MongoDB.
 *
 * A wrong username and a wrong password are reported identically — the response
 * must not tell an attacker which half they got right.
 */
export async function checkCredentials(username: string, password: string): Promise<LoginOutcome> {
  try {
    const result = await verifyAdminUser(username, password);
    if (!result.ok) return { ok: false, reason: "rejected" };

    // Best-effort; a failed timestamp write must not block a valid sign-in.
    void recordLogin(result.username).catch((error) =>
      console.error("[console] Could not record the login timestamp.", error),
    );

    return { ok: true, username: result.username };
  } catch (error) {
    console.error("[console] The credential check could not reach MongoDB.", error);
    return { ok: false, reason: "unavailable" };
  }
}

/* ── Token ──────────────────────────────────────────────────────── */

function base64url(input: Buffer | string): string {
  return Buffer.from(input).toString("base64url");
}

function sign(payload: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(payload).digest("base64url");
}

function createToken(session: Session, secret: string): string {
  const payload = base64url(JSON.stringify(session));
  return `${payload}.${sign(payload, secret)}`;
}

function readToken(token: string, secret: string): Session | null {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expected = sign(payload, secret);
  if (signature.length !== expected.length) return null;
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as Session;
    if (typeof session.exp !== "number" || session.exp * 1000 < Date.now()) return null;
    if (typeof session.username !== "string") return null;
    return session;
  } catch {
    return null;
  }
}

/* ── Session lifecycle ──────────────────────────────────────────── */

export async function createSession(username: string): Promise<boolean> {
  const secret = sessionSecret();
  if (!secret) return false;

  const session: Session = {
    username,
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE,
  };

  (await cookies()).set(SESSION_COOKIE, createToken(session, secret), {
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction,
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  return true;
}

export async function destroySession(): Promise<void> {
  (await cookies()).delete(SESSION_COOKIE);
}

export async function getSession(): Promise<Session | null> {
  const secret = sessionSecret();
  if (!secret) return null;

  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;

  return readToken(token, secret);
}

/**
 * Gate for every console page and mutating action. The cookie is verified here,
 * on the server, on every request — `proxy.ts` only does the cheap check.
 */
export async function requireSession(): Promise<Session> {
  const session = await getSession();
  if (!session) redirect(CONSOLE_LOGIN_PATH);
  return session;
}
