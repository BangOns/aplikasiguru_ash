import { defineStore } from "pinia";
import api from "../axios/config";
import { ref } from "vue";
import type { GuruType } from "@/types/guru";

export const useTeacher = defineStore("teacher", () => {
  const openModalTeacher = ref<boolean>(false);
  const idTeacher = ref<string>("");
  const searchTeacher = ref<string>("");
  const listHeadTable = ["email", "telp", "jenis kelamin"];
  const openModalsWithEdit = (id: string) => {
    openModalTeacher.value = true;
    idTeacher.value = id;
  };

  const openModals = () => {
    openModalTeacher.value = true;
    idTeacher.value = "";
  };
  const setSearchTeacher = (value: string) => {
    searchTeacher.value = value;
  };
  const postTeacher = async (data: GuruType) => {
    try {
      const response = await api.post("/teacher", data);
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
  const getTeacher = async () => {
    try {
      const response = await api.get("/teacher");

      return response.data;
    } catch (error) {
      return [];
    }
  };
  const editTeacherById = async (id: string, data: GuruType) => {
    try {
      const response = await api.put(`/teacher/${id}`, data);

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

  const deleteTeacherById = async (
    idTeacher: string,
    idSiswa: string[] = [],
    idKelas: string[] = [],
    idLesson: string[] = []
  ) => {
    try {
      // Hapus teacher utama dulu
      const TeacherResponse = await api.delete(`/teacher/${idTeacher}`);

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
        data: TeacherResponse.data,
      };
    } catch (error: any) {
      return {
        status: error?.response?.status || 500,
        data: error?.response?.data || error,
      };
    }
  };
  const getTeacherById = async (id: string): Promise<GuruType> => {
    try {
      const response = await api.get(`/teacher/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  return {
    openModalTeacher,
    idTeacher,
    searchTeacher,
    listHeadTable,
    setSearchTeacher,
    openModalsWithEdit,
    openModals,
    postTeacher,
    editTeacherById,
    deleteTeacherById,
    getTeacher,
    getTeacherById,
  };
});
