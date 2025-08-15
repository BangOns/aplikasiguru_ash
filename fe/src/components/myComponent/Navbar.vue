<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import Vicon from "./Vicon.vue";
const listnav = [
  {
    name: "Dashboard",
    icon: "md-spacedashboard",
    link: "home",
  },
  {
    name: "Jadwal Kegiatan",
    icon: "co-book",
    link: "jadwal_kegiatan",
  },
  {
    name: "Siswa",
    icon: "bi-people-fill",
    child: [
      {
        name: "Data Siswa",
        icon: "bi-people-fill",
        link: "data_siswa",
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
    ],
  },
];
</script>

<template>
  <header class="w-72 h-screen max-lg:hidden fixed top-0">
    <section class="w-full h-full py-4 pl-4 pr-10">
      <div
        class="w-full h-full rounded-2xl bg-slate-50 border shadow flex flex-col justify-between"
      >
        <ul class="flex basis-3/5 w-full h-full flex-col gap-2 p-4">
          <li v-for="(value, index) in listnav" :key="index" class="w-full">
            <!-- Kalau ada child, pakai Accordion -->
            <template v-if="value.child?.length">
              <Accordion type="single" collapsible class="w-full">
                <AccordionItem :value="value.name">
                  <AccordionTrigger
                    class="flex items-center cursor-pointer px-2 py-3 rounded-xl hover:bg-blue-700 hover:text-white"
                  >
                    <section class="flex items-center gap-2">
                      <Vicon :name="value.icon" scale="1.5" />
                      <p class="pt-1 font-mona text-base">{{ value.name }}</p>
                    </section>
                  </AccordionTrigger>

                  <AccordionContent>
                    <ul class="flex flex-col gap-1 pl-8">
                      <li v-for="(child, cIndex) in value.child" :key="cIndex">
                        <RouterLink
                          :to="{ name: child.link }"
                          :class="{
                            'bg-blue-600/50 text-white':
                              $route.name == child.link,
                          }"
                          class="px-2 py-2 rounded-lg hover:bg-blue-700 hover:text-white flex items-center gap-2"
                        >
                          <Vicon :name="child.icon" scale="1.3" />
                          <span>{{ child.name }}</span>
                        </RouterLink>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </template>

            <!-- Kalau tidak ada child, langsung RouterLink -->
            <template v-else>
              <RouterLink
                :to="{ name: value.link }"
                :class="{
                  'bg-blue-600/50 text-white': $route.name == value.link,
                }"
                class="w-full flex px-2 py-3 rounded-xl hover:bg-blue-700 hover:text-white cursor-pointer font-mona items-center justify-start gap-2"
              >
                <Vicon :name="value.icon" scale="1.5" />
                <p class="pt-1">{{ value.name }}</p>
              </RouterLink>
            </template>
          </li>
        </ul>
      </div>
    </section>
  </header>
</template>
