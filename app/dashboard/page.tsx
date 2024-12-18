"use client"

import { useAuth } from "@/lib/auth-context"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { WelcomeDialog } from "@/components/welcome-dialog"
import { withClientBoundary } from "@/components/client-wrapper"
import Link from "next/link"
import DashboardGrid from "@/components/dashboard/dashboard-grid"
import { Button } from "@/components/ui/button"
import { Plus, Users } from "lucide-react"

function DashboardPage() {
  const { user } = useAuth()

  return (
    <ProtectedRoute>
      <WelcomeDialog />
      <div className="container py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.email?.split('@')[0]}</h1>
            <p className="mt-2 text-muted-foreground">
              Here&apos;s what&apos;s happening with your account
            </p>
          </div>
          <div className="mt-4 md:mt-0 space-x-3 flex flex-wrap gap-3">
            <Link href="/social">
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Social Feed
              </Button>
            </Link>
            <Link href="/dashboard/chat">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Chat
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <DashboardGrid />
      </div>
    </ProtectedRoute>
  )
}

export default withClientBoundary(DashboardPage);