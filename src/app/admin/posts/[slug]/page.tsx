import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ConsoleHeader from "@/components/console/ConsoleHeader";
import PostEditor from "@/components/console/PostEditor";
import { requireSession } from "@/lib/auth";
import { getKnownCategories, getPostBySlug } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return { title: post ? `Editing ${post.title}` : "Article not found" };
}

export default async function EditPostPage({ params }: Props) {
  const session = await requireSession();
  const { slug } = await params;

  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const categories = await getKnownCategories();

  return (
    <>
      <ConsoleHeader username={session.username} />
      <main className="mx-auto w-full max-w-6xl px-6 py-14 md:px-8 md:py-16">
        <PostEditor post={post} categories={categories} defaultAuthor="Tide Global Advisory" />
      </main>
    </>
  );
}
