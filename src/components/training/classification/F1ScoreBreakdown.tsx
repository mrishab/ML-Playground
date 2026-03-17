import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/number";
import type { ClassificationMetrics } from "@/types/classification";

type F1ScoreBreakdownProps = {
  metrics: ClassificationMetrics;
};

export function F1ScoreBreakdown({ metrics }: F1ScoreBreakdownProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">F1-Score Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Formula */}
        <div className="rounded-lg bg-muted p-4">
          <p className="mb-2 font-mono text-sm">
            F1 = 2 × (Precision × Recall) / (Precision + Recall)
          </p>
          <p className="text-sm text-muted-foreground">
            The harmonic mean of precision and recall. Ranges from 0 (worst) to
            1 (perfect). Particularly useful when class distribution is uneven.
          </p>
        </div>

        {/* Per-class table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class</TableHead>
                <TableHead className="text-right">Precision</TableHead>
                <TableHead className="text-right">Recall</TableHead>
                <TableHead className="text-right">F1-Score</TableHead>
                <TableHead className="text-right">Support</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {metrics.perClass.map((cls) => (
                <TableRow key={cls.label}>
                  <TableCell className="font-medium">{cls.label}</TableCell>
                  <TableCell className="text-right">
                    {formatNumber(cls.precision)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatNumber(cls.recall)}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatNumber(cls.f1Score)}
                  </TableCell>
                  <TableCell className="text-right">{cls.support}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Averages */}
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded border p-3">
            <span className="text-sm">Macro Avg F1-Score</span>
            <Badge variant="secondary">{formatNumber(metrics.macroF1)}</Badge>
          </div>
          <div className="flex items-center justify-between rounded border p-3">
            <span className="text-sm">Weighted Avg F1-Score</span>
            <Badge className="bg-emerald-500">
              {formatNumber(metrics.weightedF1)}
            </Badge>
          </div>
        </div>

        {/* Per-class F1 visual bars */}
        <div className="space-y-3">
          <p className="text-sm font-medium">Per-Class F1 Scores</p>
          {metrics.perClass.map((cls) => (
            <div key={cls.label} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">{cls.label}</span>
                <span className="font-medium">
                  {(cls.f1Score * 100).toFixed(1)}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-emerald-500 transition-all"
                  style={{
                    width: `${Math.max(0, Math.min(100, cls.f1Score * 100))}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Interpretation */}
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
          <p className="text-sm font-medium">Interpretation</p>
          <p className="mt-1 text-sm text-muted-foreground">
            The weighted average F1-score is{" "}
            <strong>{formatNumber(metrics.weightedF1)}</strong>. An F1-score
            close to 1 indicates both high precision and high recall. It is more
            informative than accuracy when classes are imbalanced.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
