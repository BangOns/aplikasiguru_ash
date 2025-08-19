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
      component: () => import("@/views/ScheduleKegiatanViews.vue"),
    },
    {
      path: "/absensi",
      name: "absensi",
      component: () => import("@/views/AbsensiSiswaViews.vue"),
    },
    {
      path: "/penilaian",
      name: "penilaian",
      component: () => import("@/views/PenilaianSiswaViews.vue"),
    },
    {
      path: "/siswa",
      name: "data_siswa",
      component: () => import("@/views/DataSiswaViews.vue"), // DataSiswaViews,
    },
    {
      path: "/kelas",
      name: "data_kelas",
      component: () => import("@/views/DataKelasViews.vue"), // DataKelasViews,
    },
    {
      path: "/jurusan",
      name: "data_jurusan",
      component: () => import("@/views/DataJurusanViews.vue"), // DataJurusanViews,
    },
    {
      path: "/guru",
      name: "data_guru",
      component: () => import("@/views/DataGuruViews.vue"), // DataGuruViews,
    },
    {
      path: "/:catchAll(.*)",
      redirect: "/",
    },
  ],
});
export default router;
