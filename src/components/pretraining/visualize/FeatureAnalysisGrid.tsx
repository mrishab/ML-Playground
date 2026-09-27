import { FeatureGridLeftColumn } from "./grid/FeatureGridLeftColumn";
import { FeatureGridRightColumn } from "./grid/FeatureGridRightColumn";
import type { BivariateAnalysis } from "@/lib/bivariate";

interface Props {
  x: number[];
  y: (number | string)[];
  featureName: string;
  targetColumn: string;
  problemType?: string;
  analysis: BivariateAnalysis;
}

export function FeatureAnalysisGrid(props: Props) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <FeatureGridLeftColumn {...props} />
      <FeatureGridRightColumn {...props} />
    </div>
  );
}
