"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

export function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname
    .split("/")
    .filter((segment) => segment !== "")
    .map((segment) => ({
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      href: `/${segment}`,
    }));

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-400">
      <Link
        href="/"
        className="hover:text-white transition-colors duration-200"
      >
        Home
      </Link>
      {segments.map((segment, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="h-4 w-4" />
          <Link
            href={segment.href}
            className="hover:text-white transition-colors duration-200"
          >
            {segment.name}
          </Link>
        </div>
      ))}
    </nav>
  );
}
