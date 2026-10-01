import { useDataCleanup } from "./useDataCleanup";
import { CleanupBanner } from "./CleanupBanner";
import { CleanupTabs } from "./CleanupTabs";

export function DataCleanupPanel() {
  const cleanup = useDataCleanup();

  return (
    <div className="space-y-4">
      <CleanupBanner
        totalMissing={cleanup.missingSummary.totalMissing}
        missingPercent={cleanup.missingSummary.missingPercent}
        columnsWithMissing={cleanup.missingSummary.columnsWithMissing}
        duplicateCount={cleanup.duplicateCount}
        canUndo={cleanup.canUndo}
        onUndo={cleanup.handleUndo}
        onReset={cleanup.handleReset}
      />
      <CleanupTabs cleanup={cleanup} />
    </div>
  );
}
