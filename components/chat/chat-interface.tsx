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
          model: 'gpt-4'
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
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full px-4">
          <div className="max-w-3xl mx-auto py-8 space-y-8">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-4 rounded-lg p-4",
                  message.role === "assistant" ? "bg-gray-900" : "bg-transparent"
                )}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 select-none border border-gray-800">
                  {message.role === "assistant" ? (
                    <MessageSquare className="h-5 w-5 text-blue-400" />
                  ) : (
                    <User className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="text-sm font-medium text-gray-400">
                    {message.role === "assistant" ? "AI Assistant" : "You"}
                  </div>
                  <div className="prose prose-invert max-w-none">
                    <ReactMarkdown
                      components={{
                        code({ node, inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || '')
                          return !inline && match ? (
                            <SyntaxHighlighter
                              style={oneDark}
                              language={match[1]}
                              PreTag="div"
                              {...props}
                            >
                              {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          )
                        }
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500"></div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      <div className="border-t border-gray-800 bg-black p-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 min-h-[60px] max-h-36 bg-gray-900 border-gray-800 text-white resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
            />
            <Button 
              type="submit" 
              size="icon" 
              disabled={isLoading || !inputValue.trim()}
              className="h-[60px] w-[60px] bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
          {tokenUsage && (
            <div className="mt-2 flex justify-end">
              <TokenDisplay usage={tokenUsage} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
