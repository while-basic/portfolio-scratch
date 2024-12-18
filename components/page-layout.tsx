"use client";

import { Breadcrumb } from "./breadcrumb";

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="flex flex-col min-h-[calc(100vh-60px)]">
      <div className="container mx-auto px-4 py-24 flex-1">
        <div className="mb-8">
          <Breadcrumb />
        </div>
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
