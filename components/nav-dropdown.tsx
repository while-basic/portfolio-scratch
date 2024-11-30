'use client';

import * as React from 'react';
import { MoreVertical, Github, Linkedin, Twitter, FileText } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NavDropdown() {
  const menuItems = [
    { icon: <Github className="w-4 h-4" />, label: 'GitHub', href: 'https://github.com/christophercelaya' },
    { icon: <Linkedin className="w-4 h-4" />, label: 'LinkedIn', href: 'https://linkedin.com/in/christophercelaya' },
    { icon: <Twitter className="w-4 h-4" />, label: 'Twitter', href: 'https://twitter.com/christophercelaya' },
    { icon: <FileText className="w-4 h-4" />, label: 'Resume', href: '/resume.pdf' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Additional links"
        >
          <MoreVertical className="w-5 h-5 text-gray-400" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px] bg-[#111111] border-white/10">
        {menuItems.map((item) => (
          <DropdownMenuItem key={item.label} asChild>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-white cursor-pointer"
            >
              {item.icon}
              {item.label}
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
