import type { Metadata } from "next/types";

import { ArticleCard } from "@/components/ui/article-card";
import { getBrowserLocale } from "@/utilities/getBrowserLocale";
import { getTranslation } from "@/utilities/translations";
import configPromise from "@payload-config";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getPayload } from "payload";
import PageClient from "./page.client";

export const dynamic = "force-static";
export const revalidate = 600;

export default async function Page() {
  const payload = await getPayload({ config: configPromise });

  // Get locale from headers
  const locale = await getBrowserLocale();

  const posts = await payload.find({
    collection: "posts",
    depth: 2, // Increased depth for populated fields
    limit: 10, // Adjusted limit to show fewer per page like Mansa
    overrideAccess: false,
  });

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1 className="text-5xl font-bold mb-4">{getTranslation(locale, "posts.title")}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            {getTranslation(locale, "posts.description")}
          </p>
        </div>
      </div>

      <div className="container">
        <div className="space-y-8 max-w-3xl mx-auto">
          {posts.docs.map((post) => (
            <ArticleCard key={post.id} post={post} variant="compact" />
          ))}
        </div>

        {posts.totalPages > 1 && posts.page && (
          <div className="mt-12 text-center">
            <Link
              href={`/posts/page/${posts.page + 1}`}
              className="inline-flex items-center gap-2 text-lg font-medium text-editorial-red hover:gap-3 transition-all"
            >
              {getTranslation(locale, "posts.loadMore")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getBrowserLocale();

  return {
    title: getTranslation(locale, "posts.mainTitle"),
    description: getTranslation(locale, "posts.description"),
  };
}
