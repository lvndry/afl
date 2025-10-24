import { Instagram, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";

import { CMSLink } from "@/components/Link";
import { Logo } from "@/components/Logo/Logo";
import { SITE_CONFIG } from "@/config/site";
import { getTranslation, type Locale } from "@/utilities/translations";

interface FooterProps {
  locale?: Locale;
}

export async function Footer({ locale = "fr" }: FooterProps) {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-editorial">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-6 group">
                <Logo className="h-10 w-auto transition-transform group-hover:scale-105" />
                <span className="text-xl font-editorial font-semibold">{SITE_CONFIG.name}</span>
              </Link>
              <p className="text-body text-primary-foreground/80 leading-relaxed mb-8 max-w-md">
                {getTranslation(locale, "footer.description")}
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                <a
                  href="mailto:hello@afriqueenlumiere.com"
                  className="p-2 text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com/afriqueenlumiere"
                  className="p-2 text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com/afriqueenlumiere"
                  className="p-2 text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/company/afriqueenlumiere"
                  className="p-2 text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Navigation Sections */}
            <div>
              <nav className="space-y-3">
                <CMSLink
                  className="block text-body text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  type="reference"
                  reference={null}
                  url="/posts"
                  label={getTranslation(locale, "footer.allStories")}
                />
                <CMSLink
                  className="block text-body text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  type="reference"
                  reference={null}
                  url="/categories/culture"
                  label={getTranslation(locale, "footer.culture")}
                />
                <CMSLink
                  className="block text-body text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  type="reference"
                  reference={null}
                  url="/categories/politics"
                  label={getTranslation(locale, "footer.politics")}
                />
                <CMSLink
                  className="block text-body text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  type="reference"
                  reference={null}
                  url="/categories/innovation"
                  label={getTranslation(locale, "footer.innovation")}
                />
              </nav>
            </div>

            <div>
              <nav className="space-y-3">
                <CMSLink
                  className="block text-body text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  type="reference"
                  reference={null}
                  url="/about"
                  label={getTranslation(locale, "footer.ourMission")}
                />
                <CMSLink
                  className="block text-body text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  type="reference"
                  reference={null}
                  url="/team"
                  label={getTranslation(locale, "footer.ourTeam")}
                />
                <CMSLink
                  className="block text-body text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  type="reference"
                  reference={null}
                  url="/contact"
                  label={getTranslation(locale, "footer.contactUs")}
                />
                <CMSLink
                  className="block text-body text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  type="reference"
                  reference={null}
                  url="/newsletter"
                  label={getTranslation(locale, "footer.newsletter")}
                />
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-caption text-primary-foreground/60">
              {getTranslation(locale, "footer.copyright")}
            </p>
            <div className="flex items-center gap-6">
              <CMSLink
                className="text-caption text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                type="reference"
                reference={null}
                url="/privacy"
                label={getTranslation(locale, "footer.privacyPolicy")}
              />
              <CMSLink
                className="text-caption text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                type="reference"
                reference={null}
                url="/terms"
                label={getTranslation(locale, "footer.termsOfService")}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
