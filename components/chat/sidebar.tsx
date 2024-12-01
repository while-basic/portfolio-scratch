import React, { useState } from 'react'
import { Conversation, deleteConversation } from '@/lib/chat'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Plus, MessageSquare, Trash2 } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"

interface SidebarProps {
  conversations: Conversation[]
  currentConversation: Conversation | null
  onSelectConversation: (conversation: Conversation) => void
  onNewConversation: () => void
  onDeleteConversation?: (conversationId: string) => void
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  conversations, 
  currentConversation,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation
}) => {
  const [conversationToDelete, setConversationToDelete] = useState<string | null>(null)
  const { toast } = useToast()

  const handleDeleteConversation = async (id: string) => {
    try {
      await deleteConversation(id)
      onDeleteConversation?.(id)
      toast({
        description: "Conversation deleted successfully",
      })
    } catch (error) {
      console.error('Error deleting conversation:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete conversation. Please try again.",
      })
    }
    setConversationToDelete(null)
  }

  return (
    <aside className="w-64 h-full border-r bg-background">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <Button 
            onClick={() => {
              console.log('New Chat button clicked');
              onNewConversation();
            }}
            className="w-full justify-start gap-2"
          >
            <Plus className="h-4 w-4" />
            New Chat
          </Button>
        </div>
        <ScrollArea className="flex-1 p-4">
          {conversations && conversations.length > 0 ? (
            <div className="space-y-2">
              {conversations.map(conversation => (
                <div
                  key={conversation.id}
                  className={cn(
                    "group relative",
                    currentConversation?.id === conversation.id && "bg-accent"
                  )}
                >
                  <button
                    onClick={() => onSelectConversation(conversation)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg transition-colors",
                      "hover:bg-accent group flex flex-col gap-1",
                      currentConversation?.id === conversation.id && "bg-accent"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium truncate">
                        {conversation.title}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(conversation.updated_at).toLocaleDateString()}
                    </span>
                  </button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => setConversationToDelete(conversation.id)}
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No conversations yet
            </p>
          )}
        </ScrollArea>
      </div>

      <AlertDialog open={!!conversationToDelete} onOpenChange={(open) => !open && setConversationToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Conversation</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the conversation.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => conversationToDelete && handleDeleteConversation(conversationToDelete)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </aside>
  )
}
