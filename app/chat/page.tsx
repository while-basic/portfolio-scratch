"use client"

import { useState, useCallback, useEffect } from 'react'
import { ChatInterface } from "@/components/chat/chat-interface"
import { withClientBoundary } from "@/components/client-wrapper"
import { useAuth } from "@/lib/auth-context"
import { getConversations } from "@/lib/chat"
import { Button } from "@/components/ui/button"
import { ChevronLeft, MessageSquare, Image, ChevronDown } from "lucide-react"
import { AuthDialog } from "@/components/chat/auth-dialog"
import { cn } from "@/lib/utils"
import { useRouter } from 'next/navigation'

function ChatPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [showSidebar] = useState(true)
  const [currentMode, setCurrentMode] = useState<'chat' | 'image'>('chat')

  // Model configuration state
  const [temperature, setTemperature] = useState(1.0)
  const [maxTokens, setMaxTokens] = useState(2048)
  const [topP, setTopP] = useState(1.0)
  const [frequencyPenalty, setFrequencyPenalty] = useState(0.0)
  const [presencePenalty, setPresencePenalty] = useState(0.0)

  const loadConversations = useCallback(async () => {
    try {
      if (!user?.id) return
      await getConversations(user.id)
    } catch (error: unknown) {
      console.error('Error loading conversations:', error)
      if (error instanceof Error && error.message === 'Not authenticated') {
        setShowAuthDialog(true)
      }
    }
  }, [user?.id])

  useEffect(() => {
    if (!loading && !user) {
      setShowAuthDialog(true)
    }
    if (user) {
      loadConversations()
    }
  }, [user, loading, loadConversations])

  return (
    <div className="flex h-[100dvh] bg-black/95">
      {/* Left Navigation */}
      <div className={cn(
        "w-[260px] border-r border-white/10 flex flex-col bg-black",
        showSidebar ? "" : "hidden lg:flex"
      )}>
        <div className="flex items-center h-14 px-3 border-b border-white/10">
          <Button
            variant="ghost"
            size="icon"
            className="text-white/70 hover:text-white hover:bg-white/5"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-sm font-medium px-3 py-5",
              currentMode === 'chat' 
                ? "text-white bg-white/5" 
                : "text-white/70 hover:text-white hover:bg-white/5"
            )}
            onClick={() => setCurrentMode('chat')}
          >
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <MessageSquare className="h-4 w-4 mr-3" />
            Chat
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-sm font-medium px-3 py-5",
              currentMode === 'image'
                ? "text-white bg-white/5"
                : "text-white/70 hover:text-white hover:bg-white/5"
            )}
            onClick={() => router.push('/generate')}
          >
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image className="h-4 w-4 mr-3" />
            Image Generation
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <ChatInterface mode={currentMode} />
      </div>

      {/* Right Configuration Panel */}
      <div className="w-[300px] border-l border-white/10 bg-black/95 flex flex-col">
        <div className="p-4 border-b border-white/10">
          <Button variant="outline" className="w-full justify-between border-white/10 text-white/70 hover:text-white hover:bg-white/5">
            Your presets
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-6">
            {/* Model Selection */}
            <div className="space-y-2">
              <label className="text-sm text-white/70">Model</label>
              <Button variant="outline" className="w-full justify-between border-white/10 text-white/70 hover:text-white hover:bg-white/5">
                gpt-4
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Response Format */}
            <div className="space-y-2">
              <label className="text-sm text-white/70">Response format</label>
              <Button variant="outline" className="w-full justify-between border-white/10 text-white/70 hover:text-white hover:bg-white/5">
                text
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Functions Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm text-white/70">Functions</label>
                <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/5 h-8 px-2">
                  Add
                </Button>
              </div>
            </div>

            {/* Model Configuration */}
            <div className="space-y-4">
              <h3 className="text-sm text-white/70">Model configuration</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-white/70">Temperature</label>
                    <span className="text-sm text-white/70">{temperature.toFixed(2)}</span>
                  </div>
                  <input 
                    type="range"
                    min="0"
                    max="2"
                    step="0.01"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full accent-white/70 bg-white/10 h-1 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-white/70">Max tokens</label>
                    <span className="text-sm text-white/70">{maxTokens}</span>
                  </div>
                  <input 
                    type="range"
                    min="1"
                    max="4096"
                    value={maxTokens}
                    onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                    className="w-full accent-white/70 bg-white/10 h-1 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-white/70">Stop sequences</label>
                  </div>
                  <input 
                    type="text"
                    placeholder="Enter sequence and press Tab"
                    className="w-full bg-white/5 border-white/10 rounded-md text-white placeholder-white/30 text-sm h-9"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-white/70">Top P</label>
                    <span className="text-sm text-white/70">{topP.toFixed(2)}</span>
                  </div>
                  <input 
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={topP}
                    onChange={(e) => setTopP(parseFloat(e.target.value))}
                    className="w-full accent-white/70 bg-white/10 h-1 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-white/70">Frequency penalty</label>
                    <span className="text-sm text-white/70">{frequencyPenalty.toFixed(2)}</span>
                  </div>
                  <input 
                    type="range"
                    min="0"
                    max="2"
                    step="0.01"
                    value={frequencyPenalty}
                    onChange={(e) => setFrequencyPenalty(parseFloat(e.target.value))}
                    className="w-full accent-white/70 bg-white/10 h-1 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-white/70">Presence penalty</label>
                    <span className="text-sm text-white/70">{presencePenalty.toFixed(2)}</span>
                  </div>
                  <input 
                    type="range"
                    min="0"
                    max="2"
                    step="0.01"
                    value={presencePenalty}
                    onChange={(e) => setPresencePenalty(parseFloat(e.target.value))}
                    className="w-full accent-white/70 bg-white/10 h-1 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-white/10">
          <Button variant="outline" className="w-full justify-center border-white/10 text-white/70 hover:text-white hover:bg-white/5">
            Save as preset
          </Button>
        </div>
      </div>

      <AuthDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
      />
    </div>
  )
}

export default withClientBoundary(ChatPage)
