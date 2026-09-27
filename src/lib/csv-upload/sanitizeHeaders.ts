export function sanitizeHeaders(rawHeaders: string[]): string[] {
  const seen = new Map<string, number>();

  return rawHeaders.map((raw, idx) => {
    let header = (raw ?? "").trim();
    if (!header) {
      header = `Column_${idx + 1}`;
    }

    const count = seen.get(header) ?? 0;
    seen.set(header, count + 1);

    if (count > 0) {
      return `${header}_${count + 1}`;
    }
    return header;
  });
}
