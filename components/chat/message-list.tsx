import { motion } from "framer-motion"
import { Brain, UserCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export type Message = {
  role: "user" | "assistant"
  content: string
  avatar?: string  // Optional custom avatar URL
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Avatar className={cn(
                  "h-12 w-12 border-2 transition-all duration-200 hover:scale-110",
                  message.role === "assistant" 
                    ? "bg-violet-600 text-white border-violet-400" 
                    : "bg-emerald-600 text-white border-emerald-400"
                )}>
                  {message.avatar ? (
                    <img 
                      src={message.avatar} 
                      alt={`${message.role} avatar`}
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <AvatarFallback>
                      {message.role === "assistant" ? (
                        <Brain className="h-6 w-6" />
                      ) : (
                        <UserCircle2 className="h-6 w-6" />
                      )}
                    </AvatarFallback>
                  )}
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p>{message.role === "assistant" ? "AI Assistant" : "You"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div 
            className={cn(
              "flex-1 overflow-hidden rounded-2xl px-4 py-2 transition-colors",
              "shadow-sm hover:shadow-md transition-shadow duration-200",
              "break-words whitespace-pre-wrap max-w-full",
              message.role === "assistant" 
                ? "bg-zinc-800 text-zinc-100" 
                : "bg-zinc-700 text-zinc-100"
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
          <Avatar className="h-12 w-12 border-2 bg-violet-600 text-white border-violet-400">
            <AvatarFallback>
              <Brain className="h-6 w-6" />
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
