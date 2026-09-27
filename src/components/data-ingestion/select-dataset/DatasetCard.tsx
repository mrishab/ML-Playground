import { FileSpreadsheet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { DatasetCardBadges } from "./DatasetCardBadges";
import { DatasetDeleteButton } from "./DatasetDeleteButton";

import type { DatasetCardProps } from "./datasetTypes";

export function DatasetCard({
  name,
  problemType,
  selected,
  onSelect,
  isCustom = false,
  rowCount,
  columnCount,
  onDelete,
}: DatasetCardProps) {
  return (
    <Card
      className={`group cursor-pointer transition-[transform,border-color,background-color,box-shadow] duration-150 ease-out active:scale-[0.99] hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md ${
        selected ? "border-primary bg-primary/5 ring-1 ring-primary" : ""
      }`}
      onClick={onSelect}
    >
      <CardContent className="flex items-center gap-3 p-4">
        <div
          className={`rounded-full p-2 shrink-0 ${
            isCustom
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "bg-muted text-primary"
          }`}
        >
          <FileSpreadsheet className="h-6 w-6" />
        </div>
        <div className="flex flex-1 flex-col min-w-0">
          <div className="flex items-center justify-between gap-1">
            <p className="font-medium leading-none truncate">{name}</p>
            {isCustom && <DatasetDeleteButton onDelete={onDelete} />}
          </div>
          <DatasetCardBadges
            isCustom={isCustom}
            problemType={problemType}
            rowCount={rowCount}
            columnCount={columnCount}
          />
        </div>
      </CardContent>
    </Card>
  );
}
