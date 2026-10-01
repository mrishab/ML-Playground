import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { DropNullStrategy } from "@/types/dataCleanup";
import { useDropNullForm } from "./useDropNullForm";
import { DropNullRowsSection } from "./DropNullRowsSection";

interface DropNullCardProps {
  columns: string[];
  totalMissing: number;
  onDropRows: (strat: DropNullStrategy, targetCol?: string) => void;
  onDropCols: (threshold: number) => void;
}

export function DropNullCard({ columns, totalMissing, onDropRows, onDropCols }: DropNullCardProps) {
  const form = useDropNullForm(columns, onDropRows, onDropCols);

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Trash2 className="h-4 w-4 text-destructive" />
          Drop Null Values
        </CardTitle>
        <CardDescription>Purge rows or columns contaminated with missing values</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <DropNullRowsSection
            columns={columns}
            totalMissing={totalMissing}
            rowStrategy={form.rowStrategy}
            onRowStrategyChange={form.setRowStrategy}
            selectedCol={form.selectedCol}
            onSelectedColChange={form.setSelectedCol}
            onSubmit={form.handleDropRowsSubmit}
          />
          <div className="space-y-3 p-3 rounded-lg border border-border bg-card/40">
            <h4 className="text-xs font-semibold text-foreground">Drop Columns by Missing %</h4>
            <div className="flex items-center gap-2">
              <Input type="number" min={1} max={100} className="h-9" value={form.threshold} onChange={(e) => form.setThreshold(Number(e.target.value))} />
              <span className="text-xs text-muted-foreground whitespace-nowrap">% threshold</span>
            </div>
            <Button variant="outline" size="sm" onClick={form.handleDropColsSubmit} className="w-full h-8 text-xs text-destructive hover:bg-destructive/10 transition-[transform,background-color,border-color,color] duration-150 ease-out active:scale-[0.98]">
              Drop Sparse Columns
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
