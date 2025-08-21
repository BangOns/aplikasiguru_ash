import { defineStore } from "pinia";
import { computed, ref } from "vue";
import api from "../axios/config";
import type { AbsensiType } from "@/types/absensi";

export const usePresent = defineStore("present", () => {
  const searchKelas = ref<string>("");
  const searchMapel = ref<string>("");

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
      const response = await api.get("/present");
      return response.data;
    } catch (error) {
      return [];
    }
  };
  const postAbsensi = async (data: AbsensiType) => {
    try {
      const response = await api.post("/present", data);
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
  const editAbsensi = async (data: AbsensiType) => {
    try {
      const response = await api.put(`/present/${data.id}`, data);
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
  // composable atau file absensi.ts
  const StatusAbsensi = (get_absensi: AbsensiType[] = []) => {
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
        const isSameKelas = item.id_kelas === searchKelas.value;
        const isSameMapel = item.id_lesson === searchMapel.value;
        const isSameDate =
          item.date.split("-")[0].trim() === DateIndonesia.value;

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

  return {
    searchKelas,
    searchMapel,
    DateIndonesia,
    StatusAbsensi,
    getAbsensi,
    postAbsensi,
    editAbsensi,
  };
});
