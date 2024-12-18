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
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-40">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[60px] min-h-[calc(100vh-60px)] pb-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
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
      </main>
      <div className="md:pl-56 fixed bottom-0 left-0 right-0 z-40">
        <Footer />
      </div>
      <div className="md:hidden">
        <MobileNav />
      </div>
    </div>
  )
}
