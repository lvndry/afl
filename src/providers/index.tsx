import React from "react";

import { HeaderThemeProvider } from "./HeaderTheme";

export function Providers({ children }: { children: React.ReactNode }) {
  return <HeaderThemeProvider>{children}</HeaderThemeProvider>;
}
