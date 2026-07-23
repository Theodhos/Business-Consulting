import { promises as fs } from "node:fs";
import path from "node:path";

import { articles as seededArticles } from "./content";

/**
 * Article store.
 *
 * Every article the site publishes lives in `data/posts.json`, and every one of
 * them is editable and deletable from the console.
 *
 * The six pieces hand-written in `content.ts` are the seed: the first time the
 * store is read they are copied in, once, and the store takes over from there.
 * `content.ts` is never read again unless the store is deleted — so editing one
 * of those six in the console sticks, and deleting one keeps it gone rather than
 * having it reappear from source on the next request.
 *
 * The store is a JSON file rather than a database because the project has no
 * database for articles and one person publishes occasionally. It requires a
 * writable filesystem — see README for the deployment note.
 */

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  category: string;
  featured: boolean;
};

export type Post = Article & {
  /** Drafts are stored but never leave the console. */
  published: boolean;
  /** "seed" for one of the six that shipped with the site, "console" for the rest. */
  origin: "seed" | "console";
  createdAt: string;
  updatedAt: string;
};

type Store = {
  /** Set once the seed articles have been copied in, so it never happens twice. */
  seeded: boolean;
  posts: Post[];
};

const DATA_DIR = path.join(process.cwd(), "data");
const POSTS_FILE = path.join(DATA_DIR, "posts.json");

/* ── The seed, normalised out of the readonly const ─────────────── */

const seedArticles: Article[] = seededArticles.map((a) => ({
  slug: a.slug,
  title: a.title,
  excerpt: a.excerpt,
  content: a.content,
  date: a.date,
  readTime: a.readTime,
  author: a.author,
  image: a.image,
  category: a.category,
  featured: a.featured,
}));

/**
 * Ordering timestamps for the seeded articles.
 *
 * Listing sorts newest-first on `createdAt`, but these six have always appeared
 * in the order they are written in `content.ts` — not by their cover dates. They
 * are given a descending run of synthetic timestamps far in the past, which
 * preserves that order and keeps anything published later above them.
 */
function seedTimestamp(index: number): string {
  const base = Date.UTC(2000, 0, 1);
  return new Date(base + (seedArticles.length - index) * 1000).toISOString();
}

/* ── Storage ────────────────────────────────────────────────────── */

function isPost(value: unknown): value is Post {
  const p = value as Post;
  return (
    !!p &&
    typeof p === "object" &&
    typeof p.slug === "string" &&
    typeof p.title === "string" &&
    typeof p.content === "string"
  );
}

async function readStore(): Promise<Store> {
  try {
    const raw = await fs.readFile(POSTS_FILE, "utf8");
    const parsed = JSON.parse(raw);
    const list = Array.isArray(parsed) ? parsed : parsed?.posts;
    return {
      seeded: parsed?.seeded === true,
      posts: Array.isArray(list) ? list.filter(isPost) : [],
    };
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code !== "ENOENT") console.error("[posts] Could not read the store.", error);
    return { seeded: false, posts: [] };
  }
}

async function writeStore(store: Store): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(POSTS_FILE, `${JSON.stringify(store, null, 2)}\n`, "utf8");
}

/**
 * Reads the store, importing the seed articles on the first call.
 *
 * Concurrent requests share one import promise — two parallel page loads against
 * an unseeded store would otherwise both write, duplicating all six.
 */
let seeding: Promise<Store> | null = null;

async function loadStore(): Promise<Store> {
  const store = await readStore();
  if (store.seeded) return store;

  seeding ??= (async () => {
    // Re-read inside the lock: another request may have finished seeding while
    // this one waited.
    const current = await readStore();
    if (current.seeded) return current;

    const known = new Set(current.posts.map((p) => p.slug));
    const imported: Post[] = seedArticles
      .filter((a) => !known.has(a.slug))
      .map((article, index) => ({
        ...article,
        published: true,
        origin: "seed" as const,
        createdAt: seedTimestamp(index),
        updatedAt: seedTimestamp(index),
      }));

    const next: Store = { seeded: true, posts: [...current.posts, ...imported] };
    await writeStore(next);
    return next;
  })().finally(() => {
    seeding = null;
  });

  return seeding;
}

async function savePosts(posts: Post[]): Promise<void> {
  await writeStore({ seeded: true, posts });
}

/* ── Reads used by the public site ──────────────────────────────── */

/** Published articles, newest first. */
export async function getPublishedArticles(): Promise<Article[]> {
  const { posts } = await loadStore();
  return posts
    .filter((p) => p.published)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const all = await getPublishedArticles();
  return all.find((a) => a.slug === slug) ?? null;
}

/* ── Reads used by the console ──────────────────────────────────── */

/** Every article, drafts included, most recently touched first. */
export async function getAllPosts(): Promise<Post[]> {
  const { posts } = await loadStore();
  return [...posts].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { posts } = await loadStore();
  return posts.find((p) => p.slug === slug) ?? null;
}

/* ── Writes ─────────────────────────────────────────────────────── */

export type PostInput = Omit<Post, "createdAt" | "updatedAt" | "origin">;

/**
 * Creates the article, or replaces the one at `previousSlug` when the editor
 * renamed it. Returns the stored record.
 */
export async function upsertPost(input: PostInput, previousSlug?: string): Promise<Post> {
  const { posts } = await loadStore();
  const now = new Date().toISOString();
  const targetSlug = previousSlug ?? input.slug;
  const index = posts.findIndex((p) => p.slug === targetSlug);

  const existing = index >= 0 ? posts[index] : null;

  const record: Post = {
    ...input,
    // Editing a seeded article keeps it marked as seeded, and keeps its place in
    // the running order.
    origin: existing?.origin ?? "console",
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };

  const next = [...posts];
  if (index >= 0) next[index] = record;
  else next.unshift(record);

  await savePosts(next);
  return record;
}

export async function deletePost(slug: string): Promise<boolean> {
  const { posts } = await loadStore();
  const remaining = posts.filter((p) => p.slug !== slug);
  if (remaining.length === posts.length) return false;
  await savePosts(remaining);
  return true;
}

export async function setPublished(slug: string, published: boolean): Promise<Post | null> {
  const { posts } = await loadStore();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index < 0) return null;

  const next = [...posts];
  next[index] = { ...next[index], published, updatedAt: new Date().toISOString() };
  await savePosts(next);
  return next[index];
}

/* ── Helpers shared with the editor ─────────────────────────────── */

export function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Matches the "March 15, 2026" form the seeded articles use. */
export function formatPublishDate(date = new Date()): string {
  return `${MONTHS[date.getMonth()]} ${String(date.getDate()).padStart(2, "0")}, ${date.getFullYear()}`;
}

export function estimateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}

/** Every category already in use, offered as suggestions in the editor. */
export async function getKnownCategories(): Promise<string[]> {
  const { posts } = await loadStore();
  const all = posts.map((a) => a.category).filter(Boolean);
  return [...new Set(all)].sort((a, b) => a.localeCompare(b));
}

/** True when another article already holds this slug. */
export async function isSlugTaken(slug: string, exceptSlug?: string): Promise<boolean> {
  const { posts } = await loadStore();
  return posts.some((p) => p.slug === slug && p.slug !== exceptSlug);
}
