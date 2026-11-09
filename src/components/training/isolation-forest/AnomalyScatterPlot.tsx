import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IsolationForestMetrics } from "@/types/isolationForest";

type Props = {
  metrics: IsolationForestMetrics;
};

export function AnomalyScatterPlot({ metrics }: Props) {
  const coords = metrics.coordinates2D ?? [];
  if (coords.length === 0) return null;

  const minX = Math.min(...coords.map((c) => c.x));
  const maxX = Math.max(...coords.map((c) => c.x));
  const minY = Math.min(...coords.map((c) => c.y));
  const maxY = Math.max(...coords.map((c) => c.y));

  const rangeX = Math.max(0.001, maxX - minX);
  const rangeY = Math.max(0.001, maxY - minY);

  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-sm">2D Projection & Outlier Map</CardTitle>
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-chart-2 inline-block" /> Normal
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-destructive inline-block" /> Anomaly
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-56 w-full relative bg-muted/20 rounded-md border border-border/50 p-2 overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {coords.map((pt, i) => {
              const cx = 5 + ((pt.x - minX) / rangeX) * 90;
              const cy = 95 - ((pt.y - minY) / rangeY) * 90;
              return (
                <circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r={pt.isAnomaly ? 2.5 : 1.5}
                  className={pt.isAnomaly ? "fill-destructive opacity-90" : "fill-chart-2 opacity-40"}
                />
              );
            })}
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}
