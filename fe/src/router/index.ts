import { createRouter, createWebHistory } from "vue-router";
import HomeViews from "../views/HomeViews.vue";
import JadwalMengajarViews from "@/views/JadwalMengajarViews.vue";

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
      component: JadwalMengajarViews,
    },
  ],
});
export default router;
