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
      subtitle="Compare clustering models"
      nextStep={{
        message: "Compare trained models.",
        linkTo:
          problemType === "regression"
            ? "/comparison/regression"
            : "/comparison/classification",
        linkText: "Compare Models",
      }}
    >
      <Card className="border-dashed">
        <CardContent className="flex min-h-[120px] items-center justify-center py-8">
          <p className="text-center text-sm text-muted-foreground">
            Clustering models coming soon.
          </p>
        </CardContent>
      </Card>
    </PageLayout>
  );
}
