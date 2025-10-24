import React from "react";

import { AdminBarProvider } from "./AdminBar";
import { HeaderThemeProvider } from "./HeaderTheme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AdminBarProvider>
      <HeaderThemeProvider>{children}</HeaderThemeProvider>
    </AdminBarProvider>
  );
}
