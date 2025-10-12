# Agents.md

## Project Overview

A world-class creative media and journalism website built with **Payload CMS 3.x** and **Next.js 15**. This platform showcases the work of one of Paris's most talented creatives, featuring stunning visual storytelling, immersive editorial experiences, and a bilingual interface (French/English).

**Design Philosophy**: Award-worthy (Awwwards-caliber), minimalist sophistication with bold typography, cinematic imagery, and micro-interactions that feel alive.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router, Server Components, Server Actions)
- **CMS**: Payload CMS 3.x (TypeScript-first, self-hosted)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + CSS Modules for complex animations
- **Database**: PostgreSQL (recommended) or MongoDB
- **i18n**: Payload's built-in localization
- **Deployment**: Vercel (recommended) or Cloudflare Workers

---

## TypeScript Best Practices

### Strict Configuration

```typescript
// tsconfig.json essentials
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### Type Organization

- **Collections**: `src/payload/collections/types.ts` - Generated types from Payload
- **Components**: Co-locate prop types with components
- **Utilities**: `src/types/` for shared types
- **Never use `any`** - use `unknown` and type guards

### Naming Conventions

- **Types/Interfaces**: PascalCase (`Article`, `MediaAsset`)
- **Props**: `ComponentNameProps` (e.g., `ArticleCardProps`)
- **Generic Collections**: Use descriptive names like `Media`, `Article`, `Author` (not generic `Post`)

---

## Payload CMS Architecture

### Content Modeling Best Practices

#### 1. Collection Structure

Organize collections by **content type, not page structure**. Think content-first, presentation-agnostic.

```typescript
// ✅ GOOD: Content-oriented
collections/
  articles/        // Editorial pieces
  media/          // Images, videos (rich media library)
  authors/        // Writer profiles
  categories/     // Taxonomies
  pages/          // Static pages (About, Contact)

// ❌ BAD: Page-oriented
collections/
  homepage/
  about-page/
```

#### 2. Separation of Concerns

Keep hooks, validation, and access control in separate files:

```typescript
collections / articles / index.ts; // Collection config
hooks / beforeChange.ts;
afterRead.ts;
access / canEdit.ts;
fields / hero.ts; // Complex field groups
```

#### 3. Reusable Field Groups

Extract common patterns into reusable blocks:

```typescript
// fields/seo.ts
export const seoFields: Field[] = [
  { name: "metaTitle", type: "text", localized: true },
  { name: "metaDescription", type: "textarea", localized: true },
  { name: "ogImage", type: "upload", relationTo: "media" },
];

// Use in collections
import { seoFields } from "@/fields/seo";
```

#### 4. Rich Content with Blocks

Use Payload's **Blocks field** for flexible layouts (not Layout Builder patterns):

```typescript
{
  name: 'content',
  type: 'blocks',
  blocks: [
    TextBlock,        // Rich text
    ImageBlock,       // Full-bleed images
    GalleryBlock,     // Image carousels
    QuoteBlock,       // Pull quotes
    VideoBlock        // Embedded media
  ]
}
```

### Performance Optimization

- **Use `select` fields** to limit data fetching
- **Enable caching** in collection configs
- **Direct database queries** for read-heavy operations (bypasses hooks)
- **Lazy load media** with Next.js Image component
- **Implement pagination** for large collections (default: 10-50 items)

### Security

- **Field-level access control** for editorial workflows
- **HttpOnly cookies** (Payload default)
- **CSRF protection** enabled
- **Validate user input** in hooks
- **Sanitize rich text** before rendering

---

## Next.js Architecture

### File Structure

```
src/
  app/
    [locale]/              # i18n routing
      (marketing)/         # Public routes
      (editorial)/         # Article pages
      layout.tsx
  components/
    ui/                    # Reusable primitives
    blocks/                # CMS block components
    layout/                # Header, Footer
  payload/
    collections/
    blocks/
    fields/
  lib/
    payload.ts             # Payload client
    queries.ts             # Data fetching utilities
```

### Server Components First

Fetch data in Server Components by default. Use Client Components only for interactivity.

```typescript
// app/[locale]/articles/[slug]/page.tsx
export default async function ArticlePage({ params }) {
  const article = await payload.findByID({
    collection: 'articles',
    id: params.slug,
    locale: params.locale
  })

  return <Article data={article} />
}
```

### Component Design Principles

#### Atomic Design Hierarchy

- **Atoms**: `Button`, `Typography`, `Icon`
- **Molecules**: `ArticleCard`, `AuthorBio`
- **Organisms**: `ArticleGrid`, `Hero`
- **Templates**: Layout wrappers

#### Reusable Component Pattern

```typescript
// components/ui/Typography.tsx
type Variant = 'h1' | 'h2' | 'body' | 'caption'

