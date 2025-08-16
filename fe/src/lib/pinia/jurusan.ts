import type { JurusanType } from "@/types/siswa";
import { defineStore } from "pinia";
import api from "../axios/config";
import { ref } from "vue";

export const useJurusan = defineStore("jurusan", () => {
  const openModalJurusan = ref<boolean>(false);
  const idJurusan = ref<string>("");
  const openModalsWithEdit = (id: string) => {
    openModalJurusan.value = true;
    idJurusan.value = id;
  };
  const openModals = () => {
    openModalJurusan.value = true;
    idJurusan.value = "";
  };
  const postJurusan = async (data: JurusanType) => {
    const response = await api.post("/jurusan", data);
    return response.data;
  };
  const getJurusan = async (): Promise<JurusanType[]> => {
    const response = await api.get("/jurusan");
    return response.data;
  };
  const editJurusanById = async (id: string, data: JurusanType) => {
    const response = await api.put(`/jurusan/${id}`, data);

    return response.data;
  };
  const getJurusanById = async (id: string): Promise<JurusanType> => {
    console.log(id);

    const response = await api.get(`/jurusan/${id}`);
    return response.data;
  };
  return {
    openModalJurusan,
    idJurusan,
    openModalsWithEdit,
    openModals,
    postJurusan,
    editJurusanById,
    getJurusan,
    getJurusanById,
  };
});
