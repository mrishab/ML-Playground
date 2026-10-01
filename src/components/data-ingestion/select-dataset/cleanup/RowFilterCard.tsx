import { Filter, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { RowFilter } from "@/types/dataCleanup";
import { useRowFilterForm } from "./useRowFilterForm";
import { RowFilterInputs } from "./RowFilterInputs";

interface RowFilterCardProps {
  columns: string[];
  values: unknown[][];
  onFilter: (filter: RowFilter, keep: boolean) => void;
}

export function RowFilterCard({ columns, values, onFilter }: RowFilterCardProps) {
  const form = useRowFilterForm(columns, values, onFilter);

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Filter className="h-4 w-4 text-primary" />
          Row Filter &amp; Investigation
        </CardTitle>
        <CardDescription>Inspect and filter rows matching specific conditions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <RowFilterInputs
          columns={columns}
          column={form.column}
          onColumnChange={form.setColumn}
          operator={form.operator}
          onOperatorChange={form.setOperator}
          value={form.value}
          onValueChange={form.setValue}
        />
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <span className="text-xs text-muted-foreground">
            Matching rows: <strong className="text-foreground">{form.matchCount}</strong> / {values.length}
          </span>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="default" onClick={form.handleKeep} disabled={form.matchCount === 0} className="h-8 gap-1.5 text-xs transition-[transform,background-color,border-color,color] duration-150 ease-out active:scale-[0.98]">
              <Check className="h-3.5 w-3.5" /> Keep Matching
            </Button>
            <Button size="sm" variant="outline" onClick={form.handleDrop} disabled={form.matchCount === 0} className="h-8 gap-1.5 text-xs text-destructive hover:bg-destructive/10 transition-[transform,background-color,border-color,color] duration-150 ease-out active:scale-[0.98]">
              <X className="h-3.5 w-3.5" /> Drop Matching
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
