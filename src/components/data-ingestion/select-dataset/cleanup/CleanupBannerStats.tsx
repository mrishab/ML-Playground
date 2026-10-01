import { AlertCircle, Copy } from "lucide-react";

interface BannerStatsProps {
  totalMissing: number;
  missingPercent: number;
  columnsWithMissing: number;
  duplicateCount: number;
}

export function CleanupBannerStats({
  totalMissing,
  missingPercent,
  columnsWithMissing,
  duplicateCount,
}: BannerStatsProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-xs">
      <div className="flex items-center gap-1.5 font-medium">
        <AlertCircle className="h-4 w-4 text-amber-500" />
        <span>Missing Values:</span>
        <span className="font-semibold text-foreground">
          {totalMissing} ({missingPercent.toFixed(1)}%)
        </span>
        <span className="text-muted-foreground">across {columnsWithMissing} col(s)</span>
      </div>
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Copy className="h-3.5 w-3.5" />
        <span>Duplicates:</span>
        <span className="font-semibold text-foreground">{duplicateCount}</span>
      </div>
    </div>
  );
}