interface TypographyProps {
  variant: Variant
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

export const Typography = ({
  variant,
  children,
  className,
  as: Component = 'p'
}: TypographyProps) => {
  return (
    <Component className={cn(styles[variant], className)}>
      {children}
    </Component>
  )
}
```

---

## Design System

### Visual Principles for Awwwards-Level Design

1. **Cinematic Scale**: Full-bleed imagery, generous whitespace, dramatic typography scales
2. **Motion Design**: Smooth page transitions, scroll-triggered animations, cursor interactions
3. **Typographic Hierarchy**: Bold headlines (60-120px), elegant body copy (18-22px)
4. **Color System**: Limited palette (2-3 brand colors), high contrast, strategic accent usage
5. **Grid Mastery**: Asymmetric layouts, broken grids, overlapping elements
6. **Micro-interactions**: Hover states, loading skeletons, subtle fade-ins

### Animation Guidelines

- **Page transitions**: 300-500ms cubic-bezier easing
- **Scroll reveals**: Intersection Observer with stagger delays
- **Hover effects**: 150-200ms for responsiveness
- **Loading states**: Skeleton screens, not spinners

### Responsive Strategy

- **Desktop-first design** (creatives showcase on large screens)
- Breakpoints: `sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px`
- Touch-friendly mobile interactions (48px minimum tap targets)

---

## Internationalization (i18n)

### Payload Localization

```typescript
// payload.config.ts
localization: {
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  fallback: true
}
```

### Next.js Routing

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const locale = getLocale(request);
  return NextResponse.rewrite(new URL(`/${locale}${request.nextUrl.pathname}`, request.url));
}
```

### Translation Strategy

- **CMS content**: Use Payload's `localized: true` field option
- **UI strings**: Store in `locales/[lang]/common.json`
- **URLs**: Use translated slugs (`/articles` → `/fr/articles`)

---

## Development Workflow

### Code Organization

- **Single Responsibility**: One component, one purpose
- **Extract complexity**: Move logic to hooks or utilities
- **Type safety**: Define types before implementation
- **Documentation**: JSDoc for public APIs only (avoid over-documenting)

### Naming Patterns

- **Components**: `ArticleCard.tsx` (PascalCase)
- **Utilities**: `formatDate.ts` (camelCase)
- **Hooks**: `useMediaQuery.ts` (camelCase with `use` prefix)
- **Constants**: `BREAKPOINTS.ts` (UPPER_CASE)

### When to Document Code

✅ Document:

- Complex algorithms or business logic
- Non-obvious performance optimizations
- Public API functions and hooks
- Unusual TypeScript patterns

❌ Avoid documenting:

- Self-explanatory functions
- Simple UI components
- Standard React patterns

---

## Content Strategy

### Article Structure

```typescript
interface Article {
  title: string;
  slug: string;
  hero: Media;
  excerpt: string;
  content: Block[]; // Flexible content blocks
  author: Author;
  category: Category;
  publishedAt: Date;
  featured: boolean; // Homepage highlight
  seo: SEO;
}
```

### Media Handling

- **Responsive images**: Generate 5-7 sizes on upload
- **WebP/AVIF**: Use modern formats with fallbacks
- **Lazy loading**: Below-the-fold images
- **CDN integration**: Cloudinary or Imgix for transforms

### SEO Best Practices

- **Dynamic metadata**: Generate from CMS fields
- **Structured data**: JSON-LD for articles (Schema.org)
- **Open Graph**: Social sharing previews
- **Sitemap**: Auto-generated from published content

---

## Performance Targets

- **Lighthouse Score**: 95+ (Performance, Accessibility, SEO)
- **Core Web Vitals**:
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1
- **Time to Interactive**: < 3s on 3G

### Optimization Checklist

- [ ] Image optimization (Next.js Image)
- [ ] Code splitting (dynamic imports)
- [ ] Font subsetting (Google Fonts with `display=swap`)
- [ ] Critical CSS inlining
- [ ] Service Worker for offline support
- [ ] Database query optimization (indexes)

---

## Deployment

### Environment Variables

```bash
PAYLOAD_SECRET=          # Strong random string
DATABASE_URI=            # PostgreSQL connection
NEXT_PUBLIC_SERVER_URL=  # Production domain
```

### Build Process

1. **Generate Payload types**: `payload generate:types`
2. **Build Next.js**: `next build`
3. **Database migrations**: Run Payload migrations
4. **Smoke tests**: Verify CMS admin and public site

### Monitoring

- **Error tracking**: Sentry
- **Analytics**: Plausible or Fathom (privacy-friendly)
- **Uptime**: BetterUptime
- **Performance**: Vercel Analytics or Cloudflare Web Analytics

---

## Key Reminders

- **Content-first modeling**: Design collections around content types, not pages
- **TypeScript strict mode**: No shortcuts, proper types everywhere
- **Reusable components**: Build a library of composable UI elements
- **Performance matters**: Every animation, every image, every request
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
- **Bilingual by default**: Never hardcode strings, always localize
- **Award-worthy design**: Think beyond templates—create experiences

This is a **living document**. Update as patterns emerge.
