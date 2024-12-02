'use client'

import { useState } from 'react'
import { MessageList } from './message-list'
import { ImageGeneration } from './image-generation'
import RealtimeChat from './realtime-chat'
import { Message, Conversation, TokenUsage } from '@/lib/chat'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TokenDisplay } from './token-display'
import { ModelDisplay } from './model-display'
import { SystemPrompt } from './system-prompt'
import { ChevronLeft, ChevronRight, Settings2, Sliders } from "lucide-react"
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
  const [showRightSidebar, setShowRightSidebar] = useState(true)
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
          max_tokens: maxTokens,
          top_p: topP,
          frequency_penalty: frequencyPenalty,
          presence_penalty: presencePenalty
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        if (response.status === 429) {
          const retryAfter = parseInt(response.headers.get('Retry-After') || '3600')
          const minutes = Math.ceil(retryAfter / 60)
          throw new Error(`Rate limit exceeded. Please try again in ${minutes} minutes.`)
        }
        throw new Error(errorData.error || 'Failed to send message')
      }
      
      const data = await response.json()
      const assistantMessage = { role: 'assistant' as const, content: data.content }
      onNewMessage([...updatedMessages, assistantMessage])
      setInputMessage('')
      setTokenUsage(data.usage)
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to send message. Please try again.",
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
    <div className="flex h-screen">
      {/* Left Sidebar Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-2 z-10"
        onClick={() => setShowLeftSidebar(!showLeftSidebar)}
      >
        {showLeftSidebar ? <ChevronLeft /> : <ChevronRight />}
      </Button>

      {/* Left Sidebar */}
      <div className={`${showLeftSidebar ? 'w-64' : 'w-0'} bg-background border-r transition-all duration-300 overflow-hidden`}>
        <div className="p-4">
          <div className="space-y-2">
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
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="border-b p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            {isRealtimeMode ? 'Realtime Chat' : isImageMode ? 'Image Generation' : 'Chat'}
          </h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Clear</Button>
            <Button variant="outline" size="sm">Code</Button>            
            <Button variant="outline" size="sm">History</Button>
          </div>
        </div>

        {isRealtimeMode ? (
          <RealtimeChat />
        ) : isImageMode ? (
          <ImageGeneration />
        ) : (
          <>
            <ScrollArea className="flex-1 p-4">
              <MessageList messages={conversation?.messages || []} isLoading={isLoading} />
            </ScrollArea>
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Enter user message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="min-h-[44px] max-h-[200px]"
                />
                <Button 
                  onClick={handleSubmit}
                  disabled={isLoading || !inputMessage.trim()}
                  className="px-8"
                >
                  {isLoading ? 'Sending...' : 'Send'}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Right Configuration Panel Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 z-10"
        onClick={() => setShowRightSidebar(!showRightSidebar)}
      >
        {showRightSidebar ? <ChevronRight /> : <ChevronLeft />}
      </Button>

      {/* Right Configuration Panel */}
      <div className={`${showRightSidebar ? 'w-80' : 'w-0'} border-l bg-background transition-all duration-300 overflow-hidden`}>
        <ScrollArea className="h-full">
          <div className="p-4 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Settings2 className="h-4 w-4" />
                  Model Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ModelDisplay model="GPT-3.5" />
                <Separator />
                <SystemPrompt />
                <Separator />
                <TokenDisplay usage={tokenUsage} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Sliders className="h-4 w-4" />
                  Generation Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium">Temperature</label>
                      <span className="text-sm text-muted-foreground">{temperature}</span>
                    </div>
                    <Slider
                      value={[temperature]}
                      onValueChange={([value]) => setTemperature(value)}
                      min={0}
                      max={2}
                      step={0.1}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium">Max tokens</label>
                      <span className="text-sm text-muted-foreground">{maxTokens}</span>
                    </div>
                    <Slider
                      value={[maxTokens]}
                      onValueChange={([value]) => setMaxTokens(value)}
                      min={1}
                      max={4096}
                      step={1}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium">Top P</label>
                      <span className="text-sm text-muted-foreground">{topP}</span>
                    </div>
                    <Slider
                      value={[topP]}
                      onValueChange={([value]) => setTopP(value)}
                      min={0}
                      max={1}
                      step={0.1}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium">Frequency penalty</label>
                      <span className="text-sm text-muted-foreground">{frequencyPenalty}</span>
                    </div>
                    <Slider
                      value={[frequencyPenalty]}
                      onValueChange={([value]) => setFrequencyPenalty(value)}
                      min={0}
                      max={2}
                      step={0.1}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium">Presence penalty</label>
                      <span className="text-sm text-muted-foreground">{presencePenalty}</span>
                    </div>
                    <Slider
                      value={[presencePenalty]}
                      onValueChange={([value]) => setPresencePenalty(value)}
                      min={0}
                      max={2}
                      step={0.1}
                    />
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  Save as preset
                </Button>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
