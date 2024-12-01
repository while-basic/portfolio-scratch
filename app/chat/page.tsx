"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { MessageList, type Message } from "@/components/chat/message-list"
import { ChatInput } from "@/components/chat/chat-input"
import { useAuth } from "@/lib/auth-context"
import { AuthDialog } from "@/components/chat/auth-dialog"
import { Breadcrumb } from "@/components/breadcrumb"
import { LLMControls } from "@/components/chat/llm-controls"

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { user, loading } = useAuth()
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [llmSettings, setLLMSettings] = useState({
    temperature: 0.7,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
    maxTokens: 1000,
  })

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
        body: JSON.stringify({ 
          messages: updatedMessages,
          settings: llmSettings
        }),
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
            AI Chat Dashboard
          </h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-24 pb-8">
        <Breadcrumb />
      </div>

      {/* Dashboard Layout */}
      <main className="flex-1 overflow-y-auto pt-4 pb-24">
        <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Chat Section */}
          <div className="md:col-span-2 space-y-4">
            <div className="bg-background rounded-lg shadow-sm border min-h-[600px] flex flex-col">
              <div className="flex-1 overflow-y-auto p-4">
                <MessageList messages={messages} isLoading={isLoading} />
              </div>
              <div className="p-4 border-t">
                <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
              </div>
            </div>
          </div>

          {/* Controls Section */}
          <div className="space-y-4">
            <LLMControls
              settings={llmSettings}
              onSettingsChange={setLLMSettings}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
