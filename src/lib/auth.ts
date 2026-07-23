import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SESSION_COOKIE } from "./session-cookie";

/**
 * Admin session.
 *
 * A single operator publishes articles, so there is no user table — the
 * credentials live in the environment and the session is a signed cookie. The
 * cookie carries only a username and an expiry; the signature (HMAC-SHA256 over
 * the payload) is what makes it unforgeable.
 *
 * Required in production:
 *   ADMIN_USERNAME, ADMIN_PASSWORD (or ADMIN_PASSWORD_HASH), ADMIN_SESSION_SECRET
 *
 * Without them login is refused outright in production rather than falling back
 * to a default — a guessable admin password on a live site is worse than an
 * inaccessible one. In development a default is used so the panel is usable
 * immediately.
 */

export { SESSION_COOKIE };

const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours

const DEV_USERNAME = "admin";
const DEV_PASSWORD = "admin";
const DEV_SECRET = "tide-global-development-secret-not-for-production";

const isProduction = process.env.NODE_ENV === "production";

type Session = { username: string; exp: number };

export type AuthConfigError = "missing-credentials" | "missing-secret" | null;

/* ── Configuration ──────────────────────────────────────────────── */

function sessionSecret(): string | null {
  const configured = process.env.ADMIN_SESSION_SECRET?.trim();
  if (configured) return configured;
  return isProduction ? null : DEV_SECRET;
}

function credentials(): { username: string; password?: string; passwordHash?: string } | null {
  const username = process.env.ADMIN_USERNAME?.trim();
  const password = process.env.ADMIN_PASSWORD;
  const passwordHash = process.env.ADMIN_PASSWORD_HASH?.trim();

  if (username && (password || passwordHash)) return { username, password, passwordHash };
  if (isProduction) return null;
  return { username: DEV_USERNAME, password: DEV_PASSWORD };
}

/** Surfaced on the login screen so a misconfigured deployment is obvious. */
export function authConfigError(): AuthConfigError {
  if (!credentials()) return "missing-credentials";
  if (!sessionSecret()) return "missing-secret";
  return null;
}

/** True when the panel is running on the built-in development credentials. */
export function usingDevCredentials(): boolean {
  return !isProduction && !process.env.ADMIN_USERNAME;
}

/* ── Credential check ───────────────────────────────────────────── */

function sha256(value: string): Buffer {
  return crypto.createHash("sha256").update(value, "utf8").digest();
}

/** Constant-time comparison over digests, so inputs of any length are safe. */
function matches(a: string, b: string): boolean {
  return crypto.timingSafeEqual(sha256(a), sha256(b));
}

export function verifyCredentials(username: string, password: string): boolean {
  const expected = credentials();
  if (!expected) return false;

  const userOk = matches(username, expected.username);

  const passwordOk = expected.passwordHash
    ? matches(crypto.createHash("sha256").update(password, "utf8").digest("hex"), expected.passwordHash.toLowerCase())
    : matches(password, expected.password ?? "");

  // Both are evaluated before returning so a wrong username costs the same as a
  // wrong password.
  return userOk && passwordOk;
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
 * Gate for every admin page and mutating action. The cookie is verified here,
 * on the server, on every request — `proxy.ts` only does the cheap check.
 */
export async function requireSession(): Promise<Session> {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}
