import { FeatureSelectionCard } from "./FeatureSelectionCard";
import { DataSplitSettingsCard } from "./DataSplitSettingsCard";
import { SplitResults } from "./SplitResults";
import type { useExplorePage } from "./useExplorePage";

type ExplorePageHookReturn = ReturnType<typeof useExplorePage>;

interface ExploreLeftColumnProps {
  explore: ExplorePageHookReturn;
}

export function ExploreLeftColumn({ explore }: ExploreLeftColumnProps) {
  return (
    <div className="space-y-4">
      <FeatureSelectionCard
        targetColumn={explore.targetColumn}
        setTargetColumn={explore.setTargetColumn}
        columns={explore.columns}
        numericColumns={explore.numericColumns}
        selectedFeatures={explore.selectedFeatures}
        availableInteractionColumns={explore.availableInteractionColumns}
        addFeature={explore.addFeature}
        removeFeature={explore.removeFeature}
        updateFeatureTransformation={explore.updateFeatureTransformation}
        clearFeatures={explore.clearFeatures}
      />
      <DataSplitSettingsCard
        problemType={explore.problemType}
        setProblemType={explore.setProblemType}
        shuffle={explore.shuffle}
        setShuffle={explore.setShuffle}
        testSplitPercent={explore.testSplitPercent}
        setTestSplitPercent={explore.setTestSplitPercent}
        isSplit={explore.isSplit}
        isExploreDirty={explore.isExploreDirty}
        canSplit={explore.canSplit}
        performSplit={explore.performSplit}
        targetColumn={explore.targetColumn}
        selectedFeatures={explore.selectedFeatures}
        hasDefaultConfig={explore.hasDefaultConfig}
        isLoadingConfig={explore.isLoadingConfig}
        loadDefaultConfig={explore.loadDefaultConfig}
      />
      <SplitResults
        stats={explore.splitStats}
        targetColumn={explore.targetColumn}
      />
    </div>
  );
}
