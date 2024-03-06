export type DataKey =
  | "feeds"
  | "feeds-md"
  | "itineraries"
  | "tales"
  | "tales-md"
  | "users";
export type DataMode = "dev" | "test" | "prod";
export type DataOptions = {
  dataKey: DataKey;
  dataMode?: DataMode;
};
