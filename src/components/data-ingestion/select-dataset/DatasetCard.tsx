import { FileSpreadsheet, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type DatasetCardProps = {
  name: string;
  problemType?: string;
  selected: boolean;
  onSelect: () => void;
  isCustom?: boolean;
  rowCount?: number;
  columnCount?: number;
  onDelete?: () => void;
};

export function DatasetCard({
  name,
  problemType,
  selected,
  onSelect,
  isCustom = false,
  rowCount,
  columnCount,
  onDelete,
}: DatasetCardProps) {
  return (
    <Card
      className={`group cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md ${
        selected ? "border-primary bg-primary/5 ring-1 ring-primary" : ""
      }`}
      onClick={onSelect}
    >
      <CardContent className="flex items-center gap-3 p-4">
        <div
          className={`rounded-full p-2 shrink-0 ${
            isCustom
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "bg-muted text-primary"
          }`}
        >
          <FileSpreadsheet className="h-6 w-6" />
        </div>
        <div className="flex flex-1 flex-col min-w-0">
          <div className="flex items-center justify-between gap-1">
            <p className="font-medium leading-none truncate">{name}</p>
            {isCustom && onDelete && (
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className="h-6 w-6 opacity-70 hover:opacity-100 hover:text-destructive shrink-0"
                title="Remove dataset"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            {isCustom && (
              <Badge
                variant="secondary"
                className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-[10px] px-1.5 py-0 uppercase tracking-wider"
              >
                Uploaded
              </Badge>
            )}
            {problemType && (
              <Badge
                variant="secondary"
                className="px-1.5 py-0 text-[10px] uppercase tracking-wider"
              >
                {problemType}
              </Badge>
            )}
            {rowCount !== undefined && (
              <span className="text-[11px] text-muted-foreground">
                {rowCount.toLocaleString()} rows
              </span>
            )}
            {columnCount !== undefined && (
              <span className="text-[11px] text-muted-foreground">
                · {columnCount} cols
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
