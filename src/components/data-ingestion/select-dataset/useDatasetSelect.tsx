import { useDatasetStore } from "@/stores/dataset";

export type Dataset = {
  name: string;
  file: string;
};

export const DATASETS: Dataset[] = [
  { name: "Boston", file: "Boston.csv" },
  { name: "College", file: "College.csv" },
  { name: "Heart", file: "heart.csv" },
  { name: "Movies", file: "movies.csv" },
  { name: "MT Cars", file: "mtcars.csv" },
  { name: "S&P Market", file: "Smarket.csv" },
  { name: "Swiss Census", file: "swiss-census.csv" },
];

export function useDatasetSelect() {
  const selectedDataset = useDatasetStore((state) => state.selectedDataset);
  const setSelectedDataset = useDatasetStore(
    (state) => state.setSelectedDataset,
  );

  return {
    datasets: DATASETS,
    selectedDataset,
    onSelect: setSelectedDataset,
  };
}
