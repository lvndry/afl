import { getBrowserLocale } from "@/utilities/getBrowserLocale";
import { getTranslation } from "@/utilities/translations";
import type { Metadata } from "next";

export default async function TermsPage() {
  const locale = await getBrowserLocale();

  return (
    <div className="min-h-screen">
      <div className="container py-20 lg:py-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-display font-editorial text-foreground mb-8">
            {getTranslation(locale, "terms.title")}
          </h1>

          <div className="prose prose-lg max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-headline font-editorial text-foreground mb-4">
                  {getTranslation(locale, "terms.acceptance.title")}
                </h2>
                <p className="text-body text-muted-foreground leading-relaxed">
                  {getTranslation(locale, "terms.acceptance.content")}
                </p>
              </section>

              <section>
                <h2 className="text-headline font-editorial text-foreground mb-4">
                  {getTranslation(locale, "terms.use.title")}
                </h2>
                <p className="text-body text-muted-foreground leading-relaxed mb-4">
                  {getTranslation(locale, "terms.use.content")}
                </p>
                <ul className="list-disc list-inside space-y-2 text-body text-muted-foreground">
                  <li>{getTranslation(locale, "terms.use.list1")}</li>
                  <li>{getTranslation(locale, "terms.use.list2")}</li>
                  <li>{getTranslation(locale, "terms.use.list3")}</li>
                  <li>{getTranslation(locale, "terms.use.list4")}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-headline font-editorial text-foreground mb-4">
                  {getTranslation(locale, "terms.content.title")}
                </h2>
                <p className="text-body text-muted-foreground leading-relaxed">
                  {getTranslation(locale, "terms.content.content")}
                </p>
              </section>

              <section>
                <h2 className="text-headline font-editorial text-foreground mb-4">
                  {getTranslation(locale, "terms.intellectual.title")}
                </h2>
                <p className="text-body text-muted-foreground leading-relaxed">
                  {getTranslation(locale, "terms.intellectual.content")}
                </p>
              </section>

              <section>
                <h2 className="text-headline font-editorial text-foreground mb-4">
                  {getTranslation(locale, "terms.disclaimer.title")}
                </h2>
                <p className="text-body text-muted-foreground leading-relaxed">
                  {getTranslation(locale, "terms.disclaimer.content")}
                </p>
              </section>

              <section>
                <h2 className="text-headline font-editorial text-foreground mb-4">
                  {getTranslation(locale, "terms.limitation.title")}
                </h2>
                <p className="text-body text-muted-foreground leading-relaxed">
                  {getTranslation(locale, "terms.limitation.content")}
                </p>
              </section>

              <section>
                <h2 className="text-headline font-editorial text-foreground mb-4">
                  {getTranslation(locale, "terms.changes.title")}
                </h2>
                <p className="text-body text-muted-foreground leading-relaxed">
                  {getTranslation(locale, "terms.changes.content")}
                </p>
              </section>

              <section>
                <h2 className="text-headline font-editorial text-foreground mb-4">
                  {getTranslation(locale, "terms.contact.title")}
                </h2>
                <p className="text-body text-muted-foreground leading-relaxed">
                  {getTranslation(locale, "terms.contact.content")}
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getBrowserLocale();

  return {
    title: getTranslation(locale, "terms.metaTitle"),
    description: getTranslation(locale, "terms.metaDescription"),
    openGraph: {
      title: getTranslation(locale, "terms.metaTitle"),
      description: getTranslation(locale, "terms.metaDescription"),
      type: "website",
    },
  };
}
