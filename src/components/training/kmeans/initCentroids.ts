export function initRandomCentroids(data: number[][], k: number): number[][] {
  const n = data.length;
  const clampedK = Math.max(2, Math.min(k, n));
  const chosen = new Set<number>();

  while (chosen.size < clampedK) {
    chosen.add(Math.floor(Math.random() * n));
  }

  return Array.from(chosen).map((i) => [...data[i]]);
}
