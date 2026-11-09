import { buildITree, pathLength, c, type IsolationTreeNode } from "./isolationTree";
import type { IsolationForestParams } from "@/types/isolationForest";

export class IsolationForest {
  trees: IsolationTreeNode[] = [];
  params: IsolationForestParams;
  subsampleSize: number = 256;
  featureCount: number = 0;
  featureSplitCounts: number[] = [];

  constructor(params: IsolationForestParams) {
    this.params = params;
  }

  fit(
    X: number[][],
    onTreeAdded?: (treeIdx: number, totalTrees: number) => void,
  ): void {
    this.trees = [];
    const n = X.length;
    this.featureCount = X[0]?.length ?? 0;
    this.featureSplitCounts = new Array(this.featureCount).fill(0);
    this.subsampleSize = Math.min(this.params.maxSamples, n);
    const maxHeight = Math.ceil(Math.log2(Math.max(2, this.subsampleSize)));

    for (let t = 0; t < this.params.nEstimators; t++) {
      // Subsample without replacement
      const sampleIndices = Array.from({ length: n }, (_, i) => i)
        .sort(() => Math.random() - 0.5)
        .slice(0, this.subsampleSize);
      const subX = sampleIndices.map((i) => X[i]);

      const tree = buildITree(subX, 0, maxHeight);
      this.accumulateSplits(tree);
      this.trees.push(tree);

      if (onTreeAdded) {
        onTreeAdded(t + 1, this.params.nEstimators);
      }
    }
  }

  private accumulateSplits(node: IsolationTreeNode): void {
    if (!node || node.isLeaf) return;
    if (node.featureIndex !== undefined) {
      this.featureSplitCounts[node.featureIndex] =
        (this.featureSplitCounts[node.featureIndex] || 0) + 1;
    }
    if (node.left) this.accumulateSplits(node.left);
    if (node.right) this.accumulateSplits(node.right);
  }

  scoreSamples(X: number[][]): number[] {
    const cVal = c(this.subsampleSize);
    if (cVal === 0) return X.map(() => 0.5);

    const nTrees = this.trees.length;
    return X.map((x) => {
      let sumH = 0;
      for (const tree of this.trees) {
        sumH += pathLength(x, tree, 0);
      }
      const avgH = sumH / Math.max(1, nTrees);
      // Anomaly score s(x, n) = 2^(-E(h(x)) / c(n))
      return Math.pow(2, -avgH / cVal);
    });
  }

  predict(X: number[][]): { scores: number[]; predictions: number[]; threshold: number } {
    const scores = this.scoreSamples(X);
    const sorted = [...scores].sort((a, b) => b - a);
    const cutIdx = Math.max(
      0,
      Math.min(
        sorted.length - 1,
        Math.floor(sorted.length * this.params.contamination),
      ),
    );
    const threshold = sorted[cutIdx] ?? 0.5;

    // Predictions: -1 for anomaly (score >= threshold), 1 for normal
    const predictions = scores.map((s) => (s >= threshold ? -1 : 1));

    return { scores, predictions, threshold };
  }
}
