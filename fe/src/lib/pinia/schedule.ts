import type { DateType } from "@/types/date";
import moment from "moment";
import { defineStore } from "pinia";
import { ref } from "vue";
import api from "../axios/config";
import type {
  ScheduleTypeAdd,
  ScheduleTypeEdit,
} from "@/types/schedule/ScheduleType";

export const useSchedule = defineStore("schedule", () => {
  const daySchedule = ref<string>("");
  const datesSchedule = ref<DateType[]>([]);
  const setDatesSchedule = ref<ScheduleTypeEdit>();
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
      const response = await api.get("/jadwal");
      return response.data?.data;
    } catch (error) {
      return [];
    }
  };
  const getScheduleByID = async (id: string) => {
    try {
      const response = await api.get(`/jadwal?id=${id}`);
      return response.data?.data;
    } catch (error) {
      return [];
    }
  };
  const postSchedule = async (data: ScheduleTypeAdd) => {
    try {
      const response = await api.post("/jadwal/create", data);

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const editSchedules = async (data: ScheduleTypeEdit) => {
    try {
      const response = await api.put(`/jadwal/edit`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const deleteSchedule = async (id: string) => {
    try {
      const response = await api.delete(`/jadwal/delete`, { data: { id } });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  return {
    daySchedule,
    datesSchedule,
    setDatesSchedule,
    editSchedule,
    filterDaySchedule,
    getSchedule,
    getScheduleByID,
    postSchedule,
    editSchedules,
    deleteSchedule,
  };
});
