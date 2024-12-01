"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
  items?: Array<{
    label: string;
    href: string;
  }>;
}

export function Breadcrumb({ items = [] }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-400">
      <Link
        href="/"
        className="hover:text-white transition-colors duration-200"
      >
        Home
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="h-4 w-4" />
          <Link
            href={item.href}
            className="hover:text-white transition-colors duration-200"
          >
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}
