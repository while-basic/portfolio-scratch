"use client"

import { useEffect, useState } from "react"
import { WelcomeDialog } from "@/components/welcome-dialog"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { VisitorCounter } from "@/components/visitor-counter"
import { StatsCard } from "@/components/dashboard/stats-card"
import { AnalyticsChart } from "@/components/dashboard/analytics-chart"
import { RecentUsers } from "@/components/dashboard/recent-users"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Users, Mail, Eye, BookOpen } from "lucide-react"

export default function DashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEmails: 0,
    totalViews: 0,
    totalPosts: 0,
  })
  const [recentUsers, setRecentUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  // Sample analytics data - replace with real data from your database
  const analyticsData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Page Views',
        data: [120, 190, 300, 250, 400, 380],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  }

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch users count
        const { count: usersCount } = await supabase
          .from('users')
          .select('*', { count: 'exact' })

        // Fetch emails count (assuming you have an emails table)
        const { count: emailsCount } = await supabase
          .from('emails')
          .select('*', { count: 'exact' })

        setStats({
          totalUsers: usersCount || 0,
          totalEmails: emailsCount || 0,
          totalViews: 1254, // Replace with actual analytics data
          totalPosts: 15, // Replace with actual blog posts count
        })

        // Fetch recent users
        const { data: recentUsersData } = await supabase
          .from('users')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5)

        setRecentUsers(recentUsersData || [])
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [supabase])

  return (
    <ProtectedRoute>
      <WelcomeDialog />
      <div className="container py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2 md:mt-0">
            Welcome back, {user?.email}
          </p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Users"
            value={stats.totalUsers}
            loading={loading}
            icon={<Users className="h-6 w-6" />}
          />
          <StatsCard
            title="Email Subscribers"
            value={stats.totalEmails}
            loading={loading}
            icon={<Mail className="h-6 w-6" />}
          />
          <StatsCard
            title="Page Views"
            value={stats.totalViews}
            loading={loading}
            icon={<Eye className="h-6 w-6" />}
          />
          <StatsCard
            title="Blog Posts"
            value={stats.totalPosts}
            loading={loading}
            icon={<BookOpen className="h-6 w-6" />}
          />
        </div>

        {/* Analytics Chart */}
        <div className="mb-8">
          <AnalyticsChart 
            data={analyticsData}
            title="Page Views Over Time"
          />
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentUsers users={recentUsers} loading={loading} />
          <VisitorCounter />
        </div>
      </div>
    </ProtectedRoute>
  )
}
