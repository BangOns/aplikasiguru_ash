import { defineStore } from "pinia";
import { ref } from "vue";
import api from "../axios/config";
import type { LessonType } from "@/types/lesson";
import type { LessonTypeAdd, LessonTypeEdit } from "@/types/lesson/lesson";

export const useLesson = defineStore("lesson", () => {
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
  const getLesson = async (): Promise<LessonType[]> => {
    try {
      const response = await api.get("/pelajaran");

      return response.data?.data;
    } catch (error) {
      throw error;
    }
  };
  const getLessonById = async (id: string): Promise<LessonType> => {
    try {
      const response = await api.get(`/pelajaran?id=${id}`);
      return response.data?.data;
    } catch (error) {
      throw error;
    }
  };
  const postLesson = async (data: LessonTypeAdd) => {
    try {
      const response = await api.post("/pelajaran/create", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const editLessonById = async (data: LessonTypeEdit) => {
    try {
      const response = await api.put(`/pelajaran/edit`, data);

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const deleteLessonById = async (id: string) => {
    try {
      const response = await api.delete(`/pelajaran/delete`, { data: { id } });

      return response.data;
    } catch (error) {
      throw error;
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
