export type Dataset = {
  name: string;
  file: string;
  problemType?: string;
};

export const DATASETS: Dataset[] = [
  { name: "Boston", file: "Boston.csv", problemType: "regression" },
  { name: "College", file: "College.csv", problemType: "classification" },
  { name: "Heart", file: "heart.csv", problemType: "classification" },
  { name: "Movies", file: "movies.csv", problemType: "regression" },
  { name: "MT Cars", file: "mtcars.csv", problemType: "regression" },
  { name: "S&P Market", file: "Smarket.csv", problemType: "classification" },
  {
    name: "Swiss Census",
    file: "swiss-census.csv",
    problemType: "regression",
  },
];
