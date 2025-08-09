<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <main class="w-full min-h-screen bg-primary text-white">
    <Navbar />
    <router-view />
  </main>
</template>
