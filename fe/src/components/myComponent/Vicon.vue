<script setup lang="ts">
const props = defineProps<{ name: string; scale: string }>();
</script>

<template>
  <v-icon v-bind="props" />
</template>
