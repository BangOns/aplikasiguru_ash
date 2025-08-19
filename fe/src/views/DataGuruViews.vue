<script setup lang="ts">
import ActionDataGuru from "@/components/myComponent/DataGuru/ActionDataGuru.vue";
import HeaderGuru from "@/components/myComponent/DataGuru/HeaderGuru.vue";
import ModalsDataGuru from "@/components/myComponent/DataGuru/ModalsDataGuru.vue";
import TableDataGuru from "@/components/myComponent/DataGuru/TableDataGuru.vue";
import { useTeacher } from "@/lib/pinia/guru";

const teacher = useTeacher();
</script>

<template>
  <HeaderGuru />
  <ActionDataGuru />
  <TableDataGuru />
  <ModalsDataGuru v-if="teacher.openModalTeacher" />
</template>
