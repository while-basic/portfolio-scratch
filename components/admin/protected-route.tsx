'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../../lib/auth';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAdmin && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [isAdmin, router, pathname]);

  if (!isAdmin && pathname !== '/admin/login') {
    return null;
  }

  return <>{children}</>;
}
