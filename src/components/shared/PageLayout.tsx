import { PageHeader } from "./PageHeader";
import { ActionGateBar } from "@/components/pipeline/ActionGateBar";
import type { PageLayoutProps } from "./page-layout/types";

export type { PageLayoutProps };

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
  const effectivePrimaryAction =
    primaryAction ??
    (nextStep
      ? { label: nextStep.linkText, linkTo: nextStep.linkTo }
      : undefined);

  return (
    <div className={`flex min-h-full flex-1 flex-col ${className}`}>
      <div className="flex flex-1 flex-col gap-4 p-4 md:p-6 pb-6">
        <div className="flex items-center justify-between">
          <PageHeader icon={icon} title={title} subtitle={subtitle} />
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
        {children}
      </div>

      {!hideActionGate && (
        <ActionGateBar
          primaryAction={effectivePrimaryAction}
          customChecklist={customChecklist}
        />
      )}
    </div>
  );
}
