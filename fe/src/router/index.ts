import { createRouter, createWebHistory } from "vue-router";
import HomeViews from "../views/HomeViews.vue";
import AbsensiSiswaViews from "@/views/AbsensiSiswaViews.vue";
import PenilaianSiswaViews from "@/views/PenilaianSiswaViews.vue";
import ScheduleKegiatanViews from "@/views/ScheduleKegiatanViews.vue";
import DataSiswaViews from "@/views/DataSiswaViews.vue";
import DataKelasViews from "@/views/DataKelasViews.vue";
import DataJurusanViews from "@/views/DataJurusanViews.vue";
import DataGuruViews from "@/views/DataGuruViews.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeViews,
    },
    {
      path: "/jadwal_kegiatan",
      name: "jadwal_kegiatan",
      component: ScheduleKegiatanViews,
    },
    {
      path: "/absensi",
      name: "absensi",
      component: AbsensiSiswaViews,
    },
    {
      path: "/penilaian",
      name: "penilaian",
      component: PenilaianSiswaViews,
    },
    {
      path: "/siswa",
      name: "data_siswa",
      component: DataSiswaViews,
    },
    {
      path: "/kelas",
      name: "data_kelas",
      component: DataKelasViews,
    },
    {
      path: "/jurusan",
      name: "data_jurusan",
      component: DataJurusanViews,
    },
    {
      path: "/guru",
      name: "data_guru",
      component: DataGuruViews,
    },
    {
      path: "/:catchAll(.*)",
      redirect: "/",
    },
  ],
});
export default router;
