export function extractNumber(value: unknown): number {
  if (typeof value === "number") return value;
  if (value && typeof value === "object" && "values" in value) {
    const arr = (value as { values: ArrayLike<number> }).values;
    return arr[0];
  }
  return Number(value);
}

export function formatNumber(num: number | undefined): string {
  if (num === undefined) return "—";
  return Number.isInteger(num) ? num.toString() : num.toFixed(4);
}
