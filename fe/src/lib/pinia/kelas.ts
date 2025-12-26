import { defineStore } from "pinia";
import { ref } from "vue";
import api from "../axios/config";
import type { KelasAdd, KelasEdit, KelasType } from "@/types/siswa/data_kelas";

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
      return response.data?.data;
    } catch (error) {
      throw error;
    }
  };
  const getKelasById = async (id: string): Promise<KelasType> => {
    try {
      const response = await api.get(`/kelas?id=${id}`);
      return response.data?.data;
    } catch (error) {
      throw error;
    }
  };
  const postKelas = async (data: KelasAdd) => {
    try {
      const response = await api.post("/kelas/create", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const editKelasById = async (data: KelasEdit) => {
    try {
      const response = await api.put(`/kelas/edit`, data);

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const deleteKelasById = async (id: string) => {
    try {
      // Hapus jurusan utama dulu
      const kelasResponse = await api.delete(`/kelas/delete`, {
        data: { id },
      });

      // Gabungkan semua promise delete lain

      return kelasResponse.data;
    } catch (error: any) {
      throw error;
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
