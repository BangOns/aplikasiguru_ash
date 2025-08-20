import { defineStore } from "pinia";
import { ref } from "vue";
import api from "../axios/config";
import type { AbsensiType } from "@/types/absensi";

export const usePresent = defineStore("present", () => {
  const searchKelas = ref<string>("");
  const searchMapel = ref<string>("");
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
  return {
    searchKelas,
    searchMapel,
    getAbsensi,
    postAbsensi,
  };
});
