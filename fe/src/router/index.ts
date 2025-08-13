import { createRouter, createWebHistory } from "vue-router";
import HomeViews from "../views/HomeViews.vue";
import ScheduleMengajarViews from "@/views/ScheduleMengajarViews.vue";
import AbsensiSiswaViews from "@/views/AbsensiSiswaViews.vue";
import PenilaianSiswaViews from "@/views/PenilaianSiswaViews.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeViews,
    },
    {
      path: "/jadwal_mengajar/:id",
      name: "jadwal_mengajar",
      component: ScheduleMengajarViews,
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
