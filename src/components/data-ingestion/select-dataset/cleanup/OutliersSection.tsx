import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { OutlierStrategy } from "@/types/dataCleanup";

interface OutliersSectionProps {
  numericColumns: string[];
  selectedCol: string;
  onSelectCol: (col: string) => void;
  strategy: OutlierStrategy;
  onStrategyChange: (strat: OutlierStrategy) => void;
  onSubmit: () => void;
}

export function OutliersSection(p: OutliersSectionProps) {
  return (
    <div className="space-y-3 p-3 rounded-lg border border-border bg-card/40">
      <h4 className="text-xs font-semibold flex items-center gap-1.5 text-foreground">
        <ShieldAlert className="h-3.5 w-3.5 text-amber-500" />
        Outlier Treatment (IQR 1.5x)
      </h4>
      <div className="grid grid-cols-2 gap-2">
        <Select value={p.selectedCol} onValueChange={p.onSelectCol}>
          <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Column" /></SelectTrigger>
          <SelectContent>{p.numericColumns.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={p.strategy} onValueChange={(v) => p.onStrategyChange(v as OutlierStrategy)}>
          <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="clip">Clip Bounds</SelectItem>
            <SelectItem value="drop">Drop Rows</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button
        size="sm"
        onClick={p.onSubmit}
        disabled={!p.selectedCol}
        className="w-full h-8 text-xs transition-[transform,background-color,border-color,color] duration-150 ease-out active:scale-[0.98]"
      >
        Apply Outlier Treatment
      </Button>
    </div>
  );
}
