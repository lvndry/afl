import { headers } from "next/headers";

type Locale = "en" | "fr";

/**
 * Extracts the preferred locale from the browser's Accept-Language header
 * @returns Promise<Locale> - The preferred locale ('en' or 'fr'), defaults to 'fr'
 */
export async function getBrowserLocale(): Promise<Locale> {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language");

  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(",")
      .map((lang) => lang.split(";")[0].trim())
      .find((lang) => ["fr", "en"].includes(lang.split("-")[0]));

    if (preferredLocale) {
      return preferredLocale.split("-")[0] as Locale;
    }
  }

  return "fr"; // Default to French
}
