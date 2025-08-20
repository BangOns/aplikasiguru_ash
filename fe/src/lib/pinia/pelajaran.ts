import { defineStore } from "pinia";
import { ref } from "vue";
import api from "../axios/config";
import type { LessonType } from "@/types/lesson";

export const useLesson = defineStore("kelas", () => {
  const openModalLesson = ref<boolean>(false);
  const idLesson = ref<string>("");
  const searchLesson = ref<string>("");
  const searchKelas = ref<string>("");
  const searchJurusan = ref<string>("");
  const openModalsWithEdit = (id: string) => {
    openModalLesson.value = true;
    idLesson.value = id;
  };

  const openModals = () => {
    openModalLesson.value = true;
    idLesson.value = "";
  };
  const setSearchLesson = (value: string) => {
    searchLesson.value = value;
  };
  const getLesson = async () => {
    try {
      const response = await api.get("/lesson");

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const getLessonById = async (id: string): Promise<LessonType> => {
    try {
      const response = await api.get(`/lesson/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const postLesson = async (data: LessonType) => {
    try {
      const response = await api.post("/lesson", data);
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
  const editLessonById = async (id: string, data: LessonType) => {
    try {
      const response = await api.put(`/lesson/${id}`, data);

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
  const deleteLessonById = async (id: string) => {
    try {
      const response = await api.delete(`/lesson/${id}`);

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
    openModalLesson,
    idLesson,
    searchLesson,
    searchKelas,
    searchJurusan,
    setSearchLesson,
    openModalsWithEdit,
    openModals,
    getLesson,
    getLessonById,
    postLesson,
    editLessonById,
    deleteLessonById,
  };
});
