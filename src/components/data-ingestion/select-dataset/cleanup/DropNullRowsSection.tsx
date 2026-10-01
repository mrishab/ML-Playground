import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { DropNullStrategy } from "@/types/dataCleanup";

interface RowsSectionProps {
  columns: string[];
  totalMissing: number;
  rowStrategy: DropNullStrategy;
  onRowStrategyChange: (strat: DropNullStrategy) => void;
  selectedCol: string;
  onSelectedColChange: (col: string) => void;
  onSubmit: () => void;
}

export function DropNullRowsSection(p: RowsSectionProps) {
  return (
    <div className="space-y-3 p-3 rounded-lg border border-border bg-card/40">
      <h4 className="text-xs font-semibold text-foreground">Drop Rows</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <Select value={p.rowStrategy} onValueChange={(v) => p.onRowStrategyChange(v as DropNullStrategy)}>
          <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any cell is null</SelectItem>
            <SelectItem value="all">All cells are null</SelectItem>
            <SelectItem value="selected">Column is null</SelectItem>
          </SelectContent>
        </Select>
        {p.rowStrategy === "selected" && (
          <Select value={p.selectedCol} onValueChange={p.onSelectedColChange}>
            <SelectTrigger className="h-9"><SelectValue placeholder="Column" /></SelectTrigger>
            <SelectContent>{p.columns.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
          </Select>
        )}
      </div>
      <Button
        variant="destructive"
        size="sm"
        onClick={p.onSubmit}
        disabled={p.totalMissing === 0}
        className="w-full h-8 text-xs transition-[transform,background-color,border-color,color] duration-150 ease-out active:scale-[0.98]"
      >
        Drop Matching Rows
      </Button>
    </div>
  );
}
