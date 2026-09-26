import { useMemo } from "react";
import Plot from "react-plotly.js";
import { useTheme } from "next-themes";
import type { Config, Data, Layout } from "plotly.js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

type NumericColumnData = {
  column: string;
  values: number[];
};

type OutlierVisualizerProps = {
  numericColumnData: NumericColumnData[];
  totalOutlierValues: number;
  removedRowsAfterOutlierDrop: number;
  iqrMultiplier: number;
  setIqrMultiplier: (value: number) => void;
  dropOutliers: () => void;
};

export function OutlierVisualizer({
  numericColumnData,
  totalOutlierValues,
  removedRowsAfterOutlierDrop,
  iqrMultiplier,
  setIqrMultiplier,
  dropOutliers,
}: OutlierVisualizerProps) {
  const boxPlotData: Data[] = useMemo(
    () =>
      numericColumnData.map((columnData) => ({
        type: "box",
        name: columnData.column,
        y: columnData.values,
        boxpoints: "outliers",
        marker: {
          size: 4,
        },
      })),
    [numericColumnData],
  );

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const boxPlotLayout: Partial<Layout> = useMemo(
    () => ({
      margin: { t: 20, r: 10, b: 80, l: 40 },
      paper_bgcolor: "transparent",
      plot_bgcolor: "transparent",
      font: {
        family: "inherit",
        color: isDark ? "#cbd5e1" : "#334155",
      },
      xaxis: {
        tickangle: -30,
        gridcolor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
        zerolinecolor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)",
      },
      yaxis: {
        title: {
          text: "Value",
        },
        gridcolor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
        zerolinecolor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)",
      },
      showlegend: false,
    }),
    [isDark],
  );

  const boxPlotConfig: Partial<Config> = useMemo(
    () => ({
      displaylogo: false,
      responsive: true,
      modeBarButtonsToRemove: ["select2d", "lasso2d", "autoScale2d"],
    }),
    [],
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">
          Outlier Visualizer (Boxplot)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>IQR multiplier</Label>
            <span className="text-sm font-medium">
              {iqrMultiplier.toFixed(1)}x
            </span>
          </div>
          <Slider
            value={[iqrMultiplier]}
            onValueChange={([value]) => {
              if (typeof value === "number") {
                setIqrMultiplier(value);
              }
            }}
            min={0.5}
            max={3}
            step={0.1}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0.5x</span>
            <span>Default: 1.5x</span>
            <span>3.0x</span>
          </div>
        </div>

        <Plot
          data={boxPlotData}
          layout={{ ...boxPlotLayout, height: 320, autosize: true }}
          config={boxPlotConfig}
          useResizeHandler
          className="w-full"
        />

        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className="text-muted-foreground">
            Outliers: {totalOutlierValues} · Rows affected:{" "}
            {removedRowsAfterOutlierDrop}
          </span>
          <Button
            variant="destructive"
            size="sm"
            onClick={dropOutliers}
            disabled={removedRowsAfterOutlierDrop === 0}
          >
            Drop Outliers
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
