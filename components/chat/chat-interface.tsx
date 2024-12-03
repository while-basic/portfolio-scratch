'use client'

import { useState } from 'react'
import { MessageList } from './message-list'
import { ImageGeneration } from './image-generation'
import { Message } from '@/lib/chat'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { CollapsibleSidebar } from './collapsible-sidebar'

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [currentMode, setCurrentMode] = useState<'chat' | 'image'>('chat')
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!inputMessage.trim() || isLoading) return

    const newMessage: Message = {
      role: 'user',
      content: inputMessage
    }

    setMessages(prev => [...prev, newMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      })

      const data = await response.json()
      if (data.message) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.message
        }
        setMessages(prev => [...prev, assistantMessage])
      }
    } catch (error) {
      console.error('Error sending message:', error)
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageGeneration = async (prompt: string) => {
    if (!prompt.trim() || isLoading) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      const data = await response.json()
      if (data.url) {
        setGeneratedImageUrl(data.url)
        toast({
          title: "Success",
          description: "Image generated successfully!",
        })
      }
    } catch (error) {
      console.error('Error generating image:', error)
      toast({
        title: "Error",
        description: "Failed to generate image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (currentMode === 'chat') {
        handleSubmit()
      } else {
        handleImageGeneration(inputMessage)
      }
    }
  }

  return (
    <div className="flex h-screen">
      <CollapsibleSidebar 
        currentMode={currentMode}
        onModeChange={setCurrentMode}
      />
      
      <div className="flex-1 flex flex-col">
        {currentMode === 'chat' ? (
          <>
            <div className="flex-1 overflow-y-auto p-4">
              <MessageList messages={messages} isLoading={isLoading} />
            </div>
            <div className="border-t p-4 bg-background">
              <div className="flex space-x-2">
                <Textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                  onKeyDown={handleKeyPress}
                />
                <Button 
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send'}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col">
            <ImageGeneration
              onGenerate={handleImageGeneration}
              isLoading={isLoading}
              generatedImageUrl={generatedImageUrl}
            />
            <div className="border-t p-4 bg-background">
              <div className="flex space-x-2">
                <Textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Describe the image you want to generate..."
                  className="flex-1"
                  onKeyDown={handleKeyPress}
                />
                <Button 
                  onClick={() => handleImageGeneration(inputMessage)}
                  disabled={isLoading}
                >
                  {isLoading ? 'Generating...' : 'Generate'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
