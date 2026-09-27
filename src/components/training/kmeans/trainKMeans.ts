import type { KMeansMetrics } from "@/types/kmeans";
import type { StepCallback } from "@/types/loss";
import { assignClusters, distanceSq, updateCentroids } from "./kmeansMath";
import { initRandomCentroids } from "./initCentroids";

export async function trainKMeans(
  data: number[][],
  featureNames: string[],
  k: number,
  maxIter = 25,
  onStep?: StepCallback,
): Promise<KMeansMetrics> {
  const dim = data[0]?.length ?? 1;
  const clampedK = Math.max(2, Math.min(k, data.length));
  let centroids = initRandomCentroids(data, clampedK);
  let labels: number[] = [];
  let inertia = 0;
  let sizes: number[] = [];
  let iterations = 0;

  for (let iter = 1; iter <= maxIter; iter++) {
    iterations = iter;
    const assignment = assignClusters(data, centroids);
    labels = assignment.labels;
    inertia = assignment.inertia;

    const updated = updateCentroids(data, labels, clampedK, dim);
    let delta = 0;
    for (let c = 0; c < clampedK; c++) {
      delta += Math.sqrt(distanceSq(centroids[c], updated.newCentroids[c]));
    }
    centroids = updated.newCentroids;
    sizes = updated.sizes;

    const point = {
      step: iter,
      loss: Number(inertia.toFixed(2)),
      secondary: Number(delta.toFixed(4)),
    };
    onStep?.(point, iter === maxIter || delta < 1e-4);
    await new Promise((r) => setTimeout(r, 35));

    if (delta < 1e-4 && iter > 2) break;
  }

  return {
    k: clampedK,
    inertia: Number(inertia.toFixed(2)),
    iterations,
    converged: true,
    clusterSizes: sizes,
    centroids,
    labels,
    featureNames,
  };
}
