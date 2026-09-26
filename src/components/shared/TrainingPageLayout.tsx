import { type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageLayout } from "./PageLayout";
import { NoDatasetAlert } from "./NoDatasetAlert";
import { ModelConfig } from "./ModelConfig";

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
  if (!isSplit) {
    return (
      <PageLayout icon={icon} title={title} subtitle={subtitle}>
        <NoDatasetAlert
          title="No split data available"
          description="Please configure and split your data first."
          linkTo="/pretrain/explore"
          linkText="Go to Explore page"
        />
      </PageLayout>
    );
  }

  return (
    <PageLayout
      icon={icon}
      title={title}
      subtitle={subtitle}
      nextStep={metrics ? nextStepProps : undefined}
    >
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
