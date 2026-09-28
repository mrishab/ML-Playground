export interface LogEntry {
  timestamp: string;
  level: "log" | "info" | "warn" | "error";
  message: string;
}

const MAX_LOGS = 100;
const logs: LogEntry[] = [];
let isInitialized = false;

function safeFormatArg(arg: unknown): string {
  if (arg instanceof Error) {
    return `${arg.name}: ${arg.message}${arg.stack ? `\n${arg.stack}` : ""}`;
  }
  if (typeof arg === "object" && arg !== null) {
    try {
      return JSON.stringify(arg);
    } catch {
      return "[Circular or Unserializable Object]";
    }
  }
  return String(arg);
}

function recordLog(level: LogEntry["level"], args: unknown[]) {
  const message = args.map(safeFormatArg).join(" ");
  const entry: LogEntry = {
    timestamp: new Date().toISOString().substring(11, 23),
    level,
    message,
  };
  logs.push(entry);
  if (logs.length > MAX_LOGS) {
    logs.shift();
  }
}

export function initConsoleLogger(): void {
  if (isInitialized || typeof window === "undefined") return;
  isInitialized = true;

  const originalLog = console.log;
  const originalInfo = console.info;
  const originalWarn = console.warn;
  const originalError = console.error;

  console.log = (...args: unknown[]) => {
    recordLog("log", args);
    originalLog.apply(console, args);
  };

  console.info = (...args: unknown[]) => {
    recordLog("info", args);
    originalInfo.apply(console, args);
  };

  console.warn = (...args: unknown[]) => {
    recordLog("warn", args);
    originalWarn.apply(console, args);
  };

  console.error = (...args: unknown[]) => {
    recordLog("error", args);
    originalError.apply(console, args);
  };
}

export function getConsoleLogs(): LogEntry[] {
  return [...logs];
}

export function formatLogsForReport(maxCount = 40): string {
  const slice = logs.slice(-maxCount);
  if (slice.length === 0) return "No console logs captured.";
  return slice
    .map((l) => `[${l.timestamp}] [${l.level.toUpperCase()}] ${l.message}`)
    .join("\n");
}
