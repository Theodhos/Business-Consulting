import crypto from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

import { getSession } from "@/lib/auth";
import { slugify } from "@/lib/posts";
import { UPLOAD_DIR, UPLOAD_TYPES, publicUrlFor } from "@/lib/uploads";

/**
 * Cover image intake for the admin editor.
 *
 * The extension is decided by the detected MIME type, never by the
 * client-supplied filename, so an upload cannot be coaxed into writing a `.js`
 * or `.html` file into a served directory.
 */

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

export async function POST(request: Request) {
  if (!(await getSession())) {
    return NextResponse.json({ message: "Not signed in." }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ message: "The upload could not be read." }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ message: "No file was received." }, { status: 400 });
  }

  const extension = UPLOAD_TYPES[file.type];
  if (!extension) {
    return NextResponse.json(
      { message: "Use a JPEG, PNG, WebP, AVIF or GIF image." },
      { status: 415 },
    );
  }

  if (file.size === 0) {
    return NextResponse.json({ message: "That file is empty." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ message: "Images must be 8 MB or smaller." }, { status: 413 });
  }

  const stem = slugify(file.name.replace(/\.[^.]+$/, "")) || "image";
  const filename = `${stem}-${crypto.randomBytes(4).toString("hex")}.${extension}`;

  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    await fs.writeFile(
      path.join(UPLOAD_DIR, filename),
      Buffer.from(await file.arrayBuffer()),
    );
  } catch (error) {
    console.error("[admin] Could not store the upload.", error);
    return NextResponse.json(
      { message: "The image could not be stored. The uploads directory is not writable." },
      { status: 500 },
    );
  }

  return NextResponse.json({ url: publicUrlFor(filename) });
}
