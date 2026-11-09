export type IsolationTreeNode = {
  featureIndex?: number;
  splitValue?: number;
  left?: IsolationTreeNode;
  right?: IsolationTreeNode;
  size: number;
  isLeaf: boolean;
};

// Average path length of unsuccessful search in a BST
export function c(n: number): number {
  if (n <= 1) return 0;
  if (n === 2) return 1;
  const eulerMascheroni = 0.5772156649;
  return 2 * (Math.log(n - 1) + eulerMascheroni) - (2 * (n - 1)) / n;
}

export function buildITree(
  X: number[][],
  currentHeight: number,
  maxHeight: number,
): IsolationTreeNode {
  const n = X.length;
  if (currentHeight >= maxHeight || n <= 1) {
    return { size: n, isLeaf: true };
  }

  const nFeatures = X[0]?.length ?? 0;
  // Find features with variation
  const validFeatures: number[] = [];
  const minMaxMap: Record<number, { min: number; max: number }> = {};

  for (let f = 0; f < nFeatures; f++) {
    let min = Infinity;
    let max = -Infinity;
    for (let i = 0; i < n; i++) {
      const v = X[i][f];
      if (v < min) min = v;
      if (v > max) max = v;
    }
    if (max > min) {
      validFeatures.push(f);
      minMaxMap[f] = { min, max };
    }
  }

  if (validFeatures.length === 0) {
    return { size: n, isLeaf: true };
  }

  // Randomly select a feature
  const feat = validFeatures[Math.floor(Math.random() * validFeatures.length)];
  const { min, max } = minMaxMap[feat];
  // Random split point between min and max
  const splitValue = min + Math.random() * (max - min);

  const left: number[][] = [];
  const right: number[][] = [];
  for (let i = 0; i < n; i++) {
    if (X[i][feat] < splitValue) left.push(X[i]);
    else right.push(X[i]);
  }

  return {
    featureIndex: feat,
    splitValue,
    size: n,
    isLeaf: false,
    left: buildITree(left, currentHeight + 1, maxHeight),
    right: buildITree(right, currentHeight + 1, maxHeight),
  };
}

export function pathLength(
  x: number[],
  node: IsolationTreeNode,
  currentHeight: number,
): number {
  if (node.isLeaf) {
    return currentHeight + c(node.size);
  }
  const feat = node.featureIndex ?? 0;
  const th = node.splitValue ?? 0;
  if (x[feat] < th) {
    return node.left ? pathLength(x, node.left, currentHeight + 1) : currentHeight;
  }
  return node.right ? pathLength(x, node.right, currentHeight + 1) : currentHeight;
}
