import { Shuffle, Construction } from "lucide-react";
import { useDatasetStore } from "@/stores/dataset";
import { PageLayout } from "@/components/shared/PageLayout";
import { PrerequisiteGate } from "@/components/pipeline/PrerequisiteGate";
import { usePipelineSteps } from "@/hooks/usePipelineSteps";
import { Card, CardContent } from "@/components/ui/card";

export function TransformPage() {
  const df = useDatasetStore((state) => state.df);
  const { steps } = usePipelineSteps();
  const step1 = steps[0];

  return (
    <PageLayout
      icon={Shuffle}
      title="Transform"
      subtitle="Feature transformations"
      nextStep={
        df
          ? {
              message: "Ready to explore and split.",
              linkTo: "/pretrain/explore",
              linkText: "Explore Data",
            }
          : undefined
      }
    >
      {!df ? (
        <PrerequisiteGate step={step1} />
      ) : (
        <Card className="border-dashed transition-all duration-200">
          <CardContent className="flex flex-col items-center justify-center gap-3 py-16">
            <Construction className="h-12 w-12 text-muted-foreground/50" />
            <p className="text-sm font-medium text-muted-foreground">
              Transformation tools coming soon.
            </p>
          </CardContent>
        </Card>
      )}
    </PageLayout>
  );
}
