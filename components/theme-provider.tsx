"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

type Theme = "dark" | "light" | "system"

interface ThemeProviderProps {
  children: React.ReactNode
  attribute?: "class" | "data-theme"
  defaultTheme?: Theme
  enableSystem?: boolean
  forcedTheme?: Theme
  disableTransitionOnChange?: boolean
  storageKey?: string
}

export function ThemeProvider({ 
  children,
  attribute = "class",
  defaultTheme = "system",
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider 
      attribute={attribute}
      defaultTheme={defaultTheme}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
