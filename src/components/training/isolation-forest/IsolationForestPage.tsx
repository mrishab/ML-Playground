import { ShieldAlert } from "lucide-react";
import { TrainingPageLayout } from "@/components/shared/TrainingPageLayout";
import { IsolationForestConfigCard } from "./IsolationForestConfigCard";
import { AnomalySummaryCards } from "./AnomalySummaryCards";
import { IsolationForestDetailsTabs } from "./IsolationForestDetailsTabs";
import { useIsolationForestPage } from "./useIsolationForestPage";

export function IsolationForestPage() {
  const p = useIsolationForestPage();

  return (
    <TrainingPageLayout
      {...p}
      title="Isolation Forest"
      subtitle="Unsupervised anomaly & outlier isolation"
      icon={ShieldAlert}
      algorithmName="Isolation Forest"
      configOptions={[
        { label: "Trees", value: String(p.nEstimators) },
        { label: "Contamination", value: `${Math.round(p.contamination * 100)}%` },
        { label: "Subsample", value: "256 samples" },
      ]}
      headerExtras={
        <IsolationForestConfigCard
          nEstimators={p.nEstimators}
          contamination={p.contamination}
          onChange={p.setParams}
          disabled={p.trainingState === "training"}
        />
      }
      summaryComponent={
        p.metrics ? <AnomalySummaryCards metrics={p.metrics} /> : null
      }
      detailsComponent={
        p.metrics ? <IsolationForestDetailsTabs metrics={p.metrics} /> : null
      }
      nextStepProps={{
        message: "Anomaly detection complete.",
        linkTo: "/models",
        linkText: "Manage Saved Models",
      }}
      onRun={p.runTraining}
      onReset={p.reset}
    />
  );
}
