import { Badge } from "@/components/ui/badge";

interface DatasetCardBadgesProps {
  isCustom?: boolean;
  problemType?: string;
  rowCount?: number;
  columnCount?: number;
}

export function DatasetCardBadges({
  isCustom,
  problemType,
  rowCount,
  columnCount,
}: DatasetCardBadgesProps) {
  return (
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
  );
}
