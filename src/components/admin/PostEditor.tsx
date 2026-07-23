"use client";

import Link from "next/link";
import { useActionState, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  Eye,
  FileText,
  ImageIcon,
  Loader2,
  Save,
  Send,
  Upload,
} from "lucide-react";

import { savePostAction, type PostFormState } from "@/app/admin/actions";
import type { Post } from "@/lib/posts";

/* ── Field chrome, matching the site's form treatment ────────────── */

const labelClass =
  "mb-2 block font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-navy/50";
const controlClass =
  "w-full border border-line bg-transparent px-4 py-3 font-sans text-sm text-navy transition-colors placeholder:text-navy/25 focus:border-gold focus:outline-none";
const hintClass = "mt-2 font-sans text-[11.5px] leading-relaxed text-slate/60";
const errorClass = "mt-2 flex items-center gap-1.5 font-sans text-[11.5px] font-medium text-red-700";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className={errorClass}>
      <AlertCircle size={12} strokeWidth={2.2} />
      {message}
    </p>
  );
}

/* ── Slug derivation, mirroring lib/posts.ts ─────────────────────── */

function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function estimateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function today(): string {
  const d = new Date();
  return `${MONTHS[d.getMonth()]} ${String(d.getDate()).padStart(2, "0")}, ${d.getFullYear()}`;
}

/* ── Editor ──────────────────────────────────────────────────────── */

