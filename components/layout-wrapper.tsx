"use client"

import { Suspense } from "react"
import { usePathname } from "next/navigation"
import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import { Footer } from "@/components/footer"
import MobileNav from "@/components/mobile-nav"
import { usePageView } from "@/hooks/use-page-view"

interface LayoutWrapperProps {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname()
  usePageView()

  const isAdminRoute = pathname?.startsWith("/admin")

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-40">
        <Sidebar />
      </div>
      <main className="flex-1 md:pl-56 pt-[60px] px-4 md:px-8">
        <div className="max-w-6xl mx-auto w-full">
          <Suspense 
            fallback={
              <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-pulse">Loading...</div>
              </div>
            }
          >
            {children}
          </Suspense>
        </div>
        <div className="h-20" /> {/* Spacer for footer */}
      </main>
      <div className="md:pl-56">
        <Footer />
      </div>
      <div className="md:hidden">
        <MobileNav />
      </div>
    </div>
  )
}
