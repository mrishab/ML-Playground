interface RowsPreviewProps {
  columns: string[];
  data: (string | number | boolean | null)[][];
}

export function DatasetRowsPreview({ columns, data }: RowsPreviewProps) {
  const previewRows = data.slice(0, 25);

  return (
    <div className="space-y-2">
      <div className="text-xs text-muted-foreground">
        Showing first {previewRows.length} of {data.length} rows:
      </div>
      <div className="max-h-72 overflow-auto border border-border rounded-md">
        <table className="w-full text-xs text-left border-collapse">
          <thead className="bg-muted/60 sticky top-0 border-b border-border">
            <tr>
              <th className="p-2 text-[11px] font-semibold text-muted-foreground w-12">#</th>
              {columns.map((col) => (
                <th key={col} className="p-2 text-[11px] font-semibold text-foreground whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {previewRows.map((row, rIdx) => (
              <tr key={rIdx} className="hover:bg-muted/20">
                <td className="p-2 text-[11px] text-muted-foreground font-mono">{rIdx + 1}</td>
                {columns.map((_, cIdx) => {
                  const val = row[cIdx];
                  const isNull = val === null || val === undefined;
                  return (
                    <td key={cIdx} className="p-2 whitespace-nowrap font-mono text-[11px]">
                      {isNull ? <span className="text-amber-500 italic">null</span> : String(val)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
