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
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      <div className="flex flex-col items-center rounded-lg border bg-background p-2 sm:p-3 text-center transition-[transform,border-color,background-color,box-shadow] duration-150 ease-out hover:-translate-y-0.5 hover:shadow-sm hover:border-primary/30">
        <Database className="mb-1 h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-500" />
        <span className="text-sm font-semibold sm:text-lg">
          {stats.trainRows}
        </span>
        <span className="text-[10px] text-muted-foreground sm:text-xs truncate max-w-full">
          Train ({trainPercent}%)
        </span>
      </div>
      <div className="flex flex-col items-center rounded-lg border bg-background p-2 sm:p-3 text-center transition-[transform,border-color,background-color,box-shadow] duration-150 ease-out hover:-translate-y-0.5 hover:shadow-sm hover:border-primary/30">
        <FlaskConical className="mb-1 h-3.5 w-3.5 sm:h-4 sm:w-4 text-orange-500" />
        <span className="text-sm font-semibold sm:text-lg">
          {stats.testRows}
        </span>
        <span className="text-[10px] text-muted-foreground sm:text-xs truncate max-w-full">
          Test ({testPercent}%)
        </span>
      </div>
      <div className="flex flex-col items-center rounded-lg border bg-background p-2 sm:p-3 text-center transition-[transform,border-color,background-color,box-shadow] duration-150 ease-out hover:-translate-y-0.5 hover:shadow-sm hover:border-primary/30">
        <Columns className="mb-1 h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-500" />
        <span className="text-sm font-semibold sm:text-lg">
          {stats.featureCount}
        </span>
        <span className="text-[10px] text-muted-foreground sm:text-xs truncate max-w-full">
          Features
        </span>
      </div>
    </div>
  );
}
