import { Coins } from 'lucide-react'

interface TokenUsage {
  total_tokens: number
  prompt_tokens: number
  completion_tokens: number
  estimated_cost: number
}

interface TokenDisplayProps {
  usage: TokenUsage | null
}

export function TokenDisplay({ usage }: TokenDisplayProps) {
  if (!usage) return null

  return (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      <div className="flex items-center gap-1.5">
        <Coins className="h-3.5 w-3.5" />
        <span className="tabular-nums">
          ${usage.estimated_cost.toFixed(4)}
        </span>
      </div>
      <div className="tabular-nums">
        {usage.total_tokens.toLocaleString()} tokens
      </div>
    </div>
  )
}
