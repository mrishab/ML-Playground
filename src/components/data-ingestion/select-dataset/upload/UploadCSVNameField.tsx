import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface UploadCSVNameFieldProps {
  datasetName: string;
  setDatasetName: (name: string) => void;
  nameCollision: boolean;
}

export function UploadCSVNameField({
  datasetName,
  setDatasetName,
  nameCollision,
}: UploadCSVNameFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label
        htmlFor="custom-dataset-name"
        className="text-xs sm:text-sm font-medium"
      >
        Dataset Name
      </Label>
      <Input
        id="custom-dataset-name"
        value={datasetName}
        onChange={(e) => setDatasetName(e.target.value)}
        placeholder="e.g. Customer Churn"
        className="h-9"
      />
      {nameCollision && (
        <p className="text-[11px] text-amber-600 dark:text-amber-400">
          A dataset with this name already exists and will be updated.
        </p>
      )}
    </div>
  );
}
