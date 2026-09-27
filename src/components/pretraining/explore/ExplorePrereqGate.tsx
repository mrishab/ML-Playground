import { Search } from "lucide-react";
import { PageLayout } from "@/components/shared/PageLayout";
import { PrerequisiteGate } from "@/components/pipeline/PrerequisiteGate";
import type { PipelineStepInfo } from "@/stores/pipeline";

export function ExplorePrereqGate({ step }: { step: PipelineStepInfo }) {
  return (
    <PageLayout
      icon={Search}
      title="Explore & Split"
      subtitle="Configure features and create data splits"
    >
      <PrerequisiteGate step={step} />
    </PageLayout>
  );
}
