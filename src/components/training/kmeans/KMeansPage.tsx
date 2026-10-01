import { CircleDot } from "lucide-react";
import { TrainingPageLayout } from "@/components/shared/TrainingPageLayout";
import { useKMeansPage } from "./useKMeansPage";
import { KMeansConfigCard } from "./KMeansConfigCard";
import { ClusterSummaryCards } from "./ClusterSummaryCards";
import { ClusterDetailsTabs } from "./ClusterDetailsTabs";

export function KMeansPage() {
  const pageState = useKMeansPage();
  const { metrics, k, setK, trainingState, xTrain } = pageState;
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
        <ClusterDetailsTabs data={rawData} metrics={metrics!} />
      }
      nextStepProps={{
        message: "Clustering complete.",
        linkTo: "/models",
        linkText: "Manage Saved Models",
      }}
      onRun={pageState.runTraining}
      onReset={pageState.reset}
    />
  );
}
