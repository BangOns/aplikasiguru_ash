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
  const setSearchJurusan = (value: string) => {
    searchJurusan.value = value;
  };
  const openModals = () => {
    openModalJurusan.value = true;
    idJurusan.value = "";
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
      console.log(error);

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
  const getJurusanById = async (id: string): Promise<JurusanType> => {
    const response = await api.get(`/jurusan/${id}`);
    return response.data;
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
    getJurusan,
    getJurusanById,
  };
});
