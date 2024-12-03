'use client';

import { Suspense } from 'react';

interface ClientBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ClientBoundary({ children, fallback }: ClientBoundaryProps) {
  return (
    <Suspense fallback={fallback || <div>Loading...</div>}>
      {children}
    </Suspense>
  );
}
