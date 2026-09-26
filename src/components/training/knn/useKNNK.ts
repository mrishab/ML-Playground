import { useCallback, useMemo } from "react";
import { useTrainingResultsStore } from "@/stores/trainingResults";
import type { DataFrame } from "danfojs";

const MIN_K = 1;
const MAX_K = 50;

export function useKNNK(xTrain: DataFrame | null) {
  const k = useTrainingResultsStore((s) => s.knn.k);
  const setKStore = useTrainingResultsStore((s) => s.setKNNK);

  const effectiveMaxK = useMemo(() => {
    return xTrain ? Math.min(MAX_K, xTrain.shape[0]) : MAX_K;
  }, [xTrain]);

  const setK = useCallback(
    (val: number) => setKStore(Math.max(MIN_K, Math.min(effectiveMaxK, val))),
    [effectiveMaxK, setKStore],
  );

  return { k, setK, effectiveMaxK };
}
