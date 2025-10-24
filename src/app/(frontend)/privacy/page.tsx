import { getBrowserLocale } from "@/utilities/getBrowserLocale";
import { getTranslation } from "@/utilities/translations";
import type { Metadata } from "next";

export default async function PrivacyPage() {
  const locale = await getBrowserLocale();

  return (
    <div className="min-h-screen">
      <div className="container py-20 lg:py-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-display font-editorial text-foreground mb-8">
            {getTranslation(locale, "privacy.title")}
          </h1>

          <div className="prose prose-lg max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-headline font-editorial text-foreground mb-4">
                  {getTranslation(locale, "privacy.introduction.title")}
                </h2>
                <p className="text-body text-muted-foreground leading-relaxed">
                  {getTranslation(locale, "privacy.introduction.content")}
                </p>
              </section>

              <section>
                <h2 className="text-headline font-editorial text-foreground mb-4">
                  {getTranslation(locale, "privacy.dataCollection.title")}
                </h2>
                <p className="text-body text-muted-foreground leading-relaxed mb-4">
                  {getTranslation(locale, "privacy.dataCollection.content")}
                </p>
                <ul className="list-disc list-inside space-y-2 text-body text-muted-foreground">
                  <li>{getTranslation(locale, "privacy.dataCollection.list1")}</li>
                  <li>{getTranslation(locale, "privacy.dataCollection.list2")}</li>
                  <li>{getTranslation(locale, "privacy.dataCollection.list3")}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-headline font-editorial text-foreground mb-4">
                  {getTranslation(locale, "privacy.cookies.title")}
                </h2>
                <p className="text-body text-muted-foreground leading-relaxed">
                  {getTranslation(locale, "privacy.cookies.content")}
                </p>
              </section>

              <section>
                <h2 className="text-headline font-editorial text-foreground mb-4">
                  {getTranslation(locale, "privacy.thirdParty.title")}
                </h2>
                <p className="text-body text-muted-foreground leading-relaxed">
                  {getTranslation(locale, "privacy.thirdParty.content")}
                </p>
              </section>

              <section>
                <h2 className="text-headline font-editorial text-foreground mb-4">
                  {getTranslation(locale, "privacy.rights.title")}
                </h2>
                <p className="text-body text-muted-foreground leading-relaxed mb-4">
                  {getTranslation(locale, "privacy.rights.content")}
                </p>
                <ul className="list-disc list-inside space-y-2 text-body text-muted-foreground">
                  <li>{getTranslation(locale, "privacy.rights.list1")}</li>
                  <li>{getTranslation(locale, "privacy.rights.list2")}</li>
                  <li>{getTranslation(locale, "privacy.rights.list3")}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-headline font-editorial text-foreground mb-4">
                  {getTranslation(locale, "privacy.contact.title")}
                </h2>
                <p className="text-body text-muted-foreground leading-relaxed">
                  {getTranslation(locale, "privacy.contact.content")}
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
    title: getTranslation(locale, "privacy.metaTitle"),
    description: getTranslation(locale, "privacy.metaDescription"),
    openGraph: {
      title: getTranslation(locale, "privacy.metaTitle"),
      description: getTranslation(locale, "privacy.metaDescription"),
      type: "website",
    },
  };
}
