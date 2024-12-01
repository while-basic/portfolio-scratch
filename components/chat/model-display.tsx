import { Brain } from "lucide-react"
import { cn } from "@/lib/utils"

interface ModelDisplayProps {
  model: string
  className?: string
}

export function ModelDisplay({ model, className }: ModelDisplayProps) {
  return (
    <div className={cn("flex items-center gap-1.5 text-xs text-gray-400", className)}>
      <Brain className="h-3 w-3" />
      <span>Model: {model}</span>
    </div>
  )
}
