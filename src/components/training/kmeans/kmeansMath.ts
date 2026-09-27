export function distanceSq(a: number[], b: number[]): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    const diff = (a[i] ?? 0) - (b[i] ?? 0);
    sum += diff * diff;
  }
  return sum;
}

export function assignClusters(
  data: number[][],
  centroids: number[][],
): { labels: number[]; inertia: number } {
  const labels: number[] = [];
  let inertia = 0;

  for (const point of data) {
    let minDist = Infinity;
    let minIdx = 0;
    for (let c = 0; c < centroids.length; c++) {
      const d = distanceSq(point, centroids[c]);
      if (d < minDist) {
        minDist = d;
        minIdx = c;
      }
    }
    labels.push(minIdx);
    inertia += minDist;
  }

  return { labels, inertia };
}

export function updateCentroids(
  data: number[][],
  labels: number[],
  k: number,
  dim: number,
): { newCentroids: number[][]; delta: number; sizes: number[] } {
  const sums = Array.from({ length: k }, () => Array(dim).fill(0));
  const sizes = Array(k).fill(0);

  for (let i = 0; i < data.length; i++) {
    const c = labels[i];
    sizes[c]++;
    for (let d = 0; d < dim; d++) {
      sums[c][d] += data[i][d] ?? 0;
    }
  }

  const newCentroids = sums.map((sum, c) =>
    sizes[c] > 0 ? sum.map((val) => val / sizes[c]) : Array(dim).fill(0),
  );

  return { newCentroids, delta: 0, sizes };
}
