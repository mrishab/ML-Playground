export type BoostNode = {
  featureIndex?: number;
  threshold?: number;
  left?: BoostNode;
  right?: BoostNode;
  isLeaf: boolean;
  weight: number;
  sampleCount: number;
  gain?: number;
};

export type BoostTreeOptions = {
  maxDepth: number;
  lambda: number;
  gamma: number;
};

export class BoostTree {
  root: BoostNode | null = null;
  private options: BoostTreeOptions;

  constructor(options: BoostTreeOptions) {
    this.options = options;
  }

  fit(
    X: number[][],
    gradients: number[],
    hessians: number[],
    indices: number[],
  ): void {
    this.root = this.buildNode(X, gradients, hessians, indices, 0);
  }

  private buildNode(
    X: number[][],
    gradients: number[],
    hessians: number[],
    indices: number[],
    depth: number,
  ): BoostNode {
    const n = indices.length;
    let G = 0;
    let H = 0;
    for (const idx of indices) {
      G += gradients[idx];
      H += hessians[idx];
    }

    const leafWeight = -G / (H + this.options.lambda);

    if (depth >= this.options.maxDepth || n <= 2) {
      return { isLeaf: true, weight: leafWeight, sampleCount: n };
    }

    const nFeatures = X[0]?.length ?? 0;
    let bestGain = 0;
    let bestFeature = -1;
    let bestThreshold = 0;
    let bestLeft: number[] = [];
    let bestRight: number[] = [];

    const rootScore = (G * G) / (H + this.options.lambda);

    for (let f = 0; f < nFeatures; f++) {
      const vals = indices.map((i) => X[i][f]);
      const uniqueVals = Array.from(new Set(vals)).sort((a, b) => a - b);
      if (uniqueVals.length <= 1) continue;

      const step = Math.max(1, Math.floor(uniqueVals.length / 8));
      for (let v = 0; v < uniqueVals.length - 1; v += step) {
        const threshold = (uniqueVals[v] + uniqueVals[v + 1]) / 2;
        let GL = 0, HL = 0;
        let GR = 0, HR = 0;
        const left: number[] = [];
        const right: number[] = [];

        for (const idx of indices) {
          if (X[idx][f] <= threshold) {
            left.push(idx);
            GL += gradients[idx];
            HL += hessians[idx];
          } else {
            right.push(idx);
            GR += gradients[idx];
            HR += hessians[idx];
          }
        }

        if (left.length === 0 || right.length === 0) continue;

        const leftScore = (GL * GL) / (HL + this.options.lambda);
        const rightScore = (GR * GR) / (HR + this.options.lambda);
        const gain = 0.5 * (leftScore + rightScore - rootScore) - this.options.gamma;

        if (gain > bestGain) {
          bestGain = gain;
          bestFeature = f;
          bestThreshold = threshold;
          bestLeft = left;
          bestRight = right;
        }
      }
    }

    if (bestGain <= 1e-6 || bestFeature === -1) {
      return { isLeaf: true, weight: leafWeight, sampleCount: n };
    }

    const leftChild = this.buildNode(X, gradients, hessians, bestLeft, depth + 1);
    const rightChild = this.buildNode(X, gradients, hessians, bestRight, depth + 1);

    return {
      isLeaf: false,
      featureIndex: bestFeature,
      threshold: bestThreshold,
      left: leftChild,
      right: rightChild,
      weight: leafWeight,
      sampleCount: n,
      gain: bestGain,
    };
  }

  predictSample(x: number[]): number {
    let curr = this.root;
    while (curr && !curr.isLeaf) {
      const feat = curr.featureIndex ?? 0;
      const th = curr.threshold ?? 0;
      if (x[feat] <= th) curr = curr.left ?? null;
      else curr = curr.right ?? null;
    }
    return curr?.weight ?? 0;
  }
}
