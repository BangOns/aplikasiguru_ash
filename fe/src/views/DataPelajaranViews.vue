<script setup lang="ts">
import ActionDataPelajaran from "@/components/myComponent/DataPelajaran/ActionDataPelajaran.vue";
import HeaderPelajaran from "@/components/myComponent/DataPelajaran/HeaderPelajaran.vue";
import ModalsDataPelajaran from "@/components/myComponent/DataPelajaran/ModalsDataPelajaran.vue";
import TableDataPelajaran from "@/components/myComponent/DataPelajaran/TableDataPelajaran.vue";
import { useLesson } from "@/lib/pinia/pelajaran";
const lesson = useLesson();
</script>

<template>
  <HeaderPelajaran />
  <ActionDataPelajaran />
  <TableDataPelajaran />
  <ModalsDataPelajaran v-if="lesson.openModalLesson" />
</template>
