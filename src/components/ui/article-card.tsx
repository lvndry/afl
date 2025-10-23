import type { Category, Media, User as UserType } from "@/payload-types";
import { cn } from "@/utilities/ui";
import { ArrowRight, Calendar, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ArticleCardPost {
  id: string;
  title: string;
  slug: string;
  categories?: (string | Category)[] | null;
  meta?: {
    title?: string | null;
    image?: (string | null) | Media;
    description?: string | null;
  };
  publishedAt?: string | null;
  authors?: (string | UserType)[] | null;
  populatedAuthors?: { id?: string | null | undefined; name?: string | null | undefined }[] | null;
  heroImage?: (string | null) | Media;
}

interface ArticleCardProps {
  post: ArticleCardPost;
  variant?: "default" | "featured" | "compact";
  className?: string;
  style?: React.CSSProperties;
}

export function ArticleCard({ post, variant = "default", className, style }: ArticleCardProps) {
  const category = post.categories?.[0];
  const author = post.populatedAuthors?.[0];
  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  // Helper function to get category title
  const getCategoryTitle = () => {
    if (!category) return "Story";
    if (typeof category === "string") return "Story";
    return category.title || "Story";
  };

  // Helper function to get author name
  const getAuthorName = () => {
    if (!author) return "Anonymous";
    if (typeof author === "string") return "Anonymous";
    return author.name || "Anonymous";
  };

  // Helper function to get hero image URL
  const getHeroImageUrl = () => {
    if (!post.heroImage) return null;
    if (typeof post.heroImage === "string") return post.heroImage;
    return post.heroImage.url || null;
  };

  if (variant === "featured") {
    return (
      <article className={cn("group", className)} style={style}>
        <Link href={`/posts/${post.slug}`} className="block">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <div>
                <span className="inline-block px-3 py-1 text-sm font-medium text-editorial-red bg-red-50 rounded-full mb-4">
                  {getCategoryTitle()}
                </span>
                <h2 className="text-hero font-editorial text-foreground leading-tight mb-4 group-hover:text-editorial-red transition-colors">
                  {post.title || "Featured Story"}
                </h2>
                <p className="text-body-large text-muted-foreground leading-relaxed">
                  {post.meta?.description ||
                    "Discover the latest insights and stories from across Africa."}
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{getAuthorName()}</p>
                  <p className="text-caption text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {publishedDate || "Recently"}
                  </p>
                </div>
              </div>

              <div className="flex items-center text-editorial-red font-medium group-hover:gap-2 transition-all">
                <span>Read Full Story</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              {getHeroImageUrl() ? (
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-muted">
                  <Image
                    src={getHeroImageUrl()!}
                    alt={post.title || "Featured story"}
                    width={600}
                    height={750}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-editorial-red rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-muted-foreground font-medium">Featured Story</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Link>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className={cn("group", className)} style={style}>
        <Link href={`/posts/${post.slug}`} className="block">
          <div className="flex gap-4">
            {/* Image */}
            <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              {getHeroImageUrl() ? (
                <Image
                  src={getHeroImageUrl()!}
                  alt={post.title || "Article"}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                  <User className="w-6 h-6 text-muted-foreground" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-editorial-red bg-red-50 px-2 py-1 rounded-full">
                  {getCategoryTitle()}
                </span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{publishedDate}</span>
              </div>

              <h3 className="text-title font-editorial text-foreground mb-2 group-hover:text-editorial-red transition-colors line-clamp-2">
                {post.title || "Untitled"}
              </h3>

              <p className="text-caption text-muted-foreground line-clamp-2">
                {post.meta?.description ||
                  "Discover the latest insights and stories from across Africa."}
              </p>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  // Default variant
  return (
    <article className={cn("group hover-lift", className)} style={style}>
      <Link href={`/posts/${post.slug}`} className="block">
        <div className="bg-card rounded-2xl overflow-hidden border border-border hover:border-border/50 transition-all duration-300">
          {/* Image */}
          <div className="aspect-[16/10] bg-muted overflow-hidden">
            {getHeroImageUrl() ? (
              <Image
                src={getHeroImageUrl()!}
                alt={post.title || "Article"}
                width={400}
                height={250}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                <User className="w-12 h-12 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-medium text-editorial-red bg-red-50 px-2 py-1 rounded-full">
                {getCategoryTitle()}
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{publishedDate}</span>
            </div>

            <h3 className="text-title font-editorial text-foreground mb-3 group-hover:text-editorial-red transition-colors line-clamp-2">
              {post.title || "Untitled"}
            </h3>

            <p className="text-body text-muted-foreground leading-relaxed mb-4 line-clamp-3">
              {post.meta?.description ||
                "Discover the latest insights and stories from across Africa."}
            </p>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{getAuthorName()}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
