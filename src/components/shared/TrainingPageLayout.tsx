import { type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageLayout } from "./PageLayout";
import { PrerequisiteGate } from "@/components/pipeline/PrerequisiteGate";
import { StaleWarningBanner } from "@/components/pipeline/StaleWarningBanner";
import { ModelConfig } from "./ModelConfig";
import { usePipelineSteps } from "@/hooks/usePipelineSteps";
import { usePipelineStore } from "@/stores/pipeline";

type TrainingPageLayoutProps = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  isSplit: boolean;
  error?: string | null;
  featureNames: string[];
  targetColumn: string;
  trainingState: "idle" | "training" | "complete" | "error";
  metrics: unknown;
  canTrain: boolean;
  algorithmName: string;
  configOptions?: { label: string; value: string }[];
  summaryComponent: React.ReactNode;
  detailsComponent: React.ReactNode;
  headerExtras?: React.ReactNode;
  footerExtras?: React.ReactNode;
  nextStepProps: {
    message: string;
    linkTo: string;
    linkText: string;
  };
  onRun: () => void;
  onReset: () => void;
};

const DEFAULT_CONFIG_OPTIONS: { label: string; value: string }[] = [];

export function TrainingPageLayout({
  title,
  subtitle,
  icon,
  isSplit,
  error,
  featureNames,
  targetColumn,
  trainingState,
  metrics,
  canTrain,
  algorithmName,
  configOptions = DEFAULT_CONFIG_OPTIONS,
  summaryComponent,
  detailsComponent,
  headerExtras,
  footerExtras,
  nextStepProps,
  onRun,
  onReset,
}: TrainingPageLayoutProps) {
  const { steps, isDownstreamStale } = usePipelineSteps();
  const revertExploreChanges = usePipelineStore(
    (state) => state.revertExploreChanges,
  );
  const step3 = steps[2];

  if (!isSplit) {
    return (
      <PageLayout icon={icon} title={title} subtitle={subtitle}>
        <PrerequisiteGate step={step3} />
      </PageLayout>
    );
  }

  // Derive context-aware Action Gate primary CTA
  const primaryAction = metrics
    ? {
        label: nextStepProps.linkText,
        linkTo: nextStepProps.linkTo,
      }
    : {
        label:
          trainingState === "training" ? "Training Model..." : "Run Training",
        onClick: onRun,
        disabled: !canTrain || trainingState === "training",
      };

  return (
    <PageLayout
      icon={icon}
      title={title}
      subtitle={subtitle}
      primaryAction={primaryAction}
    >
      {/* Downstream Stale State Banner */}
      {isDownstreamStale && Boolean(metrics) && (
        <StaleWarningBanner
          title="Trained Model May Be Outdated"
          message="Upstream dataset or split parameters have changed since this model was trained. The metrics below reflect previous split data. Re-run training to reflect the latest changes."
          onRevert={revertExploreChanges}
          revertLabel="Revert Upstream Changes"
          onRecompute={onRun}
          recomputeLabel="Re-train Model Now"
        />
      )}

      {error && (
        <Card className="border-red-500/30 bg-red-500/5">
          <CardContent className="p-4">
            <p className="text-sm text-red-500">{error}</p>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          {headerExtras}
          <ModelConfig
            algorithm={algorithmName}
            featureCount={featureNames.length}
            targetColumn={targetColumn}
            onRun={onRun}
            onReset={onReset}
            isTraining={trainingState === "training"}
            isComplete={trainingState === "complete"}
            canTrain={canTrain}
            options={configOptions}
          />
        </div>

        {metrics ? (
          summaryComponent
        ) : (
          <Card className="border-dashed">
            <CardContent className="flex h-full items-center justify-center p-6">
              <p className="text-center text-sm text-muted-foreground">
                Run training to see metrics
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {metrics ? detailsComponent : null}
      {footerExtras}

      {trainingState === "idle" && !metrics && (
        <Card className="border-dashed">
          <CardContent className="flex h-[200px] items-center justify-center">
            <p className="text-center text-muted-foreground">
              Click "Run Training" to train the model and view results
            </p>
          </CardContent>
        </Card>
      )}
    </PageLayout>
  );
}
