<script setup lang="ts">
import Vicon from "./Vicon.vue";
const listnav = [
  {
    name: "Dashboard",
    icon: "md-spacedashboard",
    link: "home",
  },
  {
    name: "Jadwal Mengajar",
    icon: "co-book",
    link: "jadwal_mengajar",
  },
  {
    name: "Absensi Siswa",
    icon: "bi-calendar-check-fill",
    link: "absensi",
  },
  {
    name: "Penilaian Siswa",
    icon: "ri-numbers-fill",
    link: "penilaian",
  },
];
</script>

<template>
  <header class="w-72 h-screen max-lg:hidden fixed top-0">
    <section class="w-full h-full py-4 pl-4 pr-10">
      <div
        class="w-full h-full rounded-2xl bg-slate-50 border shadow flex flex-col justify-between"
      >
        <ul class="flex basis-3/5 w-full h-full flex-col gap-5 p-4">
          <li class="w-full" v-for="(value, index) in listnav" :key="index">
            <RouterLink
              :to="{ name: value.link }"
              :class="{
                'bg-blue-600/50 text-white': $route.name == value.link,
              }"
              class="w-full flex px-2 py-3 rounded-xl hover:bg-blue-700 hover:text-white cursor-pointer font-mona items-center justify-start gap-2"
            >
              <Vicon :name="value.icon" scale="1.5" />
              <p class="pt-1">
                {{ value.name }}
              </p>
            </RouterLink>
          </li>
        </ul>
      </div>
    </section>
  </header>
</template>
