"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

export function ThemeProvider({
                                  children,
                                  ...props
                              }: React.ComponentProps<typeof NextThemesProvider>) {
    // Use React.createElement to avoid JSX parsing issues in a .ts file
    return React.createElement(NextThemesProvider, { ...props }, children as any);
}