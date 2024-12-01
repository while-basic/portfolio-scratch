"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Menu } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { AuthDialog } from "@/components/chat/auth-dialog"
import { Breadcrumb } from "@/components/breadcrumb"
import { ChatInterface } from "@/components/chat/chat-interface"
import { Sidebar } from "@/components/chat/sidebar"
import { useEffect, useState } from "react"
import { getConversations, createConversation, updateConversation, Conversation } from "@/lib/chat"
import { Message } from "@/components/chat/message-list"

export default function ChatPage() {
  const { user, loading } = useAuth()
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null)

  useEffect(() => {
    if (!loading && !user) {
      setShowAuthDialog(true)
    }
    if (user) {
      loadConversations()
    }
  }, [user, loading])

  const loadConversations = async () => {
    try {
      if (!user?.id) return
      const data = await getConversations(user.id)
      setConversations(data)
    } catch (error) {
      console.error('Error loading conversations:', error)
    }
  }

  const handleNewMessage = async (messages: Message[]) => {
    if (!user?.id) return

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
    } catch (error) {
      console.error('Error saving conversation:', error)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center justify-between px-4 py-4 border-b">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <Breadcrumb items={[{ label: "Chat", href: "/chat" }]} />
        </div>
        <Button 
          variant="outline"
          size="icon"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-1 overflow-hidden">
        {showSidebar && (
          <div className="flex-shrink-0">
            <Sidebar 
              conversations={conversations}
              currentConversation={currentConversation}
              onSelectConversation={setCurrentConversation}
            />
          </div>
        )}
        <main className="flex-1 overflow-auto">
          <div className="container h-full py-4">
            <ChatInterface 
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
