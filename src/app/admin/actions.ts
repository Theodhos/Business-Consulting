"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  authConfigError,
  createSession,
  destroySession,
  requireSession,
  verifyCredentials,
} from "@/lib/auth";
import {
  deletePost as removePost,
  estimateReadTime,
  formatPublishDate,
  isSlugTaken,
  setPublished,
  slugify,
  upsertPost,
  type PostInput,
} from "@/lib/posts";

/* ── Login / logout ─────────────────────────────────────────────── */

export type LoginState = { error?: string } | undefined;

export async function loginAction(
  _previous: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const configError = authConfigError();
  if (configError === "missing-credentials") {
    return { error: "The admin panel is not configured. Set ADMIN_USERNAME and ADMIN_PASSWORD." };
  }
  if (configError === "missing-secret") {
    return { error: "The admin panel is not configured. Set ADMIN_SESSION_SECRET." };
  }

  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!username || !password) {
    return { error: "Enter both a username and a password." };
  }

  if (!verifyCredentials(username, password)) {
    // Deliberately vague — the response must not reveal which field was wrong.
    return { error: "Those credentials were not recognised." };
  }

  if (!(await createSession(username))) {
    return { error: "The session could not be created. Check ADMIN_SESSION_SECRET." };
  }

  redirect(safeReturnPath(field(formData, "from")));
}

/**
 * Only paths back inside the panel are honoured, so the `from` parameter the
 * proxy attaches can never be turned into an open redirect. `//host` and
 * `/\host` are rejected explicitly — both are protocol-relative URLs.
 */
function safeReturnPath(candidate: string): string {
  if (!candidate.startsWith("/admin")) return "/admin";
  if (candidate.startsWith("//") || candidate.startsWith("/\\")) return "/admin";
  return candidate;
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}

/* ── Publishing ─────────────────────────────────────────────────── */

export type PostFormState =
  | { error?: string; fieldErrors?: Record<string, string> }
  | undefined;

const MAX = { title: 180, excerpt: 400, category: 60, author: 80, content: 120_000 };

/** `/admin/posts/new` is a real route, so a post may not claim that slug. */
const RESERVED_SLUGS = new Set(["new"]);

function field(formData: FormData, name: string): string {
  return String(formData.get(name) ?? "").trim();
}

export async function savePostAction(
  _previous: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  await requireSession();

  const previousSlug = field(formData, "previousSlug") || undefined;
  const publish = field(formData, "intent") === "publish";

  const title = field(formData, "title");
  const excerpt = field(formData, "excerpt");
  const content = String(formData.get("content") ?? "").trim();
  const category = field(formData, "category");
  const author = field(formData, "author") || "Tide Global Advisory";
  const image = field(formData, "image");
  const featured = formData.get("featured") === "on";

  const fieldErrors: Record<string, string> = {};

  if (!title) fieldErrors.title = "A title is required.";
  else if (title.length > MAX.title) fieldErrors.title = `Keep the title under ${MAX.title} characters.`;

  if (!excerpt) fieldErrors.excerpt = "An excerpt is required — it is what shows on the articles grid.";
  else if (excerpt.length > MAX.excerpt) fieldErrors.excerpt = `Keep the excerpt under ${MAX.excerpt} characters.`;

  if (!content) fieldErrors.content = "The article body is required.";
  else if (content.length > MAX.content) fieldErrors.content = "The article body is too long.";

  if (!category) fieldErrors.category = "A category is required.";
  else if (category.length > MAX.category) fieldErrors.category = `Keep the category under ${MAX.category} characters.`;

  if (author.length > MAX.author) fieldErrors.author = `Keep the author under ${MAX.author} characters.`;

  if (!image) fieldErrors.image = "A cover image is required — upload one or paste a path.";
  else if (!/^(\/|https?:\/\/)/.test(image))
    fieldErrors.image = "Use an uploaded path such as /uploads/name.jpg, or a full https:// URL.";

  const slug = slugify(field(formData, "slug") || title);
  if (!slug) fieldErrors.slug = "The slug could not be derived — enter one manually.";
  else if (RESERVED_SLUGS.has(slug))
    fieldErrors.slug = `"${slug}" is reserved by the admin panel. Choose another.`;
  else if (await isSlugTaken(slug, previousSlug))
    fieldErrors.slug = "That URL is already in use. Choose another.";

  if (Object.keys(fieldErrors).length > 0) {
    return { error: "Some fields need attention.", fieldErrors };
  }

  const record: PostInput = {
    slug,
    title,
    excerpt,
    content,
    date: field(formData, "date") || formatPublishDate(),
    readTime: field(formData, "readTime") || estimateReadTime(content),
    author,
    image,
    category,
    featured,
    published: publish,
  };

  try {
    await upsertPost(record, previousSlug);
  } catch (error) {
    console.error("[admin] Could not write the post.", error);
    return { error: "The post could not be saved. The article store is not writable." };
  }

  refreshPublicPages(slug, previousSlug);
  redirect(`/admin?saved=${encodeURIComponent(slug)}&state=${publish ? "published" : "draft"}`);
}

export async function togglePublishAction(formData: FormData): Promise<void> {
  await requireSession();

  const slug = field(formData, "slug");
  const publish = field(formData, "publish") === "true";
  if (!slug) return;

  const updated = await setPublished(slug, publish);
  if (!updated) return;

  refreshPublicPages(slug);
  redirect(`/admin?saved=${encodeURIComponent(slug)}&state=${publish ? "published" : "unpublished"}`);
}

export async function deletePostAction(formData: FormData): Promise<void> {
  await requireSession();

  const slug = field(formData, "slug");
  if (!slug) return;

  const removed = await removePost(slug);
  if (!removed) return;

  refreshPublicPages(slug);
  redirect(`/admin?saved=${encodeURIComponent(slug)}&state=deleted`);
}

/**
 * The public article pages read the store on every request, but their route
 * caches still need clearing so a fresh publish is visible immediately.
 */
function refreshPublicPages(slug: string, previousSlug?: string): void {
  revalidatePath("/");
  revalidatePath("/articles");
  revalidatePath(`/articles/${slug}`);
  if (previousSlug && previousSlug !== slug) revalidatePath(`/articles/${previousSlug}`);
  revalidatePath("/admin");
}
