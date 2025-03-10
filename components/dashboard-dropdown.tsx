'use client';

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

interface DashboardDropdownProps {
  onSignOut: () => Promise<void>;
}

export function DashboardDropdown({ onSignOut }: DashboardDropdownProps) {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative">
          Dashboard
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-40 bg-[#1a1d24] border border-[#2a2e35]"
      >
        <DropdownMenuItem 
          className="hover:bg-[#2a2e35] focus:bg-[#2a2e35] text-gray-200" 
          onClick={() => router.push('/profile')}
        >
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="hover:bg-[#2a2e35] focus:bg-[#2a2e35] text-gray-200" 
          onClick={() => router.push('/dashboard')}
        >
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-[#2a2e35]" />
        <DropdownMenuItem 
          className="hover:bg-[#2a2e35] focus:bg-[#2a2e35] text-gray-200" 
          onClick={() => router.push('/admin/login')}
        >
          Admin Login
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="hover:bg-[#2a2e35] focus:bg-[#2a2e35] text-gray-200" 
          onClick={onSignOut}
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
