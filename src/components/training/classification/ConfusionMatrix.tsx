import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ClassificationMetrics } from "@/types/classification";

type ConfusionMatrixProps = {
  metrics: ClassificationMetrics;
};

export function ConfusionMatrix({ metrics }: ConfusionMatrixProps) {
  const { confusionMatrix, labels } = metrics;

  // Find max value for color intensity scaling
  const maxVal = Math.max(...confusionMatrix.flat(), 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Confusion Matrix</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Formula / Description */}
        <div className="rounded-lg bg-muted p-4">
          <p className="text-sm text-muted-foreground">
            Rows represent <strong>actual</strong> classes, columns represent{" "}
            <strong>predicted</strong> classes. Diagonal cells are correct
            predictions (darker = more samples).
          </p>
        </div>

        {/* Matrix Grid */}
        <div className="overflow-x-auto">
          <table className="mx-auto border-collapse">
            <thead>
              <tr>
                {/* Top-left corner: axis label */}
                <th className="p-2 text-xs text-muted-foreground">
                  Actual \ Pred
                </th>
                {labels.map((label) => (
                  <th
                    key={label}
                    className="p-2 text-center text-xs font-medium"
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {labels.map((actualLabel, rowIdx) => (
                <tr key={actualLabel}>
                  <td className="p-2 text-right text-xs font-medium">
                    {actualLabel}
                  </td>
                  {labels.map((predLabel, colIdx) => {
                    const count = confusionMatrix[rowIdx][colIdx];
                    const isDiagonal = rowIdx === colIdx;
                    const intensity = count / maxVal;

                    return (
                      <td key={predLabel} className="p-1">
                        <div
                          className={cn(
                            "flex h-14 w-14 items-center justify-center rounded-md text-sm font-semibold transition-colors sm:h-16 sm:w-16",
                            isDiagonal
                              ? "bg-green-500 text-white"
                              : count > 0
                                ? "bg-red-500 text-white"
                                : "bg-muted text-muted-foreground",
                          )}
                          style={{
                            opacity: count > 0 ? 0.4 + intensity * 0.6 : 1,
                          }}
                        >
                          {count}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-green-500" />
            <span>Correct (diagonal)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-red-500" />
            <span>Misclassified</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
