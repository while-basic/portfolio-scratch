"use client"

import { useState, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

const MODELS = {
  'GPT 4o mini': ['gpt-3.5-turbo', 'gpt-3.5-turbo-16k', 'gpt-3.5-turbo-0613'],
  'GPT-4': ['gpt-4', 'gpt-4-0613', 'gpt-3.5-turbo', 'gpt-3.5-turbo-16k'],
} as const

type ModelKey = keyof typeof MODELS
type Message = { role: 'user' | 'assistant', content: string }

export function ChatInterface() {
  const [model, setModel] = useState<ModelKey>('GPT 4o mini')
  const [currentModelIndex, setCurrentModelIndex] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          model: MODELS[model][currentModelIndex],
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 429) {
          const nextModelIndex = currentModelIndex + 1
          if (nextModelIndex < MODELS[model].length) {
            setCurrentModelIndex(nextModelIndex)
            setError(`Rate limit reached for ${MODELS[model][currentModelIndex]}. Switching to ${MODELS[model][nextModelIndex]}...`)
            toast({
              title: "Rate Limit Reached",
              description: `Switching to ${MODELS[model][nextModelIndex]}...`,
              duration: 3000,
            })
          } else {
            setError("Rate limit reached for all available models. Please try again later.")
            toast({
              variant: "destructive",
              title: "Rate Limit Reached",
              description: "All models are currently rate limited. Please try again later.",
            })
          }
          return
        }
        throw new Error(data.message || 'An error occurred')
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.content,
      }
      setMessages(prev => [...prev, assistantMessage])
    } catch (err) {
      console.error('Error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
      toast({
        variant: "destructive",
        title: "Error",
        description: err instanceof Error ? err.message : 'An error occurred',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleModelChange = (value: ModelKey) => {
    setModel(value)
    setCurrentModelIndex(0)
    setError(null)
    toast({
      title: "Model Changed",
      description: `Switched to ${value}`,
    })
  }

  return (
    <div className="flex flex-col w-full gap-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="flex items-center gap-4 mb-4">
        <Select value={model} onValueChange={handleModelChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select a model" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(MODELS).map((modelName) => (
              <SelectItem key={modelName} value={modelName}>
                {modelName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {currentModelIndex > 0 && (
          <div className="text-sm text-muted-foreground">
            Using fallback model: {MODELS[model][currentModelIndex]}
          </div>
        )}
      </div>

      <Card className="flex-1">
        <ScrollArea className="h-[600px] p-4">
          <div className="space-y-4">
            {messages.map((message, i) => (
              <div
                key={i}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-lg px-4 py-2">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-foreground/20 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-foreground/20 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-foreground/20 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </Card>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          placeholder="Type a message..."
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          Send
        </Button>
      </form>
    </div>
  )
}
