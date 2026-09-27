import { type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { LossTelemetry } from "@/types/loss";

export type NextStepProps = {
  message: string;
  linkTo: string;
  linkText: string;
};

export type TrainingPageLayoutProps = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  isSplit: boolean;
  error?: string | null;
  featureNames: string[];
  targetColumn: string;
  trainingState: "idle" | "training" | "complete" | "error";
  metrics: unknown;
  lossTelemetry?: LossTelemetry | null;
  canTrain: boolean;
  algorithmName: string;
  configOptions?: { label: string; value: string }[];
  summaryComponent: ReactNode;
  detailsComponent: ReactNode;
  headerExtras?: ReactNode;
  footerExtras?: ReactNode;
  nextStepProps: NextStepProps;
  onRun: () => void;
  onReset: () => void;
};
