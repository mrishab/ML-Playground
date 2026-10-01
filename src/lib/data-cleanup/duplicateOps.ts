export function countDuplicateRows(values: unknown[][]): number {
  const seen = new Set<string>();
  let duplicates = 0;
  for (const row of values) {
    const key = JSON.stringify(row);
    if (seen.has(key)) {
      duplicates++;
    } else {
      seen.add(key);
    }
  }
  return duplicates;
}

export function dropDuplicateRows(values: unknown[][]): unknown[][] {
  const seen = new Set<string>();
  const uniqueRows: unknown[][] = [];
  for (const row of values) {
    const key = JSON.stringify(row);
    if (!seen.has(key)) {
      seen.add(key);
      uniqueRows.push(row);
    }
  }
  return uniqueRows;
}
