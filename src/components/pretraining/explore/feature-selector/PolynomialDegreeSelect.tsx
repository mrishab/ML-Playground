import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PolynomialDegreeSelectProps {
  degree?: number;
  onDegreeChange: (deg: number) => void;
}

export function PolynomialDegreeSelect({
  degree,
  onDegreeChange,
}: PolynomialDegreeSelectProps) {
  return (
    <Select
      value={String(degree ?? 2)}
      onValueChange={(v) => onDegreeChange(parseInt(v))}
    >
      <SelectTrigger className="h-7 w-[80px] text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {["2", "3", "4", "5"].map((deg) => (
          <SelectItem key={deg} value={deg}>
            ^{deg}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
