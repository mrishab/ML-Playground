import { UploadCSVPreviewHeader } from "./UploadCSVPreviewHeader";
import type { ParsedCSVResult } from "@/lib/csvUpload";

interface UploadCSVPreviewTableProps {
  parsed: ParsedCSVResult;
  targetColumn: string;
}

export function UploadCSVPreviewTable({
  parsed,
  targetColumn,
}: UploadCSVPreviewTableProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-medium text-foreground">
          Data Preview (First 5 Rows)
        </span>
        <span>{parsed.headers.length} columns detected</span>
      </div>
      <div className="overflow-x-auto rounded-lg border bg-card max-h-48 text-xs transition-[border-color,background-color] duration-150 ease-out">
        <table className="w-full border-collapse">
          <UploadCSVPreviewHeader
            headers={parsed.headers}
            targetColumn={targetColumn}
          />
          <tbody>
            {parsed.previewRows.map((row, idx) => (
              <tr
                key={idx}
                className="border-b last:border-0 hover:bg-muted/30 transition-colors duration-150 ease-out"
              >
                {parsed.headers.map((h) => (
                  <td
                    key={h}
                    className="px-3 py-1.5 whitespace-nowrap text-muted-foreground"
                  >
                    {row[h] === null || row[h] === undefined
                      ? "—"
                      : String(row[h])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
