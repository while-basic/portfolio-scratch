'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Settings, ArrowLeft } from 'lucide-react';

export default function AIEditorLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  // Check if the current route is a settings page
  const isSettingsPage = pathname ? [
    '/ai-editor/editor-preferences', 
    '/ai-editor/ai-settings', 
    '/ai-editor/about'
  ].includes(pathname) : false;

  return (
    <div>
      {isSettingsPage ? (
        <div className="min-h-screen bg-white dark:bg-black">
          <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center mb-6">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => router.push('/ai-editor')}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl font-bold">
                {pathname === '/ai-editor/editor-preferences' && 'Editor Preferences'}
                {pathname === '/ai-editor/ai-settings' && 'AI Settings'}
                {pathname === '/ai-editor/about' && 'About'}
              </h1>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="bg-white dark:bg-black">
              {children}
            </div>
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
