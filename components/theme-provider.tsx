"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps as NextThemeProviderProps } from "next-themes/dist/types"

interface ThemeProviderProps extends Omit<NextThemeProviderProps, "attribute"> {
  children: React.ReactNode
  attribute?: "class" | "data-theme"
}

export function ThemeProvider({ 
  children,
  attribute = "class",
  ...props
}: ThemeProviderProps) {
  return <NextThemesProvider attribute={attribute} {...props}>{children}</NextThemesProvider>
}
