"use client"

import { useRouter } from 'next/navigation'
import { ImageGeneration } from '@/components/chat/image-generation'
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ImageGenerationPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-[100dvh] bg-black">
      <div className="flex items-center justify-between h-14 px-4 bg-black border-b border-gray-800">
        <div className="flex items-center gap-2">
          <Link href="/chat">
            <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <span className="text-white">Image Generation</span>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <ImageGeneration />
      </div>
    </div>
  )
}
