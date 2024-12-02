'use client'

import { useState } from 'react'
import { MessageList } from './message-list'
import { ImageGeneration } from './image-generation'
import { RealtimeChat } from './realtime-chat'
import { Message, Conversation } from '@/lib/chat'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { ChevronLeft } from "lucide-react"

interface ChatInterfaceProps {
  conversation: Conversation | null
  onNewMessage: (messages: Message[]) => void
}

export function ChatInterface({ conversation, onNewMessage }: ChatInterfaceProps) {
  const [inputMessage, setInputMessage] = useState('')
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isImageMode, setIsImageMode] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isRealtimeMode, setIsRealtimeMode] = useState(false)

  const handleSubmit = async () => {
    if (!inputMessage.trim() || isLoading) return

    setIsLoading(true)
    const newMessage = { role: 'user' as const, content: inputMessage }
    const updatedMessages = [...(conversation?.messages || []), newMessage]
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: updatedMessages
        })
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      const data = await response.json()
      
      const newAssistantMessage = { role: 'assistant' as const, content: data.message }
      const finalMessages = [...updatedMessages, newAssistantMessage]
      onNewMessage(finalMessages)
      setInputMessage('')
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      })
      console.error('Chat error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }
  
  return (
    <div className="flex h-[100vh]">
      {/* Left Sidebar Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-2 z-10 shrink-0"
        onClick={() => {}}
      >
        <ChevronLeft />
      </Button>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Top Bar */}
        <div className="shrink-0 border-b border-border/40 p-3 flex justify-between items-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-medium">
              {isRealtimeMode ? 'Realtime Chat' : isImageMode ? 'Image Generation' : 'Chat'}
            </h2>
          </div>
          <div className="flex gap-1.5">
            <Button variant="ghost" size="sm">Clear</Button>
            <Button variant="ghost" size="sm">Code</Button>            
            <Button variant="ghost" size="sm">History</Button>
          </div>
        </div>

        {isRealtimeMode ? (
          <RealtimeChat />
        ) : isImageMode ? (
          <ImageGeneration />
        ) : (
          <div className="flex flex-col min-h-0 flex-1">
            <div className="flex-1 overflow-auto">
              <div className="max-w-3xl mx-auto p-4">
                <MessageList messages={conversation?.messages || []} isLoading={isLoading} />
              </div>
            </div>
            <div className="shrink-0 border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="max-w-3xl mx-auto p-4">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Enter user message..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className="min-h-[44px] max-h-[200px] resize-none"
                    />
                    <Button 
                      onClick={handleSubmit}
                      disabled={isLoading || !inputMessage.trim()}
                      className="px-8 shrink-0"
                    >
                      {isLoading ? 'Sending...' : 'Send'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
