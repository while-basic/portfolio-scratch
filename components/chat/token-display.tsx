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
    <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground p-2">
      <span>
        Tokens: {usage.total_tokens} (${usage.estimated_cost.toFixed(6)})
      </span>
    </div>
  )
}
