import { ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

interface DatasetSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function DatasetSelect({ value, onChange }: DatasetSelectProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {value || "Select a dataset..."}
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {DATASETS.map((dataset) => (
          <DropdownMenuItem
            key={dataset.name}
            onClick={() => onChange(dataset.name)}
            className="flex items-center justify-between"
          >
            {dataset.name}
            {value === dataset.name && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
