'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronRight, MessageSquare, Image as ImageIcon } from 'lucide-react'

interface CollapsibleSidebarProps {
  onModeChange: (mode: 'chat' | 'image') => void
  currentMode: 'chat' | 'image'
}

export function CollapsibleSidebar({ onModeChange, currentMode }: CollapsibleSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "h-full bg-background/95 border-r border-border/40 transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Collapse Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-2 z-10"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <ChevronRight className={cn(
          "h-4 w-4 transition-transform",
          isCollapsed ? "" : "rotate-180"
        )} />
      </Button>

      {/* Sidebar Content */}
      <div className="pt-16 px-2 space-y-2">
        <Button
          variant={currentMode === 'chat' ? 'secondary' : 'ghost'}
          className={cn(
            "w-full justify-start",
            isCollapsed ? "px-2" : "px-4"
          )}
          onClick={() => onModeChange('chat')}
        >
          <MessageSquare className="h-5 w-5" />
          {!isCollapsed && <span className="ml-2">Chat</span>}
        </Button>

        <Button
          variant={currentMode === 'image' ? 'secondary' : 'ghost'}
          className={cn(
            "w-full justify-start",
            isCollapsed ? "px-2" : "px-4"
          )}
          onClick={() => onModeChange('image')}
        >
          <ImageIcon className="h-5 w-5" />
          {!isCollapsed && <span className="ml-2">Image Generation</span>}
        </Button>
      </div>
    </div>
  )
}
