import { useMemo } from "react";
import type { FeatureSeriesData } from "@/types/dataset";
import { buildCorrelationMatrix } from "./matrixBuilder";
import { buildFeatureRankings, type FeatureRankItem } from "./rankingBuilder";

export type { FeatureRankItem };

export interface OverviewDataParams {
  featureNames: string[];
  targetColumn: string;
  getFeatureData: (featureName: string) => { x: number[]; y: number[] };
}

export function useOverviewData({
  featureNames,
  targetColumn,
  getFeatureData,
}: OverviewDataParams) {
  return useMemo(() => {
    if (featureNames.length === 0) {
      return { allColumns: [], corrMatrix: [], rankings: [] };
    }

    const featureVectors: FeatureSeriesData = {};
    let targetVector: number[] = [];

    for (const f of featureNames) {
      const { x, y } = getFeatureData(f);
      featureVectors[f] = x;
      if (targetVector.length === 0 && y.length > 0) {
        targetVector = y;
      }
    }

    const allColumns = [...featureNames, targetColumn];
    const vectors: FeatureSeriesData = {
      ...featureVectors,
      [targetColumn]: targetVector,
    };
    const corrMatrix = buildCorrelationMatrix(allColumns, vectors);
    const rankings = buildFeatureRankings(
      featureNames,
      featureVectors,
      targetVector,
    );

    return { allColumns, corrMatrix, rankings };
  }, [featureNames, targetColumn, getFeatureData]);
}
