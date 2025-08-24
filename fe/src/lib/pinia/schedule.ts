import type { DateType } from "@/types/date";
import type { ScheduleType } from "@/types/schedule";
import moment from "moment";
import { defineStore } from "pinia";
import { ref } from "vue";
import api from "../axios/config";

export const useSchedule = defineStore("schedule", () => {
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
  const getSchedule = async () => {
    try {
      const response = await api.get("/schedule");
      return response.data;
    } catch (error) {
      return [];
    }
  };
  const postSchedule = async (data: ScheduleType) => {
    try {
      const response = await api.post("/schedule", data);
      return {
        status: 200,
        data: response.data,
      };
    } catch (error) {
      return {
        status: 500,
        data: error,
      };
    }
  };
  const editSchedules = async (data: ScheduleType) => {
    try {
      const response = await api.put(`/schedule/${data.id}`, data);
      return {
        status: 200,
        data: response.data,
      };
    } catch (error) {
      return {
        status: 500,
        data: error,
      };
    }
  };
  const deleteSchedule = async (id: string) => {
    try {
      const response = await api.delete(`/schedule/${id}`);
      return {
        status: 200,
        data: response.data,
      };
    } catch (error) {
      return {
        status: 500,
        data: error,
      };
    }
  };
  return {
    daySchedule,
    datesSchedule,
    setDatesSchedule,
    editSchedule,
    filterDaySchedule,
    getSchedule,
    postSchedule,
    editSchedules,
    deleteSchedule,
  };
});
