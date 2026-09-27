import { useState, useCallback } from "react";
import type { ProblemType } from "@/stores/mlConfig";
import type { ParsedCSVResult } from "@/lib/csvUpload";

export function useCSVFormFields() {
  const [datasetName, setDatasetName] = useState("");
  const [problemType, setProblemType] = useState<ProblemType>("classification");
  const [targetColumn, setTargetColumn] = useState("");

  const initForm = useCallback((result: ParsedCSVResult) => {
    setDatasetName(result.suggestedName);
    setProblemType(result.suggestedProblemType);
    setTargetColumn(result.suggestedTarget);
  }, []);

  const resetForm = useCallback(() => {
    setDatasetName("");
    setTargetColumn("");
    setProblemType("classification");
  }, []);

  return {
    datasetName,
    setDatasetName,
    problemType,
    setProblemType,
    targetColumn,
    setTargetColumn,
    initForm,
    resetForm,
  };
}
