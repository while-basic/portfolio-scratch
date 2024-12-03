"use client"

import { useState, useCallback, useEffect } from 'react'
import { ChatInterface } from "@/components/chat/chat-interface"
import { withClientBoundary } from "@/components/client-wrapper"
import { useAuth } from "@/lib/auth-context"
import { getConversations } from "@/lib/chat"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { AuthDialog } from "@/components/chat/auth-dialog"
import { cn } from "@/lib/utils"

function ChatPage() {
  const { user, loading } = useAuth()
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true)

  const loadConversations = useCallback(async () => {
    try {
      if (!user?.id) return
      await getConversations(user.id)
    } catch (error: unknown) {
      console.error('Error loading conversations:', error)
      if (error instanceof Error && error.message === 'Not authenticated') {
        setShowAuthDialog(true)
      }
    }
  }, [user?.id])

  useEffect(() => {
    if (!loading && !user) {
      setShowAuthDialog(true)
    }
    if (user) {
      loadConversations()
    }
  }, [user, loading, loadConversations])

  return (
    <div className="flex h-[100dvh] bg-black">
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between h-14 px-4 bg-black border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-gray-800 lg:hidden"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <Menu className="h-4 w-4" />
            </Button>
            <span className="text-white">Chat</span>
          </div>
        </div>
        <div className={cn(
          "flex-1 transition-[margin] duration-200 ease-in-out",
          showSidebar ? "lg:ml-80" : ""
        )}>
          <div className="h-full">
            <ChatInterface />
          </div>
        </div>
      </div>

      <AuthDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
      />
    </div>
  )
}

export default withClientBoundary(ChatPage)
