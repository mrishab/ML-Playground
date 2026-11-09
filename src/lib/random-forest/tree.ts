export type TreeNode = {
  featureIndex?: number;
  threshold?: number;
  left?: TreeNode;
  right?: TreeNode;
  isLeaf: boolean;
  value?: number; // for regression: mean
  probabilities?: Record<string, number>; // for classification
  sampleCount: number;
};

export type TreeOptions = {
  maxDepth: number;
  minSamplesSplit: number;
  maxFeatures?: number;
  task: "classification" | "regression";
};

export class DecisionTree {
  root: TreeNode | null = null;
  private options: TreeOptions;
  private classes: string[] = [];

  constructor(options: TreeOptions) {
    this.options = options;
  }

  fit(X: number[][], y: (string | number)[]): void {
    if (this.options.task === "classification") {
      this.classes = Array.from(new Set(y.map(String))).sort();
    }
    const sampleIndices = Array.from({ length: X.length }, (_, i) => i);
    this.root = this.buildNode(X, y, sampleIndices, 0);
  }

  private buildNode(
    X: number[][],
    y: (string | number)[],
    indices: number[],
    depth: number,
  ): TreeNode {
    const nSamples = indices.length;
    if (nSamples === 0) {
      return { isLeaf: true, sampleCount: 0, value: 0 };
    }

    if (
      depth >= this.options.maxDepth ||
      nSamples < this.options.minSamplesSplit
    ) {
      return this.createLeaf(y, indices);
    }

    const nFeatures = X[0]?.length ?? 0;
    const maxFeat = Math.max(
      1,
      this.options.maxFeatures ??
        (this.options.task === "classification"
          ? Math.max(1, Math.round(Math.sqrt(nFeatures)))
          : Math.max(1, Math.round(nFeatures / 3))),
    );

    // Random feature subset
    const featureIndices = Array.from({ length: nFeatures }, (_, i) => i)
      .sort(() => Math.random() - 0.5)
      .slice(0, maxFeat);

    let bestGain = -Infinity;
    let bestFeature = -1;
    let bestThreshold = 0;
    let bestLeftIndices: number[] = [];
    let bestRightIndices: number[] = [];

    const baseImpurity = this.calculateImpurity(y, indices);

    for (const feat of featureIndices) {
      const values = indices.map((i) => X[i][feat]);
      const uniqueVals = Array.from(new Set(values)).sort((a, b) => a - b);
      if (uniqueVals.length <= 1) continue;

      // Check candidate thresholds (midpoints)
      const step = Math.max(1, Math.floor(uniqueVals.length / 10));
      for (let v = 0; v < uniqueVals.length - 1; v += step) {
        const threshold = (uniqueVals[v] + uniqueVals[v + 1]) / 2;
        const left: number[] = [];
        const right: number[] = [];

        for (const idx of indices) {
          if (X[idx][feat] <= threshold) left.push(idx);
          else right.push(idx);
        }

        if (left.length === 0 || right.length === 0) continue;

        const leftImpurity = this.calculateImpurity(y, left);
        const rightImpurity = this.calculateImpurity(y, right);
        const gain =
          baseImpurity -
          (left.length / nSamples) * leftImpurity -
          (right.length / nSamples) * rightImpurity;

        if (gain > bestGain) {
          bestGain = gain;
          bestFeature = feat;
          bestThreshold = threshold;
          bestLeftIndices = left;
          bestRightIndices = right;
        }
      }
    }

    if (bestGain <= 1e-7 || bestFeature === -1) {
      return this.createLeaf(y, indices);
    }

    const leftNode = this.buildNode(X, y, bestLeftIndices, depth + 1);
    const rightNode = this.buildNode(X, y, bestRightIndices, depth + 1);

    return {
      isLeaf: false,
      featureIndex: bestFeature,
      threshold: bestThreshold,
      left: leftNode,
      right: rightNode,
      sampleCount: nSamples,
    };
  }

  private calculateImpurity(
    y: (string | number)[],
    indices: number[],
  ): number {
    if (indices.length === 0) return 0;
    if (this.options.task === "regression") {
      const vals = indices.map((i) => Number(y[i]) || 0);
      const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
      return vals.reduce((a, b) => a + (b - mean) ** 2, 0) / vals.length;
    }
    // Gini impurity for classification
    const counts: Record<string, number> = {};
    for (const idx of indices) {
      const k = String(y[idx]);
      counts[k] = (counts[k] || 0) + 1;
    }
    let sumSq = 0;
    const n = indices.length;
    for (const c of Object.values(counts)) {
      sumSq += (c / n) ** 2;
    }
    return 1 - sumSq;
  }

  private createLeaf(
    y: (string | number)[],
    indices: number[],
  ): TreeNode {
    if (this.options.task === "regression") {
      const vals = indices.map((i) => Number(y[i]) || 0);
      const mean =
        vals.length > 0
          ? vals.reduce((a, b) => a + b, 0) / vals.length
          : 0;
      return { isLeaf: true, sampleCount: indices.length, value: mean };
    }
    const probs: Record<string, number> = {};
    for (const c of this.classes) probs[c] = 0;
    for (const idx of indices) {
      const k = String(y[idx]);
      probs[k] = (probs[k] || 0) + 1;
    }
    const total = Math.max(1, indices.length);
    for (const c of this.classes) probs[c] /= total;

    return {
      isLeaf: true,
      sampleCount: indices.length,
      probabilities: probs,
    };
  }

  predictSample(x: number[]): { value?: number; probabilities?: Record<string, number> } {
    let curr = this.root;
    while (curr && !curr.isLeaf) {
      const feat = curr.featureIndex ?? 0;
      const th = curr.threshold ?? 0;
      if (x[feat] <= th) curr = curr.left ?? null;
      else curr = curr.right ?? null;
    }
    return {
      value: curr?.value ?? 0,
      probabilities: curr?.probabilities ?? {},
    };
  }
}
