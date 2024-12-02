'use client'

import React, { useState } from 'react'
import { Conversation, deleteConversation, renameConversation, summarizeConversation } from '@/lib/chat'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Plus, MessageSquare, Trash2, Edit2, X, Menu } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
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

interface SidebarProps {
  conversations: Conversation[]
  currentConversation: Conversation | null
  onSelectConversation: (conversation: Conversation) => void
  onNewConversation: () => void
  onDeleteConversation: (id: string) => void
  className?: string
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  conversations, 
  currentConversation,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  className
}) => {
  const [conversationToDelete, setConversationToDelete] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  const handleDeleteConversation = async (id: string) => {
    try {
      await deleteConversation(id)
      onDeleteConversation(id)
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

  const handleStartEdit = (conversation: Conversation) => {
    setEditingId(conversation.id)
    setEditTitle(conversation.title)
  }

  const handleSaveEdit = async (id: string) => {
    try {
      if (!editTitle.trim()) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Title cannot be empty",
        })
        return
      }

      const updated = await renameConversation(id, editTitle.trim())
      setEditingId(null)
      onSelectConversation(updated)
      
      toast({
        title: "Success",
        description: "Conversation renamed successfully",
      })
    } catch (error) {
      console.error('Error renaming conversation:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to rename conversation",
      })
    }
  }

  const handleGenerateSummary = async (conversation: Conversation) => {
    try {
      const summary = await summarizeConversation(conversation.messages)
      if (!summary) {
        throw new Error('Failed to generate summary')
      }

      const updated = await renameConversation(conversation.id, summary)
      onSelectConversation(updated)
      
      toast({
        title: "Success",
        description: "Summary generated and set as title",
      })
    } catch (error) {
      console.error('Error generating summary:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate summary",
      })
    }
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-40 md:hidden"
      >
        <Menu className="h-6 w-6" />
      </Button>
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-72 border-r border-gray-800 bg-black flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0",
          !isOpen && "-translate-x-full",
          "md:relative",
          className
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-800">
            <Button 
              onClick={onNewConversation}
              className="w-full justify-start gap-2 bg-gray-800 hover:bg-gray-700 text-white"
              size="lg"
            >
              <Plus className="h-5 w-5" />
              New Chat
            </Button>
          </div>
          <ScrollArea className="flex-1 px-2 py-2">
            {conversations && conversations.length > 0 ? (
              <div className="space-y-1">
                {conversations.map(conversation => (
                  <div
                    key={conversation.id}
                    className="group relative flex items-center"
                  >
                    {editingId === conversation.id ? (
                      <div className="flex w-full items-center p-2 rounded-lg bg-gray-800/50">
                        <Input
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleSaveEdit(conversation.id)
                            }
                            if (e.key === 'Escape') {
                              setEditingId(null)
                            }
                          }}
                          className="h-9 bg-gray-900 border-gray-700 text-white"
                          autoFocus
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSaveEdit(conversation.id)}
                          className="ml-2 text-gray-300 hover:text-white"
                        >
                          Save
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingId(null)}
                          className="text-gray-300 hover:text-white"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-start px-3 py-2 gap-2 rounded-lg text-sm font-medium transition-colors",
                            "text-gray-300 hover:text-white hover:bg-gray-800",
                            currentConversation?.id === conversation.id && "bg-gray-800 text-white"
                          )}
                          onClick={() => {
                            onSelectConversation(conversation)
                            setIsOpen(false)
                          }}
                        >
                          <MessageSquare className="h-4 w-4 shrink-0" />
                          <span className="truncate">{conversation.title}</span>
                        </Button>
                        <div className="absolute right-2 opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleStartEdit(conversation)
                            }}
                            className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleGenerateSummary(conversation)
                            }}
                            className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              setConversationToDelete(conversation.id)
                            }}
                            className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 py-4">
                No conversations yet
              </div>
            )}
          </ScrollArea>
        </div>

        <AlertDialog open={!!conversationToDelete} onOpenChange={() => setConversationToDelete(null)}>
          <AlertDialogContent className="bg-gray-900 border-gray-800">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Are you sure?</AlertDialogTitle>
              <AlertDialogDescription className="text-gray-400">
                This action cannot be undone. This will permanently delete the conversation.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-gray-800 text-white hover:bg-gray-700">Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => conversationToDelete && handleDeleteConversation(conversationToDelete)}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </aside>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
