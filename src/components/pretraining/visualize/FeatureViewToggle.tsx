import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LayoutGrid,
  ScatterChart,
  Flame,
  BarChart2,
  Table2,
} from "lucide-react";

export function FeatureViewToggle() {
  return (
    <TabsList className="grid grid-cols-2 sm:grid-cols-5 w-full max-w-2xl h-auto p-1 gap-1">
      <TabsTrigger value="grid" className="text-xs gap-1.5 py-1.5">
        <LayoutGrid className="h-3.5 w-3.5" />
        All Graphs
      </TabsTrigger>
      <TabsTrigger value="scatter" className="text-xs gap-1.5 py-1.5">
        <ScatterChart className="h-3.5 w-3.5" />
        Scatter Plot
      </TabsTrigger>
      <TabsTrigger value="heatmap" className="text-xs gap-1.5 py-1.5">
        <Flame className="h-3.5 w-3.5" />
        Density Heatmap
      </TabsTrigger>
      <TabsTrigger value="distribution" className="text-xs gap-1.5 py-1.5">
        <BarChart2 className="h-3.5 w-3.5" />
        Distribution
      </TabsTrigger>
      <TabsTrigger value="stats" className="text-xs gap-1.5 py-1.5">
        <Table2 className="h-3.5 w-3.5" />
        Statistics
      </TabsTrigger>
    </TabsList>
  );
}
