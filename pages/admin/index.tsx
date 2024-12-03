import { useEffect, useState } from 'react'
import { AdminLayout } from '@/components/admin/layout'
import { Users, Mail, FileText, Eye } from 'lucide-react'
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'
import { createClient } from '@/lib/supabase/client'

interface Stats {
  totalUsers: number
  emailsCollected: number
  blogPosts: number
  totalViews: number
}

interface AnalyticsData {
  month: string
  value: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    emailsCollected: 0,
    blogPosts: 0,
    totalViews: 0
  })
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()

      // Fetch total users
      const { count: usersCount } = await supabase
        .from('users')
        .select('*', { count: 'exact' })

      // Fetch emails collected
      const { count: emailsCount } = await supabase
        .from('subscribers')
        .select('*', { count: 'exact' })

      // Fetch blog posts
      const { count: postsCount } = await supabase
        .from('posts')
        .select('*', { count: 'exact' })

      // Fetch page views
      const { data: viewsData } = await supabase
        .from('page_views')
        .select('*')

      setStats({
        totalUsers: usersCount || 0,
        emailsCollected: emailsCount || 0,
        blogPosts: postsCount || 0,
        totalViews: viewsData?.reduce((sum, view) => sum + view.count, 0) || 0
      })

      // Fetch analytics data
      const { data: analytics } = await supabase
        .from('page_views')
        .select('month, views')
        .order('month', { ascending: true })
        .limit(6)

      if (analytics) {
        setAnalyticsData(analytics.map(item => ({
          month: item.month,
          value: item.views
        })))
      }
    }

    fetchData()
  }, [])

  const statCards = [
    {
      name: 'Total Users',
      value: stats.totalUsers.toString(),
      icon: Users,
    },
    {
      name: 'Emails Collected',
      value: stats.emailsCollected.toString(),
      icon: Mail,
    },
    {
      name: 'Blog Posts',
      value: stats.blogPosts.toString(),
      icon: FileText,
    },
    {
      name: 'Total Views',
      value: stats.totalViews.toString(),
      icon: Eye,
    },
  ]

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-8">Portfolio Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div
            key={stat.name}
            className="bg-gray-800 p-6 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">{stat.name}</p>
                <p className="text-3xl font-semibold mt-1">{stat.value}</p>
              </div>
              <stat.icon className="w-12 h-12 text-gray-600" />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-2">Analytics Overview</h2>
        <p className="text-gray-400 mb-6">Your portfolio performance over the last 6 months</p>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analyticsData}>
              <XAxis 
                dataKey="month" 
                stroke="#9CA3AF"
              />
              <YAxis 
                stroke="#9CA3AF"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: '#fff'
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#6366F1"
                fill="#4F46E5"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Calendar</h2>
          <p className="text-gray-400">Keep track of important dates</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Todo List</h2>
          <p className="text-gray-400">Manage your tasks</p>
        </div>
      </div>
    </AdminLayout>
  )
}
