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
          className="flex items-center justify-between rounded border p-2.5 transition-colors duration-200"
        >
          <div className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: ROC_COLORS[i % ROC_COLORS.length] }}
            />
            <span className="text-sm">AUC ({curve.label})</span>
          </div>
          <Badge
            variant="secondary"
            style={{ color: ROC_COLORS[i % ROC_COLORS.length] }}
          >
            {formatNumber(curve.auc)}
          </Badge>
        </div>
      ))}
    </div>
  );
}
