import { defineStore } from "pinia";
import { ref } from "vue";
import api from "../axios/config";
import type { PenilaianType } from "@/types/penilaian/penilaian";

export const usePenilaian = defineStore("penilaian", () => {
  const searchKelas = ref<string>("");
  const searchMapel = ref<string>("");
  const listNilaiSiswa = ref<PenilaianType[]>([]);
  const getPenilaian = async (): Promise<PenilaianType[]> => {
    try {
      const response = await api.get("/nilai_siswa");

      return response.data?.data;
    } catch (error) {
      throw error;
    }
  };
  const postPenilaian = async (data: PenilaianType) => {
    try {
      const response = await api.post("/nilai_siswa/create", data);
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
  const editPenilaian = async (data: PenilaianType) => {
    try {
      const response = await api.put(`/nilai_siswa/edit`, data);
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
    listNilaiSiswa,
    getPenilaian,
    postPenilaian,
    editPenilaian,
  };
});
