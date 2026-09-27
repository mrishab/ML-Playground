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
    <div className="rounded-lg border bg-muted/30 p-3 transition-[background-color,border-color] duration-150 ease-out hover:bg-muted/50">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p
        className={cn(
          "text-lg sm:text-xl font-bold text-foreground mt-0.5 truncate",
          truncate && "truncate",
        )}
      >
        {value}
      </p>
    </div>
  );
}
