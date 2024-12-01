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
import { cn } from "@/lib/utils"

export default function ChatPage() {
  const { user, loading } = useAuth()
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null)

  const loadConversations = async () => {
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
  }

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
    console.log('handleNewConversation called');
    setCurrentConversation(null);
    console.log('currentConversation set to null');
    setConversations(prev => {
      console.log('updating conversations');
      return [...prev.filter(conv => conv.id !== undefined)];
    });
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
          className="md:hidden"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className={cn(
          "md:w-64 border-r bg-background",
          showSidebar ? "w-64" : "hidden",
          "md:block"
        )}>
          <Sidebar 
            conversations={conversations}
            currentConversation={currentConversation}
            onSelectConversation={setCurrentConversation}
            onNewConversation={handleNewConversation}
          />
        </div>
        <main className="flex-1 overflow-hidden">
          <div className="container max-w-4xl mx-auto h-full p-4">
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
