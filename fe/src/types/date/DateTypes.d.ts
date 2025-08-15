import type { ScheduleType } from "../schedule";

export type DateType = {
  dayName: string;
  date: number;
  month: string;
  year: number;
  fullDate: string;
  schedule: ScheduleType[];
};
