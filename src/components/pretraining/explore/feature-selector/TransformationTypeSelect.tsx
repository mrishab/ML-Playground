import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TransformationType } from "@/stores/mlConfig";

interface TransformationTypeSelectProps {
  value: TransformationType;
  onChange: (v: TransformationType) => void;
}

export function TransformationTypeSelect({
  value,
  onChange,
}: TransformationTypeSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-7 w-auto min-w-[110px] flex-1 sm:flex-none sm:w-[130px] text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="none">No transform</SelectItem>
        <SelectItem value="polynomial">Polynomial</SelectItem>
        <SelectItem value="interaction">Interaction</SelectItem>
      </SelectContent>
    </Select>
  );
}
