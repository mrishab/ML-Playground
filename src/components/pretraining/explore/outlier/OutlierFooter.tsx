import { Button } from "@/components/ui/button";

interface OutlierFooterProps {
  totalOutliers: number;
  rowsAffected: number;
  onDrop: () => void;
}

export function OutlierFooter({
  totalOutliers,
  rowsAffected,
  onDrop,
}: OutlierFooterProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
      <span className="text-muted-foreground">
        Outliers: {totalOutliers} · Rows affected: {rowsAffected}
      </span>
      <Button
        variant="destructive"
        size="sm"
        onClick={onDrop}
        disabled={rowsAffected === 0}
      >
        Drop Outliers
      </Button>
    </div>
  );
}
