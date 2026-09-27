import { useMemo } from "react";
import { useDatasetStore } from "@/stores/dataset";
import type { ParsedCSVResult } from "@/lib/csvUpload";
import { useCSVFormFields } from "./useCSVFormFields";
import { useCSVImportAction } from "./useCSVImportAction";

interface FormParams {
  parsed: ParsedCSVResult | null;
  onClose: () => void;
  onSuccess?: (datasetName: string) => void;
  setError: (err: string | null) => void;
}

export function useUploadCSVForm({
  parsed,
  onClose,
  onSuccess,
  setError,
}: FormParams) {
  const fields = useCSVFormFields();
  const existingNames = useDatasetStore((s) =>
    s.customDatasets.map((d) => d.name.toLowerCase()),
  );

  const handleImport = useCSVImportAction({
    parsed,
    datasetName: fields.datasetName,
    targetColumn: fields.targetColumn,
    problemType: fields.problemType,
    onClose,
    onSuccess,
    setError,
  });

  const nameCollision = useMemo(
    () =>
      Boolean(
        parsed &&
          fields.datasetName.trim().length > 0 &&
          existingNames.includes(fields.datasetName.trim().toLowerCase()),
      ),
    [parsed, fields.datasetName, existingNames],
  );

  return { ...fields, handleImport, nameCollision };
}
