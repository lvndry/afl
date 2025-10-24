import type { Metadata } from "next";

import { cn } from "@/utilities/ui";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Fraunces } from "next/font/google";
import React from "react";

import { AdminBar } from "@/components/AdminBar";
import { Footer } from "@/Footer/Component";
import { Header } from "@/Header/Component";
import { Providers } from "@/providers";
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";
import { draftMode, headers } from "next/headers";

import { getServerSideURL } from "@/utilities/getURL";
import { type Locale } from "@/utilities/translations";

import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  axes: ["SOFT", "WONK"],
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode();
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";

  // Extract locale from pathname (e.g., /fr/ or /en/)
  const locale = (pathname.split("/")[1] as Locale) || "fr";

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable, fraunces.variable)}
      lang={locale}
      data-theme="light"
      suppressHydrationWarning
    >
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header locale={locale} />
          <main className="flex-1">{children}</main>
          <Footer locale={locale} />
        </Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: "summary_large_image",
    creator: "@payloadcms",
  },
};
