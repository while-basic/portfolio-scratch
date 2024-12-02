"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ModeToggle } from "@/components/mode-toggle"
import { NavDropdown } from "./nav-dropdown"
import { AuthButton } from "@/components/auth/auth-button"
import { Menu, X } from "lucide-react"

const Navbar = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  
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
    // {
    //   href: "/chat",
    //   label: "Chat",
    //   active: pathname === "/chat" || pathname === "/chat/image",
    // },
  ]

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-white/80 dark:bg-black/80 backdrop-blur-sm">
      <div className="container flex h-14 items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold hover:opacity-80">
          Christopher Celaya
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center">
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

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-x-2">
            <AuthButton />
            <ModeToggle />
            <NavDropdown />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  route.active 
                    ? "bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white" 
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {route.label}
              </Link>
            ))}
            <div className="px-3 py-2 flex items-center gap-2">
              <AuthButton />
              <ModeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
