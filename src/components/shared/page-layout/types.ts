import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import type { ActionGateProps } from "@/components/pipeline/ActionGateBar";

export type NextStepConfig = {
  message: string;
  linkTo: string;
  linkText: string;
};

export type PageLayoutProps = {
  title: string;
  subtitle?: string;
  icon?: LucideIcon | ReactNode;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
  primaryAction?: ActionGateProps["primaryAction"];
  customChecklist?: ActionGateProps["customChecklist"];
  hideActionGate?: boolean;
  nextStep?: NextStepConfig;
};
