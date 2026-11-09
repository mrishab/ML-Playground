import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AnomalySamplePoint } from "@/types/isolationForest";

type Props = {
  anomalies: AnomalySamplePoint[];
};

export function TopAnomaliesTable({ anomalies }: Props) {
  if (anomalies.length === 0) return null;
  const sample = anomalies[0];
  const featureKeys = Object.keys(sample?.features ?? {}).slice(0, 4);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Top Detected Outliers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto max-h-56">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b text-muted-foreground">
                <th className="py-1.5 px-2">Row</th>
                <th className="py-1.5 px-2">Score</th>
                {featureKeys.map((k) => (
                  <th key={k} className="py-1.5 px-2">{k}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {anomalies.slice(0, 10).map((pt) => (
                <tr key={pt.index} className="border-b border-border/40 hover:bg-muted/30">
                  <td className="py-1.5 px-2 font-mono">#{pt.index}</td>
                  <td className="py-1.5 px-2">
                    <Badge variant="destructive" className="font-mono text-[10px] h-4">
                      {pt.score.toFixed(3)}
                    </Badge>
                  </td>
                  {featureKeys.map((k) => (
                    <td key={k} className="py-1.5 px-2 font-mono text-muted-foreground">
                      {pt.features[k]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
