import { headers } from "next/headers";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getTranslation, type Locale } from "@/utilities/translations";

export default async function NotFound() {
  // Get locale from headers
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const locale = (pathname.split("/")[1] as Locale) || "fr";

  return (
    <div className="container py-28">
      <div className="prose max-w-none">
        <h1 style={{ marginBottom: 0 }}>404</h1>
        <p className="mb-4">{getTranslation(locale, "common.pageNotFound")}</p>
      </div>
      <Button asChild variant="default">
        <Link href="/">{getTranslation(locale, "common.goHome")}</Link>
      </Button>
    </div>
  );
}
