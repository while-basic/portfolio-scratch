"use client";

import { AdminSidebar } from "@/components/admin/sidebar";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="h-full relative bg-black">
      <div className="hidden h-full md:flex md:w-60 md:flex-col md:fixed md:inset-y-0 z-[80]">
        <AdminSidebar />
      </div>
      <main className="md:pl-60">
        <div className="px-4 md:px-8 pt-2 pb-16">{children}</div>
      </main>
    </div>
  );
}
