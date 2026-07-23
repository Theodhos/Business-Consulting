import type { Metadata } from "next";

import ConsoleHeader from "@/components/console/ConsoleHeader";
import PostEditor from "@/components/console/PostEditor";
import { requireSession } from "@/lib/auth";
import { getKnownCategories } from "@/lib/posts";

export const metadata: Metadata = { title: "New article" };

export default async function NewPostPage() {
  const session = await requireSession();
  const categories = await getKnownCategories();

  return (
    <>
      <ConsoleHeader username={session.username} />
      <main className="mx-auto w-full max-w-6xl px-6 py-14 md:px-8 md:py-16">
        <PostEditor categories={categories} defaultAuthor="Tide Global Advisory" />
      </main>
    </>
  );
}
