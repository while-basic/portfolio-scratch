// Unused imports commented out:
// import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface UsageMetricsProps {
  tokenUsage: number;
  tokenLimit: number;
  imageCount: number;
  imageLimit: number;
}

export function UsageMetrics({ tokenUsage, tokenLimit, imageCount, imageLimit }: UsageMetricsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Usage Summary</h3>
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span>Monthly Token Usage</span>
          <span>{tokenUsage.toLocaleString()} / {tokenLimit.toLocaleString()}</span>
        </div>
        <Progress value={(tokenUsage / tokenLimit) * 100} />
      </div>
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span>Image Generation</span>
          <span>{imageCount} / {imageLimit}</span>
        </div>
        <Progress value={(imageCount / imageLimit) * 100} />
      </div>
    </div>
  );
} 