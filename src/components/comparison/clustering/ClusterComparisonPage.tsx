import { CircleDot } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageLayout } from "@/components/shared/PageLayout";
import { useMLConfigStore } from "@/stores/mlConfig";

export function ClusterComparisonPage() {
  const problemType = useMLConfigStore((state) => state.problemType);

  return (
    <PageLayout
      icon={CircleDot}
      title="Clustering Comparison"
      subtitle="Compare clustering algorithms side by side"
      nextStep={{
        message:
          "Clustering analysis complete. Compare classification or regression models.",
        linkTo:
          problemType === "regression"
            ? "/comparison/regression"
            : "/comparison/classification",
        linkText: "Go to Comparison",
      }}
    >
      <Card className="border-dashed">
        <CardContent className="flex h-[200px] items-center justify-center">
          <p className="text-center text-muted-foreground">
            No clustering algorithms have been implemented yet. This page will
            be available once clustering models are added to the training
            pipeline.
          </p>
        </CardContent>
      </Card>
    </PageLayout>
  );
}
