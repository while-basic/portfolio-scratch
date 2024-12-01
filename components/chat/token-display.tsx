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
    <div className="flex items-center gap-4 text-sm text-gray-400">
      <div className="flex items-center gap-1.5">
        <Coins className="h-4 w-4" />
        <span>
          ${usage.estimated_cost.toFixed(4)}
        </span>
      </div>
      <div>
        {usage.total_tokens.toLocaleString()} tokens
      </div>
    </div>
  )
}
