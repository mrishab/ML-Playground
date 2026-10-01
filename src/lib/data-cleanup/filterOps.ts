import type { RowFilter } from "@/types/dataCleanup";
import { isMissingValue } from "./missingCheck";

export function evaluateFilterMatch(rowVal: unknown, filter: RowFilter): boolean {
  const { operator, value } = filter;
  if (operator === "is_null") {
    return isMissingValue(rowVal);
  }
  if (operator === "is_not_null") {
    return !isMissingValue(rowVal);
  }

  if (isMissingValue(rowVal)) return false;

  const rowStr = String(rowVal).trim().toLowerCase();
  const targetStr = value.trim().toLowerCase();

  switch (operator) {
    case "equals":
      return rowStr === targetStr;
    case "not_equals":
      return rowStr !== targetStr;
    case "contains":
      return rowStr.includes(targetStr);
    case "greater_than": {
      const numRow = Number(rowVal);
      const numTarget = Number(value);
      return !isNaN(numRow) && !isNaN(numTarget) && numRow > numTarget;
    }
    case "less_than": {
      const numRow = Number(rowVal);
      const numTarget = Number(value);
      return !isNaN(numRow) && !isNaN(numTarget) && numRow < numTarget;
    }
    default:
      return true;
  }
}

export function applyRowFilter(
  columns: string[],
  values: unknown[][],
  filter: RowFilter,
  keepMatching: boolean,
): unknown[][] {
  const colIdx = columns.indexOf(filter.column);
  if (colIdx === -1) return values;

  return values.filter((row) => {
    const matches = evaluateFilterMatch(row[colIdx], filter);
    return keepMatching ? matches : !matches;
  });
}
