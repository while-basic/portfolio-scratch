import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Mic, Send } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatInterfaceProps {
  mode: 'chat' | 'image'
}

export function ChatInterface({ mode }: ChatInterfaceProps) {
  const [message, setMessage] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    
    // Handle message submission here
    setMessage("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [message])

  return (
    <div className="flex flex-col h-full">
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="h-full flex items-center justify-center text-white/50">
          {mode === 'chat' ? (
            <p>Start a conversation...</p>
          ) : (
            <p>Describe the image you want to generate...</p>
          )}
        </div>
      </div>
      
      {/* Input Area */}
      <div className="border-t border-white/10 bg-black">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-4">
          <div className="flex items-center gap-2 bg-white/5 rounded-lg pl-4 pr-2 focus-within:bg-white/10 transition-colors">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter user message..."
              className="flex-1 bg-transparent border-0 focus:ring-0 resize-none py-3 text-white placeholder-white/50 text-sm min-h-[20px] max-h-48"
              rows={1}
            />
            <div className="flex gap-2 self-end py-2">
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="text-white/50 hover:text-white hover:bg-white/5 h-8 w-8"
              >
                <Mic className="h-4 w-4" />
              </Button>
              <Button 
                type="submit" 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "text-white/50 hover:text-white hover:bg-white/5 h-8 w-8",
                  message.trim() && "text-white"
                )}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
