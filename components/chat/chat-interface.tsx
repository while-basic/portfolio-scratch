import { useState, useEffect } from 'react'
import { Message, MessageList } from './message-list'
import { Conversation } from '@/lib/chat'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, User, Send } from "lucide-react"
import { TokenDisplay } from './token-display'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { cn } from '@/lib/utils'

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
    setMessages(conversation?.messages || [])
    setInputValue('')
    setIsLoading(false)
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
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      <ScrollArea className="flex-1 p-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-3xl font-bold text-white mb-8">Try these prompts ✨</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl w-full">
              {[
                "Generate a tasty vegan lasagna recipe for 3 people.",
                "Generate a list of 5 questions for a job interview for a software engineer.",
                "Who won the 2022 FIFA World Cup?"
              ].map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInputValue(prompt);
                    handleSubmit(new Event('submit') as any);
                  }}
                  className="p-4 rounded-lg border border-gray-800 bg-black hover:bg-gray-900 transition-colors text-white text-left"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div key={index} className={cn(
                "flex gap-4",
                message.role === "assistant" ? "flex-row" : "flex-row-reverse"
              )}>
                <MessageList messages={[message]} />
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-4 animate-pulse">
                <div className="h-8 w-8 rounded-full bg-violet-600" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-800 rounded w-3/4" />
                  <div className="h-4 bg-gray-800 rounded w-1/2" />
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      <div className="border-t border-gray-800 p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask AI..."
            className="flex-1 bg-black border-gray-800 text-white resize-none"
            rows={1}
          />
          <Button 
            type="submit" 
            disabled={isLoading || !inputValue.trim()}
            className="bg-white text-black hover:bg-gray-200"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
        {tokenUsage && <TokenDisplay usage={tokenUsage} />}
      </div>
    </div>
  )
}
