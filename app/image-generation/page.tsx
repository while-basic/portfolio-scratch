'use client'

import { ChatInterface } from "@/components/chat/chat-interface"
import { withClientBoundary } from "@/components/client-wrapper"

function ImageGenerationPage() {
  return (
    <div className="flex h-[100dvh] bg-black/95">
      <main className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col">
          <ChatInterface mode="image" />
        </div>
      </main>
    </div>
  )
}

export default withClientBoundary(ImageGenerationPage)
