import { defineStore } from "pinia";
import { computed, ref } from "vue";
import api from "../axios/config";
import type { AbsensiType } from "@/types/absensi";
import { getWeekDates } from "@/utils/GenerateWeeks";
import moment from "moment";
import type { DateType } from "@/types/date";
import type { AbsensiTypeAdd, AbsensiTypeEdit } from "@/types/absensi/absensi";

export const usePresent = defineStore("present", () => {
  const searchKelas = ref<string>("");
  const searchMapel = ref<string>("");
  const listAbsensi = ref<AbsensiType[]>([]);
  const DateIndonesia = computed(() => {
    const date = new Date();
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      locale: "id-ID",
    };
    const dateIndonesia = date.toLocaleDateString("id-ID", options as any);
    return dateIndonesia;
  });
  const getAbsensi = async () => {
    try {
      const response = await api.get("/kehadiran");
      return response.data?.data;
    } catch (error) {
      return [];
    }
  };
  const postAbsensi = async (data: AbsensiTypeAdd) => {
    try {
      const response = await api.post("/kehadiran/create", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const editAbsensi = async (data: AbsensiTypeEdit) => {
    try {
      const response = await api.put(`/kehadiran/edit`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  // composable atau file absensi.ts
  const StatusAbsensi = (get_absensi: AbsensiType[] = []) => {
    const dateNow = moment().format("YYYY-MM-DD");

    if (!get_absensi || get_absensi.length === 0) {
      return {
        SumHadir: 0,
        SumSakit: 0,
        SumIzin: 0,
        SumAlpa: 0,
      };
    }

    return get_absensi.reduce(
      (acc, item) => {
        const isSameKelas = item.kelas.id === searchKelas.value;
        const isSameMapel = item.pelajaran.id === searchMapel.value;
        const isSameDate = item.date.split(" ")[0] === dateNow;

        if (isSameKelas && isSameMapel && isSameDate) {
          if (item.status === "HADIR") acc.SumHadir++;
          if (item.status === "SAKIT") acc.SumSakit++;
          if (item.status === "IZIN") acc.SumIzin++;
          if (item.status === "ALPA") acc.SumAlpa++;
        }
        return acc;
      },
      { SumHadir: 0, SumSakit: 0, SumIzin: 0, SumAlpa: 0 }
    );
  };
  const StatusAbsensiMingguan = (
    get_absensi: AbsensiType[] = [],
    searchKelas: string,
    searchMapel: string
  ) => {
    const WeeksDates = getWeekDates(0);

    const groupWeeksAbsensi = WeeksDates.reduce(
      (acc: Record<string, string[]>, week: DateType) => {
        const filteredAbsensiByWeek = get_absensi.filter(
          (item) =>
            item.date.split(" ")[0] === week.fullDate &&
            item.kelas.id === searchKelas &&
            item.pelajaran.id === searchMapel
        );
        acc[week.fullDate] = filteredAbsensiByWeek.map((item) => item.status);

        return acc;
      },
      {}
    );

    const statusSummary = WeeksDates.reduce(
      (acc: Record<string, number>, week: any) => {
        const statuses = groupWeeksAbsensi[week.fullDate] || [];

        statuses.forEach((status) => {
          acc[status] = (acc[status] || 0) + 1;
        });

        return acc;
      },
      {}
    );
    const groupDayAbsensi = WeeksDates.reduce(
      (acc: { dayName: string; statuses: string[] }[], week: DateType) => {
        const filteredAbsensiByWeek = get_absensi.filter(
          (item) =>
            item.date.split(" ")[0] === week.fullDate &&
            item.kelas.id === searchKelas &&
            item.pelajaran.id === searchMapel
        );
        const statusPresent = filteredAbsensiByWeek
          .filter((item) => item.status === "HADIR")
          .map((item) => item.status);
        acc.push({
          dayName: week.dayName,
          statuses: statusPresent,
        });

        return acc;
      },
      []
    );

    return { groupWeeksAbsensi, statusSummary, groupDayAbsensi };
  };

  return {
    listAbsensi,
    searchKelas,
    searchMapel,
    DateIndonesia,
    StatusAbsensi,
    StatusAbsensiMingguan,
    getAbsensi,
    postAbsensi,
    editAbsensi,
  };
});
