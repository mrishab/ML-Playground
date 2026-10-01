import { isMissingValue } from "@/lib/data-cleanup/missingCheck";
import type { ColumnDtypeMap } from "@/types/savedDataset";

interface SchemaTableProps {
  columns: string[];
  dtypes: ColumnDtypeMap;
  data: (string | number | boolean | null)[][];
}

export function DatasetSchemaTable({ columns, dtypes, data }: SchemaTableProps) {
  return (
    <div className="max-h-72 overflow-auto border border-border rounded-md">
      <table className="w-full text-xs text-left border-collapse">
        <thead className="bg-muted/60 sticky top-0 border-b border-border">
          <tr>
            <th className="p-2 text-[11px] font-semibold text-muted-foreground">Column</th>
            <th className="p-2 text-[11px] font-semibold text-muted-foreground">Data Type</th>
            <th className="p-2 text-[11px] font-semibold text-muted-foreground">Missing</th>
            <th className="p-2 text-[11px] font-semibold text-muted-foreground">Missing %</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60">
          {columns.map((col, idx) => {
            let colNulls = 0;
            for (let r = 0; r < data.length; r++) {
              if (isMissingValue(data[r]?.[idx])) colNulls++;
            }
            const pct = data.length > 0 ? (colNulls / data.length) * 100 : 0;
            return (
              <tr key={col} className="hover:bg-muted/20">
                <td className="p-2 font-medium text-foreground">{col}</td>
                <td className="p-2 font-mono text-[11px] text-muted-foreground">{dtypes[col] || "string"}</td>
                <td className={`p-2 font-mono text-[11px] ${colNulls > 0 ? "text-amber-500 font-semibold" : "text-muted-foreground"}`}>
                  {colNulls}
                </td>
                <td className="p-2 font-mono text-[11px] text-muted-foreground">{pct.toFixed(1)}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
