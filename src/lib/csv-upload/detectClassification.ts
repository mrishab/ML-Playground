export function detectClassification(
  rows: Record<string, unknown>[],
  target: string,
): boolean {
  const uniqueValues = new Set<unknown>();
  let allIntegers = true;
  let minVal = Infinity;
  let maxVal = -Infinity;

  for (const row of rows) {
    const val = row[target];
    if (val !== null && val !== undefined && val !== "") {
      uniqueValues.add(val);
      if (typeof val === "number") {
        if (!Number.isInteger(val)) allIntegers = false;
        if (val < minVal) minVal = val;
        if (val > maxVal) maxVal = val;
      }
    }
  }

  if (!allIntegers) return false;
  return (
    (uniqueValues.size === 2 && (minVal === 0 || minVal === -1)) ||
    (uniqueValues.size <= 5 && minVal >= 0 && maxVal <= 10) ||
    (rows.length >= 20 &&
      uniqueValues.size <= 10 &&
      uniqueValues.size / rows.length <= 0.05)
  );
}
