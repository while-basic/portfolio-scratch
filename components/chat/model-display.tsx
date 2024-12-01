import { Cpu } from "lucide-react"
import { cn } from "@/lib/utils"

interface ModelDisplayProps {
  model: string
  className?: string
}

export function ModelDisplay({ model, className }: ModelDisplayProps) {
  return (
    <div className={cn("flex items-center gap-1 text-gray-400", className)}>
      <Cpu className="h-3 w-3" />
      <span>{model}</span>
    </div>
  )
}
