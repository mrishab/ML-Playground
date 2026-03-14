import { isValidElement } from "react";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type PageHeaderProps = {
  icon?: LucideIcon | ReactNode;
  title: string;
  subtitle?: string;
};

export function PageHeader({ icon: Icon, title, subtitle }: PageHeaderProps) {
  const renderIcon = () => {
    if (!Icon) return null;
    // Already a React element (e.g., <Search className="..." />)
    if (isValidElement(Icon)) return Icon;
    // LucideIcon component reference (e.g., Search)
    if (typeof Icon === "function" || typeof Icon === "object") {
      const IconComponent = Icon as LucideIcon;
      return <IconComponent className="h-8 w-8 text-primary" />;
    }
    return null;
  };

  return (
    <div className="flex items-center gap-3">
      {renderIcon()}
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
