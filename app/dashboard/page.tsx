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

// Move interfaces outside of component
interface PageView {
  id: string
  path: string
  count: number
  created_at: string
}

interface UserStats {
  totalUsers: number
  totalEmails: number
  totalViews: number
  totalPosts: number
  pageViews: PageView[]
}

interface RecentUser {
  id: string
  email: string
  created_at: string
}

// Import User type from recent-users component
import type { User } from "@/components/dashboard/recent-users"

export default function DashboardPage() {
  const { user } = useAuth()

  const [stats, setStats] = useState<UserStats>({
    totalUsers: 0,
    totalEmails: 0,
    totalViews: 0,
    totalPosts: 0,
    pageViews: [],
  })
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()
  const [analyticsData, setAnalyticsData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Page Views',
        data: [120, 190, 300, 250, 400, 380],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          usersResponse,
          emailsResponse,
          viewsResponse,
          postsResponse,
          monthlyViewsResponse
        ] = await Promise.all([
          // Fetch users count
          supabase.from('users').select('*', { count: 'exact' }),
          // Fetch emails count
          supabase.from('emails').select('*', { count: 'exact' }),
          // Fetch total page views
          supabase.from('page_views').select('*'),
          // Fetch blog posts count
          supabase.from('posts').select('*', { count: 'exact' }),
          // Fetch monthly page views
          supabase
            .from('page_views')
            .select('*')
            .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
            .order('created_at', { ascending: true })
        ])

        const totalViews = viewsResponse.data?.reduce((sum, view) => sum + (view.count || 0), 0) || 0

        setStats({
          totalUsers: usersResponse.count || 0,
          totalEmails: emailsResponse.count || 0,
          totalViews,
          totalPosts: postsResponse.count || 0,
          pageViews: monthlyViewsResponse.data || []
        })

        // Process analytics data
        const processedData = processAnalyticsData(monthlyViewsResponse.data || [])
        setAnalyticsData(processedData)

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

  // Helper function to process analytics data
  const processAnalyticsData = (views: PageView[]) => {
    const monthlyData = views.reduce((acc, view) => {
      const date = new Date(view.created_at)
      const month = date.toLocaleString('default', { month: 'long' })
      acc[month] = (acc[month] || 0) + view.count
      return acc
    }, {} as Record<string, number>)

    const labels = Object.keys(monthlyData)
    const data = Object.values(monthlyData)

    return {
      labels,
      datasets: [
        {
          label: 'Page Views',
          data,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
      ],
    }
  }

  // Convert RecentUser to User type
  const convertToUsers = (recentUsers: RecentUser[]): User[] => {
    return recentUsers.map(user => ({
      id: user.id,
      email: user.email,
      createdAt: user.created_at
    }));
  };

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
          <RecentUsers users={convertToUsers(recentUsers)} loading={loading} />
          <VisitorCounter />
        </div>
      </div>
    </ProtectedRoute>
  )
}
