<script setup lang="ts">
import Vicon from "../Vicon.vue";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";
import * as chartConfig from "../../../lib/chartConfig";
import { usePenilaian } from "@/lib/pinia/penilaian";
import { reactive, watchEffect } from "vue";
import type { PenilaianType } from "@/types/penilaian/penilaian";
import { useGetPenilaian } from "@/lib/query/penilaian";
import type { StudentType } from "@/types/siswa/data_siswa";
import type { KelasType } from "@/types/siswa/data_kelas";
import type { LessonType } from "@/types/lesson";
import { useGetSiswa } from "@/lib/query/siswa";
import { useGetKelas } from "@/lib/query/kelas";
import { useGetLesson } from "@/lib/query/pelajaran";
import * as XLSX from "xlsx";
ChartJS.register(ArcElement, Tooltip, Legend);
const chartdata = chartConfig;
const penilaian = usePenilaian();
const nilaiKelas = reactive({
  rata_kelas: 0,
  tertinggi: 0,
  terendah: 0,
  jumlah_siswa: 0,
});
const chartGrafik = reactive({
  data: {
    labels: ["0-40", "40-80", "80-100"],
    datasets: [
      {
        label: "Nilai",
        data: [0, 0, 0],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
});
const statsSiswa = reactive({
  sangat_baik: 0,
  baik: 0,
  kurang: 0,
});

const { data: get_nilai } = useGetPenilaian();
const { data: get_siswa } = useGetSiswa();
const { data: get_kelas } = useGetKelas();
const { data: get_mapel } = useGetLesson();
watchEffect(() => {
  const list = penilaian.listNilaiSiswa;

  if (list.length === 0) return;

  // Ambil semua nilai (tugas, uts, uas) dalam 1 array
  const allNilai = list.flatMap((n: PenilaianType) => [n.tugas, n.uts, n.uas]);

  // Hitung rata-rata kelas
  const totalRataSiswa = list.reduce(
    (sum, n) => sum + ((n.tugas ?? 0) + (n.uts ?? 0) + (n.uas ?? 0)) / 3,
    0
  );
  nilaiKelas.rata_kelas = totalRataSiswa / list.length;

  // Nilai tertinggi & terendah
  nilaiKelas.tertinggi = Math.max(...allNilai);
  nilaiKelas.terendah = Math.min(...allNilai);

  // Data chart (kategori nilai)
  const kurang40 = allNilai.filter((v) => v < 40).length;
  const antara40_80 = allNilai.filter((v) => v >= 40 && v < 80).length;
  const lebih80 = allNilai.filter((v) => v >= 80).length;

  chartGrafik.data = {
    ...chartGrafik.data,
    datasets: [
      {
        ...chartGrafik.data.datasets[0],
        data: [kurang40, antara40_80, lebih80],
      },
    ],
  };

  // Statistik siswa berdasarkan rata-rata
  statsSiswa.sangat_baik = list.filter((s) => s.rata_rata >= 80).length;
  statsSiswa.baik = list.filter(
    (s) => s.rata_rata >= 60 && s.rata_rata < 80
  ).length;
  statsSiswa.kurang = list.filter((s) => s.rata_rata < 60).length;
});

const getPercent = (siswa: number | undefined) => {
  const total = get_nilai.value?.length ?? 1;
  return ((siswa ?? 0) / total) * 100;
};

const exportExcel = () => {
  const listSiswa = penilaian.listNilaiSiswa.map((item: PenilaianType) => {
    const siswa = get_siswa.value.find(
      (siswa: StudentType) => siswa.id === item.id_siswa
    );
    const kelas = get_kelas.value.find(
      (kelas: KelasType) => kelas.id === item.id_kelas
    );
    const lesson = get_mapel.value.find(
      (lesson: LessonType) => lesson.id === item.id_lesson
    );
    const { id, id_kelas, id_lesson, id_siswa, rata_rata, ...rest } = item;
    return {
      siswa: siswa?.nama || "",
      kelas: kelas?.nama_kelas || "",
      pelajaran: lesson?.mapel || "",
      ...rest,
      rata_rata: item.rata_rata?.toFixed(2) || 0,
    };
  });
  // Convert data to worksheet
  const worksheet = XLSX.utils.json_to_sheet(listSiswa);
  // Buat Workbook baru dan tambahkan worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data Nilai Siswa");
  // Simpan file Excel
  XLSX.writeFile(workbook, "data_nilai_siswa.xlsx");
};
</script>

<template>
  <article class="w-full mt-10">
    <section class="w-full flex max-md:flex-col gap-5">
      <article
        class="w-full basis-1/4 p-4 text-center bg-green-800 text-white rounded-2xl"
      >
        <h2 class="font-mona-bold md:text-2xl">
          {{ nilaiKelas.rata_kelas.toFixed(2) }}
        </h2>
        <p class="font-mona">Rata-Rata Kelas</p>
      </article>
      <article
        class="w-full basis-1/4 p-4 text-center bg-green-500 text-white rounded-2xl"
      >
        <h2 class="font-mona-bold md:text-2xl">{{ nilaiKelas.tertinggi }}</h2>
        <p class="font-mona">Nilai Tertinggi</p>
      </article>
      <article
        class="w-full basis-1/4 p-4 text-center bg-red-500 text-white rounded-2xl"
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
            <h2 class="font-mona-bold pt-1">Grafik Nilai</h2>
          </section>
        </header>
        <article>
          <Doughnut :data="chartGrafik.data" :options="chartdata.options" />
        </article>
      </section>
      <section
        class="w-full basis-1/2 bg-slate-50 rounded-2xl p-4 border shadow"
      >
        <header class="flex gap-2 items-center">
          <Vicon name="bi-graph-up-arrow" scale="1" />

          <h2 class="font-mona-bold text-xl pt-1">Statistik Nilai Siswa</h2>
        </header>
        <article class="mt-5 space-y-2 w-full">
          <section
            class="flex flex-col gap-2"
            v-for="([key, value], index) in Object.entries(statsSiswa)"
            :key="index"
          >
            <header class="w-full flex justify-between items-center">
              <h1 class="text-lg font-mona-bold">{{ key }}</h1>
              <h1 class="text-lg font-mona-bold">{{ value }} Siswa</h1>
            </header>
            <section class="flex">
              <div class="w-full h-2 bg-slate-500 rounded-full">
                <div
                  :style="{
                    width: getPercent(value).toFixed(1) + '%',
                  }"
                  class="w-[20%] rounded-full h-full bg-green-400"
                ></div>
              </div>
            </section>
          </section>
        </article>
      </section>
    </section>
    <article class="mt-5 w-full flex justify-center gap-5">
      <!-- <button class="px-4 py-2 text-white rounded-md bg-green-600">
        <Vicon name="bi-file-earmark-pdf-fill" scale="1" />
        Download PDF
      </button> -->
      <button
        @click="exportExcel"
        class="px-4 py-2 text-white rounded-md bg-green-600 cursor-pointer"
      >
        <Vicon name="si-microsoftexcel" scale="1" class="p-0 font-bold" />

        Download Excel
      </button>
    </article>
  </article>
</template>
