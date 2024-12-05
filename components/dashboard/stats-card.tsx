"use client"

import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: number | string
  loading?: boolean
  description?: string
  icon?: React.ReactNode
  change?: string
  trend?: 'up' | 'down'
}

export default function StatsCard({
  title,
  value,
  loading = false,
  description,
  icon,
  change,
  trend
}: StatsCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          {loading ? (
            <Skeleton className="h-7 w-20 mt-1" />
          ) : (
            <div className="flex items-center gap-2 mt-1">
              <p className="text-2xl font-bold">{value}</p>
              {change && (
                <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-500' : 'text-red-500'} flex items-center gap-1`}>
                  {trend === 'up' ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />}
                  {change}
                </span>
              )}
            </div>
          )}
          {description && (
            <p className="text-sm text-muted-foreground mt-2">{description}</p>
          )}
        </div>
        {icon && (
          <div className="text-muted-foreground">
            {icon}
          </div>
        )}
      </div>
    </Card>
  )
}
