import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImputeCard } from "./ImputeCard";
import { DropNullCard } from "./DropNullCard";
import { DuplicatesOutliersCard } from "./DuplicatesOutliersCard";
import { RowFilterCard } from "./RowFilterCard";
import { ColumnOpsCard } from "./ColumnOpsCard";
import { CleanupHistoryCard } from "./CleanupHistoryCard";
import type { useDataCleanup } from "./useDataCleanup";

interface CleanupTabsProps {
  cleanup: ReturnType<typeof useDataCleanup>;
}

export function CleanupTabs({ cleanup }: CleanupTabsProps) {
  return (
    <Tabs defaultValue="impute" className="w-full">
      <TabsList className="grid grid-cols-3 sm:grid-cols-6 h-auto p-1 gap-1">
        <TabsTrigger value="impute" className="text-xs py-1.5">Impute</TabsTrigger>
        <TabsTrigger value="drop-null" className="text-xs py-1.5">Drop Nulls</TabsTrigger>
        <TabsTrigger value="duplicates" className="text-xs py-1.5">Duplicates</TabsTrigger>
        <TabsTrigger value="filter" className="text-xs py-1.5">Row Filter</TabsTrigger>
        <TabsTrigger value="columns" className="text-xs py-1.5">Columns</TabsTrigger>
        <TabsTrigger value="history" className="text-xs py-1.5">History ({cleanup.history.length})</TabsTrigger>
      </TabsList>
      <div className="pt-3">
        <TabsContent value="impute">
          <ImputeCard columns={cleanup.columns} missingSummary={cleanup.missingSummary} onImpute={cleanup.handleImpute} />
        </TabsContent>
        <TabsContent value="drop-null">
          <DropNullCard columns={cleanup.columns} totalMissing={cleanup.missingSummary.totalMissing} onDropRows={cleanup.handleDropNullRows} onDropCols={cleanup.handleDropColumnsByNulls} />
        </TabsContent>
        <TabsContent value="duplicates">
          <DuplicatesOutliersCard duplicateCount={cleanup.duplicateCount} numericColumns={cleanup.numericColumns} onRemoveDuplicates={cleanup.handleRemoveDuplicates} onHandleOutliers={cleanup.handleOutlierAction} />
        </TabsContent>
        <TabsContent value="filter">
          <RowFilterCard columns={cleanup.columns} values={cleanup.values} onFilter={cleanup.handleFilter} />
        </TabsContent>
        <TabsContent value="columns">
          <ColumnOpsCard columns={cleanup.columns} onRename={cleanup.handleRename} onDropCol={cleanup.handleDropCol} onCast={cleanup.handleCast} onReplace={cleanup.handleReplaceValue} />
        </TabsContent>
        <TabsContent value="history">
          <CleanupHistoryCard history={cleanup.history} />
        </TabsContent>
      </div>
    </Tabs>
  );
}
