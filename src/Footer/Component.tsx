import { Instagram, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";

import { CMSLink } from "@/components/Link";
import { Logo } from "@/components/Logo/Logo";
import { ThemeSelector } from "@/providers/Theme/ThemeSelector";

export async function Footer() {
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
                <span className="text-xl font-editorial font-semibold">Afrique en Lumiere</span>
              </Link>
              <p className="text-body text-primary-foreground/80 leading-relaxed mb-8 max-w-md">
                We illuminate the stories, voices, and perspectives that shape the African
                continent. Through creative media and journalism, we bring authentic narratives to
                the world.
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
              <h3 className="text-subtitle font-editorial font-semibold mb-6">Stories</h3>
              <nav className="space-y-3">
                <CMSLink
                  className="block text-body text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  {...{
                    link: {
                      type: "reference",
                      reference: null,
                      url: "/posts",
                      label: "All Stories",
                    },
                  }}
                />
                <CMSLink
                  className="block text-body text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  {...{
                    link: {
                      type: "reference",
                      reference: null,
                      url: "/categories/culture",
                      label: "Culture",
                    },
                  }}
                />
                <CMSLink
                  className="block text-body text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  {...{
                    link: {
                      type: "reference",
                      reference: null,
                      url: "/categories/politics",
                      label: "Politics",
                    },
                  }}
                />
                <CMSLink
                  className="block text-body text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  {...{
                    link: {
                      type: "reference",
                      reference: null,
                      url: "/categories/innovation",
                      label: "Innovation",
                    },
                  }}
                />
              </nav>
            </div>

            <div>
              <h3 className="text-subtitle font-editorial font-semibold mb-6">About</h3>
              <nav className="space-y-3">
                <CMSLink
                  className="block text-body text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  {...{
                    link: {
                      type: "reference",
                      reference: null,
                      url: "/about",
                      label: "Our Mission",
                    },
                  }}
                />
                <CMSLink
                  className="block text-body text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  {...{
                    link: { type: "reference", reference: null, url: "/team", label: "Our Team" },
                  }}
                />
                <CMSLink
                  className="block text-body text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  {...{
                    link: {
                      type: "reference",
                      reference: null,
                      url: "/contact",
                      label: "Contact Us",
                    },
                  }}
                />
                <CMSLink
                  className="block text-body text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  {...{
                    link: {
                      type: "reference",
                      reference: null,
                      url: "/newsletter",
                      label: "Newsletter",
                    },
                  }}
                />
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-caption text-primary-foreground/60">
              © 2024 Afrique en Lumiere. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <CMSLink
                className="text-caption text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                {...{
                  link: {
                    type: "reference",
                    reference: null,
                    url: "/privacy",
                    label: "Privacy Policy",
                  },
                }}
              />
              <CMSLink
                className="text-caption text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                {...{
                  link: {
                    type: "reference",
                    reference: null,
                    url: "/terms",
                    label: "Terms of Service",
                  },
                }}
              />
              <ThemeSelector />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
