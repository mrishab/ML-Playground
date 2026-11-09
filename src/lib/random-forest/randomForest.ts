import { DecisionTree } from "./tree";

export type RandomForestOptions = {
  nEstimators: number;
  maxDepth: number;
  minSamplesSplit?: number;
  task: "classification" | "regression";
};

export class RandomForest {
  trees: DecisionTree[] = [];
  options: RandomForestOptions;
  classes: string[] = [];
  featureCount: number = 0;
  featureImportances: number[] = [];

  constructor(options: RandomForestOptions) {
    this.options = {
      minSamplesSplit: 2,
      ...options,
    };
  }

  fit(
    X: number[][],
    y: (string | number)[],
    onTreeAdded?: (treeIndex: number, totalTrees: number) => void,
  ): void {
    this.trees = [];
    this.featureCount = X[0]?.length ?? 0;
    this.featureImportances = new Array(this.featureCount).fill(0);

    if (this.options.task === "classification") {
      this.classes = Array.from(new Set(y.map(String))).sort();
    }

    const nSamples = X.length;

    for (let t = 0; t < this.options.nEstimators; t++) {
      // Bootstrap sampling (with replacement)
      const bootX: number[][] = [];
      const bootY: (string | number)[] = [];
      for (let i = 0; i < nSamples; i++) {
        const randIdx = Math.floor(Math.random() * nSamples);
        bootX.push(X[randIdx]);
        bootY.push(y[randIdx]);
      }

      const tree = new DecisionTree({
        maxDepth: this.options.maxDepth,
        minSamplesSplit: this.options.minSamplesSplit ?? 2,
        task: this.options.task,
      });

      tree.fit(bootX, bootY);
      this.accumulateImportance(tree.root);
      this.trees.push(tree);

      if (onTreeAdded) {
        onTreeAdded(t + 1, this.options.nEstimators);
      }
    }

    // Normalize feature importances
    const sumImp = this.featureImportances.reduce((a, b) => a + b, 0);
    if (sumImp > 0) {
      this.featureImportances = this.featureImportances.map((v) => v / sumImp);
    }
  }

  private accumulateImportance(node: DecisionTree["root"]): void {
    if (!node || node.isLeaf) return;
    if (node.featureIndex !== undefined) {
      this.featureImportances[node.featureIndex] =
        (this.featureImportances[node.featureIndex] || 0) +
        Math.max(1, node.sampleCount);
    }
    this.accumulateImportance(node.left ?? null);
    this.accumulateImportance(node.right ?? null);
  }

  predict(X: number[][]): (string | number)[] {
    if (this.options.task === "regression") {
      return X.map((x) => {
        let sum = 0;
        for (const tree of this.trees) {
          sum += tree.predictSample(x).value ?? 0;
        }
        return sum / Math.max(1, this.trees.length);
      });
    }

    // Classification: majority vote over average probabilities
    return X.map((x) => {
      const avgProbs = this.predictSampleProba(x);
      let bestClass = this.classes[0] ?? "";
      let bestP = -1;
      for (const [cls, p] of Object.entries(avgProbs)) {
        if (p > bestP) {
          bestP = p;
          bestClass = cls;
        }
      }
      return bestClass;
    });
  }

  predictProba(X: number[][]): Record<string, number>[] {
    return X.map((x) => this.predictSampleProba(x));
  }

  private predictSampleProba(x: number[]): Record<string, number> {
    const avgProbs: Record<string, number> = {};
    for (const c of this.classes) avgProbs[c] = 0;

    for (const tree of this.trees) {
      const probs = tree.predictSample(x).probabilities ?? {};
      for (const [cls, p] of Object.entries(probs)) {
        avgProbs[cls] = (avgProbs[cls] || 0) + p;
      }
    }

    const nTrees = Math.max(1, this.trees.length);
    for (const c of this.classes) {
      avgProbs[c] /= nTrees;
    }
    return avgProbs;
  }
}
