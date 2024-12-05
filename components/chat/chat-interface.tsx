import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { cn } from "@/lib/utils"
import { MessageList } from './message-list'
import { withRetry } from '@/lib/api-utils'

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
  imageUrl?: string
}

interface ChatInterfaceProps {
  mode: 'chat' | 'image'
  model?: string
  onRateLimit?: () => void
  temperature?: number
  maxTokens?: number
  topP?: number
  frequencyPenalty?: number
  presencePenalty?: number
}

interface APIError {
  code?: string;
  message?: string;
}

export function ChatInterface({ mode, model = "gpt-4o", onRateLimit, temperature, maxTokens, topP, frequencyPenalty, presencePenalty }: ChatInterfaceProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || isLoading) return
    
    const userMessage = { role: 'user' as const, content: message.trim() }
    setMessages(prev => [...prev, userMessage])
    setMessage("")
    setIsLoading(true)

    try {
      if (mode === 'image') {
        // Handle image generation
        const response = await withRetry(async () => {
          const res = await fetch('/api/generate-image', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              prompt: userMessage.content,
            }),
          })
          
          if (!res.ok) {
            const error = await res.json() as APIError;
            throw error
          }
          
          return res
        })

        const data = await response.json()
        if (data.url) {
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: 'Here\'s your generated image:',
            imageUrl: data.url
          }])
        } else {
          throw new Error('No image URL returned')
        }
      } else {
        // Handle chat
        const response = await withRetry(async () => {
          const res = await fetch('/api/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              messages: [...messages, userMessage],
              model,
              temperature,
              maxTokens,
              topP,
              frequencyPenalty,
              presencePenalty,
            }),
          })

          if (!res.ok) {
            const error = await res.json() as APIError;
            if (error.code === 'rate_limit_exceeded') {
              onRateLimit?.()
            }
            throw error
          }

          return res
        }, {
          shouldRetry: (error: unknown) => {
            // Only retry on rate limit errors for non-image requests
            const apiError = error as APIError;
            return apiError?.code === 'rate_limit_exceeded' && mode === 'chat'
          }
        })

        const data = await response.json()
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.message
        }])
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: error instanceof Error 
          ? `Error: ${error.message}` 
          : 'Sorry, there was an error processing your request.'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = textarea.scrollHeight + 'px'
    }
  }

  useEffect(() => {
    adjustTextareaHeight()
  }, [message])

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-y-auto p-4">
        <MessageList messages={messages} />
      </div>

      <form onSubmit={handleSubmit} className="border-t border-border p-4 bg-card">
        <div className="flex space-x-2">
          <div className="flex-1 overflow-hidden">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={mode === 'image' ? "Describe the image you want to generate..." : "Type a message..."}
              className={cn(
                "w-full resize-none bg-background text-foreground",
                "min-h-[40px] max-h-[200px] p-2 border border-border rounded-md",
                "placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              )}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
            />
          </div>
          <div className="flex items-end space-x-2">
            <Button 
              type="submit" 
              size="icon"
              disabled={isLoading || !message.trim()}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
