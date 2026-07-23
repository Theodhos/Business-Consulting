import type { Collection } from "mongodb";

import { getDb } from "./mongodb";
import {
  KEY_LENGTH,
  createSalt,
  derivePassword,
  verifyPassword,
} from "./password.mjs";

/**
 * Administrator accounts, stored in MongoDB.
 *
 * Passwords are never stored in any recoverable form. Each account keeps a
 * random salt and an scrypt derivation of the password; verification re-derives
 * and compares in constant time. The derivation itself lives in `password.mjs`
 * so `scripts/seed-admin.mjs` uses exactly the same parameters.
 *
 * Create or update an account with `npm run seed:admin`.
 */

export const ADMIN_COLLECTION = "admin_users";

export type AdminUser = {
  username: string;
  /** Lowercased `username`, so lookups and uniqueness are case-insensitive. */
  usernameLower: string;
  salt: string;
  passwordHash: string;
  keyLength: number;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
};

export async function adminUsers(): Promise<Collection<AdminUser>> {
  const db = await getDb();
  const collection = db.collection<AdminUser>(ADMIN_COLLECTION);
  // Cheap and idempotent; guarantees two accounts cannot share a username.
  await collection.createIndex({ usernameLower: 1 }, { unique: true });
  return collection;
}

/** Creates the account, or replaces the password on an existing one. */
export async function upsertAdminUser(username: string, password: string): Promise<AdminUser> {
  const trimmed = username.trim();
  if (!trimmed) throw new Error("A username is required.");
  if (password.length < 8) throw new Error("The password must be at least 8 characters.");

  const salt = createSalt();
  const passwordHash = await derivePassword(password, salt);
  const now = new Date();

  const collection = await adminUsers();
  await collection.updateOne(
    { usernameLower: trimmed.toLowerCase() },
    {
      $set: {
        username: trimmed,
        usernameLower: trimmed.toLowerCase(),
        salt,
        passwordHash,
        keyLength: KEY_LENGTH,
        updatedAt: now,
      },
      $setOnInsert: { createdAt: now },
    },
    { upsert: true },
  );

  return (await collection.findOne({ usernameLower: trimmed.toLowerCase() }))!;
}

export type VerifyResult =
  | { ok: true; username: string }
  | { ok: false; reason: "no-such-user" | "wrong-password" };

/**
 * Checks a username and password against the collection.
 *
 * A missing user still pays for one scrypt derivation, so the response time does
 * not reveal whether the username exists.
 */
export async function verifyAdminUser(username: string, password: string): Promise<VerifyResult> {
  const collection = await adminUsers();
  const user = await collection.findOne({ usernameLower: username.trim().toLowerCase() });

  if (!user) {
    await derivePassword(password, "absent-user-timing-equaliser");
    return { ok: false, reason: "no-such-user" };
  }

  if (!(await verifyPassword(password, user.salt, user.passwordHash))) {
    return { ok: false, reason: "wrong-password" };
  }

  return { ok: true, username: user.username };
}

export async function recordLogin(username: string): Promise<void> {
  const collection = await adminUsers();
  await collection.updateOne(
    { usernameLower: username.toLowerCase() },
    { $set: { lastLoginAt: new Date() } },
  );
}

export async function countAdminUsers(): Promise<number> {
  return (await adminUsers()).countDocuments();
}
