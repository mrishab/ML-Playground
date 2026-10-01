import { isMissingValue } from "./missingCheck";

export function renameColumn(
  columns: string[],
  oldName: string,
  newName: string,
): string[] {
  const cleanNew = newName.trim();
  if (!cleanNew || cleanNew === oldName) return columns;
  return columns.map((col) => (col === oldName ? cleanNew : col));
}

export function castColumnType(
  values: unknown[][],
  colIdx: number,
  targetType: "numeric" | "string" | "boolean",
): unknown[][] {
  return values.map((row) => {
    const newRow = [...row];
    const val = newRow[colIdx];
    if (isMissingValue(val)) return newRow;

    if (targetType === "numeric") {
      const num = Number(val);
      newRow[colIdx] = isNaN(num) ? null : num;
    } else if (targetType === "boolean") {
      const str = String(val).toLowerCase().trim();
      newRow[colIdx] = str === "true" || str === "1" || str === "yes";
    } else {
      newRow[colIdx] = String(val);
    }
    return newRow;
  });
}

export function replaceValue(
  values: unknown[][],
  colIdx: number,
  findVal: string,
  replaceVal: string,
): unknown[][] {
  const findLower = findVal.trim().toLowerCase();
  return values.map((row) => {
    const newRow = [...row];
    const val = newRow[colIdx];
    const isTargetMissing =
      findLower === "null" || findLower === "na" || findLower === "nan" || findLower === "";

    if (isTargetMissing && isMissingValue(val)) {
      newRow[colIdx] = replaceVal;
    } else if (String(val).toLowerCase() === findLower) {
      newRow[colIdx] = replaceVal;
    }
    return newRow;
  });
}
