import { useDatasetStore } from "@/stores/dataset";
import { useMLConfigStore } from "@/stores/mlConfig";
import { usePipelineStore } from "@/stores/pipeline";
import { useTrainingResultsStore } from "@/stores/trainingResults";
import { formatLogsForReport, getConsoleLogs } from "./consoleLogger";

const GITHUB_REPO_ISSUES_URL =
  "https://github.com/mrishab/ML-Playground/issues/new";
const MAX_URL_BODY_LENGTH = 3500;

export function buildBugReport(): string {
  const dataset = useDatasetStore.getState();
  const mlConfig = useMLConfigStore.getState();
  const pipeline = usePipelineStore.getState();
  const results = useTrainingResultsStore.getState();

  const currentUrl =
    typeof window !== "undefined" ? window.location.href : "Unknown";
  const userAgent =
    typeof navigator !== "undefined" ? navigator.userAgent : "Unknown";
  const screenResolution =
    typeof window !== "undefined"
      ? `${window.innerWidth}x${window.innerHeight}`
      : "Unknown";
  const timestamp = new Date().toISOString();

  const datasetInfo = dataset.selectedDataset
    ? `${dataset.selectedDataset}${dataset.df ? ` (${dataset.df.shape[0]} rows, ${dataset.df.shape[1]} cols)` : ""}`
    : "None selected";

  const featuresList =
    mlConfig.selectedFeatures.length > 0
      ? mlConfig.selectedFeatures.map((f) => f.column).join(", ")
      : "None";

  const trainingSummary = [
    `Linear Regression: ${results.linearRegression.trainingState}${results.linearRegression.metrics ? ` (MSE: ${results.linearRegression.metrics.mse.toFixed(4)})` : ""}`,
    `KNN: ${results.knn.trainingState}${results.knn.metrics ? ` (Acc: ${(results.knn.metrics.accuracy * 100).toFixed(1)}%)` : ""}`,
    `Logistic Regression: ${results.logisticRegression.trainingState}${results.logisticRegression.metrics ? ` (Acc: ${(results.logisticRegression.metrics.accuracy * 100).toFixed(1)}%)` : ""}`,
    `LDA: ${results.lda.trainingState}${results.lda.metrics ? ` (Acc: ${(results.lda.metrics.accuracy * 100).toFixed(1)}%)` : ""}`,
    `K-Means: ${results.kmeans.trainingState}${results.kmeans.metrics ? ` (Inertia: ${results.kmeans.metrics.inertia.toFixed(2)})` : ""}`,
  ].join("\n  - ");

  const totalLogs = getConsoleLogs().length;
  const consoleLogs = formatLogsForReport(50);

  return `## 🐛 Bug Report

### Description
<!-- Please briefly describe what went wrong or what you experienced -->

### Steps to Reproduce
1.
2.
3.

### 📊 Application State
- **URL:** \`${currentUrl}\`
- **Dataset:** ${datasetInfo}
- **Problem Type:** ${mlConfig.problemType}
- **Target Column:** ${mlConfig.targetColumn || "None"}
- **Selected Features:** ${featuresList}
- **Split Created:** ${mlConfig.isSplit ? `Yes (Test: ${mlConfig.testSplitPercent}%, Shuffle: ${mlConfig.shuffle})` : "No"}
- **Last Split Recorded:** ${pipeline.lastSplitConfig ? `${pipeline.lastSplitConfig.datasetName} (${pipeline.lastSplitConfig.selectedFeatures.length} features)` : "None"}
- **Model Status:**
  - ${trainingSummary}

### 🖥️ Environment
- **Timestamp:** ${timestamp}
- **Browser / User Agent:** ${userAgent}
- **Window Size:** ${screenResolution}

### 📜 Console Logs (${totalLogs} captured)
\`\`\`text
${consoleLogs}
\`\`\`
`;
}

export async function copyReportToClipboard(report: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(report);
      return true;
    } catch {
      return false;
    }
  }
  return false;
}

export function openGitHubIssueWithReport(fullReport: string): void {
  let issueBody = fullReport;
  if (issueBody.length > MAX_URL_BODY_LENGTH) {
    const truncatedNotice = `\n\n> 📋 **Note:** Full diagnostics and complete console logs were copied to your clipboard. Paste them directly into this issue description if needed.\n`;
    issueBody =
      issueBody.substring(0, MAX_URL_BODY_LENGTH - truncatedNotice.length) +
      truncatedNotice;
  }

  const issueTitle = "Bug: [Brief description of the issue]";
  const params = new URLSearchParams({
    title: issueTitle,
    body: issueBody,
  });

  const url = `${GITHUB_REPO_ISSUES_URL}?${params.toString()}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export async function triggerBugReport(): Promise<{
  copied: boolean;
}> {
  const report = buildBugReport();
  const copied = await copyReportToClipboard(report);
  openGitHubIssueWithReport(report);
  return { copied };
}
