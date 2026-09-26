import type { LDAModel } from "./types";
import { dot } from "./matrix";

/**
 * Predict class labels for new observations.
 */
export function predictLDA(model: LDAModel, X: number[][]): string[] {
  const { classes, priors, weights, intercepts } = model;
  const K = classes.length;

  return X.map((x) => {
    let bestScore = -Infinity;
    let bestClass = 0;

    for (let k = 0; k < K; k++) {
      const score = dot(x, weights[k]) - intercepts[k] + priors[k];
      if (score > bestScore) {
        bestScore = score;
        bestClass = k;
      }
    }
    return classes[bestClass];
  });
}

/**
 * Compute posterior probabilities P(class_k | x) via softmax over discriminant scores.
 */
export function predictProbaLDA(
  model: LDAModel,
  X: number[][],
): Map<string, number[]> {
  const { classes, priors, weights, intercepts } = model;
  const K = classes.length;
  const n = X.length;

  const scores: number[][] = X.map((x) =>
    Array.from(
      { length: K },
      (_, k) => dot(x, weights[k]) - intercepts[k] + priors[k],
    ),
  );

  const result = new Map<string, number[]>();
  for (const c of classes) result.set(c, new Array(n));

  for (let i = 0; i < n; i++) {
    const maxScore = Math.max(...scores[i]);
    const exps = scores[i].map((s) => Math.exp(s - maxScore));
    const sumExp = exps.reduce((a, b) => a + b, 0);

    for (let k = 0; k < K; k++) {
      result.get(classes[k])![i] = exps[k] / sumExp;
    }
  }
  return result;
}
