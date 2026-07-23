import HomePageClient from "@/components/HomePageClient";
import { getPublishedArticles } from "@/lib/posts";

/** The news section reads the article store, which admin publishing writes at runtime. */
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const articles = await getPublishedArticles();
  return <HomePageClient articles={articles} />;
}
