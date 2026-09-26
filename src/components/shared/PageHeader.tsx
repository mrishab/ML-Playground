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
    <div className="flex items-center gap-3">
      {iconNode}
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
