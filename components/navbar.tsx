"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ModeToggle } from "@/components/mode-toggle"
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
    // {
    //   href: "/blog",
    //   label: "Blog",
    //   active: pathname === "/blog",
    // },
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
      <div className="max-w-[1400px] mx-auto flex h-14 items-center justify-between px-6">
        <div className="flex items-center">
          <Link href="/" className="text-lg font-semibold hover:opacity-80">
            Christopher Celaya
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
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
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-6">
          <a 
            href="mailto:mr.christophercelaya@gmail.com" 
            className="text-sm hover:opacity-80"
          >
            mr.christophercelaya@gmail.com
          </a>
          <ModeToggle />
          <button
            className="flex items-center space-x-1.5 hover:opacity-80"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="text-sm">menu</span>
            <div className="flex flex-col gap-1.5">
              <div className="w-6 h-[1px] bg-current"></div>
              <div className="w-6 h-[1px] bg-current"></div>
            </div>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2"
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
        <div className="md:hidden fixed inset-x-0 top-14 bottom-0 bg-white/95 dark:bg-black/95 backdrop-blur-sm overflow-y-auto">
          <div className="px-4 py-4 space-y-3 border-b border-gray-200 dark:border-gray-800">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  route.active 
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white" 
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {route.label}
              </Link>
            ))}
            <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-800 mt-4">
              <a 
                href="mailto:mr.christophercelaya@gmail.com" 
                className="text-sm hover:opacity-80"
              >
                mr.christophercelaya@gmail.com
              </a>
              <div className="px-3">
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
