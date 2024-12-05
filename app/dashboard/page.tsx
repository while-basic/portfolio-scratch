"use client"

import { useAuth } from "@/lib/auth-context"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { WelcomeDialog } from "@/components/welcome-dialog"
import { withClientBoundary } from "@/components/client-wrapper"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileTextIcon, MessageSquare, SettingsIcon } from "lucide-react"
import DashboardGrid from "@/components/dashboard/dashboard-grid"

function DashboardPage() {
  const { user } = useAuth()

  return (
    <ProtectedRoute>
      <WelcomeDialog />
      <div className="container py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Welcome back, {user?.email}
            </p>
          </div>
        </div>

        {/* Quick Access Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Link href="/ai-editor">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileTextIcon className="h-5 w-5" />
                  AI Editor
                </CardTitle>
                <CardDescription>
                  Create and edit content with AI assistance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Use our AI-powered editor to write, edit, and improve your content with intelligent suggestions.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/chat">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  AI Chat
                </CardTitle>
                <CardDescription>
                  Chat with AI Assistant
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Have natural conversations with an AI that understands context and can help with various tasks.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/settings">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SettingsIcon className="h-5 w-5" />
                  Settings
                </CardTitle>
                <CardDescription>
                  Manage your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Configure your account settings, preferences, and notification options.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Dashboard Widgets */}
        <DashboardGrid />
      </div>
    </ProtectedRoute>
  )
}

export default withClientBoundary(DashboardPage)