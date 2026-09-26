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
      subtitle="Run custom transformations on your data"
      nextStep={
        df
          ? {
              message:
                "Data transformation complete. Explore and split your data.",
              linkTo: "/pretrain/explore",
              linkText: "Go to Explore",
            }
          : undefined
      }
    >
      {!df ? (
        <PrerequisiteGate step={step1} />
      ) : (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center gap-3 py-16">
            <Construction className="h-12 w-12 text-muted-foreground/50" />
            <p className="text-sm font-medium text-muted-foreground">
              Transformation tools coming soon
            </p>
          </CardContent>
        </Card>
      )}
    </PageLayout>
  );
}
