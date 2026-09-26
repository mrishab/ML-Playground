export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function toFiniteNumbers(values: unknown[]): number[] {
  return values.filter(
    (v): v is number => typeof v === "number" && Number.isFinite(v),
  );
}

export function getQuantile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0;
  if (sorted.length === 1) return sorted[0];
  const pos = (sorted.length - 1) * p;
  const lowerIdx = Math.floor(pos);
  const upperIdx = Math.ceil(pos);
  const weight = pos - lowerIdx;
  return sorted[lowerIdx] + (sorted[upperIdx] - sorted[lowerIdx]) * weight;
}
