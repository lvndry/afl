/**
 * Site configuration constants
 * Centralized configuration for site-wide constants and metadata
 */

export const SITE_CONFIG = {
  name: "Afrique en Lumiere",
  description: "Creative Media and Journalism Website showcasing African stories and voices.",
  tagline: "Creative Media and Journalism Website",
  url: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
  ogImage: "/website-template-OG.webp",
  locales: ["fr", "en"] as const,
  defaultLocale: "fr" as const,
} as const;

export type SiteConfig = typeof SITE_CONFIG;
