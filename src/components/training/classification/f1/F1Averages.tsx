import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/number";

export function F1Averages({
  macroF1,
  weightedF1,
}: {
  macroF1: number;
  weightedF1: number;
}) {
  return (
    <div className="space-y-2 sm:space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded border p-2.5 sm:p-3">
        <span className="text-xs sm:text-sm">Macro Avg F1-Score</span>
        <Badge variant="secondary" className="shrink-0">
          {formatNumber(macroF1)}
        </Badge>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 rounded border p-2.5 sm:p-3">
        <span className="text-xs sm:text-sm">Weighted Avg F1-Score</span>
        <Badge className="bg-emerald-500 shrink-0">
          {formatNumber(weightedF1)}
        </Badge>
      </div>
    </div>
  );
}
