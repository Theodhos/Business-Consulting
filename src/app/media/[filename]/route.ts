import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

import { UPLOAD_DIR, contentTypeFor } from "@/lib/uploads";

/**
 * Serves cover images uploaded from /admin. Public — these are article
 * illustrations, and the filename carries random bytes so the path is not
 * guessable from the article alone.
 */
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ filename: string }> },
) {
  const { filename } = await params;

  const contentType = contentTypeFor(filename);
  if (!contentType) return new NextResponse("Not found", { status: 404 });

  try {
    const file = await fs.readFile(path.join(UPLOAD_DIR, filename));
    return new NextResponse(new Uint8Array(file), {
      headers: {
        "content-type": contentType,
        // The random suffix makes every stored file immutable at its URL.
        "cache-control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
