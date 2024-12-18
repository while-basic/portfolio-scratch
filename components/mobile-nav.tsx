"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"
import { ModeToggle } from "@/components/mode-toggle"

export const MobileNav = () => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

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
    {
      href: "/resume",
      label: "Resume",
      active: pathname === "/resume",
    },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="right" 
        className="w-[280px] sm:w-[360px] pl-0 pr-0 bg-background/95 backdrop-blur-sm border-l"
      >
        <nav className="flex flex-col h-full py-4">
          <div className="flex flex-col space-y-3 flex-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setOpen(false)}
                className={`px-6 py-3 text-sm font-medium transition-colors hover:bg-accent/50 active:bg-accent/70 ${
                  route.active ? "text-primary bg-accent" : "text-muted-foreground"
                }`}
              >
                {route.label}
              </Link>
            ))}
          </div>
          <div className="mt-auto border-t border-border/50 pt-4 px-6">
            <div className="flex items-center justify-between">
              <ModeToggle />
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/sign-in">Sign In</Link>
              </Button>
            </div>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav
