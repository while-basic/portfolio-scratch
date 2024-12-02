'use client'

import { useState, useEffect } from 'react'
import { MessageList } from './message-list'
import { Message, Conversation, TokenUsage } from '@/lib/chat'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send } from "lucide-react"
import { TokenDisplay } from './token-display'
import { ModelDisplay } from './model-display'
import { SystemPrompt } from './system-prompt'
import { cn } from '@/lib/utils'

interface ChatInterfaceProps {
  conversation: Conversation | null
  onNewMessage: (messages: Message[]) => void
}

export function ChatInterface({ conversation, onNewMessage }: ChatInterfaceProps) {
  const [inputMessage, setInputMessage] = useState('')
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [tokenUsage, setTokenUsage] = useState<TokenUsage | null>(null)

  const handleSubmit = async () => {
    if (!inputMessage.trim() || isLoading) return

    setIsLoading(true)
    const newMessage = { role: 'user' as const, content: inputMessage }
    const updatedMessages = [...(conversation?.messages || []), newMessage]
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages })
      })

      if (!response.ok) throw new Error('Failed to send message')
      
      const data = await response.json()
      const assistantMessage = { role: 'assistant' as const, content: data.content }
      onNewMessage([...updatedMessages, assistantMessage])
      setInputMessage('')
      setTokenUsage(data.usage)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      })
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
      {/* Left Sidebar */}
      <div className="w-64 bg-background border-r">
        <div className="p-4">
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              <span className="mr-2">💬</span>
              Chat
            </Button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="border-b p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Chat</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Clear</Button>
            <Button variant="outline" size="sm">Code</Button>            
            <Button variant="outline" size="sm">History</Button>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <MessageList messages={conversation?.messages || []} isLoading={isLoading} />
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Button variant="outline" size="icon">User</Button>
            <Textarea
              placeholder="Enter user message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              className="min-h-[44px] max-h-[200px]"
            />
            <Button variant="outline" size="icon">🎤</Button>
            <Button 
              onClick={handleSubmit}
              disabled={isLoading || !inputMessage.trim()}
            >
              {isLoading ? 'Sending...' : 'Send'}
            </Button>
          </div>
        </div>
      </div>

      {/* Right Configuration Panel */}
      <div className="w-80 border-l bg-background">
        <div className="p-4 space-y-6">
          <ModelDisplay model="GPT-3.5" />
          <SystemPrompt />
          <TokenDisplay usage={tokenUsage} />
          
          <div>
            <h3 className="mb-2">Temperature</h3>
            <input type="range" className="w-full" defaultValue={1.0} min={0} max={2.0} step={0.1} />
          </div>

          <div>
            <h3 className="mb-2">Max tokens</h3>
            <input type="range" className="w-full" defaultValue={2048} min={1} max={4096} step={1} />
          </div>

          <div>
            <h3 className="mb-2">Top P</h3>
            <input type="range" className="w-full" defaultValue={1.0} min={0} max={1.0} step={0.1} />
          </div>

          <div>
            <h3 className="mb-2">Frequency penalty</h3>
            <input type="range" className="w-full" defaultValue={0} min={0} max={2.0} step={0.1} />
          </div>

          <div>
            <h3 className="mb-2">Presence penalty</h3>
            <input type="range" className="w-full" defaultValue={0} min={0} max={2.0} step={0.1} />
          </div>

          <Button className="w-full" variant="outline">
            Save as preset
          </Button>
        </div>
      </div>
    </div>
  )
}
