import { type ReactNode } from "react";
import { PageHeader } from "./PageHeader";
import { type LucideIcon } from "lucide-react";
import {
  ActionGateBar,
  type ActionGateProps,
} from "@/components/pipeline/ActionGateBar";

type PageLayoutProps = {
  title: string;
  subtitle?: string;
  icon?: LucideIcon | ReactNode;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
  primaryAction?: ActionGateProps["primaryAction"];
  customChecklist?: ActionGateProps["customChecklist"];
  hideActionGate?: boolean;
  nextStep?: {
    message: string;
    linkTo: string;
    linkText: string;
  };
};

export function PageLayout({
  title,
  subtitle,
  icon,
  children,
  actions,
  className = "",
  primaryAction,
  customChecklist,
  hideActionGate = false,
  nextStep,
}: PageLayoutProps) {
  // If nextStep is provided but primaryAction is not, derive primaryAction from nextStep
  const effectivePrimaryAction =
    primaryAction ??
    (nextStep
      ? {
          label: nextStep.linkText,
          linkTo: nextStep.linkTo,
        }
      : undefined);

  return (
    <div className={`flex min-h-full flex-1 flex-col ${className}`}>
      {/* Center Stage: Workspace content */}
      <div className="flex flex-1 flex-col gap-4 p-4 md:p-6 pb-6">
        <div className="flex items-center justify-between">
          <PageHeader icon={icon} title={title} subtitle={subtitle} />
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
        {children}
      </div>

      {/* Bottom Zone: Sticky Action Gate Bar */}
      {!hideActionGate && (
        <ActionGateBar
          primaryAction={effectivePrimaryAction}
          customChecklist={customChecklist}
        />
      )}
    </div>
  );
}
