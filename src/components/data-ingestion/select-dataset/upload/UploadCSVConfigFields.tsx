import { UploadCSVNameField } from "./UploadCSVNameField";
import { UploadCSVTargetSelect } from "./UploadCSVTargetSelect";
import type { ParsedCSVResult } from "@/lib/csvUpload";

interface UploadCSVConfigFieldsProps {
  datasetName: string;
  setDatasetName: (name: string) => void;
  targetColumn: string;
  setTargetColumn: (col: string) => void;
  parsed: ParsedCSVResult;
  nameCollision: boolean;
}

export function UploadCSVConfigFields({
  datasetName,
  setDatasetName,
  targetColumn,
  setTargetColumn,
  parsed,
  nameCollision,
}: UploadCSVConfigFieldsProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <UploadCSVNameField
        datasetName={datasetName}
        setDatasetName={setDatasetName}
        nameCollision={nameCollision}
      />
      <UploadCSVTargetSelect
        targetColumn={targetColumn}
        setTargetColumn={setTargetColumn}
        parsed={parsed}
      />
    </div>
  );
}
