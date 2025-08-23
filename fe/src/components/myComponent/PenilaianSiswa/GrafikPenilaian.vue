<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Vicon from "../Vicon.vue";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";
import * as chartConfig from "../../../lib/chartConfig";
import { usePenilaian } from "@/lib/pinia/penilaian";
import { reactive, watchEffect } from "vue";
import type { PenilaianType } from "@/types/penilaian/penilaian";

ChartJS.register(ArcElement, Tooltip, Legend);
const chartdata = chartConfig;
const penilaian = usePenilaian();
const nilaiKelas = reactive({
  rata_kelas: 0,
  tertinggi: 0,
  terendah: 0,
  jumlah_siswa: 0,
});
const keys = ["tugas", "uts", "uas"];
watchEffect(() => {
  if (penilaian.listNilaiSiswa.length > 0) {
    nilaiKelas.rata_kelas =
      penilaian.listNilaiSiswa.reduce(
        (a, b) => a + ((b.tugas ?? 0) + (b.uts ?? 0) + (b.uas ?? 0)) / 3,
        0
      ) / penilaian.listNilaiSiswa.length;
    nilaiKelas.tertinggi = Math.max(
      penilaian.listNilaiSiswa
        .flatMap((n: PenilaianType) => [n.tugas, n.uts, n.uas])
        .sort((a, b) => b - a)[0] ?? 0
    );
    nilaiKelas.terendah = Math.min(
      penilaian.listNilaiSiswa
        .flatMap((n: PenilaianType) => [n.tugas, n.uts, n.uas])
        .sort((a, b) => a - b)[0] ?? 0
    );
  } else {
  }
});
</script>

<template>
  <article class="w-full mt-10">
    <section class="w-full flex max-md:flex-col gap-5">
      <article
        class="w-full basis-1/4 p-4 text-center bg-green-500 text-white rounded-2xl"
      >
        <h2 class="font-mona-bold md:text-2xl">
          {{ nilaiKelas.rata_kelas.toFixed(2) }}
        </h2>
        <p class="font-mona">Rata-Rata Kelas</p>
      </article>
      <article
        class="w-full basis-1/4 p-4 text-center bg-slate-500 text-white rounded-2xl"
      >
        <h2 class="font-mona-bold md:text-2xl">{{ nilaiKelas.tertinggi }}</h2>
        <p class="font-mona">Nilai Tertinggi</p>
      </article>
      <article
        class="w-full basis-1/4 p-4 text-center bg-slate-500 text-white rounded-2xl"
      >
        <h2 class="font-mona-bold md:text-2xl">{{ nilaiKelas.terendah }}</h2>
        <p class="font-mona">Nilai Terendah</p>
      </article>
      <article
        class="w-full basis-1/4 p-4 text-center bg-slate-500 text-white rounded-2xl"
      >
        <h2 class="font-mona-bold md:text-2xl">
          {{ penilaian.listNilaiSiswa.length }}
        </h2>
        <p class="font-mona">Siswa</p>
      </article>
    </section>
    <section class="flex justify-between max-lg:flex-col gap-5 mt-5">
      <section
        class="w-full basis-1/2 bg-slate-50 rounded-2xl p-4 border shadow"
      >
        <header class="flex gap-2 items-center justify-between">
          <section class="flex gap-2 items-center">
            <Vicon name="bi-graph-up-arrow" scale="1" />
            <h2 class="font-mona-bold pt-1">Grafik Absensi</h2>
          </section>
          <section>
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
          </section>
        </header>
        <article>
          <Doughnut :data="chartConfig.data" :options="chartdata.options" />
        </article>
      </section>
      <section
        class="w-full basis-1/2 bg-slate-50 rounded-2xl p-4 border shadow"
      >
        <header class="flex gap-2 items-center">
          <Vicon name="bi-graph-up-arrow" scale="1" />

          <h2 class="font-mona-bold text-xl pt-1">
            Statistik Nilai Per kategori
          </h2>
        </header>
        <article class="mt-5 space-y-2 w-full">
          <section class="flex justify-between items-center">
            <h1 class="text-lg font-mona-bold">Senin</h1>
            <section class="flex gap-2 items-center">
              <div class="w-40 h-2 bg-slate-500 rounded-full">
                <div class="w-[20%] rounded-full h-full bg-green-400"></div>
              </div>
              <h1 class="text-lg font-mona-bold">20%</h1>
            </section>
          </section>
          <section class="flex justify-between items-center">
            <h1 class="text-lg font-mona-bold">Senin</h1>
            <section class="flex gap-2 items-center">
              <div class="w-40 h-2 bg-slate-500 rounded-full">
                <div class="w-[20%] rounded-full h-full bg-green-400"></div>
              </div>
              <h1 class="text-lg font-mona-bold">20%</h1>
            </section>
          </section>
          <section class="flex justify-between items-center">
            <h1 class="text-lg font-mona-bold">Senin</h1>
            <section class="flex gap-2 items-center">
              <div class="w-40 h-2 bg-slate-500 rounded-full">
                <div class="w-[20%] rounded-full h-full bg-green-400"></div>
              </div>
              <h1 class="text-lg font-mona-bold">20%</h1>
            </section>
          </section>
          <section class="flex justify-between items-center">
            <h1 class="text-lg font-mona-bold">Senin</h1>
            <section class="flex gap-2 items-center">
              <div class="w-40 h-2 bg-slate-500 rounded-full">
                <div class="w-[20%] rounded-full h-full bg-green-400"></div>
              </div>
              <h1 class="text-lg font-mona-bold">20%</h1>
            </section>
          </section>
          <section class="flex justify-between items-center">
            <h1 class="text-lg font-mona-bold">Senin</h1>
            <section class="flex gap-2 items-center">
              <div class="w-40 h-2 bg-slate-500 rounded-full">
                <div class="w-[20%] rounded-full h-full bg-green-400"></div>
              </div>
              <h1 class="text-lg font-mona-bold">20%</h1>
            </section>
          </section>
          <section class="flex justify-between items-center">
            <h1 class="text-lg font-mona-bold">Senin</h1>
            <section class="flex gap-2 items-center">
              <div class="w-40 h-2 bg-slate-500 rounded-full">
                <div class="w-[20%] rounded-full h-full bg-green-400"></div>
              </div>
              <h1 class="text-lg font-mona-bold">20%</h1>
            </section>
          </section>
          <section class="flex justify-between items-center">
            <h1 class="text-lg font-mona-bold">Senin</h1>
            <section class="flex gap-2 items-center">
              <div class="w-40 h-2 bg-slate-500 rounded-full">
                <div class="w-[20%] rounded-full h-full bg-green-400"></div>
              </div>
              <h1 class="text-lg font-mona-bold">20%</h1>
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
