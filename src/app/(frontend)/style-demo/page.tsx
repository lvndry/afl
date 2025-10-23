import { ArticleCard } from "@/components/ui/article-card";

export default function StyleDemoPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Typography Demo */}
        <section>
          <h1 className="text-display mb-8">Typography Scale</h1>

          <div className="space-y-6">
            <div>
              <h1 className="text-display mb-2">Display Title (64px)</h1>
              <p className="text-caption text-muted-foreground">Hero titles and main headlines</p>
            </div>

            <div>
              <h2 className="text-hero mb-2">Hero Title (48px)</h2>
              <p className="text-caption text-muted-foreground">
                Section titles and major headings
              </p>
            </div>

            <div>
              <h3 className="text-title mb-2">Article Title (32px)</h3>
              <p className="text-caption text-muted-foreground">
                Article titles and content headings
              </p>
            </div>

            <div>
              <h4 className="text-subtitle mb-2">Subtitle (24px)</h4>
              <p className="text-caption text-muted-foreground">Subtitles and secondary headings</p>
            </div>

            <div>
              <p className="text-body mb-2">
                Body text (18px) - This is the main body text used for articles and content. It has
                excellent readability with proper line height and spacing.
              </p>
              <p className="text-caption text-muted-foreground">
                Main body text for articles and content
              </p>
            </div>

            <div>
              <p className="text-caption mb-2">
                Caption text (14px) - Used for metadata, captions, and secondary information.
              </p>
              <p className="text-small text-muted-foreground">Caption and metadata text</p>
            </div>

            <div>
              <p className="text-small mb-2">
                Small text (12px) - For fine print and very small details.
              </p>
              <p className="text-small text-muted-foreground">Small details and fine print</p>
            </div>
          </div>
        </section>

        {/* Color Demo */}
        <section>
          <h2 className="text-hero mb-8">Color Palette</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-title">Light Theme</h3>
              <div className="space-y-2">
                <div className="p-4 bg-background border border-border rounded-lg">
                  <p className="text-foreground font-medium">Background & Foreground</p>
                  <p className="text-muted-foreground text-sm">Primary content colors</p>
                </div>
                <div className="p-4 bg-primary text-primary-foreground rounded-lg">
                  <p className="font-medium">Primary</p>
                  <p className="text-sm opacity-80">Headers, footers, and accents</p>
                </div>
                <div className="p-4 bg-accent text-accent-foreground rounded-lg">
                  <p className="font-medium">Accent</p>
                  <p className="text-sm opacity-80">Highlights and interactive elements</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-title">UI Elements</h3>
              <div className="space-y-2">
                <div className="p-4 bg-card border border-border rounded-lg">
                  <p className="text-card-foreground font-medium">Card</p>
                  <p className="text-muted-foreground text-sm">Content containers</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-muted-foreground font-medium">Muted</p>
                  <p className="text-muted-foreground text-sm">Subtle backgrounds</p>
                </div>
                <div className="flex gap-2">
                  <span className="pill-tag">Pill Tag</span>
                  <span className="pill-tag bg-accent text-accent-foreground">Accent Tag</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Component Demo */}
        <section>
          <h2 className="text-hero mb-8">Article Card Component</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ArticleCard
              post={{
                id: "1",
                slug: "a-continually-unfolding-history-of-architecture",
                title: "A Continually Unfolding History of Architecture",
                categories: ["Sustainability"],
                authors: ["Amélie Laurent"],
                publishedAt: "Dec 12, 2024",
              }}
            />

            <ArticleCard
              post={{
                id: "2",
                slug: "modern-minimalist-design-principles",
                title: "Modern Minimalist Design Principles",
                categories: ["Design"],
                authors: ["Jean-Pierre Dubois"],
                publishedAt: "Dec 10, 2024",
              }}
            />
          </div>
        </section>

        {/* Typography Plugin Demo */}
        <section>
          <h2 className="text-hero mb-8">Tailwind Typography Plugin</h2>

          <div className="prose prose-lg max-w-none">
            <h1>Typography Plugin Demo</h1>
            <p>
              This demonstrates the official <strong>@tailwindcss/typography</strong> plugin with
              our custom design system colors. The typography plugin provides beautiful, opinionated
              styles for rich text content.
            </p>

            <h2>Features</h2>
            <p>
              The typography plugin automatically styles common HTML elements like headings,
              paragraphs, links, lists, and more. It's perfect for rendering CMS content or
              markdown.
            </p>

            <h3>Lists and Links</h3>
            <ul>
              <li>Automatic styling for unordered lists</li>
              <li>Proper spacing and indentation</li>
              <li>Links with hover effects</li>
              <li>Consistent typography scale</li>
            </ul>

            <blockquote>
              &ldquo;The typography plugin makes it easy to create beautiful, readable content
              without writing custom CSS for every element.&rdquo;
            </blockquote>

            <p>
              You can use modifiers like <code>prose-lg</code>, <code>prose-xl</code>, or{" "}
              <code>prose-2xl</code>
              to adjust the overall size, and combine with color modifiers like{" "}
              <code>prose-slate</code>
              or <code>prose-gray</code> for different color schemes.
            </p>
          </div>
        </section>

        {/* Layout Demo */}
        <section>
          <h2 className="text-hero mb-8">Layout Structure</h2>

          <div className="prose prose-lg max-w-none">
            <p>
              This page demonstrates the new design system with the{" "}
              <strong>muted sage green background</strong>
              framing a clean white content area. The{" "}
              <strong>dark blue-grey headers and footers</strong> provide strong visual anchors,
              while the typography scale ensures excellent readability and hierarchy.
            </p>

            <p>
              The design maintains the sophisticated, editorial aesthetic with generous whitespace,
              clean typography, and subtle micro-interactions that make the interface feel alive and
              responsive.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
