"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { AuthDialog } from "@/components/chat/auth-dialog"
import { Breadcrumb } from "@/components/breadcrumb"
import { ChatInterface } from "@/components/chat/chat-interface"
import { useEffect, useState } from "react"

export default function ChatPage() {
  const { user, loading } = useAuth()
  const [showAuthDialog, setShowAuthDialog] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      setShowAuthDialog(true)
    }
  }, [user, loading])

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center justify-between px-4 py-4 border-b">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <Breadcrumb items={[{ label: "Chat", href: "/chat" }]} />
        </div>
      </div>
      <main className="flex-1 py-4">
        <div className="container flex gap-4">
          <ChatInterface />
        </div>
      </main>
      <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
    </div>
  )
}
