import type { LucideIcon } from "lucide-react";

interface ProblemTypeCardProps {
  isSelected: boolean;
  onClick: () => void;
  icon: LucideIcon;
  title: string;
  description: string;
}

export function ProblemTypeCard({
  isSelected,
  onClick,
  icon: Icon,
  title,
  description,
}: ProblemTypeCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className={`flex items-start gap-2.5 rounded-lg border p-3 cursor-pointer transition-[border-color,background-color,box-shadow,transform] duration-150 ease-out active:scale-[0.99] ${
        isSelected
          ? "border-primary bg-primary/5 ring-1 ring-primary"
          : "border-input hover:border-primary/40 hover:bg-muted/50 hover:shadow-sm"
      }`}
    >
      <Icon
        className={`h-4 w-4 mt-0.5 shrink-0 transition-colors duration-150 ease-out ${
          isSelected ? "text-primary" : "text-muted-foreground"
        }`}
      />
      <div>
        <p className="text-xs sm:text-sm font-semibold leading-tight">
          {title}
        </p>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          {description}
        </p>
      </div>
    </div>
  );
}
