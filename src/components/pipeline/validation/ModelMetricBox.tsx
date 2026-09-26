import { cn } from "@/lib/utils";

interface ModelMetricBoxProps {
  label: string;
  value: string | number;
  truncate?: boolean;
}

export function ModelMetricBox({
  label,
  value,
  truncate,
}: ModelMetricBoxProps) {
  return (
    <div className="rounded-lg border bg-muted/30 p-3 transition-all duration-200 hover:bg-muted/50">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p
        className={cn(
          "text-xl font-bold text-foreground mt-1",
          truncate && "truncate",
        )}
      >
        {value}
      </p>
    </div>
  );
}
