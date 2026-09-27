import { Card, CardContent } from "@/components/ui/card";
import { formatNumber } from "@/lib/number";

export type MetricCardProps = {
  label: string;
  value: number;
  subtitle: string;
  format?: "number" | "percent";
};

export function MetricCard({
  label,
  value,
  subtitle,
  format = "number",
}: MetricCardProps) {
  const displayValue =
    format === "percent" ? `${(value * 100).toFixed(2)}%` : formatNumber(value);

  return (
    <Card className="transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
        <div className="text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl sm:text-3xl font-bold truncate mt-0.5">
            {displayValue}
          </p>
          <p className="mt-1 text-[11px] sm:text-xs text-muted-foreground">
            {subtitle}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
