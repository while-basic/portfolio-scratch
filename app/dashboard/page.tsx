"use client"

import { WelcomeDialog } from "@/components/welcome-dialog"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <ProtectedRoute>
      <WelcomeDialog />
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Overview Card */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-2">Welcome Back!</h2>
            <p className="text-muted-foreground">
              {user?.email}
            </p>
          </Card>

          {/* Activity Card */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
            <p className="text-muted-foreground">
              Track your recent actions and updates here.
            </p>
          </Card>

          {/* Quick Actions Card */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-2">Quick Actions</h2>
            <p className="text-muted-foreground">
              Access frequently used features and settings.
            </p>
          </Card>
        </div>

        {/* Statistics Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Your Statistics</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Profile Views</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Projects Created</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Tasks Completed</span>
                <span className="font-medium">0</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Tasks</h2>
            <p className="text-muted-foreground">
              No upcoming tasks. Create a new task to get started!
            </p>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}
