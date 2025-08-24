<script setup lang="ts">
import Vicon from "../Vicon.vue";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";
import { options } from "../../../lib/chartConfig";
import { usePresent } from "@/lib/pinia/absensi";
import { reactive, ref, watchEffect } from "vue";
import { useGetAbsensi } from "@/lib/query/absensi";
import { useGetSiswa } from "@/lib/query/siswa";

ChartJS.register(ArcElement, Tooltip, Legend);
const absensi = usePresent();
const { data: get_absensi } = useGetAbsensi();
const { data: get_siswa } = useGetSiswa();
const chartConfig = reactive({
  data: {
    labels: ["Hadir", "Sakit", "Izin", "Alpa"],
    datasets: [
      {
        label: "Status Absensi",
        data: [0, 0, 0, 0],
        backgroundColor: ["#4ade80", "#f87171", "#60a5fa", "#fbbf24"],
      },
    ],
  },
});
const StatusAbsensi = ref({
  SumHadir: 0,
  SumSakit: 0,
  SumIzin: 0,
  SumAlpa: 0,
});

const StatusAbsensiHarian = ref<{ dayName: string; statuses: string[] }[]>([]);
const getPercent = (statuses: string[] | undefined) => {
  const total = get_siswa.value?.length ?? 1;
  return ((statuses?.length ?? 0) / total) * 100;
};

watchEffect(() => {
  if (!get_absensi.value) return;
  StatusAbsensi.value = absensi.StatusAbsensi(get_absensi.value);
  const absensiWeeks = absensi.StatusAbsensiMingguan(
    get_absensi.value,
    absensi.searchKelas,
    absensi.searchMapel
  );
  StatusAbsensiHarian.value = absensiWeeks.groupDayAbsensi;
  chartConfig.data = {
    ...chartConfig.data,
    datasets: [
      {
        ...chartConfig.data.datasets[0],
        data: [
          absensiWeeks.statusSummary.HADIR,
          absensiWeeks.statusSummary.SAKIT,
          absensiWeeks.statusSummary.IZIN,
          absensiWeeks.statusSummary.ALPA,
        ],
      },
    ],
  };
});
</script>

<template>
  <article class="w-full bg-white p-4 mt-10 rounded-md">
    <section class="w-full flex max-md:flex-col gap-5">
      <article
        class="w-full basis-1/4 p-4 text-center bg-slate-500 text-white rounded-2xl"
      >
        <h2 class="font-mona-bold md:text-2xl">{{ StatusAbsensi.SumHadir }}</h2>
        <p class="font-mona">Hadir</p>
      </article>
      <article
        class="w-full basis-1/4 p-4 text-center bg-slate-500 text-white rounded-2xl"
      >
        <h2 class="font-mona-bold md:text-2xl">{{ StatusAbsensi.SumSakit }}</h2>
        <p class="font-mona">Sakit</p>
      </article>
      <article
        class="w-full basis-1/4 p-4 text-center bg-slate-500 text-white rounded-2xl"
      >
        <h2 class="font-mona-bold md:text-2xl">{{ StatusAbsensi.SumIzin }}</h2>
        <p class="font-mona">Izin</p>
      </article>
      <article
        class="w-full basis-1/4 p-4 text-center bg-slate-500 text-white rounded-2xl"
      >
        <h2 class="font-mona-bold md:text-2xl">{{ StatusAbsensi.SumAlpa }}</h2>
        <p class="font-mona">Alpa</p>
      </article>
    </section>
    <section class="flex justify-between max-lg:flex-col gap-5 mt-5">
      <section
        class="w-full basis-1/2 bg-slate-50 rounded-2xl p-4 border shadow"
      >
        <header class="flex gap-2 items-center justify-between">
          <section class="flex gap-2 items-center">
            <Vicon name="bi-graph-up-arrow" scale="1" />
            <h2 class="font-mona-bold pt-1">Grafik Absensi Minggu ini</h2>
          </section>
          <!-- <section>
            <Select>
              <SelectTrigger class="w-full py-2 px-3 bg-slate-100 border">
                <SelectValue placeholder="Tahun ini" class="font-mona" />
              </SelectTrigger>
              <SelectContent class="p-3">
                <SelectGroup class="font-mona">
                  <SelectLabel class="font-mona-bold">Day</SelectLabel>
                  <SelectItem
                    v-for="day in [12, 2, 3, 4]"
                    :key="day"
                    :value="day"
                  >
                    {{ day }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </section> -->
        </header>
        <article class="mt-5 w-full">
          <Doughnut :data="chartConfig.data" :options="options" />
        </article>
      </section>
      <section
        class="w-full basis-1/2 bg-slate-50 rounded-2xl p-4 border shadow"
      >
        <header class="flex gap-2 items-center">
          <Vicon name="bi-graph-up-arrow" scale="1" />

          <h2 class="font-mona-bold text-xl pt-1">
            Statistik Kehadiran Minggu ini
          </h2>
        </header>
        <article class="mt-5 space-y-2 w-full">
          <section
            v-for="(value, index) in StatusAbsensiHarian"
            :key="index"
            class="flex flex-col gap-2"
          >
            <div class="w-full flex justify-between">
              <h1 class="text-lg font-mona-bold">{{ value.dayName }}</h1>
              <h1 class="text-lg font-mona-bold">
                {{ getPercent(value.statuses).toFixed(1) }}%
              </h1>
            </div>
            <section class="flex gap-2 items-center">
              <div class="w-full h-2 bg-slate-500 rounded-full">
                <div
                  class="rounded-full h-full bg-green-400"
                  :style="{
                    width: getPercent(value.statuses).toFixed(1) + '%',
                  }"
                ></div>
              </div>
            </section>
          </section>
        </article>
      </section>
    </section>
    <article class="mt-5 w-full flex justify-center gap-5">
      <button class="px-4 py-2 text-white rounded-md bg-green-600">
        <Vicon name="bi-file-earmark-pdf-fill" scale="1" />
        Download PDF
      </button>
      <button class="px-4 py-2 text-white rounded-md bg-green-600">
        <Vicon name="si-microsoftexcel" scale="1" class="p-0 font-bold" />

        Download Excel
      </button>
    </article>
  </article>
</template>
