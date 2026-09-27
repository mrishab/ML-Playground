import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/number";
import type { ClassROC } from "@/types/classification";
import { ROC_COLORS } from "./colors";

export function ROCAUCSummary({ rocCurves }: { rocCurves: ClassROC[] }) {
  return (
    <div className="space-y-2">
      {rocCurves.map((curve, i) => (
        <div
          key={curve.label}
          className="flex items-center justify-between rounded border p-2.5 transition-[background-color,border-color] duration-150 ease-out hover:bg-muted/40"
        >
          <div className="flex min-w-0 items-center gap-2">
            <div
              className="h-3 w-3 shrink-0 rounded-full"
              style={{ backgroundColor: ROC_COLORS[i % ROC_COLORS.length] }}
            />
            <span className="truncate text-sm">AUC ({curve.label})</span>
          </div>
          <Badge
            variant="secondary"
            className="shrink-0"
            style={{ color: ROC_COLORS[i % ROC_COLORS.length] }}
          >
            {formatNumber(curve.auc)}
          </Badge>
        </div>
      ))}
    </div>
  );
}
