import { defineStore } from "pinia";
import api from "../axios/config";
import { ref } from "vue";
import type { GuruType } from "@/types/guru";
import type { GuruTypeAdd, GuruTypeEdit } from "@/types/guru/data_guru";

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
  const postTeacher = async (data: GuruTypeAdd) => {
    try {
      const response = await api.post("/wali_kelas/create", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const getTeacher = async () => {
    try {
      const response = await api.get("/wali_kelas");

      return response.data?.data;
    } catch (error) {
      throw error;
    }
  };
  const getTeacherById = async (id: string): Promise<GuruType> => {
    try {
      const response = await api.get(`/wali_kelas?id=${id}`);
      return response.data?.data;
    } catch (error) {
      throw error;
    }
  };

  const editTeacherById = async (data: GuruTypeEdit) => {
    try {
      const response = await api.put(`/wali_kelas/edit`, data);

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const deleteTeacherById = async (id: string) => {
    try {
      // Hapus teacher utama dulu
      const response = await api.delete(`/wali_kelas/delete`, {
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
      // // Jalankan semua delete secara paralel
      // if (deletePromises.length > 0) {
      //   await Promise.all(deletePromises);
      // }

      return response?.data;
    } catch (error: any) {
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
