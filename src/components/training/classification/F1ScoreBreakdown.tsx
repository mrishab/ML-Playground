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
        <div className="rounded-lg bg-muted/60 p-3 text-center">
          <p className="font-mono text-sm">
            F1 = 2 × (Precision × Recall) / (Precision + Recall)
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
                  className="h-full bg-emerald-500 transition-all duration-300 ease-out"
                  style={{
                    width: `${Math.max(0, Math.min(100, cls.f1Score * 100))}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
