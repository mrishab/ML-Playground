import { FileSpreadsheet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type DatasetCardProps = {
  name: string;
  problemType?: string;
  selected: boolean;
  onSelect: () => void;
};

export function DatasetCard({
  name,
  problemType,
  selected,
  onSelect,
}: DatasetCardProps) {
  return (
    <Card
      className={`cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md ${
        selected ? "border-primary bg-primary/5 ring-1 ring-primary" : ""
      }`}
      onClick={onSelect}
    >
      <CardContent className="flex items-center gap-3 p-4">
        <div className="rounded-full bg-muted p-2">
          <FileSpreadsheet className="h-6 w-6 text-primary" />
        </div>
        <div className="flex flex-1 flex-col">
          <p className="font-medium leading-none">{name}</p>
          {problemType && (
            <div className="mt-1.5">
              <Badge
                variant="secondary"
                className="px-1.5 py-0 text-[10px] uppercase tracking-wider"
              >
                {problemType}
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
