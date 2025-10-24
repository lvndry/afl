import { Post } from "@/payload-types";
import { getBrowserLocale } from "@/utilities/getBrowserLocale";
import { formatDateByLocale, getTranslation, type Locale } from "@/utilities/translations";
import configPromise from "@payload-config";
import { ArrowUpRight, Calendar, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";

export default async function HomePage() {
  const locale = await getBrowserLocale();
  const payload = await getPayload({ config: configPromise });

  const posts = await payload.find({
    collection: "posts",
    depth: 2,
    limit: 10,
    sort: "-publishedAt",
    overrideAccess: false,
  });

  const [heroPost, secondaryPost, ...gridPosts] = posts.docs;

  return (
    <div className="min-h-screen">
      {/* Cinematic Hero Section */}
      {heroPost && (
        <section className="relative min-h-[85vh] flex items-end overflow-hidden">
          {/* Background Image with Gradient Overlay */}
          <div className="absolute inset-0">
            <Image
              src={getHeroImageUrl(heroPost)}
              alt={heroPost.title || getTranslation(locale, "common.featuredStory")}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80" />
          </div>

          {/* Content */}
          <div className="container relative z-10 pb-16 pt-32">
            <div className="max-w-4xl">
              <div className="mb-6 flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-editorial-red" />
                <span className="text-sm font-semibold uppercase tracking-wider text-white/90">
                  {getTranslation(locale, "homepage.featuredStory")}
                </span>
              </div>

              <Link href={`/posts/${heroPost.slug}`} className="group block">
                <h1 className="mb-6 text-display font-editorial text-white leading-[1.05] hover:text-white/90 transition-colors">
                  {heroPost.title}
                </h1>

                <p className="mb-8 text-xl leading-relaxed text-white/85 max-w-3xl">
                  {heroPost.meta?.description ||
                    getTranslation(locale, "homepage.defaultDescription")}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 text-white/80">
                  {heroPost.populatedAuthors?.[0] && (
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-sm font-medium text-white">
                          {getAuthorInitials(heroPost.populatedAuthors[0], locale)}
                        </span>
                      </div>
                      <span className="font-medium">
                        {getAuthorName(heroPost.populatedAuthors[0], locale)}
                      </span>
                    </div>
                  )}
                  {heroPost.publishedAt && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <time>{formatDateByLocale(heroPost.publishedAt, locale)}</time>
                    </div>
                  )}
                  {heroPost.categories?.[0] && getCategoryTitle(heroPost.categories[0]) && (
                    <span className="rounded-full bg-editorial-red px-4 py-1.5 text-sm font-medium text-white">
                      {getCategoryTitle(heroPost.categories[0])}
                    </span>
                  )}
                </div>

                {/* Read CTA */}
                <div className="mt-8 inline-flex items-center gap-2 text-lg font-semibold text-white border-b-2 border-white/40 pb-1 group-hover:border-white transition-colors">
                  {getTranslation(locale, "homepage.readFullStory")}
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="h-8 w-5 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
              <div className="h-1.5 w-1.5 rounded-full bg-white/50" />
            </div>
          </div>
        </section>
      )}

      {/* Secondary Featured + Latest Grid */}
      <section className="container py-20 lg:py-32">
        {/* Asymmetric Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-20">
          {/* Large Secondary Feature */}
          {secondaryPost && (
            <div className="lg:col-span-7">
              <Link href={`/posts/${secondaryPost.slug}`} className="group block">
                <article className="space-y-5">
                  {/* Image */}
                  <div className="relative aspect-[16/11] overflow-hidden rounded-2xl bg-muted">
                    <Image
                      src={getHeroImageUrl(secondaryPost)}
                      alt={secondaryPost.title || getTranslation(locale, "common.article")}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                    {/* Category Badge on Image */}
                    {secondaryPost.categories?.[0] &&
                      getCategoryTitle(secondaryPost.categories[0]) && (
                        <div className="absolute top-4 left-4">
                          <span className="inline-block rounded-full bg-white/95 backdrop-blur-sm px-4 py-1.5 text-sm font-semibold text-foreground shadow-lg">
                            {getCategoryTitle(secondaryPost.categories[0])}
                          </span>
                        </div>
                      )}
                  </div>

                  {/* Content */}
                  <div>
                    <h2 className="text-headline font-editorial text-foreground mb-4 group-hover:text-editorial-red transition-colors">
                      {secondaryPost.title}
                    </h2>
                    <p className="text-body text-muted-foreground leading-relaxed mb-5">
                      {secondaryPost.meta?.description ||
                        getTranslation(locale, "homepage.secondaryDescription")}
                    </p>

                    {/* Author & Date */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {secondaryPost.populatedAuthors?.[0] && (
                        <span className="font-medium">
                          {getAuthorName(secondaryPost.populatedAuthors[0], locale)}
                        </span>
                      )}
                      {secondaryPost.publishedAt && (
                        <>
                          <span>•</span>
                          <time>{formatDateByLocale(secondaryPost.publishedAt, locale)}</time>
                        </>
                      )}
                    </div>
                  </div>
                </article>
              </Link>
            </div>
          )}

          {/* Compact List */}
          {gridPosts.length > 0 && (
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-subtitle font-semibold">
                  {getTranslation(locale, "homepage.latestStories")}
                </h3>
                <Link
                  href="/posts"
                  className="text-sm font-medium text-editorial-red hover:underline"
                >
                  {getTranslation(locale, "homepage.viewAll")}
                </Link>
              </div>

              <div className="space-y-6">
                {gridPosts.slice(0, 4).map((post) => (
                  <Link key={post.id} href={`/posts/${post.slug}`} className="group block">
                    <article className="flex gap-4 pb-6 border-b border-border last:border-0">
                      {/* Thumbnail */}
                      <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                        <Image
                          src={getHeroImageUrl(post)}
                          alt={post.title || getTranslation(locale, "common.article")}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="96px"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-editorial text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-editorial-red transition-colors">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="font-medium">
                            {post.populatedAuthors?.[0]
                              ? getAuthorName(post.populatedAuthors[0], locale)
                              : getTranslation(locale, "common.anonymous")}
                          </span>
                          {post.publishedAt && (
                            <>
                              <span>•</span>
                              <time>{formatDateByLocale(post.publishedAt, locale)}</time>
                            </>
                          )}
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Full Width Grid - Remaining Articles */}
        {gridPosts.length > 4 && (
          <div>
            <h3 className="text-subtitle font-semibold mb-8">
              {getTranslation(locale, "homepage.moreStories")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gridPosts.slice(4).map((post) => (
                <Link key={post.id} href={`/posts/${post.slug}`} className="group">
                  <article className="space-y-4">
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted">
                      <Image
                        src={getHeroImageUrl(post)}
                        alt={post.title || getTranslation(locale, "common.article")}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>

                    {/* Content */}
                    <div>
                      {post.categories?.[0] && getCategoryTitle(post.categories[0]) && (
                        <span className="text-xs font-semibold uppercase tracking-wide text-editorial-red">
                          {getCategoryTitle(post.categories[0])}
                        </span>
                      )}
                      <h4 className="font-editorial text-xl font-semibold text-foreground mt-2 mb-3 line-clamp-2 group-hover:text-editorial-red transition-colors">
                        {post.title}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {post.meta?.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {post.publishedAt && (
                          <time>{formatDateByLocale(post.publishedAt, locale)}</time>
                        )}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA to All Posts */}
        {posts.hasNextPage && (
          <div className="mt-16 text-center">
            <Link
              href="/posts"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-lg font-semibold text-background hover:bg-foreground/90 transition-all hover:gap-3"
            >
              {getTranslation(locale, "homepage.exploreAllStories")}
              <ArrowUpRight className="h-5 w-5" />
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

// Helper functions
function getHeroImageUrl(post: Post): string {
  const DEFAULT_IMAGE =
    "https://images.unsplash.com/flagged/photo-1561023367-156230cc1f07?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2348";

  if (!post.heroImage) {
    // Return a default placeholder image
    return DEFAULT_IMAGE;
  }

  if (typeof post.heroImage === "string") {
    return post.heroImage;
  }

  const url = post.heroImage.url;

  return url || DEFAULT_IMAGE;
}

function getCategoryTitle(category: string | { title?: string | null } | null | undefined): string {
  if (!category) return "";
  if (typeof category === "string") return "";
  return category.title || "";
}

function getAuthorName(
  author: string | { name?: string | null } | null | undefined,
  locale: Locale,
): string {
  if (!author) return getTranslation(locale, "common.anonymous");
  if (typeof author === "string") return getTranslation(locale, "common.anonymous");
  return author.name || getTranslation(locale, "common.anonymous");
}

function getAuthorInitials(
  author: string | { name?: string | null } | null | undefined,
  locale: Locale,
): string {
  const name = getAuthorName(author, locale);
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getBrowserLocale();

  return {
    title: getTranslation(locale, "meta.title"),
    description: getTranslation(locale, "meta.description"),
    openGraph: {
      title: getTranslation(locale, "meta.title"),
      description: getTranslation(locale, "meta.description"),
      type: "website",
    },
  };
}
