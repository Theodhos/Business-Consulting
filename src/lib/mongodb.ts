import { MongoClient, type Db } from "mongodb";

/**
 * MongoDB connection.
 *
 * The client is cached on `globalThis` because Next.js reloads modules on every
 * edit in development — without the cache each save would open a new pool and
 * exhaust the server's connections within a few minutes.
 *
 * Requires MONGODB_URI. MONGODB_DB is optional; the database named in the URI is
 * used when it is absent.
 */

const DEFAULT_DB = "tide_global";

declare global {
  var __tideMongoClient: Promise<MongoClient> | undefined;
}

export class MongoNotConfiguredError extends Error {
  constructor() {
    super("MONGODB_URI is not set.");
    this.name = "MongoNotConfiguredError";
  }
}

function connect(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) throw new MongoNotConfiguredError();

  return new MongoClient(uri, {
    // Fail fast rather than hanging a page render for 30 seconds when the
    // database is unreachable.
    serverSelectionTimeoutMS: 5_000,
    connectTimeoutMS: 5_000,
  }).connect();
}

export function getClient(): Promise<MongoClient> {
  if (global.__tideMongoClient) return global.__tideMongoClient;

  // A rejected promise must not stay in the cache — it would be replayed to
  // every later request, leaving the console broken until the server restarted.
  //
  // This is not the common case: the driver connects lazily and retries in the
  // background, so an unreachable server usually still resolves here and fails
  // per-query instead (which recovers on its own). It is the connect-time
  // failures — a malformed URI, rejected auth, unresolvable host — that would
  // otherwise stick.
  const attempt: Promise<MongoClient> = connect().catch((error) => {
    if (global.__tideMongoClient === attempt) global.__tideMongoClient = undefined;
    throw error;
  });

  global.__tideMongoClient = attempt;
  return attempt;
}

export async function getDb(): Promise<Db> {
  const client = await getClient();
  const named = process.env.MONGODB_DB?.trim();
  if (named) return client.db(named);

  // `db()` with no argument uses the database from the URI path, which is empty
  // for a bare `mongodb://host:port` — fall back to an explicit name.
  const fromUri = client.db().databaseName;
  return fromUri && fromUri !== "test" ? client.db(fromUri) : client.db(DEFAULT_DB);
}

export function isMongoConfigured(): boolean {
  return Boolean(process.env.MONGODB_URI?.trim());
}
