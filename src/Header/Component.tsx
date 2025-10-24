import { getCachedGlobal } from "@/utilities/getGlobals";
import { type Locale } from "@/utilities/translations";
import { HeaderClient } from "./Component.client";

import type { Header } from "@/payload-types";

interface HeaderProps {
  locale?: Locale;
}

export async function Header({ locale = "fr" }: HeaderProps) {
  const headerData: Header = await getCachedGlobal("header", 1)();

  return <HeaderClient data={headerData} locale={locale} />;
}
