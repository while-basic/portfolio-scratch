"use client"

import { useEffect, useState } from "react"
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

// Mock data for demonstration
const mockData: ChartData = {
  labels: ['1/2024', '2/2024', '3/2024', '4/2024', '5/2024', '6/2024'],
  datasets: [
    {
      label: 'Users',
      data: [65, 75, 85, 95, 105, 115],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    },
    {
      label: 'Tasks',
      data: [45, 55, 65, 75, 85, 95],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Events',
      data: [35, 45, 55, 65, 75, 85],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
}

export default function AnalyticsChart() {
  const [data, setData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
