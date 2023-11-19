export const SECONDS_TO_MILLISECONDS = 1000;
export const MINUTES_TO_MILLISECONDS = 60 * SECONDS_TO_MILLISECONDS;
export const HOURS_TO_MILLISECONDS = 60 * MINUTES_TO_MILLISECONDS;
export const DAY_TO_MILLISECONDS = 24 * HOURS_TO_MILLISECONDS;

export type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const satisfies readonly Day[];
