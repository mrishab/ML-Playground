import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FeatureSelectorAddDropdownProps {
  columns: string[];
  onAdd: (column: string) => void;
}

export function FeatureSelectorAddDropdown({
  columns,
  onAdd,
}: FeatureSelectorAddDropdownProps) {
  return (
    <Select onValueChange={onAdd} value="">
      <SelectTrigger>
        <SelectValue placeholder="Add a feature column..." />
      </SelectTrigger>
      <SelectContent>
        {columns.map((col) => (
          <SelectItem key={col} value={col}>
            <div className="flex items-center gap-2">
              <Plus className="h-3 w-3" />
              {col}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
