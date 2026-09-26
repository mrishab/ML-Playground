import { DataSplitSettingsCard } from "./DataSplitSettingsCard";
import { FeatureSelectionCard } from "./FeatureSelectionCard";
import { ExploreSplitButton } from "./ExploreSplitButton";
import { SplitResults } from "./SplitResults";
import type { useExplorePage } from "./useExplorePage";

type ExplorePageHookReturn = ReturnType<typeof useExplorePage>;

interface ExploreLeftColumnProps {
  explore: ExplorePageHookReturn;
}

export function ExploreLeftColumn({ explore }: ExploreLeftColumnProps) {
  return (
    <div className="space-y-4">
      <DataSplitSettingsCard
        problemType={explore.problemType}
        setProblemType={explore.setProblemType}
        shuffle={explore.shuffle}
        setShuffle={explore.setShuffle}
        testSplitPercent={explore.testSplitPercent}
        setTestSplitPercent={explore.setTestSplitPercent}
        targetColumn={explore.targetColumn}
        setTargetColumn={explore.setTargetColumn}
        columns={explore.columns}
      />
      <FeatureSelectionCard
        numericColumns={explore.numericColumns}
        selectedFeatures={explore.selectedFeatures}
        availableInteractionColumns={explore.availableInteractionColumns}
        addFeature={explore.addFeature}
        removeFeature={explore.removeFeature}
        updateFeatureTransformation={explore.updateFeatureTransformation}
        clearFeatures={explore.clearFeatures}
      />
      <ExploreSplitButton
        isSplit={explore.isSplit}
        isExploreDirty={explore.isExploreDirty}
        canSplit={explore.canSplit}
        performSplit={explore.performSplit}
        targetColumn={explore.targetColumn}
        selectedFeatures={explore.selectedFeatures}
      />
      <SplitResults
        stats={explore.splitStats}
        targetColumn={explore.targetColumn}
      />
    </div>
  );
}
