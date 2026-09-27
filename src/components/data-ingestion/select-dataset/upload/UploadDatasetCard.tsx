import { Upload } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDatasetCardDrop } from "./useDatasetCardDrop";

interface UploadDatasetCardProps {
  onClick: () => void;
  onFileDrop?: (file: File) => void;
}

export function UploadDatasetCard({
  onClick,
  onFileDrop,
}: UploadDatasetCardProps) {
  const { isDragOver, dragHandlers } = useDatasetCardDrop({
    onClick,
    onFileDrop,
  });

  return (
    <Card
      onClick={onClick}
      {...dragHandlers}
      className={`cursor-pointer border-dashed transition-[transform,border-color,background-color,box-shadow] duration-150 ease-out active:scale-[0.99] hover:-translate-y-0.5 hover:shadow-md ${
        isDragOver
          ? "border-primary bg-primary/10 ring-2 ring-primary scale-[1.02]"
          : "border-primary/40 hover:border-primary hover:bg-primary/5"
      }`}
    >
      <CardContent className="flex items-center gap-3 p-4">
        <div className="rounded-full bg-primary/10 p-2 text-primary">
          <Upload className="h-6 w-6" />
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-between">
            <p className="font-semibold leading-none text-foreground">
              Upload CSV
            </p>
            <Badge
              variant="default"
              className="bg-primary/90 text-[10px] px-1.5 py-0 uppercase tracking-wider"
            >
              Custom
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Drag & drop or browse .csv
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
