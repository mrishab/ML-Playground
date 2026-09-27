import { CircleDot } from "lucide-react";
import { TrainingPageLayout } from "@/components/shared/TrainingPageLayout";
import { useKMeansPage } from "@/components/training/kmeans/useKMeansPage";
import { KMeansConfigCard } from "@/components/training/kmeans/KMeansConfigCard";
import { ClusterSummaryCards } from "@/components/training/kmeans/ClusterSummaryCards";
import { ClusterDetailsTabs } from "@/components/training/kmeans/ClusterDetailsTabs";

export function ClusterComparisonPage() {
  const pageState = useKMeansPage();
  const { metrics, k, setK, trainingState, xTrain, lossTelemetry } = pageState;
  const rawData = (xTrain?.values as number[][]) ?? [];

  return (
    <TrainingPageLayout
      {...pageState}
      title="K-Means Clustering"
      subtitle="Unsupervised centroid-based clustering with live Inertia loss"
      icon={CircleDot}
      algorithmName="K-Means (Lloyd's Algorithm)"
      configOptions={[
        { label: "Clusters (k)", value: String(k) },
        { label: "Initialization", value: "Random Partition" },
        { label: "Loss Function", value: "Inertia (WCSS)" },
      ]}
      headerExtras={
        <KMeansConfigCard
          k={k}
          onKChange={setK}
          disabled={trainingState === "training"}
        />
      }
      summaryComponent={<ClusterSummaryCards metrics={metrics!} />}
      detailsComponent={
        <ClusterDetailsTabs
          data={rawData}
          metrics={metrics!}
          telemetry={lossTelemetry}
        />
      }
      nextStepProps={{
        message: "Clustering complete.",
        linkTo: "/validation",
        linkText: "View Validation",
      }}
      onRun={pageState.runTraining}
      onReset={pageState.reset}
    />
  );
}
