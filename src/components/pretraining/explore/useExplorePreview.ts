import { useMemo } from "react";
import type { DataFrame } from "danfojs";
import { buildFeatureColumns } from "@/lib/featureTransforms";
import type { SelectedFeature } from "@/stores/mlConfig";
import type { FeatureRowData } from "@/types/dataset";

export function useExplorePreview(
  df: DataFrame | null,
  selectedFeatures: SelectedFeature[],
  targetColumn: string,
) {
  const previewData = useMemo(() => {
    if (!df || selectedFeatures.length === 0) return [];
    const featureData = buildFeatureColumns(df, selectedFeatures);
    if (targetColumn) {
      featureData[`[Y] ${targetColumn}`] = df.column(targetColumn)
        .values as number[];
    }
    const nRows = df.shape[0];
    const rows: FeatureRowData[] = [];
    for (let i = 0; i < nRows; i++) {
      const row: FeatureRowData = {};
      for (const col of Object.keys(featureData)) {
        row[col] = featureData[col][i];
      }
      rows.push(row);
    }
    return rows;
  }, [df, selectedFeatures, targetColumn]);

  const previewColumns = useMemo(
    () => (previewData.length > 0 ? Object.keys(previewData[0]) : []),
    [previewData],
  );

  return { previewData, previewColumns };
}
