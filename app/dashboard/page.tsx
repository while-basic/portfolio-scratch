"use client"

import { useAuth } from "@/lib/auth-context"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { WelcomeDialog } from "@/components/welcome-dialog"
import { withClientBoundary } from "@/components/client-wrapper"

function DashboardPage() {
  const { user } = useAuth()

  return (
    <ProtectedRoute>
      <WelcomeDialog />
      <div className="container py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <p className="text-muted-foreground mt-2 md:mt-0">
            Welcome back, {user?.email}
          </p>
        </div>
        {/* Dashboard content will go here */}
      </div>
    </ProtectedRoute>
  )
}

export default withClientBoundary(DashboardPage)