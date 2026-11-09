import { Card, CardContent } from "@/components/ui/card";
import type { IsolationForestMetrics } from "@/types/isolationForest";

type Props = {
  metrics: IsolationForestMetrics;
};

export function AnomalySummaryCards({ metrics }: Props) {
  const cards = [
    { label: "Anomalies Detected", value: String(metrics.anomalyCount), sub: `of ${metrics.totalSamples} samples` },
    { label: "Anomaly Rate", value: `${(metrics.anomalyRate * 100).toFixed(1)}%`, sub: `target ${(metrics.contamination * 100).toFixed(0)}%` },
    { label: "Score Threshold", value: metrics.thresholdScore.toFixed(3), sub: "scores >= thresh = outlier" },
    { label: "Mean Anomaly Score", value: metrics.meanScore.toFixed(3), sub: `range ${metrics.minScore.toFixed(2)} - ${metrics.maxScore.toFixed(2)}` },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
      {cards.map((c) => (
        <Card key={c.label}>
          <CardContent className="p-4">
            <span className="text-xs text-muted-foreground">{c.label}</span>
            <div className="mt-1 text-2xl font-bold font-mono tracking-tight">{c.value}</div>
            <span className="text-[10px] text-muted-foreground">{c.sub}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
