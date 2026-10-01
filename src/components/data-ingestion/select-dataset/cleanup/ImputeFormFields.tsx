import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import type { ImputationStrategy, MissingSummary } from "@/types/dataCleanup";

interface FormFieldsProps {
  columns: string[];
  missingSummary: MissingSummary;
  selectedCol: string;
  onSelectCol: (col: string) => void;
  strategy: ImputationStrategy;
  onStrategyChange: (s: ImputationStrategy) => void;
  constantVal: string;
  onConstantChange: (v: string) => void;
}

export function ImputeFormFields(p: FormFieldsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      <div className="space-y-1.5">
        <label htmlFor="impute-target-col" className="text-xs font-medium text-muted-foreground">Target Column</label>
        <Select value={p.selectedCol} onValueChange={p.onSelectCol}>
          <SelectTrigger id="impute-target-col" className="h-9"><SelectValue placeholder="Select column" /></SelectTrigger>
          <SelectContent>
            {p.columns.map((c) => {
              const m = p.missingSummary.byColumn.find((item) => item.column === c)?.missing ?? 0;
              return <SelectItem key={c} value={c}>{c} {m > 0 ? `(${m} nulls)` : ""}</SelectItem>;
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <label htmlFor="impute-strategy-select" className="text-xs font-medium text-muted-foreground">Strategy</label>
        <Select value={p.strategy} onValueChange={(v) => p.onStrategyChange(v as ImputationStrategy)}>
          <SelectTrigger id="impute-strategy-select" className="h-9"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="mean">Mean (Average)</SelectItem>
            <SelectItem value="median">Median (Middle value)</SelectItem>
            <SelectItem value="mode">Mode (Most frequent)</SelectItem>
            <SelectItem value="ffill">Forward Fill (ffill)</SelectItem>
            <SelectItem value="bfill">Backward Fill (bfill)</SelectItem>
            <SelectItem value="constant">Custom Constant</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {p.strategy === "constant" && (
        <div className="space-y-1.5">
          <label htmlFor="impute-constant-val" className="text-xs font-medium text-muted-foreground">Constant Value</label>
          <Input id="impute-constant-val" className="h-9" placeholder="Enter value..." value={p.constantVal} onChange={(e) => p.onConstantChange(e.target.value)} />
        </div>
      )}
    </div>
  );
}