export default function PostEditor({
  post,
  categories,
  defaultAuthor,
}: {
  /** Absent when composing a new article. */
  post?: Post;
  /** Categories already in use, offered as suggestions. */
  categories: string[];
  defaultAuthor: string;
}) {
  const [state, action, pending] = useActionState<PostFormState, FormData>(
    savePostAction,
    undefined,
  );

  const [title, setTitle] = useState(post?.title ?? "");
  const [manualSlug, setManualSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post));
  const [content, setContent] = useState(post?.content ?? "");
  const [image, setImage] = useState(post?.image ?? "");
  const [readTime, setReadTime] = useState(post?.readTime ?? "");

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  // The slug follows the title until it is edited by hand — derived, not stored,
  // so the two can never drift out of sync.
  const slug = slugTouched ? manualSlug : slugify(title);

  const errors = state?.fieldErrors ?? {};
  const wordCount = useMemo(
    () => content.trim().split(/\s+/).filter(Boolean).length,
    [content],
  );

  async function handleUpload(file: File) {
    setUploadError(null);
    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const response = await fetch("/api/admin/upload", { method: "POST", body });
      const result = await response.json();
      if (!response.ok) throw new Error(result?.message ?? "The upload failed.");
      setImage(result.url);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "The upload failed.");
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  }

  return (
    <form action={action} className="pb-24">
      <input type="hidden" name="previousSlug" value={post?.slug ?? ""} />

      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b border-silver/50 pb-8">
        <div>
          <Link
            href="/admin"
            className="group mb-4 inline-flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-slate/60 transition-colors hover:text-gold"
          >
            <ArrowLeft
              size={12}
              strokeWidth={2.2}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            All posts
          </Link>
          <h1 className="font-display text-[2rem] font-bold leading-tight text-navy">
            {post ? "Edit article" : "New article"}
          </h1>
          <p className="mt-2 font-sans text-[13px] text-slate/70">
            {post
              ? post.published
                ? "This article is live on /articles."
                : "This article is a draft and is not visible on the site."
              : "Save it as a draft, or publish it straight to /articles."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {post?.published && (
            <Link
              href={`/articles/${post.slug}`}
              target="_blank"
              className="inline-flex items-center gap-2 border border-line-strong px-5 py-3 font-sans text-[10.5px] font-semibold uppercase tracking-[0.18em] text-navy transition-colors hover:border-navy hover:bg-navy hover:text-paper"
            >
              <Eye size={13} strokeWidth={2} />
              View
            </Link>
          )}
          <button
            type="submit"
            name="intent"
            value="draft"
            disabled={pending}
            className="inline-flex items-center gap-2 border border-line-strong px-6 py-3 font-sans text-[10.5px] font-semibold uppercase tracking-[0.18em] text-navy transition-colors hover:border-navy hover:bg-navy hover:text-paper disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={13} strokeWidth={2} />
            Save draft
          </button>
          <button
            type="submit"
            name="intent"
            value="publish"
            disabled={pending}
            className="inline-flex items-center gap-2 bg-navy px-6 py-3 font-sans text-[10.5px] font-semibold uppercase tracking-[0.18em] text-paper transition-colors hover:bg-gold hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pending ? (
              <Loader2 size={13} strokeWidth={2} className="animate-spin" />
            ) : (
              <Send size={13} strokeWidth={2} />
            )}
            {post?.published ? "Update" : "Publish"}
          </button>
        </div>
      </div>

      {state?.error && (
        <p
          role="alert"
          className="mb-10 border-l-2 border-red-600 bg-red-50 px-5 py-4 font-sans text-[13px] text-red-800"
        >
          {state.error}
        </p>
      )}

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
        {/* ── Main column ──────────────────────────────────────── */}
        <div className="flex flex-col gap-8">
          <div>
            <label htmlFor="title" className={labelClass}>
              Title
            </label>
            <input
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={180}
              placeholder="How To Ensure A Direct, Hassle-Free Visa Application"
              className={`${controlClass} font-display text-[1.15rem]`}
            />
            <FieldError message={errors.title} />
          </div>

          <div>
            <label htmlFor="slug" className={labelClass}>
              URL slug
            </label>
            <div className="flex items-stretch border border-line focus-within:border-gold">
              <span className="flex items-center border-r border-line bg-mist px-3 font-sans text-[12px] text-slate/60">
                /articles/
              </span>
              <input
                id="slug"
                name="slug"
                value={slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setManualSlug(e.target.value);
                }}
                onBlur={(e) => setManualSlug(slugify(e.target.value))}
                placeholder="derived-from-the-title"
                className="w-full bg-transparent px-4 py-3 font-sans text-sm text-navy placeholder:text-navy/25 focus:outline-none"
              />
            </div>
            <p className={hintClass}>
              Generated from the title until you edit it. This becomes the permanent web address of
              the article — changing it later breaks existing links.
            </p>
            <FieldError message={errors.slug} />
          </div>

          <div>
            <label htmlFor="excerpt" className={labelClass}>
              Excerpt
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              rows={3}
              required
              maxLength={400}
              defaultValue={post?.excerpt ?? ""}
              placeholder="One or two sentences. This is what appears on the articles grid and under the headline."
              className={`${controlClass} resize-none`}
            />
            <FieldError message={errors.excerpt} />
          </div>

          <div>
            <div className="mb-2 flex items-end justify-between">
              <label htmlFor="content" className={labelClass}>
                Article body
              </label>
              <span className="mb-2 font-sans text-[11px] text-slate/50">
                {wordCount.toLocaleString()} words · {estimateReadTime(content)}
              </span>
            </div>
            <textarea
              id="content"
              name="content"
              rows={26}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={"Opening paragraph.\n\n## A section heading\n\nBody copy for the section.\n\n- **A bolded lead-in** — followed by the point\n- A second point"}
              className={`${controlClass} resize-y font-mono text-[13px] leading-[1.8]`}
            />
            <p className={hintClass}>
              Formatting: <code className="text-navy">## </code> starts a section heading,
              <code className="ml-1 text-navy">- </code> starts a bullet, and
              <code className="ml-1 text-navy">**bold**</code> emphasises. Leave a blank line
              between paragraphs.
            </p>
            <FieldError message={errors.content} />
          </div>
        </div>

        {/* ── Sidebar ──────────────────────────────────────────── */}
        <aside className="flex flex-col gap-8">
          {/* Cover image */}
          <div className="border border-silver/50 bg-mist p-6">
            <p className="mb-5 flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-navy/60">
              <ImageIcon size={12} strokeWidth={2.2} className="text-gold" />
              Cover image
            </p>

            <div className="mb-4 aspect-[16/10] w-full overflow-hidden border border-silver/50 bg-paper">
              {image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center font-sans text-[11px] uppercase tracking-[0.18em] text-slate/40">
                  No image
                </div>
              )}
            </div>

            <input type="hidden" name="image" value={image} />

            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              disabled={uploading}
              className="mb-4 inline-flex w-full items-center justify-center gap-2 border border-line-strong px-4 py-3 font-sans text-[10.5px] font-semibold uppercase tracking-[0.18em] text-navy transition-colors hover:border-navy hover:bg-navy hover:text-paper disabled:cursor-not-allowed disabled:opacity-50"
            >
              {uploading ? (
                <Loader2 size={13} strokeWidth={2} className="animate-spin" />
              ) : (
                <Upload size={13} strokeWidth={2} />
              )}
              {uploading ? "Uploading…" : "Upload image"}
            </button>

            <input
              ref={fileInput}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void handleUpload(file);
              }}
            />

            <label htmlFor="imagePath" className={labelClass}>
              Or a path / URL
            </label>
            <input
              id="imagePath"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="/media/cover.jpg"
              className={`${controlClass} bg-paper`}
            />
            {uploadError && <FieldError message={uploadError} />}
            <FieldError message={errors.image} />
          </div>

          {/* Publication details */}
          <div className="border border-silver/50 p-6">
            <p className="mb-5 flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-navy/60">
              <FileText size={12} strokeWidth={2.2} className="text-gold" />
              Publication details
            </p>

            <div className="flex flex-col gap-6">
              <div>
                <label htmlFor="category" className={labelClass}>
                  Category
                </label>
                <input
                  id="category"
                  name="category"
                  list="admin-categories"
                  required
                  maxLength={60}
                  defaultValue={post?.category ?? ""}
                  placeholder="Immigration Strategy"
                  className={controlClass}
                />
                <datalist id="admin-categories">
                  {categories.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
                <FieldError message={errors.category} />
              </div>

              <div>
                <label htmlFor="author" className={labelClass}>
                  Author
                </label>
                <input
                  id="author"
                  name="author"
                  maxLength={80}
                  defaultValue={post?.author ?? defaultAuthor}
                  placeholder={defaultAuthor}
                  className={controlClass}
                />
                <FieldError message={errors.author} />
              </div>

              <div>
                <label htmlFor="date" className={labelClass}>
                  Publication date
                </label>
                <input
                  id="date"
                  name="date"
                  defaultValue={post?.date ?? ""}
                  placeholder={today()}
                  className={controlClass}
                />
                <p className={hintClass}>Left blank, today&apos;s date is used.</p>
              </div>

              <div>
                <label htmlFor="readTime" className={labelClass}>
                  Read time
                </label>
                <input
                  id="readTime"
                  name="readTime"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  placeholder={estimateReadTime(content)}
                  className={controlClass}
                />
                <p className={hintClass}>Left blank, it is calculated from the word count.</p>
              </div>

              <label className="flex cursor-pointer items-start gap-3 border border-line bg-mist p-4">
                <input
                  type="checkbox"
                  name="featured"
                  defaultChecked={post?.featured ?? false}
                  className="mt-1 h-4 w-4 shrink-0 accent-[#C5A059]"
                />
                <span>
                  <span className="block font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-navy">
                    Feature story
                  </span>
                  <span className="mt-1 block font-sans text-[11.5px] leading-relaxed text-slate/70">
                    Promotes the article to the large panel in the home page news section.
                  </span>
                </span>
              </label>
            </div>
          </div>
        </aside>
      </div>
    </form>
  );
}
