import { defineStore } from "pinia";
import { ref } from "vue";
import api from "../axios/config";
import type { KelasType } from "@/types/siswa/data_kelas";
import type { StudentType } from "@/types/siswa/data_siswa";

export const useSiswa = defineStore("siswa", () => {
  const openModalSiswa = ref<boolean>(false);
  const idSiswa = ref<string>("");
  const searchSiswa = ref<string>("");
  const searchKelas = ref<string>("");
  const searchJurusan = ref<string>("");
  const openModalsWithEdit = (id: string) => {
    openModalSiswa.value = true;
    idSiswa.value = id;
  };

  const openModals = () => {
    openModalSiswa.value = true;
    idSiswa.value = "";
  };
  const setSearchSiswa = (value: string) => {
    searchSiswa.value = value;
  };
  const getSiswa = async () => {
    try {
      const response = await api.get("/student");

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const getSiswaById = async (id: string): Promise<StudentType> => {
    try {
      const response = await api.get(`/student/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const postSiswa = async (data: StudentType) => {
    try {
      const response = await api.post("/student", data);
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
  const editSiswaById = async (id: string, data: StudentType) => {
    try {
      const response = await api.put(`/student/${id}`, data);

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
  const deleteSiswaById = async (id: string) => {
    try {
      const response = await api.delete(`/student/${id}`);

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
    openModalSiswa,
    idSiswa,
    searchSiswa,
    searchKelas,
    searchJurusan,
    setSearchSiswa,
    openModalsWithEdit,
    openModals,
    getSiswa,
    getSiswaById,
    postSiswa,
    editSiswaById,
    deleteSiswaById,
  };
});
