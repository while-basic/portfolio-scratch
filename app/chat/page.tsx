"use client"

import { useState, useCallback, useEffect } from 'react'
import { ChatInterface } from "@/components/chat/chat-interface"
import { withClientBoundary } from "@/components/client-wrapper"
import { useAuth } from "@/lib/auth-context"
import { getConversations } from "@/lib/chat"
import { Button } from "@/components/ui/button"
import { ChevronLeft, MessageSquare, ImageIcon, ChevronDown, Paintbrush, Menu, Settings } from "lucide-react"
import { AuthDialog } from "@/components/chat/auth-dialog"
import { useRouter } from 'next/navigation'
import { ModelSelector } from "@/components/chat/model-selector"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"

function ChatPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [showLeftSidebar, setShowLeftSidebar] = useState(false)
  const [showRightSidebar, setShowRightSidebar] = useState(false)
  const [currentMode, setCurrentMode] = useState<'chat' | 'image'>('chat')

  // Model configuration state
  const [temperature, setTemperature] = useState(1.0)
  const [maxTokens, setMaxTokens] = useState(2048)
  const [topP, setTopP] = useState(1.0)
  const [frequencyPenalty, setFrequencyPenalty] = useState(0.0)
  const [presencePenalty, setPresencePenalty] = useState(0.0)
  const [model, setModel] = useState("o")
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
    setIsRateLimited(false)
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
      {/* Mobile Navigation Controls */}
      <div className="fixed top-0 left-0 right-0 z-50 h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
        <div className="flex h-full items-center justify-between px-4">
          <Sheet open={showLeftSidebar} onOpenChange={setShowLeftSidebar}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[280px] p-0">
              <nav className="flex flex-col h-full pt-4 space-y-1">
                <div className="flex flex-col space-y-2 px-2">
                  <Button
                    variant={currentMode === 'chat' ? 'secondary' : 'ghost'}
                    className="justify-start"
                    onClick={() => {
                      setCurrentMode('chat')
                      setShowLeftSidebar(false)
                    }}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Chat
                  </Button>
                  <Button
                    variant={currentMode === 'image' ? 'secondary' : 'ghost'}
                    className="justify-start"
                    onClick={() => {
                      router.push('/chat/image')
                      setShowLeftSidebar(false)
                    }}
                  >
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Image Generation
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => {
                      router.push('/chat/inpainter')
                      setShowLeftSidebar(false)
                    }}
                  >
                    <Paintbrush className="mr-2 h-4 w-4" />
                    Inpainter
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          <h1 className="text-lg font-semibold">AI Chat Assistant</h1>

          <Sheet open={showRightSidebar} onOpenChange={setShowRightSidebar}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[300px]">
              <div className="space-y-6 pt-4">
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

                {/* Temperature Control */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm text-muted-foreground">Temperature</label>
                    <span className="text-sm text-muted-foreground">{temperature.toFixed(2)}</span>
                  </div>
                  <Slider
                    value={[temperature]}
                    min={0}
                    max={2}
                    step={0.01}
                    onValueChange={([value]) => setTemperature(value)}
                  />
                </div>

                {/* Max Tokens Control */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm text-muted-foreground">Max Tokens</label>
                    <span className="text-sm text-muted-foreground">{maxTokens}</span>
                  </div>
                  <Slider
                    value={[maxTokens]}
                    min={1}
                    max={4096}
                    step={1}
                    onValueChange={([value]) => setMaxTokens(value)}
                  />
                </div>

                {/* Top P Control */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm text-muted-foreground">Top P</label>
                    <span className="text-sm text-muted-foreground">{topP.toFixed(2)}</span>
                  </div>
                  <Slider
                    value={[topP]}
                    min={0}
                    max={1}
                    step={0.01}
                    onValueChange={([value]) => setTopP(value)}
                  />
                </div>

                {/* Frequency Penalty Control */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm text-muted-foreground">Frequency Penalty</label>
                    <span className="text-sm text-muted-foreground">{frequencyPenalty.toFixed(2)}</span>
                  </div>
                  <Slider
                    value={[frequencyPenalty]}
                    min={0}
                    max={2}
                    step={0.01}
                    onValueChange={([value]) => setFrequencyPenalty(value)}
                  />
                </div>

                {/* Presence Penalty Control */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm text-muted-foreground">Presence Penalty</label>
                    <span className="text-sm text-muted-foreground">{presencePenalty.toFixed(2)}</span>
                  </div>
                  <Slider
                    value={[presencePenalty]}
                    min={0}
                    max={2}
                    step={0.01}
                    onValueChange={([value]) => setPresencePenalty(value)}
                  />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Left Navigation - Desktop */}
      <div className="hidden md:flex w-[260px] border-r border-border flex-col bg-card">
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
              onClick={() => router.push('/chat/image')}
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
        {/* Fixed Header Section - Desktop */}
        <div className="hidden md:block w-full bg-background px-4 sm:px-6 lg:px-8 pt-20 pb-4">
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
        <div className="flex-1 overflow-hidden relative pt-14 md:pt-0">
          <ChatInterface 
            mode={currentMode} 
            model={model}
            onRateLimit={() => setIsRateLimited(true)}
            temperature={temperature}
            maxTokens={maxTokens}
            topP={topP}
            frequencyPenalty={frequencyPenalty}
            presencePenalty={presencePenalty}
          />
        </div>
      </div>

      {/* Right Configuration Panel - Desktop */}
      <div className="hidden md:flex w-[300px] border-l border-border bg-background flex-col">
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

            {/* LLM Controls */}
            <div className="space-y-6">
              {/* Temperature Control */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm text-muted-foreground">Temperature</label>
                  <span className="text-sm text-muted-foreground">{temperature.toFixed(2)}</span>
                </div>
                <Slider
                  value={[temperature]}
                  min={0}
                  max={2}
                  step={0.01}
                  onValueChange={([value]) => setTemperature(value)}
                />
              </div>

              {/* Max Tokens Control */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm text-muted-foreground">Max Tokens</label>
                  <span className="text-sm text-muted-foreground">{maxTokens}</span>
                </div>
                <Slider
                  value={[maxTokens]}
                  min={1}
                  max={4096}
                  step={1}
                  onValueChange={([value]) => setMaxTokens(value)}
                />
              </div>

              {/* Top P Control */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm text-muted-foreground">Top P</label>
                  <span className="text-sm text-muted-foreground">{topP.toFixed(2)}</span>
                </div>
                <Slider
                  value={[topP]}
                  min={0}
                  max={1}
                  step={0.01}
                  onValueChange={([value]) => setTopP(value)}
                />
              </div>

              {/* Frequency Penalty Control */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm text-muted-foreground">Frequency Penalty</label>
                  <span className="text-sm text-muted-foreground">{frequencyPenalty.toFixed(2)}</span>
                </div>
                <Slider
                  value={[frequencyPenalty]}
                  min={0}
                  max={2}
                  step={0.01}
                  onValueChange={([value]) => setFrequencyPenalty(value)}
                />
              </div>

              {/* Presence Penalty Control */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm text-muted-foreground">Presence Penalty</label>
                  <span className="text-sm text-muted-foreground">{presencePenalty.toFixed(2)}</span>
                </div>
                <Slider
                  value={[presencePenalty]}
                  min={0}
                  max={2}
                  step={0.01}
                  onValueChange={([value]) => setPresencePenalty(value)}
                />
              </div>
            </div>
          </div>
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
