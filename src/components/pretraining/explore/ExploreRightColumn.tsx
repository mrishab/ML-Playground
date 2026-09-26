import { OutlierVisualizer } from "./OutlierVisualizer";
import { FeaturePreviewCard } from "./FeaturePreviewCard";
import type { useExplorePage } from "./useExplorePage";

type ExplorePageHookReturn = ReturnType<typeof useExplorePage>;

interface ExploreRightColumnProps {
  explore: ExplorePageHookReturn;
}

export function ExploreRightColumn({ explore }: ExploreRightColumnProps) {
  return (
    <div className="space-y-4">
      {explore.numericColumnData.length > 0 && (
        <OutlierVisualizer
          numericColumnData={explore.numericColumnData}
          totalOutlierValues={explore.totalOutlierValues}
          removedRowsAfterOutlierDrop={explore.removedRowsAfterOutlierDrop}
          iqrMultiplier={explore.iqrMultiplier}
          setIqrMultiplier={explore.setIqrMultiplier}
          dropOutliers={explore.dropOutliers}
        />
      )}
      <FeaturePreviewCard
        previewColumns={explore.previewColumns}
        previewData={explore.previewData}
      />
    </div>
  );
}
