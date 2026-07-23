import crypto from "node:crypto";
import { promisify } from "node:util";

/**
 * Password derivation, shared by the running app and by `scripts/seed-admin.mjs`.
 *
 * It lives in plain ESM rather than TypeScript so the seed script can import it
 * from bare Node without a build step. If the two ever used different scrypt
 * parameters, a seeded password would silently fail to verify — one module
 * removes that possibility.
 *
 * scrypt is memory-hard: a stolen `admin_users` collection cannot be brute
 * forced at the speed a plain SHA-256 dump could.
 */

const scrypt = promisify(crypto.scrypt);

export const KEY_LENGTH = 64;
export const SALT_BYTES = 16;

/** N=2^15 costs ~32 MB per derivation — well above the driver default. */
export const SCRYPT_OPTIONS = { N: 32768, r: 8, p: 1, maxmem: 96 * 1024 * 1024 };

/**
 * @param {string} password
 * @param {string} salt
 * @returns {Promise<string>} the derived key, hex encoded
 */
export async function derivePassword(password, salt) {
  // NFKC so a password typed with composed and decomposed accents matches.
  const key = await scrypt(password.normalize("NFKC"), salt, KEY_LENGTH, SCRYPT_OPTIONS);
  return key.toString("hex");
}

/** @returns {string} a fresh random salt, hex encoded */
export function createSalt() {
  return crypto.randomBytes(SALT_BYTES).toString("hex");
}

/**
 * Constant-time comparison of a candidate password against a stored derivation.
 *
 * @param {string} password
 * @param {string} salt
 * @param {string} expectedHash hex encoded
 * @returns {Promise<boolean>}
 */
export async function verifyPassword(password, salt, expectedHash) {
  const candidate = Buffer.from(await derivePassword(password, salt), "hex");
  const stored = Buffer.from(expectedHash, "hex");
  if (candidate.length !== stored.length) return false;
  return crypto.timingSafeEqual(candidate, stored);
}
