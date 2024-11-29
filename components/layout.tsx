import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-black text-white/60 py-6">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2025 Christopher Celaya. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
