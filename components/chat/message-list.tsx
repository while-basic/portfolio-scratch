import { motion } from "framer-motion"
import { Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export type Message = {
  role: "user" | "assistant"
  content: string
}

interface MessageListProps {
  messages: Message[]
  isLoading?: boolean
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  return (
    <div className="flex flex-col gap-4">
      {messages.map((message, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "group flex gap-3 relative",
            message.role === "assistant" ? "flex-row" : "flex-row-reverse"
          )}
        >
          <Avatar className={cn(
            "h-8 w-8 border shadow-sm",
            message.role === "assistant" 
              ? "bg-primary text-primary-foreground" 
              : "bg-muted"
          )}>
            <AvatarFallback>
              {message.role === "assistant" ? (
                <Bot className="h-4 w-4" />
              ) : (
                <User className="h-4 w-4" />
              )}
            </AvatarFallback>
          </Avatar>
          <div 
            style={{
              backgroundColor: message.role === "assistant" ? "#1a1a1a" : "#ffffff",
              color: message.role === "assistant" ? "#ffffff" : "#000000"
            }}
            className={cn(
              "flex-1 overflow-hidden rounded-2xl px-4 py-2 transition-colors",
              "shadow-sm hover:shadow-md transition-shadow duration-200",
              "break-words whitespace-pre-wrap max-w-full"
            )}
          >
            <div className="prose prose-sm dark:prose-invert max-w-none">
              {message.content}
            </div>
          </div>
        </motion.div>
      ))}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-3"
        >
          <Avatar className="h-8 w-8 border bg-primary text-primary-foreground shadow-sm">
            <AvatarFallback>
              <Bot className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2 rounded-2xl bg-muted p-4">
            <div className="flex space-x-2">
              <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:-0.3s]"></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:-0.15s]"></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40"></div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
