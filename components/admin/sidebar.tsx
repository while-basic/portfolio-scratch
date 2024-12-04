"use client";

import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  FileText,
  MessageSquare,
  Image,
  Settings,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
  },
  {
    label: "Users",
    icon: Users,
    href: "/admin/users",
  },
  {
    label: "Blog Posts",
    icon: FileText,
    href: "/admin/posts",
  },
  {
    label: "Messages",
    icon: MessageSquare,
    href: "/admin/messages",
  },
  {
    label: "Image Generation",
    icon: Image,
    href: "/image-generation",
  },
  {
    label: "Gallery",
    icon: Image,
    href: "/admin/gallery",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/admin/settings",
  },
];

const SidebarItem = ({
  icon: Icon,
  label,
  href,
  isCollapsed,
}: {
  icon: LucideIcon;
  label: string;
  href: string;
  isCollapsed: boolean;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-x-2 text-sm font-medium px-3 py-2 transition-all hover:bg-neutral-800",
        isActive ? "bg-neutral-800 text-white" : "text-neutral-400",
        isCollapsed && "justify-center px-2"
      )}
    >
      <Icon size={20} className={cn(isActive ? "text-white" : "text-neutral-400")} />
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
};

export const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-4 left-4 z-40 bg-black hover:bg-neutral-800"
        variant="outline"
        size="icon"
      >
        <Menu className="h-4 w-4 text-neutral-400" />
      </Button>

      <div
        className={cn(
          "fixed left-0 flex flex-col h-full bg-black pt-20 transition-all duration-300",
          isCollapsed ? "w-16" : "w-60",
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="p-6 flex items-center justify-between border-b border-neutral-800">
          {!isCollapsed && (
            <span className="font-semibold text-lg text-white">
              Admin Panel
            </span>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-neutral-800 rounded-lg"
          >
            <ChevronLeft
              className={cn(
                "h-6 w-6 text-neutral-400 transition-all",
                isCollapsed && "rotate-180"
              )}
            />
          </button>
        </div>

        <div className="flex flex-col w-full space-y-2 px-2 mt-4">
          {routes.map((route) => (
            <SidebarItem
              key={route.href}
              icon={route.icon}
              label={route.label}
              href={route.href}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};
