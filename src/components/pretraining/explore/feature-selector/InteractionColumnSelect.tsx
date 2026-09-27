import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InteractionColumnSelectProps {
  currentColumn: string;
  interactionWith?: string;
  availableColumns: string[];
  onInteractionChange: (col: string) => void;
}

export function InteractionColumnSelect({
  currentColumn,
  interactionWith,
  availableColumns,
  onInteractionChange,
}: InteractionColumnSelectProps) {
  return (
    <Select value={interactionWith ?? ""} onValueChange={onInteractionChange}>
      <SelectTrigger className="h-7 w-auto min-w-[100px] flex-1 sm:flex-none sm:w-[120px] text-xs">
        <SelectValue placeholder="Select..." />
      </SelectTrigger>
      <SelectContent>
        {availableColumns
          .filter((col) => col !== currentColumn)
          .map((col) => (
            <SelectItem key={col} value={col}>
              × {col}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}
