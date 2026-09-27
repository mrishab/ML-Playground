import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus, Info } from "lucide-react";
import { FeatureImpactMetrics } from "./header/FeatureImpactMetrics";
import type { BivariateAnalysis } from "@/lib/bivariate";

interface Props {
  analysis: BivariateAnalysis;
}

export function FeatureImpactHeader({ analysis }: Props) {
  const isPos = analysis.pearsonR > 0.05;
  const isNeg = analysis.pearsonR < -0.05;
  const rStr = `${analysis.pearsonR >= 0 ? "+" : ""}${analysis.pearsonR.toFixed(3)}`;

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardContent className="p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">
              {analysis.featureName} vs {analysis.targetName}
            </span>
            <Badge
              variant={isPos ? "default" : isNeg ? "destructive" : "secondary"}
              className="text-xs gap-1"
            >
              {isPos && <TrendingUp className="h-3 w-3" />}
              {isNeg && <TrendingDown className="h-3 w-3" />}
              {!isPos && !isNeg && <Minus className="h-3 w-3" />}
              {analysis.strengthLabel} {analysis.directionLabel} (r = {rStr})
            </Badge>
          </div>
          <FeatureImpactMetrics analysis={analysis} />
        </div>
        <div className="flex items-start gap-2 text-xs text-muted-foreground bg-background/60 rounded-md p-2.5 border">
          <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <p className="leading-relaxed">{analysis.summarySentence}</p>
        </div>
      </CardContent>
    </Card>
  );
}
