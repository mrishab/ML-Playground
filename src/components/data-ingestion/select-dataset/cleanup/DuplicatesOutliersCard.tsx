import { Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { OutlierStrategy } from "@/types/dataCleanup";
import { useDuplicatesOutliersForm } from "./useDuplicatesOutliersForm";
import { OutliersSection } from "./OutliersSection";

interface DuplicatesOutliersCardProps {
  duplicateCount: number;
  numericColumns: string[];
  onRemoveDuplicates: () => void;
  onHandleOutliers: (col: string, strat: OutlierStrategy) => void;
}

export function DuplicatesOutliersCard({
  duplicateCount,
  numericColumns,
  onRemoveDuplicates,
  onHandleOutliers,
}: DuplicatesOutliersCardProps) {
  const form = useDuplicatesOutliersForm(numericColumns, onRemoveDuplicates, onHandleOutliers);

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Layers className="h-4 w-4 text-primary" />
          Duplicates &amp; Outliers
        </CardTitle>
        <CardDescription>De-duplicate identical rows and treat extreme values via IQR</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3 p-3 rounded-lg border border-border bg-card/40">
          <h4 className="text-xs font-semibold text-foreground">Duplicate Rows</h4>
          <p className="text-xs text-muted-foreground">Found {duplicateCount} identical record(s) across all columns.</p>
          <Button variant="outline" size="sm" onClick={form.onRemoveDuplicates} disabled={duplicateCount === 0} className="w-full h-8 text-xs transition-[transform,background-color,border-color,color] duration-150 ease-out active:scale-[0.98]">
            Remove {duplicateCount} Duplicate Rows
          </Button>
        </div>
        <OutliersSection
          numericColumns={numericColumns}
          selectedCol={form.selectedCol}
          onSelectCol={form.setSelectedCol}
          strategy={form.strategy}
          onStrategyChange={form.setStrategy}
          onSubmit={form.handleOutlierSubmit}
        />
      </CardContent>
    </Card>
  );
}
