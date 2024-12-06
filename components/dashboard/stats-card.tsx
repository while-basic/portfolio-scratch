"use client"

import { Card } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  icon?: React.ReactNode
  description?: string
  change?: string
  trend?: 'up' | 'down'
}

export function StatsCard({
  title,
  value,
  icon,
  description,
  change,
  trend,
}: StatsCardProps) {
  return (
    <Card className="p-6 hover:border-primary/50 transition-all duration-300 group">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground group-hover:text-primary/80 transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-2xl font-bold">{value}</p>
            {change && (
              <span className={`text-sm font-medium ${
                trend === 'up' ? 'text-green-500' : 'text-red-500'
              } flex items-center gap-1 transition-transform group-hover:scale-105`}>
                {trend === 'up' ? 
                  <ArrowUpIcon className="w-4 h-4" /> : 
                  <ArrowDownIcon className="w-4 h-4" />
                }
                {change}
              </span>
            )}
          </div>
          {description && (
            <p className="text-sm text-muted-foreground mt-2">{description}</p>
          )}
        </div>
        {icon && (
          <div className="text-muted-foreground group-hover:text-primary/80 transition-colors">
            {icon}
          </div>
        )}
      </div>
    </Card>
  )
}
