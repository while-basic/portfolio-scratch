'use client';

import * as React from 'react';
import Link from 'next/link';
import { Github, Linkedin, FileText, BookOpen, Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NavDropdown() {
  const menuItems = [
    { 
      icon: <Github className="w-4 h-4" />, 
      label: 'GitHub', 
      href: 'https://github.com/while-basic',
      internal: false 
    },
    { 
      icon: <Linkedin className="w-4 h-4" />, 
      label: 'LinkedIn', 
      href: 'https://linkedin.com/in/christophercelaya',
      internal: false 
    },
    { 
      icon: <FileText className="w-4 h-4" />, 
      label: 'Resume', 
      href: '/resume.pdf',
      internal: true 
    },
    {
      icon: <BookOpen className="w-4 h-4" />,
      label: 'Featured Links',
      href: '/links',
      internal: true
    },
    { 
      icon: <FileText className="w-4 h-4" />, 
      label: 'Admin', 
      href: '/admin/login',
      internal: true 
    }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          aria-label="Menu"
        >
          <span className="text-sm font-medium">Menu</span>
          <Menu className="h-5 w-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px]">
        {menuItems.map((item) => (
          <DropdownMenuItem key={item.label} asChild>
            {item.internal ? (
              <Link
                href={item.href}
                className="flex items-center gap-3 w-full"
              >
                {item.icon}
                {item.label}
              </Link>
            ) : (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full"
              >
                {item.icon}
                {item.label}
              </a>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
