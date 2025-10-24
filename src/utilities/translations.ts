import enTranslations from "@/locales/en/common.json";
import frTranslations from "@/locales/fr/common.json";

export type Locale = "en" | "fr";

export type TranslationKeys = {
  homepage: {
    featuredStory: string;
    readFullStory: string;
    latestStories: string;
    viewAll: string;
    moreStories: string;
    exploreAllStories: string;
    anonymous: string;
    defaultDescription: string;
    secondaryDescription: string;
  };
  meta: {
    title: string;
    description: string;
  };
  footer: {
    description: string;
    stories: string;
    about: string;
    allStories: string;
    culture: string;
    politics: string;
    innovation: string;
    ourMission: string;
    ourTeam: string;
    contactUs: string;
    newsletter: string;
    copyright: string;
    privacyPolicy: string;
    termsOfService: string;
  };
  header: {
    search: string;
    toggleMenu: string;
  };
};

const translations: Record<Locale, TranslationKeys> = {
  en: enTranslations,
  fr: frTranslations,
};

/**
 * Get a translation for a specific locale
 * @param locale - The locale to get translations for
 * @param key - The translation key (dot notation supported)
 * @returns The translated string
 */
export function getTranslation(locale: Locale, key: string): string {
  const keys = key.split(".");
  let value: any = translations[locale];

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k];
    } else {
      // Fallback to English if translation not found
      value = translations.en;
      for (const fallbackKey of keys) {
        if (value && typeof value === "object" && fallbackKey in value) {
          value = value[fallbackKey];
        } else {
          return key; // Return the key if no translation found
        }
      }
      break;
    }
  }

  return typeof value === "string" ? value : key;
}

/**
 * Get all translations for a specific locale
 * @param locale - The locale to get translations for
 * @returns The complete translation object for the locale
 */
export function getTranslations(locale: Locale): TranslationKeys {
  return translations[locale];
}

/**
 * Format date according to locale
 * @param date - The date to format
 * @param locale - The locale to format for
 * @returns Formatted date string
 */
export function formatDateByLocale(date: string | Date, locale: Locale): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  return dateObj.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
