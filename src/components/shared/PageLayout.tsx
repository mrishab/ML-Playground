import { type ReactNode } from "react";
import { PageHeader } from "./PageHeader";
import { type LucideIcon } from "lucide-react";
import { NextStepBanner } from "./NextStepBanner";

type PageLayoutProps = {
  title: string;
  subtitle?: string;
  icon?: LucideIcon | ReactNode;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
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
  nextStep,
}: PageLayoutProps) {
  return (
    <div className={`flex flex-1 flex-col gap-4 p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <PageHeader icon={icon} title={title} subtitle={subtitle} />
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      {children}
      {nextStep && (
        <div className="mt-auto pt-4">
          <NextStepBanner {...nextStep} />
        </div>
      )}
    </div>
  );
}
