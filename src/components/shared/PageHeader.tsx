import { isValidElement } from "react";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type PageHeaderProps = {
  icon?: LucideIcon | ReactNode;
  title: string;
  subtitle?: string;
};

export function PageHeader({ icon: Icon, title, subtitle }: PageHeaderProps) {
  let iconNode: ReactNode = null;
  if (Icon) {
    if (isValidElement(Icon)) {
      iconNode = Icon;
    } else if (typeof Icon === "function" || typeof Icon === "object") {
      const IconComponent = Icon as LucideIcon;
      iconNode = <IconComponent className="h-8 w-8 text-primary" />;
    }
  }

  return (
    <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
      {iconNode}
      <div className="min-w-0">
        <h1 className="text-xl font-semibold sm:text-2xl leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-muted-foreground sm:text-sm mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
