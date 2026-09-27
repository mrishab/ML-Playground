import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ParsedCSVResult } from "@/lib/csvUpload";

interface UploadCSVTargetSelectProps {
  targetColumn: string;
  setTargetColumn: (col: string) => void;
  parsed: ParsedCSVResult;
}

export function UploadCSVTargetSelect({
  targetColumn,
  setTargetColumn,
  parsed,
}: UploadCSVTargetSelectProps) {
  return (
    <div className="space-y-1.5">
      <Label
        htmlFor="custom-target-column"
        className="text-xs sm:text-sm font-medium"
      >
        Target Variable (Prediction Label)
      </Label>
      <Select value={targetColumn} onValueChange={setTargetColumn}>
        <SelectTrigger id="custom-target-column" className="h-9">
          <SelectValue placeholder="Select target column..." />
        </SelectTrigger>
        <SelectContent className="max-h-56">
          {parsed.headers.map((col) => (
            <SelectItem key={col} value={col}>
              <div className="flex items-center justify-between gap-3 w-full">
                <span>{col}</span>
                <span className="text-[10px] text-muted-foreground uppercase">
                  {parsed.columnTypes[col] ?? "text"}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
