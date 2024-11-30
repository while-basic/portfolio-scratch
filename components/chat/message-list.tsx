import { motion } from "framer-motion"
import { Bot, User } from "lucide-react"

export type Message = {
  role: "user" | "assistant"
  content: string
}

interface MessageListProps {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex flex-col gap-6">
      {messages.map((message, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`flex gap-3 ${
            message.role === "user" ? "flex-row-reverse" : ""
          }`}
        >
          <div className={`flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border ${
            message.role === "user" 
              ? "bg-primary text-primary-foreground" 
              : "bg-muted"
          }`}>
            {message.role === "user" ? (
              <User className="h-4 w-4" />
            ) : (
              <Bot className="h-4 w-4" />
            )}
          </div>
          <div className={`flex flex-col gap-2 ${
            message.role === "user" ? "items-end" : "items-start"
          }`}>
            <div className={`rounded-lg px-4 py-2 max-w-[85%] shadow-sm ${
              message.role === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            }`}>
              <p className="text-sm whitespace-pre-wrap break-words">
                {message.content}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
