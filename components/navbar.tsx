"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ModeToggle } from "@/components/mode-toggle"

const Navbar = () => {
  const pathname = usePathname()
  
  const leftRoutes = [
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
  ]

  const rightRoutes = [
    {
      href: "/gallery",
      label: "Gallery",
      active: pathname === "/gallery",
    },
    {
      href: "/chat",
      label: "Chat",
      active: pathname === "/chat",
    },
    {
      href: "/dashboard",
      label: "Dashboard",
      active: pathname === "/dashboard",
    },
  ]

  return (
    <header className="fixed top-0 z-50 w-full bg-black/50 backdrop-blur-sm">
      <div className="container flex h-14 items-center justify-between px-4">
        <nav className="flex items-center space-x-6">
          {leftRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`text-sm transition-colors hover:text-white ${
                route.active ? "text-white" : "text-white/60"
              }`}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        <Link href="/" className="text-lg font-semibold text-white hover:text-white/80">
          Christopher Celaya
        </Link>

        <div className="flex items-center">
          <nav className="flex items-center space-x-6 mr-4">
            {rightRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`text-sm transition-colors hover:text-white ${
                  route.active ? "text-white" : "text-white/60"
                }`}
              >
                {route.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <ModeToggle />
            <Link href="/profile">
              <div className="h-8 w-8 rounded-full bg-white/10" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
