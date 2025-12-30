import { defineStore } from "pinia";
import { ref } from "vue";
import api from "../axios/config";
import type {
  PenilaianType,
  PenilaianTypeAdd,
  PenilaianTypeEdit,
} from "@/types/penilaian/penilaian";

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
  const postPenilaian = async (data: PenilaianTypeAdd) => {
    try {
      const response = await api.post("/nilai_siswa/create", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const editPenilaian = async (data: PenilaianTypeEdit) => {
    try {
      const response = await api.put(`/nilai_siswa/edit`, data);
      return response.data;
    } catch (error) {
      throw error;
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
