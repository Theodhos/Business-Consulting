#!/usr/bin/env node
/**
 * Creates or updates the console administrator account in MongoDB.
 *
 *   npm run seed:admin
 *
 * Reads MONGODB_URI, ADMIN_USERNAME and ADMIN_PASSWORD from `.env.local` (the
 * same files Next.js loads). Run it again with a new ADMIN_PASSWORD to change
 * the password — the account is matched on username and updated in place.
 *
 * The plaintext password is never written to the database, and never logged.
 */

import path from "node:path";
import { fileURLToPath } from "node:url";
// @next/env is CommonJS, so it has no named ESM exports.
import nextEnv from "@next/env";
import { MongoClient } from "mongodb";

const { loadEnvConfig } = nextEnv;

import { KEY_LENGTH, createSalt, derivePassword } from "../src/lib/password.mjs";

const projectDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
loadEnvConfig(projectDir, /* dev */ true, { info: () => {}, error: console.error });

const COLLECTION = "admin_users";
const DEFAULT_DB = "tide_global";

function fail(message) {
  console.error(`\n  ${message}\n`);
  process.exit(1);
}

const uri = process.env.MONGODB_URI?.trim();
const username = process.env.ADMIN_USERNAME?.trim();
const password = process.env.ADMIN_PASSWORD;

if (!uri) fail("MONGODB_URI is not set. Add it to .env.local.");
if (!username) fail("ADMIN_USERNAME is not set. Add it to .env.local.");
if (!password) fail("ADMIN_PASSWORD is not set. Add it to .env.local.");
if (password.length < 8) fail("ADMIN_PASSWORD must be at least 8 characters.");

const client = new MongoClient(uri, { serverSelectionTimeoutMS: 8_000 });

try {
  await client.connect();

  const named = process.env.MONGODB_DB?.trim();
  const fromUri = client.db().databaseName;
  const db = named
    ? client.db(named)
    : fromUri && fromUri !== "test"
      ? client.db(fromUri)
      : client.db(DEFAULT_DB);

  const collection = db.collection(COLLECTION);
  await collection.createIndex({ usernameLower: 1 }, { unique: true });

  const usernameLower = username.toLowerCase();
  const existing = await collection.findOne({ usernameLower });

  const salt = createSalt();
  const passwordHash = await derivePassword(password, salt);
  const now = new Date();

  await collection.updateOne(
    { usernameLower },
    {
      $set: { username, usernameLower, salt, passwordHash, keyLength: KEY_LENGTH, updatedAt: now },
      $setOnInsert: { createdAt: now },
    },
    { upsert: true },
  );

  const total = await collection.countDocuments();

  console.log(`
  ${existing ? "Password updated" : "Administrator created"}

    database    ${db.databaseName}
    collection  ${COLLECTION}
    username    ${username}
    password    stored as a salted scrypt derivation, not as text
    accounts    ${total} total
`);
} catch (error) {
  if (error?.name === "MongoServerSelectionError") {
    fail(`MongoDB could not be reached at ${uri.replace(/\/\/[^@]*@/, "//***@")}.\n  Is the server running?`);
  }
  fail(`The account could not be written: ${error?.message ?? error}`);
} finally {
  await client.close();
}
