import { Database, FlaskConical, Columns } from "lucide-react";
import type { SplitStats } from "../useSplitResults";

interface SplitStatsGridProps {
  stats: SplitStats;
  trainPercent: string;
  testPercent: string;
}

export function SplitStatsGrid({
  stats,
  trainPercent,
  testPercent,
}: SplitStatsGridProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="flex flex-col items-center rounded-lg border bg-background p-3">
        <Database className="mb-1 h-4 w-4 text-blue-500" />
        <span className="text-lg font-semibold">{stats.trainRows}</span>
        <span className="text-xs text-muted-foreground">
          Train ({trainPercent}%)
        </span>
      </div>
      <div className="flex flex-col items-center rounded-lg border bg-background p-3">
        <FlaskConical className="mb-1 h-4 w-4 text-orange-500" />
        <span className="text-lg font-semibold">{stats.testRows}</span>
        <span className="text-xs text-muted-foreground">
          Test ({testPercent}%)
        </span>
      </div>
      <div className="flex flex-col items-center rounded-lg border bg-background p-3">
        <Columns className="mb-1 h-4 w-4 text-purple-500" />
        <span className="text-lg font-semibold">{stats.featureCount}</span>
        <span className="text-xs text-muted-foreground">Features</span>
      </div>
    </div>
  );
}
