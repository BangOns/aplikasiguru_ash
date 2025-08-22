<script setup lang="ts">
import HeaderPenilaian from "@/components/myComponent/PenilaianSiswa/HeaderPenilaian.vue";
import SelectPenilaianSiswa from "@/components/myComponent/PenilaianSiswa/SelectPenilaianSiswa.vue";
import { usePenilaian } from "@/lib/pinia/penilaian";
import { defineAsyncComponent } from "vue";
const TablePenilaian = defineAsyncComponent(
  () => import("@/components/myComponent/PenilaianSiswa/TablePenilaian.vue")
);
const GrafikPenilaian = defineAsyncComponent(
  () => import("@/components/myComponent/PenilaianSiswa/GrafikPenilaian.vue")
);
const penilaian = usePenilaian();
</script>

<template>
  <HeaderPenilaian />
  <SelectPenilaianSiswa />
  <template v-if="penilaian.searchKelas && penilaian.searchMapel">
    <TablePenilaian />
    <GrafikPenilaian />
  </template>
</template>
