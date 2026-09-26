import type { LDAModel } from "./types";
import { classMean, matvec, dot } from "./matrix";
import { pooledCovariance } from "./covariance";
import { invertSPD } from "./invertSPD";

/**
 * Fit an LDA model on training data.
 * @param X - training features [nSamples × nFeatures]
 * @param y - training labels (strings)
 */
export function fitLDA(X: number[][], y: string[]): LDAModel {
  const n = X.length;
  const classes = Array.from(new Set(y)).sort();
  const K = classes.length;

  if (K < 2) {
    throw new Error("LDA requires at least 2 classes.");
  }

  const classIndices = new Map<string, number[]>();
  for (const c of classes) classIndices.set(c, []);
  for (let i = 0; i < n; i++) classIndices.get(y[i])!.push(i);

  const means = classes.map((c) => classMean(X, classIndices.get(c)!));
  const sigma = pooledCovariance(X, y, classes, means);
  const sigmaInv = invertSPD(sigma);

  const priors = classes.map((c) => Math.log(classIndices.get(c)!.length / n));
  const weights = means.map((mu) => matvec(sigmaInv, mu));
  const intercepts = means.map((mu, i) => 0.5 * dot(mu, weights[i]));

  return { classes, priors, means, weights, intercepts };
}
