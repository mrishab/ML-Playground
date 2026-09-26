import { ConfusionMatrixCell } from "./ConfusionMatrixCell";

interface ConfusionMatrixTableProps {
  confusionMatrix: number[][];
  labels: string[];
}

export function ConfusionMatrixTable({
  confusionMatrix,
  labels,
}: ConfusionMatrixTableProps) {
  const maxVal = Math.max(...confusionMatrix.flat(), 1);

  return (
    <div className="overflow-x-auto">
      <table className="mx-auto border-collapse">
        <thead>
          <tr>
            <th className="p-2 text-xs text-muted-foreground">Actual \ Pred</th>
            {labels.map((label) => (
              <th key={label} className="p-2 text-center text-xs font-medium">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {labels.map((actualLabel, rowIdx) => (
            <tr key={actualLabel}>
              <td className="p-2 text-right text-xs font-medium">
                {actualLabel}
              </td>
              {labels.map((predLabel, colIdx) => (
                <td key={predLabel} className="p-1">
                  <ConfusionMatrixCell
                    count={confusionMatrix[rowIdx][colIdx]}
                    isDiagonal={rowIdx === colIdx}
                    maxVal={maxVal}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
