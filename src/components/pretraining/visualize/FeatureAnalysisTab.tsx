import { Tabs, TabsContent } from "@/components/ui/tabs";
import { FeatureImpactHeader } from "./FeatureImpactHeader";
import { FeatureViewToggle } from "./FeatureViewToggle";
import { FeatureAnalysisGrid } from "./FeatureAnalysisGrid";
import { FeatureAnalysisFocusedViews } from "./FeatureAnalysisFocusedViews";
import { useFeatureAnalysisTab } from "./useFeatureAnalysisTab";

interface Props {
  x: number[];
  y: (number | string)[];
  featureName: string;
  targetColumn: string;
  problemType?: string;
}

export function FeatureAnalysisTab(props: Props) {
  const { analysis } = useFeatureAnalysisTab(props);

  return (
    <div className="space-y-4">
      <FeatureImpactHeader analysis={analysis} />
      <Tabs defaultValue="grid" className="w-full space-y-4">
        <FeatureViewToggle />
        <TabsContent value="grid">
          <FeatureAnalysisGrid {...props} analysis={analysis} />
        </TabsContent>
        <FeatureAnalysisFocusedViews {...props} analysis={analysis} />
      </Tabs>
    </div>
  );
}
