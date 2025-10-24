"use client";

type Locale = "en" | "fr";

/**
 * Gets the browser locale on the client side using navigator.language
 * @returns Locale - The preferred locale ('en' or 'fr'), defaults to 'fr'
 */
export function getClientLocale(): Locale {
  if (typeof window === "undefined") {
    return "fr"; // Default to French during SSR
  }

  const browserLang = navigator.language.split("-")[0];

  if (["en", "fr"].includes(browserLang)) {
    return browserLang as Locale;
  }

  return "fr"; // Default to French
}

/**
 * Hook to get the current locale on the client side
 * @returns Locale - The current locale
 */
export function useClientLocale(): Locale {
  return getClientLocale();
}
