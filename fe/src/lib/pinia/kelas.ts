import { defineStore } from "pinia";
import { ref } from "vue";
import api from "../axios/config";
import type { KelasType } from "@/types/siswa/data_kelas";

export const useKelas = defineStore("kelas", () => {
  const openModalKelas = ref<boolean>(false);
  const idKelas = ref<string>("");
  const searchKelas = ref<string>("");
  const searchJurusan = ref<string>("");
  const searchWaliKelas = ref<string>("");
  const openModalsWithEdit = (id: string) => {
    openModalKelas.value = true;
    idKelas.value = id;
  };

  const openModals = () => {
    openModalKelas.value = true;
    idKelas.value = "";
  };
  const setSearchKelas = (value: string) => {
    searchKelas.value = value;
  };
  const getKelas = async () => {
    try {
      const response = await api.get("/kelas");
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const getKelasById = async (id: string): Promise<KelasType> => {
    try {
      const response = await api.get(`/kelas/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const postKelas = async (data: KelasType) => {
    try {
      const response = await api.post("/kelas", data);
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
  const editKelasById = async (id: string, data: KelasType) => {
    try {
      const response = await api.put(`/kelas/${id}`, data);

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
  const deleteKelasById = async (id: string) => {
    try {
      const response = await api.delete(`/kelas/${id}`);

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
    openModalKelas,
    idKelas,
    searchKelas,
    searchJurusan,
    searchWaliKelas,
    setSearchKelas,
    openModalsWithEdit,
    openModals,
    getKelas,
    getKelasById,
    postKelas,
    editKelasById,
    deleteKelasById,
  };
});
