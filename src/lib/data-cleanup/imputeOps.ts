import type { ImputationStrategy } from "@/types/dataCleanup";
import { isMissingValue } from "./missingCheck";

export function computeColumnMean(values: unknown[][], colIdx: number): number {
  let sum = 0;
  let count = 0;
  for (let r = 0; r < values.length; r++) {
    const val = values[r]?.[colIdx];
    if (!isMissingValue(val)) {
      const num = Number(val);
      if (!isNaN(num)) {
        sum += num;
        count++;
      }
    }
  }
  return count > 0 ? sum / count : 0;
}

export function computeColumnMedian(values: unknown[][], colIdx: number): number {
  const nums: number[] = [];
  for (let r = 0; r < values.length; r++) {
    const val = values[r]?.[colIdx];
    if (!isMissingValue(val)) {
      const num = Number(val);
      if (!isNaN(num)) nums.push(num);
    }
  }
  if (nums.length === 0) return 0;
  nums.sort((a, b) => a - b);
  const mid = Math.floor(nums.length / 2);
  return nums.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}

export function computeColumnMode(values: unknown[][], colIdx: number): unknown {
  const counts = new Map<string, { raw: unknown; count: number }>();
  for (let r = 0; r < values.length; r++) {
    const val = values[r]?.[colIdx];
    if (!isMissingValue(val)) {
      const key = String(val);
      const curr = counts.get(key);
      if (curr) curr.count++;
      else counts.set(key, { raw: val, count: 1 });
    }
  }
  let maxCount = -1;
  let modeVal: unknown = "";
  for (const { raw, count } of counts.values()) {
    if (count > maxCount) {
      maxCount = count;
      modeVal = raw;
    }
  }
  return modeVal;
}

export function imputeColumn(
  values: unknown[][],
  colIdx: number,
  strategy: ImputationStrategy,
  constantVal?: unknown,
): unknown[][] {
  let fillValue: unknown = constantVal ?? 0;
  if (strategy === "mean") fillValue = computeColumnMean(values, colIdx);
  else if (strategy === "median") fillValue = computeColumnMedian(values, colIdx);
  else if (strategy === "mode") fillValue = computeColumnMode(values, colIdx);

  const result: unknown[][] = [];
  let lastValid: unknown = fillValue;

  if (strategy === "bfill") {
    // Collect backward filled column values
    const colVals = new Array(values.length);
    let nextValid: unknown = 0;
    for (let r = values.length - 1; r >= 0; r--) {
      const v = values[r]?.[colIdx];
      if (!isMissingValue(v)) nextValid = v;
      colVals[r] = isMissingValue(v) ? nextValid : v;
    }
    for (let r = 0; r < values.length; r++) {
      const row = [...values[r]];
      row[colIdx] = colVals[r];
      result.push(row);
    }
    return result;
  }

  for (let r = 0; r < values.length; r++) {
    const row = [...values[r]];
    const v = row[colIdx];
    if (isMissingValue(v)) {
      row[colIdx] = strategy === "ffill" ? lastValid : fillValue;
    } else {
      lastValid = v;
    }
    result.push(row);
  }
  return result;
}
