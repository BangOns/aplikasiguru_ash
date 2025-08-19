<script setup lang="ts">
import ActionDataSiswa from "@/components/myComponent/DataSiswa/ActionDataSiswa.vue";
import HeaderSiswa from "@/components/myComponent/DataSiswa/HeaderSiswa.vue";
import ModalsDataSiswa from "@/components/myComponent/DataSiswa/ModalsDataSiswa.vue";
import TableDataSiswa from "@/components/myComponent/DataSiswa/TableDataSiswa.vue";
import { useSiswa } from "@/lib/pinia/siswa";
const siswa = useSiswa();
</script>

<template>
  <HeaderSiswa />
  <ActionDataSiswa />
  <TableDataSiswa />
  <ModalsDataSiswa v-if="siswa.openModalSiswa" />
</template>
