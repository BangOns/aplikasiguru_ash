<script setup lang="ts">
import HeaderAbsensi from "@/components/myComponent/AbsensiSiswa/HeaderAbsensi.vue";
import SelectAbsensiSiswa from "@/components/myComponent/AbsensiSiswa/SelectAbsensiSiswa.vue";
import { usePresent } from "@/lib/pinia/absensi";
import { defineAsyncComponent } from "vue";
const absensi = usePresent();
const GrafikAbsensi = defineAsyncComponent(
  () => import("@/components/myComponent/AbsensiSiswa/GrafikAbsensi.vue")
);
</script>

<template>
  <HeaderAbsensi />
  <SelectAbsensiSiswa />
  <GrafikAbsensi v-if="absensi.searchKelas && absensi.searchMapel" />
</template>
