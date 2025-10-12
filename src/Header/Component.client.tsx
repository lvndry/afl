"use client";
import { useHeaderTheme } from "@/providers/HeaderTheme";
import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import type { Header } from "@/payload-types";

import { CMSLink } from "@/components/Link";
import { Logo } from "@/components/Logo/Logo";
import { ThemeSelector } from "@/providers/Theme/ThemeSelector";

interface HeaderClientProps {
  data: Header;
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { headerTheme, setHeaderTheme } = useHeaderTheme();
  const pathname = usePathname();

  useEffect(() => {
    setHeaderTheme(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
        {...(theme ? { "data-theme": theme } : {})}
      >
        <div className="container-editorial">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <Logo
                loading="eager"
                priority="high"
                className="h-8 w-auto transition-transform group-hover:scale-105"
              />
              <span className="text-lg font-editorial font-semibold text-foreground">
                Afrique en Lumiere
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {data.navItems?.map((item) => (
                <CMSLink
                  key={item.id}
                  {...item.link}
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors relative group"
                >
                  <span className="relative">
                    {item.link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
                  </span>
                </CMSLink>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <button className="p-2 text-foreground/60 hover:text-foreground transition-colors">
                <Search className="w-5 h-5" />
              </button>

              {/* Theme Selector */}
              <ThemeSelector />

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 text-foreground/60 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-background/95 backdrop-blur-md border-t border-border">
            <div className="container-editorial py-6">
              <nav className="flex flex-col gap-6">
                {data.navItems?.map((item) => (
                  <div key={item.id} onClick={() => setIsMenuOpen(false)}>
                    <CMSLink
                      {...item.link}
                      className="text-lg font-medium text-foreground hover:text-accent transition-colors"
                    />
                  </div>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Spacer to prevent content from being hidden behind fixed header */}
      <div className="h-20" />
    </>
  );
};
