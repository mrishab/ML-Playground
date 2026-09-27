import { useMemo } from "react";
import { analyzeBivariate, type BivariateAnalysis } from "@/lib/bivariate";

interface Props {
  x: number[];
  y: (number | string)[];
  featureName: string;
  targetColumn: string;
  problemType?: string;
}

export function useFeatureAnalysisTab({
  x,
  y,
  featureName,
  targetColumn,
  problemType,
}: Props): { analysis: BivariateAnalysis } {
  const analysis = useMemo(() => {
    const numY = y.map(Number);
    return analyzeBivariate(x, numY, featureName, targetColumn, problemType);
  }, [x, y, featureName, targetColumn, problemType]);

  return { analysis };
}
