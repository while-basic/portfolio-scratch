"use client"

import { useState, useCallback, useEffect } from 'react'
import { Chat } from "@/components/chat/chat"
import { ChatInterface } from "@/components/chat/chat-interface"
import { Sidebar } from "@/components/chat/sidebar"
import { withClientBoundary } from "@/components/client-wrapper"
import { useAuth } from "@/lib/auth-context"
import { Conversation, getConversations, createConversation, updateConversation } from "@/lib/chat"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Menu } from "lucide-react"
import Link from "next/link"
import { AuthDialog } from "@/components/chat/auth-dialog"

function ChatPage() {
  const { user, loading } = useAuth()
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null)

  const loadConversations = useCallback(async () => {
    try {
      if (!user?.id) return
      const data = await getConversations(user.id)
      setConversations(data)
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

  const handleNewMessage = async (messages: Message[]) => {
    if (!user?.id) {
      setShowAuthDialog(true)
      return
    }

    try {
      if (!currentConversation) {
        // Create new conversation
        const title = messages[0]?.content.slice(0, 30) + "..."
        const newConversation = await createConversation(user.id, title, messages)
        setCurrentConversation(newConversation)
        setConversations(prev => [newConversation, ...prev])
      } else {
        // Update existing conversation
        const updatedConversation = await updateConversation(currentConversation.id, messages)
        setCurrentConversation(updatedConversation)
        setConversations(prev => 
          prev.map(conv => conv.id === updatedConversation.id ? updatedConversation : conv)
        )
      }
    } catch (error: unknown) {
      console.error('Error saving conversation:', error)
      if (error instanceof Error && error.message === 'Not authenticated') {
        setShowAuthDialog(true)
      }
    }
  }

  const handleNewConversation = () => {
    setCurrentConversation(null)
  }

  const handleDeleteConversation = (id: string) => {
    setConversations(prev => prev.filter(conv => conv.id !== id))
    if (currentConversation?.id === id) {
      setCurrentConversation(null)
    }
  }

  return (
    <div className="flex flex-col min-h-[100dvh] bg-black">
      <div className="flex items-center justify-between h-14 px-4 bg-black border-b border-gray-800">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <span className="text-white">Christopher Celaya</span>
        </div>
        <Button 
          variant="ghost"
          size="icon"
          className="md:hidden text-white hover:bg-gray-800"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <aside className={cn(
          "fixed inset-y-14 left-0 z-30 w-72 -translate-x-full bg-black border-r border-gray-800 transition-transform duration-300 md:translate-x-0 md:relative md:inset-y-0",
          showSidebar && "translate-x-0"
        )}>
          <Sidebar 
            conversations={conversations}
            currentConversation={currentConversation}
            onSelectConversation={setCurrentConversation}
            onNewConversation={handleNewConversation}
            onDeleteConversation={handleDeleteConversation}
          />
        </aside>
        <main className="flex-1 overflow-hidden bg-black">
          <div className="h-full">
            <ChatInterface 
              key={currentConversation ? currentConversation.id : 'new'}
              conversation={currentConversation}
              onNewMessage={handleNewMessage}
            />
          </div>
        </main>
      </div>
      <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
    </div>
  )
}

export default withClientBoundary(ChatPage)
