import type { JurusanType } from "@/types/siswa";
import { defineStore } from "pinia";
import api from "../axios/config";
import { ref } from "vue";

export const useJurusan = defineStore("jurusan", () => {
  const openModalJurusan = ref<boolean>(false);
  const idJurusan = ref<string>("");
  const searchJurusan = ref<string>("");
  const openModalsWithEdit = (id: string) => {
    openModalJurusan.value = true;
    idJurusan.value = id;
  };

  const openModals = () => {
    openModalJurusan.value = true;
    idJurusan.value = "";
  };
  const setSearchJurusan = (value: string) => {
    searchJurusan.value = value;
  };
  const postJurusan = async (data: JurusanType) => {
    try {
      const response = await api.post("/jurusan", data);
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
  const getJurusan = async () => {
    try {
      const response = await api.get("/jurusan");

      return response.data;
    } catch (error) {
      return [];
    }
  };
  const editJurusanById = async (id: string, data: JurusanType) => {
    try {
      const response = await api.put(`/jurusan/${id}`, data);

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
  const deleteJurusanById = async (
    idJurusan: string,
    idSiswa: string[] = [],
    idKelas: string[] = [],
    idLesson: string[] = []
  ) => {
    try {
      // Hapus jurusan utama dulu
      const jurusanResponse = await api.delete(`/jurusan/${idJurusan}`);

      // Gabungkan semua promise delete lain
      const deletePromises: Promise<any>[] = [];

      if (idSiswa.length > 0) {
        deletePromises.push(
          ...idSiswa.map((id) => api.delete(`/student/${id}`))
        );
      }
      if (idLesson.length > 0) {
        deletePromises.push(
          ...idLesson.map((id) => api.delete(`/lesson/${id}`))
        );
      }
      if (idKelas.length > 0) {
        deletePromises.push(...idKelas.map((id) => api.delete(`/kelas/${id}`)));
      }
      // Jalankan semua delete secara paralel
      if (deletePromises.length > 0) {
        await Promise.all(deletePromises);
      }

      return {
        status: 200,
        data: jurusanResponse.data,
      };
    } catch (error: any) {
      return {
        status: error?.response?.status || 500,
        data: error?.response?.data || error,
      };
    }
  };

  const getJurusanById = async (id: string): Promise<JurusanType> => {
    try {
      const response = await api.get(`/jurusan/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  return {
    openModalJurusan,
    idJurusan,
    searchJurusan,
    setSearchJurusan,
    openModalsWithEdit,
    openModals,
    postJurusan,
    editJurusanById,
    deleteJurusanById,
    getJurusan,
    getJurusanById,
  };
});
