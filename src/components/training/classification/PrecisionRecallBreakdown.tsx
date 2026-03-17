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

type PrecisionRecallBreakdownProps = {
  metrics: ClassificationMetrics;
};

export function PrecisionRecallBreakdown({
  metrics,
}: PrecisionRecallBreakdownProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          Precision & Recall Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Formulas */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-muted p-4">
            <p className="mb-2 font-mono text-sm">Precision = TP / (TP + FP)</p>
            <p className="text-sm text-muted-foreground">
              Of all instances predicted as a class, how many were actually that
              class?
            </p>
          </div>
          <div className="rounded-lg bg-muted p-4">
            <p className="mb-2 font-mono text-sm">Recall = TP / (TP + FN)</p>
            <p className="text-sm text-muted-foreground">
              Of all actual instances of a class, how many did the model
              correctly identify?
            </p>
          </div>
        </div>

        {/* Per-class table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class</TableHead>
                <TableHead className="text-right">Precision</TableHead>
                <TableHead className="text-right">Recall</TableHead>
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
                  <TableCell className="text-right">{cls.support}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Averages */}
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded border p-3">
            <span className="text-sm">Macro Avg Precision</span>
            <Badge variant="secondary">
              {formatNumber(metrics.macroPrecision)}
            </Badge>
          </div>
          <div className="flex items-center justify-between rounded border p-3">
            <span className="text-sm">Macro Avg Recall</span>
            <Badge variant="secondary">
              {formatNumber(metrics.macroRecall)}
            </Badge>
          </div>
          <div className="flex items-center justify-between rounded border p-3">
            <span className="text-sm">Weighted Avg Precision</span>
            <Badge className="bg-purple-500">
              {formatNumber(metrics.weightedPrecision)}
            </Badge>
          </div>
          <div className="flex items-center justify-between rounded border p-3">
            <span className="text-sm">Weighted Avg Recall</span>
            <Badge className="bg-purple-500">
              {formatNumber(metrics.weightedRecall)}
            </Badge>
          </div>
        </div>

        {/* Interpretation */}
        <div className="rounded-lg border border-purple-500/30 bg-purple-500/5 p-4">
          <p className="text-sm font-medium">Interpretation</p>
          <p className="mt-1 text-sm text-muted-foreground">
            <strong>Precision</strong> measures how many of the model's positive
            predictions were correct. <strong>Recall</strong> measures how many
            actual positives the model found. A trade-off often exists:
            improving one may reduce the other.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
