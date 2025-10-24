"use client";

import React from "react";

import type { Header as HeaderType } from "@/payload-types";
import { getTranslation, type Locale } from "@/utilities/translations";

import { CMSLink } from "@/components/Link";
import { SearchIcon } from "lucide-react";
import Link from "next/link";

export const HeaderNav: React.FC<{ data: HeaderType; locale?: Locale }> = ({
  data,
  locale = "fr",
}) => {
  const navItems = data?.navItems || [];

  return (
    <nav className="flex gap-3 items-center">
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" />;
      })}
      <Link href="/search">
        <span className="sr-only">{getTranslation(locale, "header.search")}</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
    </nav>
  );
};
