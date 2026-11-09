import { BoostTree } from "./tree";

export type XGBoostOptions = {
  nEstimators: number;
  learningRate: number;
  maxDepth: number;
  lambda?: number;
  gamma?: number;
  task: "classification" | "regression";
};

export class XGBoost {
  trees: { tree: BoostTree; classIndex?: number }[] = [];
  options: Required<XGBoostOptions>;
  classes: string[] = [];
  baseScore: number = 0;
  baseScores: number[] = [];
  featureCount: number = 0;
  featureImportances: number[] = [];

  constructor(options: XGBoostOptions) {
    this.options = {
      lambda: 1.0,
      gamma: 0.0,
      ...options,
    };
  }

  fit(
    X: number[][],
    y: (string | number)[],
    onRoundAdded?: (round: number, totalRounds: number) => void,
  ): void {
    this.trees = [];
    this.featureCount = X[0]?.length ?? 0;
    this.featureImportances = new Array(this.featureCount).fill(0);
    const nSamples = X.length;
    const allIndices = Array.from({ length: nSamples }, (_, i) => i);

    if (this.options.task === "regression") {
      const numY = y.map((v) => Number(v) || 0);
      this.baseScore = numY.reduce((a, b) => a + b, 0) / Math.max(1, nSamples);
      const preds = new Array(nSamples).fill(this.baseScore);

      for (let t = 0; t < this.options.nEstimators; t++) {
        // Squared Error: g_i = pred - y, h_i = 1
        const gradients = preds.map((p, i) => p - numY[i]);
        const hessians = new Array(nSamples).fill(1.0);

        const tree = new BoostTree({
          maxDepth: this.options.maxDepth,
          lambda: this.options.lambda,
          gamma: this.options.gamma,
        });

        tree.fit(X, gradients, hessians, allIndices);
        this.accumulateGain(tree.root);
        this.trees.push({ tree });

        // Update predictions with shrinkage eta
        for (let i = 0; i < nSamples; i++) {
          preds[i] += this.options.learningRate * tree.predictSample(X[i]);
        }

        if (onRoundAdded) {
          onRoundAdded(t + 1, this.options.nEstimators);
        }
      }
    } else {
      // Classification
      this.classes = Array.from(new Set(y.map(String))).sort();
      const numClasses = this.classes.length;
      const classMap = new Map(this.classes.map((c, i) => [c, i]));
      const yIndices = y.map((v) => classMap.get(String(v)) ?? 0);

      // Multiclass / binary softmax boosting
      this.baseScores = new Array(numClasses).fill(0);
      const rawPreds: number[][] = Array.from({ length: nSamples }, () =>
        new Array(numClasses).fill(0),
      );

      for (let t = 0; t < this.options.nEstimators; t++) {
        for (let c = 0; c < numClasses; c++) {
          // Compute softmax probabilities
          const probs = rawPreds.map((row) => {
            const maxVal = Math.max(...row);
            const exps = row.map((v) => Math.exp(v - maxVal));
            const sumExp = exps.reduce((a, b) => a + b, 0);
            return exps[c] / Math.max(1e-12, sumExp);
          });

          const gradients = probs.map((p, i) =>
            yIndices[i] === c ? p - 1 : p,
          );
          const hessians = probs.map((p) => Math.max(1e-4, 2 * p * (1 - p)));

          const tree = new BoostTree({
            maxDepth: this.options.maxDepth,
            lambda: this.options.lambda,
            gamma: this.options.gamma,
          });

          tree.fit(X, gradients, hessians, allIndices);
          this.accumulateGain(tree.root);
          this.trees.push({ tree, classIndex: c });

          for (let i = 0; i < nSamples; i++) {
            rawPreds[i][c] +=
              this.options.learningRate * tree.predictSample(X[i]);
          }
        }

        if (onRoundAdded) {
          onRoundAdded(t + 1, this.options.nEstimators);
        }
      }
    }

    const sumImp = this.featureImportances.reduce((a, b) => a + b, 0);
    if (sumImp > 0) {
      this.featureImportances = this.featureImportances.map((v) => v / sumImp);
    }
  }

  private accumulateGain(node: BoostTree["root"]): void {
    if (!node || node.isLeaf) return;
    if (node.featureIndex !== undefined && node.gain) {
      this.featureImportances[node.featureIndex] =
        (this.featureImportances[node.featureIndex] || 0) + node.gain;
    }
    this.accumulateGain(node.left ?? null);
    this.accumulateGain(node.right ?? null);
  }

  predict(X: number[][]): (string | number)[] {
    if (this.options.task === "regression") {
      return X.map((x) => {
        let val = this.baseScore;
        for (const { tree } of this.trees) {
          val += this.options.learningRate * tree.predictSample(x);
        }
        return val;
      });
    }

    const numClasses = this.classes.length;
    return X.map((x) => {
      const raw = new Array(numClasses).fill(0);
      for (const { tree, classIndex } of this.trees) {
        if (classIndex !== undefined) {
          raw[classIndex] +=
            this.options.learningRate * tree.predictSample(x);
        }
      }
      let bestIdx = 0;
      let maxVal = -Infinity;
      for (let c = 0; c < numClasses; c++) {
        if (raw[c] > maxVal) {
          maxVal = raw[c];
          bestIdx = c;
        }
      }
      return this.classes[bestIdx] ?? "";
    });
  }

  predictProba(X: number[][]): Record<string, number>[] {
    const numClasses = this.classes.length;
    return X.map((x) => {
      const raw = new Array(numClasses).fill(0);
      for (const { tree, classIndex } of this.trees) {
        if (classIndex !== undefined) {
          raw[classIndex] +=
            this.options.learningRate * tree.predictSample(x);
        }
      }
      const maxVal = Math.max(...raw);
      const exps = raw.map((v) => Math.exp(v - maxVal));
      const sumExp = exps.reduce((a, b) => a + b, 0);

      const res: Record<string, number> = {};
      for (let c = 0; c < numClasses; c++) {
        res[this.classes[c]] = exps[c] / Math.max(1e-12, sumExp);
      }
      return res;
    });
  }
}
