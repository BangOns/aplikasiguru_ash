<script setup lang="ts">
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import * as chartConfig from "../../../lib/chartConfig";
import { useGetPenilaian } from "@/lib/query/penilaian";
import { reactive, watchEffect } from "vue";
import type { PenilaianType } from "@/types/penilaian/penilaian";
ChartJS.register(ArcElement, Tooltip, Legend);
const chartdata = chartConfig;
const { data: get_nilai } = useGetPenilaian();
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
watchEffect(() => {
  if (get_nilai.value) {
    const allNilai = get_nilai.value.flatMap((n: PenilaianType) => [
      n.tugas,
      n.uts,
      n.uas,
    ]);
    // Data chart (kategori nilai)
    const kurang40 = allNilai.filter((v: number) => v < 40).length;
    const antara40_80 = allNilai.filter(
      (v: number) => v >= 40 && v < 80
    ).length;
    const lebih80 = allNilai.filter((v: number) => v >= 80).length;

    chartGrafik.data = {
      ...chartGrafik.data,
      datasets: [
        {
          ...chartGrafik.data.datasets[0],
          data: [kurang40, antara40_80, lebih80],
        },
      ],
    };
  }
});
</script>

<template>
  <section class="w-full basis-1/3 p-4 bg-slate-50 shadow-sm border rounded-lg">
    <header class="w-full flex justify-between items-center">
      <h2 class="font-mona-bold text-xl">Student performance</h2>
    </header>
    <article class="w-full mt-5">
      <Doughnut :data="chartGrafik.data" :options="chartdata.options" />
    </article>
  </section>
</template>
