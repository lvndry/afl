import { ArticleCard } from "@/components/ui/article-card";
import configPromise from "@payload-config";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getPayload } from "payload";

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise });

  const posts = await payload.find({
    collection: "posts",
    depth: 2,
    limit: 6, // Featured + 5 compact
    overrideAccess: false,
  });

  const featuredPost = posts.docs[0];
  const recentPosts = posts.docs.slice(1);

  return (
    <div className="min-h-screen bg-background pt-24 pb-24">
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1 className="text-5xl font-bold mb-4">À la une</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Follow our latest news, events, and voices that bring African worlds to life in the
            present.
          </p>
        </div>
      </div>

      <div className="container">
        {featuredPost && <ArticleCard post={featuredPost} variant="featured" className="mb-16" />}

        <div className="space-y-8 max-w-3xl mx-auto">
          {recentPosts.map((post) => (
            <ArticleCard key={post.id} post={post} variant="compact" />
          ))}
        </div>

        {posts.hasNextPage && (
          <div className="mt-12 text-center">
            <Link
              href="/posts"
              className="inline-flex items-center gap-2 text-lg font-medium text-editorial-red hover:gap-3 transition-all"
            >
              Voir plus <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Afrique en Lumiere - Home",
  description:
    "Follow our latest news, events, and voices that bring African worlds to life in the present.",
  openGraph: {
    title: "Afrique en Lumiere - Home",
    description:
      "Follow our latest news, events, and voices that bring African worlds to life in the present.",
    type: "website",
  },
};
