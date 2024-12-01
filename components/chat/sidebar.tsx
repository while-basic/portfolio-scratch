import React from 'react'
import { Conversation } from '@/lib/chat'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Plus, MessageSquare } from 'lucide-react'

interface SidebarProps {
  conversations: Conversation[]
  currentConversation: Conversation | null
  onSelectConversation: (conversation: Conversation) => void
  onNewConversation: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  conversations, 
  currentConversation,
  onSelectConversation,
  onNewConversation
}) => {
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
                <button
                  key={conversation.id}
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
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No conversations yet
            </p>
          )}
        </ScrollArea>
      </div>
    </aside>
  )
}
