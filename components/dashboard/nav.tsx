'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "Overview",
    href: "/dashboard",
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="grid items-start gap-2">
      {navItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={cn(
            "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent",
            pathname === item.href ? "bg-accent" : "transparent"
          )}
        >
          <span>{item.title}</span>
        </Link>
      ))}
    </nav>
  )
} 