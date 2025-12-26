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

  const getJurusan = async (): Promise<JurusanType[]> => {
    try {
      const response = await api.get("/jurusan");

      return response.data?.data ?? [];
    } catch (error) {
      return [];
    }
  };
  const getJurusanById = async (id: string): Promise<JurusanType> => {
    try {
      const response = await api.get(`/jurusan?id=${id}`);
      return response.data?.data;
    } catch (error) {
      throw error;
    }
  };
  const postJurusan = async (data: JurusanType) => {
    try {
      const response = await api.post("/jurusan/create", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const editJurusanById = async (data: JurusanType) => {
    try {
      const response = await api.put(`/jurusan/edit`, data);
      return response?.data;
    } catch (error) {
      throw error;
    }
  };
  const deleteJurusanById = async (id: string) => {
    try {
      // Hapus jurusan utama dulu
      const response = await api.delete(`/jurusan/delete`, {
        data: { id },
      });

      // Gabungkan semua promise delete lain
      // const deletePromises: Promise<any>[] = [];

      // if (idSiswa.length > 0) {
      //   deletePromises.push(
      //     ...idSiswa.map((id) => api.delete(`/student/${id}`))
      //   );
      // }
      // if (idLesson.length > 0) {
      //   deletePromises.push(
      //     ...idLesson.map((id) => api.delete(`/lesson/${id}`))
      //   );
      // }
      // if (idKelas.length > 0) {
      //   deletePromises.push(...idKelas.map((id) => api.delete(`/kelas/${id}`)));
      // }
      // Jalankan semua delete secara paralel
      // if (deletePromises.length > 0) {
      //   await Promise.all(deletePromises);
      // }
      return response?.data;
    } catch (error: any) {
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
