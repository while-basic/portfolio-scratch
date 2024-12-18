"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ModeToggle } from "@/components/mode-toggle"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { User } from '@supabase/auth-helpers-nextjs'
import { MobileNav } from "@/components/mobile-nav"
import { DashboardDropdown } from "@/components/dashboard-dropdown"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const Navbar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  const routes = [
    {
      href: "/about",
      label: "About",
      active: pathname === "/about",
    },
    {
      href: "/projects",
      label: "Projects",
      active: pathname === "/projects",
    },
    {
      href: "/skills",
      label: "Skills",
      active: pathname === "/skills",
    },
    {
      href: "/experience",
      label: "Experience",
      active: pathname === "/experience",
    },
    // {
    //   href: "/gallery",
    //   label: "Gallery",
    //   active: pathname === "/gallery",
    // },
    // {
    //   href: "/ai-gallery",
    //   label: "AI Gallery",
    //   active: pathname === "/ai-gallery",
    // },
    {
      href: "/resume",
      label: "Resume",
      active: pathname === "/resume",
    }
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="text-lg font-semibold hover:opacity-80">
          Christopher Celaya
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {routes.map((route) => {
            if (route.href === "/dashboard") {
              return (
                <DropdownMenu key={route.href}>
                  <DropdownMenuTrigger asChild>
                    <button className="text-sm font-medium transition-colors hover:opacity-80 opacity-60">
                      Dashboard
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40 bg-gray-900 border border-gray-800">
                    <DropdownMenuItem className="hover:bg-gray-800 focus:bg-gray-800" onClick={() => router.push('/profile')}>
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-gray-800 focus:bg-gray-800" onClick={() => router.push('/dashboard')}>
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-800" />
                    <DropdownMenuItem className="hover:bg-gray-800 focus:bg-gray-800" onClick={() => router.push('/admin/login')}>
                      Admin Login
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-gray-800 focus:bg-gray-800" onClick={handleSignOut}>
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }
            return (
              <Link
                key={route.href}
                href={route.href}
                className={`text-sm font-medium transition-colors hover:opacity-80 ${
                  route.active ? "opacity-100" : "opacity-60"
                }`}
              >
                {route.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <DashboardDropdown user={user} onSignOut={handleSignOut} />
                <ModeToggle />
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => router.push('/auth/sign-in')}>
                  Sign In
                </Button>
                <ModeToggle />
              </>
            )}
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export default Navbar
