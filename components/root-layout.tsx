'use client'

import localFont from "next/font/local"
import "@/styles/mdx.css"
import Navbar from "@/components/navbar"
import { LoadingScreen } from "@/components/loading-screen"
import { usePageView } from "@/hooks/use-page-view"
import { Suspense } from "react"

const geistSans = localFont({
  src: "../app/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
})

const geistMono = localFont({
  src: "../app/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
})

export function RootLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  usePageView()

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased flex min-h-screen flex-col`}>
      <LoadingScreen />
      <Navbar />
      <main>
        <Suspense fallback={<LoadingScreen />}>
          <Suspense fallback={<div>Loading...</div>}>
            {children}
          </Suspense>
        </Suspense>
      </main>
    </div>
  )
}
