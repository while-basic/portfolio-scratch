import React from 'react'
import { Conversation } from '@/lib/chat'
import { cn } from '@/lib/utils'

interface SidebarProps {
  conversations: Conversation[]
  currentConversation: Conversation | null
  onSelectConversation: (conversation: Conversation) => void
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  conversations, 
  currentConversation,
  onSelectConversation 
}) => {
  return (
    <aside className="w-64 h-full bg-gray-800 text-white p-4 border-r border-gray-700">
      <h2 className="text-xl font-bold mb-4">Conversations</h2>
      {conversations && conversations.length > 0 ? (
        <ul className="space-y-2">
          {conversations.map(conversation => (
            <li 
              key={conversation.id} 
              className={cn(
                "p-2 rounded shadow cursor-pointer",
                currentConversation?.id === conversation.id
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-700 hover:bg-gray-600"
              )}
              onClick={() => onSelectConversation(conversation)}
            >
              <div className="text-sm font-medium">{conversation.title}</div>
              <div className="text-xs text-gray-400">
                {new Date(conversation.updated_at).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No conversations yet</p>
      )}
    </aside>
  )
}
