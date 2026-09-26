import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ProblemType } from "@/stores/mlConfig";
import { PROBLEM_TYPES } from "./constants";

interface ProblemTypeSelectProps {
  value: ProblemType;
  onChange: (value: ProblemType) => void;
}

export function ProblemTypeSelect({ value, onChange }: ProblemTypeSelectProps) {
  return (
    <div className="space-y-2">
      <Label>Problem Type</Label>
      <Select value={value} onValueChange={(v) => onChange(v as ProblemType)}>
        <SelectTrigger>
          <SelectValue placeholder="Select problem type..." />
        </SelectTrigger>
        <SelectContent>
          {PROBLEM_TYPES.map((pt) => (
            <SelectItem key={pt.value} value={pt.value}>
              {pt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
