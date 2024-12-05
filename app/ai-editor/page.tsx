'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

// Import the Editor with SSR disabled since we need browser APIs
const Editor = dynamic(
  () => import('@/components/editor/AIEditor'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
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
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!session || !user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI-Powered Editor</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Write and edit with AI assistance, just like Notion
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-[500px]">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          }>
            <Editor user={user} session={session} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
