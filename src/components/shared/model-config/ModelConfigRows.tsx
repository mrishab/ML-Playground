import { Badge } from "@/components/ui/badge";

interface ModelConfigRowsProps {
  algorithm: string;
  options: { label: string; value: string }[];
  featureCount: number;
  targetColumn: string;
}

export function ModelConfigRows({
  algorithm,
  options,
  featureCount,
  targetColumn,
}: ModelConfigRowsProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Algorithm</span>
        <Badge variant="secondary">{algorithm}</Badge>
      </div>
      {options.map((option) => (
        <div key={option.label} className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{option.label}</span>
          <Badge variant="outline">{option.value}</Badge>
        </div>
      ))}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Features</span>
        <Badge variant="outline">{featureCount}</Badge>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Target</span>
        <Badge variant="outline">{targetColumn || "—"}</Badge>
      </div>
    </>
  );
}
