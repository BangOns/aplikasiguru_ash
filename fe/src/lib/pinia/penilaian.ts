import { defineStore } from "pinia";
import { ref } from "vue";

export const usePenilaian = defineStore("penilaian", () => {
  const searchKelas = ref<string>("");
  const searchMapel = ref<string>("");

  return {
    searchKelas,
    searchMapel,
  };
});
