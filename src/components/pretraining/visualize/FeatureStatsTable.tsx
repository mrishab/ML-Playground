import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buildStatsRows } from "./stats/buildStatsRows";
import type { BivariateAnalysis } from "@/lib/bivariate";

interface Props {
  analysis: BivariateAnalysis;
}

export function FeatureStatsTable({ analysis }: Props) {
  const { featureName, targetName } = analysis;
  const rows = buildStatsRows(analysis);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">
          Statistical Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b text-muted-foreground">
                <th className="py-2 text-left font-medium">Metric</th>
                <th className="py-2 text-right font-medium">
                  {featureName} (X)
                </th>
                <th className="py-2 text-right font-medium">
                  {targetName} (Y)
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.metric} className="border-b/50 hover:bg-muted/30">
                  <td className="py-1.5 font-medium">{row.metric}</td>
                  <td className="py-1.5 text-right font-mono">{row.x}</td>
                  <td className="py-1.5 text-right font-mono">{row.y}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
