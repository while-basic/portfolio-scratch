import { motion } from "framer-motion"
import { Brain, UserCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Image from "next/image"
import { MarkdownMessage } from "./markdown-message"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ZoomInIcon, DownloadIcon } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

export type Message = {
  role: "system" | "user" | "assistant"
  content: string
  avatar?: string  // Optional custom avatar URL
  imageUrl?: string
}

interface MessageListProps {
  messages: Message[]
  isLoading?: boolean
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleDownload = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'generated-image.png'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading image:', error)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {messages.map((message, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "group flex gap-2 relative",
            message.role === "assistant" ? "flex-row" : message.role === "system" ? "flex-row" : "flex-row-reverse"
          )}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Avatar className={cn(
                  "h-8 w-8 border transition-all duration-200 hover:scale-105",
                  message.role === "assistant" 
                    ? "bg-violet-600/90 text-white border-violet-400/20" 
                    : message.role === "system" 
                    ? "bg-zinc-600/90 text-white border-zinc-400/20"
                    : "bg-emerald-600/90 text-white border-emerald-400/20"
                )}>
                  {message.avatar ? (
                    <Image 
                      src={message.avatar} 
                      alt={`${message.role} avatar`}
                      width={32}
                      height={32}
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <AvatarFallback>
                      {message.role === "assistant" ? (
                        <Brain className="h-4 w-4" />
                      ) : message.role === "system" ? (
                        <UserCircle2 className="h-4 w-4" />
                      ) : (
                        <UserCircle2 className="h-4 w-4" />
                      )}
                    </AvatarFallback>
                  )}
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p>{message.role === "assistant" ? "AI Assistant" : message.role === "system" ? "System" : "You"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div 
            className={cn(
              "flex-1 overflow-hidden rounded-lg px-3 py-2 transition-colors",
              "shadow-sm hover:shadow-md transition-shadow duration-200",
              "break-words whitespace-pre-wrap max-w-[85%]",
              message.role === "assistant" 
                ? "bg-zinc-800/90 text-zinc-100 border border-zinc-700/50" 
                : message.role === "system" 
                ? "bg-zinc-700/90 text-zinc-100 border border-zinc-600/50"
                : "bg-violet-600/90 text-white border border-violet-500/50"
            )}
          >
            <div className="prose prose-invert max-w-none">
              <MarkdownMessage content={message.content} />
            </div>
            {message.imageUrl && (
              <Card className="mt-2 p-2 group relative cursor-pointer">
                <div className="relative w-full aspect-square">
                  <Image
                    src={message.imageUrl}
                    alt="Generated image"
                    fill
                    className="object-contain rounded-md"
                    onClick={() => setSelectedImage(message.imageUrl || null)}
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (message.imageUrl) {
                          setSelectedImage(message.imageUrl)
                        }
                      }}
                    >
                      <ZoomInIcon className="h-6 w-6" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (message.imageUrl) {
                          handleDownload(message.imageUrl)
                        }
                      }}
                    >
                      <DownloadIcon className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </motion.div>
      ))}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-3"
        >
          <Avatar className="h-8 w-8 border bg-violet-600/90 text-white border-violet-400/20">
            <AvatarFallback>
              <Brain className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2 rounded-lg bg-muted p-3">
            <div className="flex space-x-2">
              <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:-0.3s]"></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:-0.15s]"></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40"></div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Image Preview Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          {selectedImage && (
            <div className="relative w-full aspect-square">
              <Image
                src={selectedImage}
                alt="Generated image preview"
                fill
                className="object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
