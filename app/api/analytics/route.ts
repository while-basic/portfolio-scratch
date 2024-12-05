import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { Session } from 'next-auth'

type AnalyticsItem = {
  date: Date
  userCount: number
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions) as Session | null
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get analytics data for the last 6 months
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const analytics = await prisma.analytics.findMany({
      where: {
        date: {
          gte: sixMonthsAgo,
        },
      },
      orderBy: {
        date: 'asc',
      },
    }) as AnalyticsItem[]

    // Format data for chart
    const data = {
      labels: analytics.map(item => {
        const date = new Date(item.date)
        return `${date.getMonth() + 1}/${date.getFullYear()}`
      }),
      datasets: [
        {
          label: 'Users',
          data: analytics.map(item => item.userCount),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        }
      ],
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
