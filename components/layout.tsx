import { ReactNode } from 'react'
import Link from 'next/link'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-900 text-white">
        <nav className="container mx-auto px-6 py-3">
          <ul className="flex justify-between items-center">
            <li><Link href="/" className="text-xl font-bold">Christopher Celaya</Link></li>
            <li className="flex space-x-4">
              <Link href="#mechatronics" className="hover:text-blue-400">Mechatronics</Link>
              <Link href="#software" className="hover:text-blue-400">Software</Link>
              <Link href="#audio" className="hover:text-blue-400">Audio</Link>
              <Link href="#projects" className="hover:text-blue-400">Projects</Link>
              <Link href="#contact" className="hover:text-blue-400">Contact</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2023 Christopher Celaya. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

