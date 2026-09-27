export function calculateBaselineMSE(data: number[]): number {
  if (data.length === 0) return 0;
  const mean = data.reduce((a, b) => a + b, 0) / data.length;
  return data.reduce((acc, y) => acc + (y - mean) ** 2, 0) / data.length;
}

export function toNumericArray(result: unknown): number[] {
  if (Array.isArray(result)) {
    return result as number[];
  }
  return (result as { arraySync: () => number[] }).arraySync();
}
