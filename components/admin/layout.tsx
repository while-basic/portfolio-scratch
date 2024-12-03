'use client';

import { ReactNode } from 'react'
import { Sidebar } from './sidebar'
import { ProtectedRoute } from './protected-route'
import Navbar from '@/components/navbar'

interface AdminLayoutProps {
  children: ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-8">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
