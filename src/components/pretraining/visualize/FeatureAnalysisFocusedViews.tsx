import { TabsContent } from "@/components/ui/tabs";
import { FocusedScatterView } from "./focused/FocusedScatterView";
import { FocusedHeatmapView } from "./focused/FocusedHeatmapView";
import { FocusedDistributionView } from "./focused/FocusedDistributionView";
import { FeatureStatsTable } from "./FeatureStatsTable";
import type { BivariateAnalysis } from "@/lib/bivariate";

interface Props {
  x: number[];
  y: (number | string)[];
  featureName: string;
  targetColumn: string;
  problemType?: string;
  analysis: BivariateAnalysis;
}

export function FeatureAnalysisFocusedViews(props: Props) {
  return (
    <>
      <FocusedScatterView {...props} />
      <FocusedHeatmapView {...props} />
      <FocusedDistributionView {...props} />
      <TabsContent value="stats">
        <FeatureStatsTable analysis={props.analysis} />
      </TabsContent>
    </>
  );
}
