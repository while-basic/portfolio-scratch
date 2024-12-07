"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  MessageSquare,
  Image as ImageIcon,
  Users,
  Share2,
  Settings,
} from "lucide-react";

const adminNavItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Chat",
    href: "/admin/chat",
    icon: MessageSquare,
  },
  {
    title: "Images",
    href: "/admin/images",
    icon: ImageIcon,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Social",
    href: "/admin/social",
    icon: Share2,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="grid items-start gap-2">
      {adminNavItems.map((item) => (
        <Link key={item.href} href={item.href}>
          <Button
            variant={pathname === item.href ? "secondary" : "ghost"}
            className="w-full justify-start"
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.title}
          </Button>
        </Link>
      ))}
    </nav>
  );
} 