"use client"

import { useEffect, useState, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { toast } from "sonner"
import { createClient } from '@/lib/supabase/client'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    borderColor: string
    backgroundColor: string
  }[]
}

export default function AnalyticsChart() {
  const [data, setData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchAnalytics = useCallback(async () => {
    try {
      // Get analytics data for the last 6 months
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

      const { data: analytics, error } = await supabase
        .from('analytics')
        .select('*')
        .gte('date', sixMonthsAgo.toISOString())
        .order('date', { ascending: true });

      if (error) throw error;

      // Format data for chart
      const chartData = {
        labels: analytics?.map(item => {
          const date = new Date(item.date);
          return `${date.getMonth() + 1}/${date.getFullYear()}`;
        }) || [],
        datasets: [
          {
            label: 'Users',
            data: analytics?.map(item => item.user_count) || [],
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
          },
          {
            label: 'Tasks',
            data: analytics?.map(item => item.task_count) || [],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Events',
            data: analytics?.map(item => item.event_count) || [],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };

      setData(chartData);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Analytics Overview",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-zinc-800 rounded w-1/4"></div>
          <div className="h-[300px] bg-zinc-800 rounded"></div>
        </div>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="p-6">
        <div className="text-center text-muted-foreground">
          No analytics data available
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <Line options={options} data={data} />
    </Card>
  )
}
