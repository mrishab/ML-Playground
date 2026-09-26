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
    <div className="space-y-3">
      <div className="flex items-center justify-between rounded border p-3">
        <span className="text-sm">Macro Avg F1-Score</span>
        <Badge variant="secondary">{formatNumber(macroF1)}</Badge>
      </div>
      <div className="flex items-center justify-between rounded border p-3">
        <span className="text-sm">Weighted Avg F1-Score</span>
        <Badge className="bg-emerald-500">{formatNumber(weightedF1)}</Badge>
      </div>
    </div>
  );
}
