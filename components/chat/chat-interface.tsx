'use client'

import { useState } from 'react'
import { MessageList } from './message-list'
import { ImageGeneration } from './image-generation'
import { RealtimeChat } from './realtime-chat'
import { Message, Conversation, TokenUsage } from '@/lib/chat'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { TokenDisplay } from './token-display'
import { ModelDisplay } from './model-display'
import { SystemPrompt } from './system-prompt'
import { ChevronLeft, ChevronRight, Settings2, Sliders, Plus } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ChatInterfaceProps {
  conversation: Conversation | null
  onNewMessage: (messages: Message[]) => void
}

export function ChatInterface({ conversation, onNewMessage }: ChatInterfaceProps) {
  const [inputMessage, setInputMessage] = useState('')
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [tokenUsage, setTokenUsage] = useState<TokenUsage | null>(null)
  const [showLeftSidebar, setShowLeftSidebar] = useState(true)
  const [temperature, setTemperature] = useState(1.0)
  const [maxTokens, setMaxTokens] = useState(2048)
  const [topP, setTopP] = useState(1.0)
  const [frequencyPenalty, setFrequencyPenalty] = useState(0)
  const [presencePenalty, setPresencePenalty] = useState(0)
  const [isImageMode, setIsImageMode] = useState(false)
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
          messages: updatedMessages,
          temperature,
          maxTokens,
          topP,
          frequencyPenalty,
          presencePenalty
        })
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      const data = await response.json()
      
      // Update token usage from response
      if (data.usage) {
        setTokenUsage(data.usage)
      }

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
        onClick={() => setShowLeftSidebar(!showLeftSidebar)}
      >
        {showLeftSidebar ? <ChevronLeft /> : <ChevronRight />}
      </Button>

      {/* Left Sidebar */}
      <div className={`${showLeftSidebar ? 'w-64' : 'w-0'} bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-r border-border/40 transition-all duration-300 overflow-hidden`}>
        <div className="p-4">
          <div className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => {
                onNewMessage([])
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Chat
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => {
                setIsImageMode(false)
                setIsRealtimeMode(false)
              }}
            >
              <span className="mr-2">💬</span>
              Chat
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => {
                setIsImageMode(true)
                setIsRealtimeMode(false)
              }}
            >
              <span className="mr-2">⚡</span>
              Image Generation
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => {
                setIsImageMode(false)
                setIsRealtimeMode(true)
              }}
            >
              <span className="mr-2">🎤</span>
              Realtime
            </Button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Top Bar */}
        <div className="shrink-0 border-b border-border/40 p-3 flex justify-between items-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-medium">
              {isRealtimeMode ? 'Realtime Chat' : isImageMode ? 'Image Generation' : 'Chat'}
            </h2>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <ModelDisplay model="GPT-3.5" />
              <TokenDisplay usage={tokenUsage} />
            </div>
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
                  {tokenUsage && (
                    <div className="flex justify-end">
                      <TokenDisplay usage={tokenUsage} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
