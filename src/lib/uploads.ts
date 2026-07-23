import path from "node:path";

/**
 * Uploaded cover images.
 *
 * They are stored under `data/uploads` and served by `/media/[filename]`, not
 * from `public/`. A production server serves `public/` from a manifest built at
 * build time, so anything written there after the build 404s — an image
 * uploaded on Tuesday would be invisible until the next deploy.
 */

export const UPLOAD_DIR = path.join(process.cwd(), "data", "uploads");

export const UPLOAD_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
};

const CONTENT_TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  avif: "image/avif",
  gif: "image/gif",
};

/**
 * Only names this module generates are accepted — which rules out traversal
 * (`..`, separators, drive letters) by construction rather than by sanitising.
 */
const SAFE_NAME = /^[a-z0-9][a-z0-9-]*\.(jpg|png|webp|avif|gif)$/;

export function contentTypeFor(filename: string): string | null {
  if (!SAFE_NAME.test(filename)) return null;
  return CONTENT_TYPES[filename.split(".").pop()!] ?? null;
}

export function publicUrlFor(filename: string): string {
  return `/media/${filename}`;
}
