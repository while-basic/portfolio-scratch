"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ModeToggle } from "@/components/mode-toggle"
import { NavDropdown } from "./nav-dropdown"
import { AuthButton } from "@/components/auth/auth-button"

const Navbar = () => {
  const pathname = usePathname()
  
  const routes = [
    {
      href: "/about",
      label: "About",
      active: pathname === "/about",
    },
    {
      href: "/blog",
      label: "Blog",
      active: pathname === "/blog",
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
    {
      href: "/gallery",
      label: "Gallery",
      active: pathname === "/gallery",
    },
    {
      href: "/resume",
      label: "Resume",
      active: pathname === "/resume",
    },
    {
      href: "/chat",
      label: "Chat",
      active: pathname === "/chat",
    },
    // Audio recorder page is hidden
  ]

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-white/80 dark:bg-black/80 backdrop-blur-sm">
      <div className="container flex h-14 items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold hover:opacity-80">
          Christopher Celaya
        </Link>
        
        <nav className="flex-1 flex justify-center">
          <div className="flex items-center space-x-6">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`text-sm font-medium transition-colors hover:opacity-80 ${
                  route.active ? "opacity-100" : "opacity-60"
                }`}
              >
                {route.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-x-2">
            <AuthButton />
            <ModeToggle />
            <NavDropdown />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
