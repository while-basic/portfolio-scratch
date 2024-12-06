'use client';

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function SocialLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname() || ''
  const currentTab = pathname.includes('/discussions') ? 'discussions' :
                    pathname.includes('/gallery') ? 'gallery' :
                    pathname.includes('/following') ? 'following' :
                    pathname.includes('/trending') ? 'trending' : 'feed'

  return (
    <div className="container py-6">
      <h1 className="text-4xl font-bold mb-6">Social</h1>
      
      <Tabs value={currentTab} className="mb-8">
        <TabsList className="grid grid-cols-5 w-[600px]">
          <Link href="/social">
            <TabsTrigger value="feed">Feed</TabsTrigger>
          </Link>
          <Link href="/social/gallery">
            <TabsTrigger value="gallery">AI Gallery</TabsTrigger>
          </Link>
          <Link href="/social/discussions">
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
          </Link>
          <Link href="/social/following">
            <TabsTrigger value="following">Following</TabsTrigger>
          </Link>
          <Link href="/social/trending">
            <TabsTrigger value="trending">Trending</TabsTrigger>
          </Link>
        </TabsList>
      </Tabs>
      
      {children}
    </div>
  )
} 