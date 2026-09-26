import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TargetColumnSelectProps {
  value: string;
  onChange: (value: string) => void;
  columns: string[];
}

export function TargetColumnSelect({
  value,
  onChange,
  columns,
}: TargetColumnSelectProps) {
  return (
    <div className="space-y-2">
      <Label>Target Variable (Y)</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select target column..." />
        </SelectTrigger>
        <SelectContent>
          {columns.map((col) => (
            <SelectItem key={col} value={col}>
              {col}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
