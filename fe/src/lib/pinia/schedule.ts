import type { DateType } from "@/types/date";
import type { ScheduleType } from "@/types/schedule";
import { defineStore } from "pinia";
import { ref } from "vue";

export const uesSchedule = defineStore("schedule", () => {
  const daySchedule = ref<string>("");
  const datesSchedule = ref<DateType[]>([]);
  const setDatesSchedule = ref<ScheduleType>();
  const editSchedule = ref<boolean>(false);
  return { daySchedule, datesSchedule, setDatesSchedule, editSchedule };
});
