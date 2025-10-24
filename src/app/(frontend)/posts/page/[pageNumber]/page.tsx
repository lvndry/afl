import type { Metadata } from "next/types";

import { ArticleCard } from "@/components/ui/article-card";
import { getTranslation, type Locale } from "@/utilities/translations";
import configPromise from "@payload-config";
import { ArrowRight } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import PageClient from "./page.client";

export const revalidate = 600;

type Args = {
  params: Promise<{
    pageNumber: string;
  }>;
};

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise;
  const payload = await getPayload({ config: configPromise });

  // Get locale from headers
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const locale = (pathname.split("/")[1] as Locale) || "fr";

  const sanitizedPageNumber = Number(pageNumber);

  if (!Number.isInteger(sanitizedPageNumber)) notFound();

  const posts = await payload.find({
    collection: "posts",
    depth: 2,
    limit: 10,
    page: sanitizedPageNumber,
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

        {posts.page && posts.totalPages > 1 && (
          <div className="mt-12 text-center">
            {posts.hasNextPage && (
              <Link
                href={`/posts/page/${posts.page + 1}`}
                className="inline-flex items-center gap-2 text-lg font-medium text-editorial-red hover:gap-3 transition-all"
              >
                {getTranslation(locale, "posts.loadMore")} <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise;

  // Get locale from headers
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const locale = (pathname.split("/")[1] as Locale) || "fr";

  return {
    title: getTranslation(locale, "posts.pageTitle").replace("{pageNumber}", pageNumber),
    description: getTranslation(locale, "posts.description"),
  };
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const { totalDocs } = await payload.count({
    collection: "posts",
    overrideAccess: false,
  });

  const totalPages = Math.ceil(totalDocs / 10);

  const pages: { pageNumber: string }[] = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) });
  }

  return pages;
}
