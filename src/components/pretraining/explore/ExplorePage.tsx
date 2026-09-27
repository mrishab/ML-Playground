import { Search } from "lucide-react";
import { PageLayout } from "@/components/shared/PageLayout";
import { useExplorePage } from "./useExplorePage";
import { usePipelineSteps } from "@/hooks/usePipelineSteps";
import { useExplorePrimaryAction } from "./useExplorePrimaryAction";
import { ExploreLeftColumn } from "./ExploreLeftColumn";
import { ExploreRightColumn } from "./ExploreRightColumn";
import { ExploreLoadDefaultButton } from "./ExploreLoadDefaultButton";
import { ExploreWarningBanner } from "./ExploreWarningBanner";

import { ExplorePrereqGate } from "./ExplorePrereqGate";
import { PretrainSubNav } from "../shared/PretrainSubNav";

export function ExplorePage() {
  const { steps, defaultTrainRoute } = usePipelineSteps();
  const explore = useExplorePage();
  const primaryAction = useExplorePrimaryAction({
    ...explore,
    defaultTrainRoute,
  });

  if (!explore.df) {
    return <ExplorePrereqGate step={steps[1]} />;
  }

  return (
    <PageLayout
      icon={Search}
      title="Explore & Split"
      subtitle={`Features & split for ${explore.selectedDataset}`}
      actions={
        <div className="flex items-center gap-2">
          {explore.hasDefaultConfig && (
            <ExploreLoadDefaultButton
              isLoading={explore.isLoadingConfig}
              onClick={explore.loadDefaultConfig}
            />
          )}
          <PretrainSubNav isSplit={explore.isSplit} />
        </div>
      }
      primaryAction={primaryAction}
    >
      {explore.isExploreDirty && (
        <ExploreWarningBanner
          onRevert={explore.revertExploreChanges}
          onRecompute={explore.performSplit}
        />
      )}
      <div className="grid flex-1 gap-4 lg:grid-cols-2">
        <ExploreLeftColumn explore={explore} />
        <ExploreRightColumn explore={explore} />
      </div>
    </PageLayout>
  );
}
