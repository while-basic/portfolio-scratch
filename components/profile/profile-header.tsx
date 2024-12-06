'use client'

import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const ProfileHeader: FC = () => {
  const pathname = usePathname()
  
  const navItems = [
    { name: 'Posts', href: '/profile' },
    { name: 'About', href: '/profile/about' },
    { name: 'Friends', href: '/profile/friends' },
    { name: 'Photos', href: '/profile/photos' },
    { name: 'Videos', href: '/profile/videos' },
  ]

  const isActiveLink = (href: string) => {
    if (href === '/profile') {
      return pathname === '/profile'
    }
    return pathname?.startsWith(href)
  }

  return (
    <div className="relative bg-black">
      {/* Cover Photo */}
      <div className="h-[348px] relative bg-gradient-to-r from-gray-900 to-black">
        <Image
          src="/default-cover.jpg"
          alt="Cover photo"
          fill
          className="object-cover opacity-50 mix-blend-overlay"
          priority
        />
      </div>
      
      {/* Profile Picture & Name Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-16 sm:-mt-24 mb-4 flex items-end">
          <div className="relative h-40 w-40 sm:h-48 sm:w-48 rounded-full border-4 border-black shadow-lg overflow-hidden">
            <Image
              src="/default-avatar.jpg"
              alt="Profile picture"
              fill
              className="object-cover"
            />
          </div>
          <div className="ml-4 mb-4">
            <h1 className="text-3xl font-bold text-white">John Doe</h1>
            <p className="text-gray-300">500 friends</p>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="border-t border-zinc-800 bg-black shadow-md">
          <nav className="flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-4 font-medium relative group ${
                  isActiveLink(item.href)
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white hover:bg-zinc-900'
                }`}
              >
                {item.name}
                <div className={`absolute bottom-0 left-0 w-full h-1 bg-white transition-opacity ${
                  isActiveLink(item.href) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`} />
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader 