export function encodeTrainLabels(labels: (string | number)[]): {
  yTrainStr: string[];
  uniqueLabels: string[];
  yTrainEncoded: number[];
} {
  const yTrainStr = labels.map(String);
  const uniqueLabels = Array.from(new Set(yTrainStr)).sort();
  const labelToIndex = new Map(uniqueLabels.map((l, i) => [l, i]));
  const yTrainEncoded = yTrainStr.map((l) => labelToIndex.get(l) ?? 0);
  return { yTrainStr, uniqueLabels, yTrainEncoded };
}

export function mapPredictions(
  rawPredictions: unknown,
  uniqueLabels: string[],
): string[] {
  const indices: number[] = Array.isArray(rawPredictions)
    ? (rawPredictions as number[])
    : (rawPredictions as { arraySync: () => number[] }).arraySync();
  return indices.map((idx) => uniqueLabels[Math.round(idx)] ?? "");
}
