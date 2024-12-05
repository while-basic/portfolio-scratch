'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, FileText, Save, Download, Share2 } from 'lucide-react';

// Import the Editor with SSR disabled since we need browser APIs
const Editor = dynamic(
  () => import('@/components/editor/AIEditor'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black dark:border-white"></div>
      </div>
    )
  }
);

export default function AIEditorPage() {
  const router = useRouter();
  const { user, session, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black dark:border-white"></div>
      </div>
    );
  }

  if (!session || !user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-black dark:text-white">
              AI Editor
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Streamlined writing with AI assistance
            </p>
          </div>
          <div className="flex space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <FileText className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>File</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Save className="mr-2 h-4 w-4" /> Save Draft
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" /> Export
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Editor Preferences</DropdownMenuItem>
                <DropdownMenuItem>AI Settings</DropdownMenuItem>
                <DropdownMenuItem>Keyboard Shortcuts</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="border-2 border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-[70vh]">
              <div className="relative">
                <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-black dark:border-white"></div>
              </div>
            </div>
          }>
            <Editor user={user} session={session} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
