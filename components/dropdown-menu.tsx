'use client';

import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { FaEllipsisV, FaGithub, FaLinkedin, FaTwitter, FaFileAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export function DropdownMenu() {
  const [open, setOpen] = React.useState(false);

  const menuItems = [
    { icon: <FaGithub className="w-4 h-4" />, label: 'GitHub', href: 'https://github.com/christophercelaya' },
    { icon: <FaLinkedin className="w-4 h-4" />, label: 'LinkedIn', href: 'https://linkedin.com/in/christophercelaya' },
    { icon: <FaTwitter className="w-4 h-4" />, label: 'Twitter', href: 'https://twitter.com/christophercelaya' },
    { icon: <FaFileAlt className="w-4 h-4" />, label: 'Resume', href: '/resume.pdf' },
  ];

  return (
    <DropdownMenuPrimitive.Root open={open} onOpenChange={setOpen}>
      <DropdownMenuPrimitive.Trigger asChild>
        <button
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Additional links"
        >
          <FaEllipsisV className="w-5 h-5 text-gray-400" />
        </button>
      </DropdownMenuPrimitive.Trigger>

      <AnimatePresence>
        {open && (
          <DropdownMenuPrimitive.Portal forceMount>
            <DropdownMenuPrimitive.Content
              asChild
              align="end"
              sideOffset={5}
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-[#111111] rounded-lg p-2 shadow-xl border border-white/10 min-w-[180px] backdrop-blur-sm"
              >
                {menuItems.map((item) => (
                  <DropdownMenuPrimitive.Item
                    key={item.label}
                    asChild
                    className="focus:outline-none"
                  >
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-md transition-colors outline-none"
                    >
                      {item.icon}
                      {item.label}
                    </a>
                  </DropdownMenuPrimitive.Item>
                ))}
              </motion.div>
            </DropdownMenuPrimitive.Content>
          </DropdownMenuPrimitive.Portal>
        )}
      </AnimatePresence>
    </DropdownMenuPrimitive.Root>
  );
}
