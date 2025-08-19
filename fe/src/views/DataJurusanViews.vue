<script setup lang="ts">
import ActionDataJurusan from "@/components/myComponent/DataJurusan/ActionDataJurusan.vue";
import HeaderJurusan from "@/components/myComponent/DataJurusan/HeaderJurusan.vue";
import ModalsDataJurusan from "@/components/myComponent/DataJurusan/ModalsDataJurusan.vue";
import TableDataJurusan from "@/components/myComponent/DataJurusan/TableDataJurusan.vue";
import { useJurusan } from "@/lib/pinia/jurusan";

const jurusan = useJurusan();
</script>

<template>
  <HeaderJurusan />
  <ActionDataJurusan />
  <TableDataJurusan />
  <ModalsDataJurusan v-if="jurusan.openModalJurusan" />
</template>
