import { Badge } from "@/components/ui/badge";

interface UploadCSVPreviewHeaderProps {
  headers: string[];
  targetColumn: string;
}

export function UploadCSVPreviewHeader({
  headers,
  targetColumn,
}: UploadCSVPreviewHeaderProps) {
  return (
    <thead className="bg-muted/60 sticky top-0">
      <tr>
        {headers.map((h) => (
          <th
            key={h}
            className="px-3 py-2 text-left font-semibold border-b whitespace-nowrap"
          >
            <div className="flex items-center gap-1.5">
              <span>{h}</span>
              {h === targetColumn && (
                <Badge
                  variant="default"
                  className="text-[9px] px-1 py-0 h-4 bg-primary"
                >
                  Target
                </Badge>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}
