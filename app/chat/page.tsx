"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Bot } from "lucide-react"
import Link from "next/link"
import { MessageList, type Message } from "@/components/chat/message-list"
import { ChatInput } from "@/components/chat/chat-input"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/lib/auth-context"
import { AuthDialog } from "@/components/chat/auth-dialog"
import { Breadcrumb } from "@/components/breadcrumb"

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { user, loading } = useAuth()
  const [showAuthDialog, setShowAuthDialog] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      setShowAuthDialog(true)
    }
  }, [user, loading])

  const handleSendMessage = async (content: string) => {
    if (!user) {
      setShowAuthDialog(true)
      return
    }
    const userMessage: Message = { role: "user", content }
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      const updatedMessages = [...messages, userMessage]
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: updatedMessages }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()
      
      if (data) {
        const assistantMessage: Message = {
          role: "assistant",
          content: data.content || "I apologize, but I couldn't generate a response."
        }
        setMessages(prev => [...prev, assistantMessage])
      }
    } catch (error) {
      console.error("Error generating response:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Auth Dialog */}
      <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center h-16 px-4 max-w-6xl mx-auto">
          <Link href="/" className="mr-4">
            <Button variant="ghost" size="icon" className="hover:bg-muted">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Chat with AI Assistant
          </h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-24 pb-8">
        <Breadcrumb />
      </div>

      {/* Chat Container */}
      <main className="flex-1 overflow-y-auto pt-16 pb-24">
        <div className="max-w-3xl mx-auto p-4 space-y-4">
          <AnimatePresence mode="popLayout">
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-20 space-y-6"
              >
                <div className="flex justify-center">
                  <Bot className="h-12 w-12 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold text-foreground/80">
                    Welcome to the Chat!
                  </h2>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    Start a conversation with the AI assistant. Ask questions, get help, or just chat!
                  </p>
                </div>
              </motion.div>
            ) : (
              <MessageList messages={messages} />
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Input Container */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background to-transparent py-4">
        <div className="max-w-3xl mx-auto px-4">
          <div className="relative">
            <ChatInput 
              onSend={handleSendMessage} 
              disabled={isLoading} 
            />
            {isLoading && (
              <div className="absolute right-14 top-1/2 -translate-y-1/2">
                <div className="flex gap-1">
                  <motion.div
                    className="h-2 w-2 rounded-full bg-foreground/20"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div
                    className="h-2 w-2 rounded-full bg-foreground/20"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div
                    className="h-2 w-2 rounded-full bg-foreground/20"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
