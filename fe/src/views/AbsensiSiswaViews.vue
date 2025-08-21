<script setup lang="ts">
import GrafikAbsensi from "@/components/myComponent/AbsensiSiswa/GrafikAbsensi.vue";
import HeaderAbsensi from "@/components/myComponent/AbsensiSiswa/HeaderAbsensi.vue";
import SelectAbsensiSiswa from "@/components/myComponent/AbsensiSiswa/SelectAbsensiSiswa.vue";
import { usePresent } from "@/lib/pinia/absensi";
const absensi = usePresent();
</script>

<template>
  <HeaderAbsensi />
  <SelectAbsensiSiswa />
  <GrafikAbsensi v-if="absensi.searchKelas && absensi.searchMapel" />
</template>
