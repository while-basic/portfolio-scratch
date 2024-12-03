'use client';

import { ClientBoundary } from './client-boundary';

export function withClientBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback: React.ReactNode = <div>Loading...</div>
) {
  return function WrappedComponent(props: P) {
    return (
      <ClientBoundary fallback={fallback}>
        <Component {...props} />
      </ClientBoundary>
    );
  };
}
