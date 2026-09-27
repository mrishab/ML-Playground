import { Badge } from "@/components/ui/badge";

interface RSEStepRowProps {
  label: React.ReactNode;
  value: React.ReactNode;
  isHighlight?: boolean;
}

export function RSEStepRow({ label, value, isHighlight }: RSEStepRowProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded border p-2.5 transition-[background-color,border-color] duration-150 ease-out hover:bg-muted/40">
      <span className="text-xs sm:text-sm">{label}</span>
      <Badge
        variant={isHighlight ? "default" : "secondary"}
        className={isHighlight ? "bg-orange-500 shrink-0" : "shrink-0"}
      >
        {value}
      </Badge>
    </div>
  );
}
