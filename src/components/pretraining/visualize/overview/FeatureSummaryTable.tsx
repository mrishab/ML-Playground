import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FeatureSummaryRow } from "./FeatureSummaryRow";
import type { FeatureRankItem } from "./useOverviewData";

interface Props {
  rankings: FeatureRankItem[];
  targetColumn: string;
}

export function FeatureSummaryTable({ rankings, targetColumn }: Props) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">
          Feature Relationship Ranking (vs {targetColumn})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b text-muted-foreground">
                <th className="py-2 text-left font-medium">Rank</th>
                <th className="py-2 text-left font-medium">Feature</th>
                <th className="py-2 text-right font-medium">Pearson r</th>
                <th className="py-2 text-right font-medium">Spearman ρ</th>
                <th className="py-2 text-right font-medium">Variance (R²)</th>
                <th className="py-2 text-right font-medium">Direction</th>
              </tr>
            </thead>
            <tbody>
              {rankings.map((item, idx) => (
                <FeatureSummaryRow
                  key={item.feature}
                  item={item}
                  rank={idx + 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
