import { promises as fs } from "node:fs";
import path from "node:path";

import { articles as seededArticles } from "./content";

/**
 * Article store.
 *
 * The site shipped with a hand-written `articles` array in `content.ts`. Those
 * entries stay exactly where they are — they are the editorial baseline and are
 * never mutated. Anything published from /admin is written to `data/posts.json`
 * and merged in front of them, so the newest piece is always at the top of
 * /articles.
 *
 * The store is a JSON file rather than a database because the project has no
 * database and one admin publishes occasionally. It requires a writable
 * filesystem — see README for the deployment note.
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
  /** Drafts are stored but never leave /admin. */
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const POSTS_FILE = path.join(DATA_DIR, "posts.json");

/* ── The editorial baseline, normalised out of the readonly const ── */

const baseline: Article[] = seededArticles.map((a) => ({
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

export const baselineSlugs = new Set(baseline.map((a) => a.slug));

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

export async function readPosts(): Promise<Post[]> {
  try {
    const raw = await fs.readFile(POSTS_FILE, "utf8");
    const parsed = JSON.parse(raw);
    const list = Array.isArray(parsed) ? parsed : parsed?.posts;
    if (!Array.isArray(list)) return [];
    return list.filter(isPost);
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "ENOENT") return [];
    console.error("[posts] Could not read the store.", error);
    return [];
  }
}

async function writePosts(posts: Post[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(POSTS_FILE, `${JSON.stringify({ posts }, null, 2)}\n`, "utf8");
}

/* ── Reads used by the public site ──────────────────────────────── */

/** Newest admin posts first, then the shipped articles in their original order. */
export async function getPublishedArticles(): Promise<Article[]> {
  const posts = await readPosts();
  const live = posts
    .filter((p) => p.published)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return [...live, ...baseline];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const all = await getPublishedArticles();
  return all.find((a) => a.slug === slug) ?? null;
}

/* ── Reads used by /admin ───────────────────────────────────────── */

/** Every admin post, drafts included, newest first. */
export async function getAllPosts(): Promise<Post[]> {
  const posts = await readPosts();
  return posts.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await readPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

/* ── Writes ─────────────────────────────────────────────────────── */

export type PostInput = Omit<Post, "createdAt" | "updatedAt">;

/**
 * Creates the post, or replaces the one at `previousSlug` when the editor
 * renamed it. Returns the stored record.
 */
export async function upsertPost(input: PostInput, previousSlug?: string): Promise<Post> {
  const posts = await readPosts();
  const now = new Date().toISOString();
  const targetSlug = previousSlug ?? input.slug;
  const index = posts.findIndex((p) => p.slug === targetSlug);

  const record: Post = {
    ...input,
    createdAt: index >= 0 ? posts[index].createdAt : now,
    updatedAt: now,
  };

  if (index >= 0) posts[index] = record;
  else posts.unshift(record);

  await writePosts(posts);
  return record;
}

export async function deletePost(slug: string): Promise<boolean> {
  const posts = await readPosts();
  const remaining = posts.filter((p) => p.slug !== slug);
  if (remaining.length === posts.length) return false;
  await writePosts(remaining);
  return true;
}

export async function setPublished(slug: string, published: boolean): Promise<Post | null> {
  const posts = await readPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index < 0) return null;
  posts[index] = { ...posts[index], published, updatedAt: new Date().toISOString() };
  await writePosts(posts);
  return posts[index];
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

/** Matches the "March 15, 2026" form the shipped articles already use. */
export function formatPublishDate(date = new Date()): string {
  return `${MONTHS[date.getMonth()]} ${String(date.getDate()).padStart(2, "0")}, ${date.getFullYear()}`;
}

export function estimateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}

/** Every category already in use, offered as suggestions in the editor. */
export async function getKnownCategories(): Promise<string[]> {
  const posts = await readPosts();
  const all = [...baseline, ...posts].map((a) => a.category).filter(Boolean);
  return [...new Set(all)].sort((a, b) => a.localeCompare(b));
}

/**
 * A slug is taken if any published or draft post uses it, or if it belongs to
 * one of the shipped articles — those cannot be overwritten from /admin.
 */
export async function isSlugTaken(slug: string, exceptSlug?: string): Promise<boolean> {
  if (baselineSlugs.has(slug)) return true;
  const posts = await readPosts();
  return posts.some((p) => p.slug === slug && p.slug !== exceptSlug);
}
