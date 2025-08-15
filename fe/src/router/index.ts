import { createRouter, createWebHistory } from "vue-router";
import HomeViews from "../views/HomeViews.vue";
import AbsensiSiswaViews from "@/views/AbsensiSiswaViews.vue";
import PenilaianSiswaViews from "@/views/PenilaianSiswaViews.vue";
import ScheduleKegiatanViews from "@/views/ScheduleKegiatanViews.vue";

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
  ],
});
export default router;
