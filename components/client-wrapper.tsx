'use client';

import { Suspense } from 'react';
import { ClientBoundary } from './client-boundary';

export function withClientBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback: React.ReactNode = <div>Loading...</div>
) {
  return function WrappedComponent(props: P) {
    return (
      <Suspense fallback={fallback}>
        <ClientBoundary fallback={fallback}>
          <Component {...props} />
        </ClientBoundary>
      </Suspense>
    );
  };
}
