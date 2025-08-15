import type { DateType } from "@/types/date";
import type { ScheduleType } from "@/types/schedule";
import moment from "moment";
import { defineStore } from "pinia";
import { ref } from "vue";

export const uesSchedule = defineStore("schedule", () => {
  const daySchedule = ref<string>("");
  const datesSchedule = ref<DateType[]>([]);
  const setDatesSchedule = ref<ScheduleType>();
  const editSchedule = ref<boolean>(false);
  const filterDaySchedule = (dates: DateType[]) => {
    const schedule = dates.filter((date) => {
      const scheduleDate = moment(date.fullDate, "YYYY-MM-DD");
      return scheduleDate.isSameOrAfter(moment(), "day");
    });
    return schedule;
  };
  return {
    daySchedule,
    datesSchedule,
    setDatesSchedule,
    editSchedule,
    filterDaySchedule,
  };
});
