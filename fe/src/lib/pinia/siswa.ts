import { defineStore } from "pinia";
import { ref } from "vue";

export const useSiswa = defineStore("siswa", () => {
  const openModalsSiswa = ref<boolean>(false);

  return {
    openModalsSiswa,
  };
});
