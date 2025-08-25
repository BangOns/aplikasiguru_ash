<script setup lang="ts">
import TableStudent from "./TableStudent.vue";
import WeeklyTime from "./WeeklyTime.vue";
</script>

<template>
  <article class="w-full flex max-xl:flex-col gap-5 pt-4">
    <TableStudent />
    <WeeklyTime />
  </article>
</template>
