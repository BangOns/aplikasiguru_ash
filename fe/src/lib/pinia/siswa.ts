import { defineStore } from "pinia";
import { ref } from "vue";
import api from "../axios/config";
import type {
  StudentType,
  StudentTypeAdd,
  StudentTypeEdit,
} from "@/types/siswa/data_siswa";

export const useSiswa = defineStore("siswa", () => {
  const openModalSiswa = ref<boolean>(false);
  const idSiswa = ref<string>("");
  const searchSiswa = ref<string>("");
  const searchKelas = ref<string>("");
  const searchJurusan = ref<string>("");
  const setDataSiswa = ref<StudentType[]>([]);
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
      const response = await api.get("/siswa");

      return response.data?.data;
    } catch (error) {
      throw error;
    }
  };
  const getSiswaById = async (id: string): Promise<StudentType> => {
    try {
      const response = await api.get(`/siswa?id=${id}`);
      console.log(response);

      return response.data?.data;
    } catch (error) {
      throw error;
    }
  };
  const postSiswa = async (data: StudentTypeAdd) => {
    try {
      const response = await api.post("/siswa/create", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const editSiswaById = async (data: StudentTypeEdit) => {
    try {
      const response = await api.put(`/siswa/edit`, data);

      return response.data;
    } catch (error: any) {
      throw error;
    }
  };
  const deleteSiswaById = async (id: string) => {
    try {
      const response = await api.delete(`/siswa/delete`, { data: { id } });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    openModalSiswa,
    idSiswa,
    searchSiswa,
    searchKelas,
    searchJurusan,
    setDataSiswa,
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
