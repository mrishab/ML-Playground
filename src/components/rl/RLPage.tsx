import { Bot } from "lucide-react";
import { PageLayout } from "@/components/shared/PageLayout";
import { RLInfoCallout } from "./RLInfoCallout";
import { RLGridCanvas } from "./RLGridCanvas";
import { RLConfigColumn } from "./RLConfigColumn";
import { RLMetricsCard } from "./RLMetricsCard";
import { RLRewardChart } from "./RLRewardChart";
import { RLBFSComparisonCard } from "./RLBFSComparisonCard";
import { useRLPage } from "./useRLPage";

export function RLPage() {
  const p = useRLPage();
  const rate =
    p.totalEpisodes > 0 ? (p.successCount / p.totalEpisodes) * 100 : 0;

  return (
    <PageLayout
      icon={Bot}
      title="Reinforcement Learning"
      subtitle="Define rules, controls, and goals to optimize policies in real-time"
      hideActionGate
    >
      <div className="space-y-4 max-w-6xl mx-auto w-full">
        <RLInfoCallout />
        <div className="grid gap-4 lg:grid-cols-2">
          <RLConfigColumn store={p} />
          <div className="space-y-4">
            <RLGridCanvas store={p} />
            <RLBFSComparisonCard
              bfsResult={p.bfsResult}
              successRate={rate}
              totalEpisodes={p.totalEpisodes}
            />
          </div>
        </div>
        <RLMetricsCard
          totalEpisodes={p.totalEpisodes}
          successCount={p.successCount}
          rewardHistory={p.rewardHistory}
          stepsHistory={p.stepsHistory}
        />
        <RLRewardChart rewards={p.rewardHistory} />
      </div>
    </PageLayout>
  );
}
