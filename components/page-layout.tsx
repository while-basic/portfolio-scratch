"use client";

import { Breadcrumb } from "./breadcrumb";

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24">
        <div className="mb-8">
          <Breadcrumb />
        </div>
        {children}
      </div>
    </div>
  );
}
