import type { BivariateAnalysis } from "@/lib/bivariate";

interface Props {
  analysis: BivariateAnalysis;
}

export function FeatureImpactMetrics({ analysis }: Props) {
  const r2Pct = (analysis.fit.r2 * 100).toFixed(1);
  const rhoStr = `${analysis.spearmanRho >= 0 ? "+" : ""}${analysis.spearmanRho.toFixed(3)}`;

  return (
    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
      <span>
        Spearman <strong className="text-foreground">{rhoStr}</strong>
      </span>
      <span>
        R² <strong className="text-foreground">{r2Pct}%</strong>
      </span>
      <span>
        Fit:{" "}
        <code className="text-foreground font-mono">
          {analysis.fit.equation}
        </code>
      </span>
    </div>
  );
}
