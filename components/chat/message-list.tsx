import { motion } from "framer-motion"
import { Bot, User } from "lucide-react"

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
    <div className="flex flex-col gap-6">
      {messages.map((message, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`flex gap-3 ${
            message.role === "assistant" ? "flex-row" : "flex-row-reverse"
          }`}
        >
          <div
            className={`flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow ${
              message.role === "assistant"
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            }`}
          >
            {message.role === "assistant" ? (
              <Bot className="h-5 w-5" />
            ) : (
              <User className="h-5 w-5" />
            )}
          </div>
          <div className="flex-1 space-y-2">
            <div className="prose prose-neutral dark:prose-invert">
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
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border bg-primary text-primary-foreground shadow">
            <Bot className="h-5 w-5" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="h-4 w-12 animate-pulse rounded bg-muted"></div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
