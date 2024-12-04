"use client"

import { useState, useCallback, useEffect } from 'react'
import { ChatInterface } from "@/components/chat/chat-interface"
import { withClientBoundary } from "@/components/client-wrapper"
import { useAuth } from "@/lib/auth-context"
import { getConversations } from "@/lib/chat"
import { Button } from "@/components/ui/button"
import { ChevronLeft, MessageSquare, ImageIcon, ChevronDown, Paintbrush } from "lucide-react"
import { AuthDialog } from "@/components/chat/auth-dialog"
import { cn } from "@/lib/utils"
import { useRouter } from 'next/navigation'
import { ModelSelector } from "@/components/chat/model-selector"

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
  const [model, setModel] = useState("gpt-4o")
  const [isRateLimited, setIsRateLimited] = useState(false)

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

  const handleModelChange = (newModel: string) => {
    setModel(newModel)
    setIsRateLimited(false) // Reset rate limit flag when model changes
  }

  useEffect(() => {
    if (!loading && !user) {
      setShowAuthDialog(true)
    }
    if (user) {
      loadConversations()
    }
  }, [user, loading, loadConversations])

  return (
    <div className="flex h-[100dvh] bg-background">
      {/* Left Navigation */}
      <div className={cn(
        "w-[260px] border-r border-border flex flex-col bg-card",
        showSidebar ? "" : "hidden lg:flex"
      )}>
        <div className="flex items-center h-14 px-3 border-b border-border">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          <div className="flex flex-col space-y-2">
            <Button
              variant={currentMode === 'chat' ? 'secondary' : 'ghost'}
              className="justify-start"
              onClick={() => setCurrentMode('chat')}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat
            </Button>
            <Button
              variant={currentMode === 'image' ? 'secondary' : 'ghost'}
              className="justify-start"
              onClick={() => setCurrentMode('image')}
            >
              <ImageIcon className="mr-2 h-4 w-4" />
              Image Generation
            </Button>
            <Button
              variant="ghost"
              className="justify-start"
              onClick={() => router.push('/chat/inpainter')}
            >
              <Paintbrush className="mr-2 h-4 w-4" />
              Inpainter
            </Button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-background">
        {/* Fixed Header Section */}
        <div className="w-full bg-background px-4 sm:px-6 lg:px-8 pt-20 pb-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground">AI Chat Assistant</h1>
            </div>
            <p className="mt-2 text-lg text-muted-foreground">
              Have natural conversations with an AI that understands context and can help with various tasks
            </p>
          </div>
        </div>

        {/* Chat Interface in a scrollable container */}
        <div className="flex-1 overflow-hidden relative">
          <ChatInterface 
            mode={currentMode} 
            model={model}
            onRateLimit={() => setIsRateLimited(true)}
          />
        </div>
      </div>

      {/* Right Configuration Panel */}
      <div className="w-[300px] border-l border-border bg-background flex flex-col">
        <div className="p-4 border-b border-border">
          <Button variant="outline" className="w-full justify-between border-border text-muted-foreground hover:text-foreground hover:bg-secondary/50">
            Your presets
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-6">
            {/* Model Selection */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm text-muted-foreground">Model</label>
                {isRateLimited && (
                  <span className="text-xs text-red-500">Rate limit exceeded. Try another model.</span>
                )}
              </div>
              <ModelSelector
                value={model}
                onValueChange={handleModelChange}
              />
            </div>

            {/* Response Format */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Response format</label>
              <Button variant="outline" className="w-full justify-between border-border text-muted-foreground hover:text-foreground hover:bg-secondary/50">
                text
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Functions Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm text-muted-foreground">Functions</label>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 h-8 px-2">
                  Add
                </Button>
              </div>
            </div>

            {/* Model Configuration */}
            <div className="space-y-4">
              <h3 className="text-sm text-muted-foreground">Model configuration</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-muted-foreground">Temperature</label>
                    <span className="text-sm text-muted-foreground">{temperature.toFixed(2)}</span>
                  </div>
                  <input 
                    type="range"
                    min="0"
                    max="2"
                    step="0.01"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full accent-foreground bg-background h-1 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-muted-foreground">Max tokens</label>
                    <span className="text-sm text-muted-foreground">{maxTokens}</span>
                  </div>
                  <input 
                    type="range"
                    min="1"
                    max="4096"
                    value={maxTokens}
                    onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                    className="w-full accent-foreground bg-background h-1 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-muted-foreground">Stop sequences</label>
                  </div>
                  <input 
                    type="text"
                    placeholder="Enter sequence and press Tab"
                    className="w-full bg-secondary/50 border-border rounded-md text-muted-foreground placeholder-muted-foreground text-sm h-9"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-muted-foreground">Top P</label>
                    <span className="text-sm text-muted-foreground">{topP.toFixed(2)}</span>
                  </div>
                  <input 
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={topP}
                    onChange={(e) => setTopP(parseFloat(e.target.value))}
                    className="w-full accent-foreground bg-background h-1 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-muted-foreground">Frequency penalty</label>
                    <span className="text-sm text-muted-foreground">{frequencyPenalty.toFixed(2)}</span>
                  </div>
                  <input 
                    type="range"
                    min="0"
                    max="2"
                    step="0.01"
                    value={frequencyPenalty}
                    onChange={(e) => setFrequencyPenalty(parseFloat(e.target.value))}
                    className="w-full accent-foreground bg-background h-1 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-muted-foreground">Presence penalty</label>
                    <span className="text-sm text-muted-foreground">{presencePenalty.toFixed(2)}</span>
                  </div>
                  <input 
                    type="range"
                    min="0"
                    max="2"
                    step="0.01"
                    value={presencePenalty}
                    onChange={(e) => setPresencePenalty(parseFloat(e.target.value))}
                    className="w-full accent-foreground bg-background h-1 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-border">
          <Button variant="outline" className="w-full justify-center border-border text-muted-foreground hover:text-foreground hover:bg-secondary/50">
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
