import { CheckCircle2, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatFileSize, type ParsedCSVResult } from "@/lib/csvUpload";

interface UploadCSVFileInfoProps {
  parsed: ParsedCSVResult;
  onReset: () => void;
}

export function UploadCSVFileInfo({ parsed, onReset }: UploadCSVFileInfoProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border bg-muted/30 p-3 text-xs sm:text-sm">
      <div className="flex items-center gap-2 min-w-0">
        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
        <span className="font-semibold truncate">{parsed.fileName}</span>
        <span className="text-muted-foreground text-xs">
          ({formatFileSize(parsed.fileSize)})
        </span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Badge variant="outline" className="text-xs">
          {parsed.rowCount.toLocaleString()} rows
        </Badge>
        <Badge variant="outline" className="text-xs">
          {parsed.columnCount} columns
        </Badge>
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="h-7 text-xs text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="mr-1 h-3 w-3" />
          Change File
        </Button>
      </div>
    </div>
  );
}
