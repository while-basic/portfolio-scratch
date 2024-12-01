import { useState, useEffect } from 'react'
import { Message, MessageList } from './message-list'
import { Conversation } from '@/lib/chat'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare } from "lucide-react"
import { TokenDisplay } from './token-display'

interface ChatInterfaceProps {
  conversation: Conversation | null
  onNewMessage: (messages: Message[]) => void
}

export function ChatInterface({ conversation, onNewMessage }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [tokenUsage, setTokenUsage] = useState<{
    total_tokens: number
    prompt_tokens: number
    completion_tokens: number
    estimated_cost: number
  } | null>(null)
  const { toast } = useToast()

  // Reset state when conversation changes
  useEffect(() => {
    console.log('ChatInterface: conversation changed', { conversation });
    setMessages(conversation?.messages || [])
    setInputValue('')
    setIsLoading(false)
    console.log('ChatInterface: states reset');
  }, [conversation])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    const newMessage: Message = {
      role: 'user',
      content: inputValue.trim()
    }

    // Update UI immediately with user message
    const updatedMessages = [...messages, newMessage]
    setMessages(updatedMessages)
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedMessages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          model: 'gpt-4o'
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Failed to get response')
      }

      const data = await response.json()

      // Add AI response to messages
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.content
      }

      // Update token usage
      setTokenUsage(data.usage)

      const newMessages = [...updatedMessages, assistantMessage]
      setMessages(newMessages)
      onNewMessage(newMessages)
    } catch (error) {
      console.error('Error processing message:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get response from AI. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="flex flex-col h-[calc(100vh-8rem)] border rounded-xl shadow-lg">
      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="flex flex-col gap-4 p-4">
            {!conversation && messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[calc(100vh-16rem)] text-center space-y-4">
                <MessageSquare className="h-12 w-12 text-muted-foreground" />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Start a New Chat</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Begin your conversation by typing a message below.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex-1 space-y-4">
                <MessageList messages={messages} isLoading={isLoading} />
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 p-4 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <TokenDisplay usage={tokenUsage} />
        <form onSubmit={handleSubmit} className="w-full space-y-2">
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={!conversation ? "Type your message to start a new chat..." : "Type your message..."}
            className="min-h-[80px] max-h-[200px] resize-none focus-visible:ring-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(e)
              }
            }}
          />
          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={isLoading || !inputValue.trim()}
              className="w-24"
            >
              {isLoading ? "Sending..." : "Send"}
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  )
}
