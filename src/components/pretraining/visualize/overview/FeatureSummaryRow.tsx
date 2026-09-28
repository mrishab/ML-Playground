import { Badge } from "@/components/ui/badge";
import type { FeatureRankItem } from "./useOverviewData";

interface Props {
  item: FeatureRankItem;
  rank: number;
}

export function FeatureSummaryRow({ item, rank }: Props) {
  const variant =
    item.direction === "Positive"
      ? "default"
      : item.direction === "Negative"
        ? "destructive"
        : "secondary";

  return (
    <tr className="border-b/50 transition-colors duration-150 ease-out hover:bg-muted/30">
      <td className="py-2 font-mono text-muted-foreground">{rank}</td>
      <td className="py-2 font-medium">{item.feature}</td>
      <td className="py-2 text-right font-mono font-semibold">
        {item.r >= 0 ? "+" : ""}
        {item.r.toFixed(3)}
      </td>
      <td className="py-2 text-right font-mono">
        {item.rho >= 0 ? "+" : ""}
        {item.rho.toFixed(3)}
      </td>
      <td className="py-2 text-right font-mono">
        {(item.r2 * 100).toFixed(1)}%
      </td>
      <td className="py-2 text-right">
        <Badge variant={variant} className="text-[10px] px-1.5 py-0">
          {item.direction}
        </Badge>
      </td>
    </tr>
  );
}
