import type { OutlierStrategy } from "@/types/dataCleanup";
import { isMissingValue } from "./missingCheck";

export function computeColumnIQR(
  values: unknown[][],
  colIdx: number,
  multiplier = 1.5,
): { lower: number; upper: number; count: number } {
  const nums: number[] = [];
  for (let r = 0; r < values.length; r++) {
    const val = values[r]?.[colIdx];
    if (!isMissingValue(val)) {
      const n = Number(val);
      if (!isNaN(n)) nums.push(n);
    }
  }
  if (nums.length < 4) {
    return { lower: -Infinity, upper: Infinity, count: 0 };
  }
  nums.sort((a, b) => a - b);
  const q1Idx = Math.floor(nums.length * 0.25);
  const q3Idx = Math.floor(nums.length * 0.75);
  const q1 = nums[q1Idx];
  const q3 = nums[q3Idx];
  const iqr = q3 - q1;
  const lower = q1 - multiplier * iqr;
  const upper = q3 + multiplier * iqr;

  let count = 0;
  for (const n of nums) {
    if (n < lower || n > upper) count++;
  }

  return { lower, upper, count };
}

export function handleOutliers(
  values: unknown[][],
  colIdx: number,
  strategy: OutlierStrategy,
  multiplier = 1.5,
): unknown[][] {
  const { lower, upper } = computeColumnIQR(values, colIdx, multiplier);
  if (lower === -Infinity) return values;

  if (strategy === "drop") {
    return values.filter((row) => {
      const v = row[colIdx];
      if (isMissingValue(v)) return true;
      const n = Number(v);
      if (isNaN(n)) return true;
      return n >= lower && n <= upper;
    });
  }

  // "clip"
  return values.map((row) => {
    const v = row[colIdx];
    if (isMissingValue(v)) return [...row];
    const n = Number(v);
    if (isNaN(n)) return [...row];
    const newRow = [...row];
    if (n < lower) newRow[colIdx] = lower;
    else if (n > upper) newRow[colIdx] = upper;
    return newRow;
  });
}
