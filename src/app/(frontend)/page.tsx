import { ArticleCard } from "@/components/ui/article-card";
import { Button } from "@/components/ui/button";
import configPromise from "@payload-config";
import { ArrowRight, Globe, Mail, TrendingUp, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getPayload } from "payload";

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise });

  // Fetch recent posts
  const posts = await payload.find({
    collection: "posts",
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      publishedAt: true,
      authors: true,
      heroImage: true,
    },
  });

  // Get featured post (first one) and other posts
  const featuredPost = posts.docs[0];
  const latestPosts = posts.docs.slice(1, 7);
  const trendingPosts = posts.docs.slice(7, 10);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Featured Article */}
      {featuredPost && (
        <section className="section-padding bg-background">
          <div className="container-editorial">
            <ArticleCard post={featuredPost} variant="featured" className="animate-fade-in" />
          </div>
        </section>
      )}

      {/* Latest Stories Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-editorial">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-6">
            <div>
              <h2 className="text-headline font-editorial text-foreground mb-4">Latest Stories</h2>
              <p className="text-body text-muted-foreground max-w-2xl">
                Discover the latest insights, cultural narratives, and journalistic excellence from
                across Africa
              </p>
            </div>
            <Link href="/posts">
              <Button variant="outline" size="lg" className="group">
                View All Stories
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map((post, index) => (
              <ArticleCard
                key={post.slug}
                post={post}
                variant="default"
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Stories Section */}
      {trendingPosts.length > 0 && (
        <section className="section-padding bg-background">
          <div className="container-editorial">
            <div className="flex items-center gap-3 mb-12">
              <TrendingUp className="w-6 h-6 text-editorial-red" />
              <h2 className="text-headline font-editorial text-foreground">Trending Now</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {trendingPosts.map((post, index) => (
                <ArticleCard
                  key={post.slug}
                  post={post}
                  variant="compact"
                  className="animate-scale-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-editorial">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-editorial-red rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-white" />
              </div>
            </div>

            <h2 className="text-headline font-editorial mb-6">Stay Illuminated</h2>
            <p className="text-body-large text-primary-foreground/80 leading-relaxed mb-12 max-w-2xl mx-auto">
              Get the latest stories, cultural insights, and journalistic updates delivered directly
              to your inbox. Join thousands of readers who trust us to illuminate the African
              narrative.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-lg bg-white/10 border border-white/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-editorial-red focus:border-transparent backdrop-blur-sm"
              />
              <Button
                size="lg"
                className="bg-editorial-red hover:bg-editorial-red/90 text-white px-8 py-4"
              >
                Subscribe
              </Button>
            </div>

            <p className="text-caption text-primary-foreground/60">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-background">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-headline font-editorial text-foreground mb-8">
                Illuminating African Stories
              </h2>
              <div className="space-y-6 text-body text-muted-foreground leading-relaxed">
                <p>
                  We are passionate about African stories and voices, sharing narratives that
                  inspire, educate, and connect. Our platform brings together journalists,
                  storytellers, and readers to explore the rich tapestry of African experiences and
                  perspectives.
                </p>
                <p>
                  From cultural insights to social movements, from innovative journalism to creative
                  storytelling, we cover the full spectrum of African narratives. Join us in
                  celebrating the diverse voices and stories that illuminate the African continent.
                </p>
              </div>

              <div className="mt-8">
                <Link href="/about">
                  <Button variant="outline" size="lg" className="group">
                    Learn More About Us
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-card rounded-2xl border border-border">
                <div className="w-12 h-12 bg-editorial-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-title font-editorial text-foreground mb-2">Global Reach</h3>
                <p className="text-caption text-muted-foreground">
                  Stories that resonate across continents
                </p>
              </div>

              <div className="text-center p-6 bg-card rounded-2xl border border-border">
                <div className="w-12 h-12 bg-editorial-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-title font-editorial text-foreground mb-2">Authentic Voices</h3>
                <p className="text-caption text-muted-foreground">
                  Written by African journalists and storytellers
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Afrique en Lumiere - Creative Media & Journalism",
  description:
    "Discover the stories and voices of Africa through creative media and journalism. Explore innovative storytelling, cultural insights, and journalistic excellence from across the continent.",
  openGraph: {
    title: "Afrique en Lumiere - Creative Media & Journalism",
    description:
      "Discover the stories and voices of Africa through creative media and journalism. Explore innovative storytelling, cultural insights, and journalistic excellence from across the continent.",
    type: "website",
  },
};
