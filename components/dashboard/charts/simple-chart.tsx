"use client"

interface DataPoint {
  day: string
  value: number
}

interface SimpleChartProps {
  data: DataPoint[]
  height?: number
  color?: string
}

export function SimpleChart({ data, height = 200, color = "#8884d8" }: SimpleChartProps) {
  const maxValue = Math.max(...data.map(d => d.value))
  
  return (
    <div style={{ height: `${height}px` }} className="relative">
      <div className="absolute inset-0 flex items-end justify-between gap-1">
        {data.map((point, i) => {
          const percentage = (point.value / maxValue) * 100
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div 
                style={{ 
                  height: `${percentage}%`,
                  backgroundColor: color
                }}
                className="w-full rounded-t transition-all duration-300"
              />
              <span className="text-xs text-muted-foreground rotate-45 origin-left">
                {point.day}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
} 