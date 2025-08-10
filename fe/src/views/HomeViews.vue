<script setup lang="ts">
import Header from "@/components/myComponent/Home/Header.vue";
import NotifStatsCal from "@/components/myComponent/Home/NotifStatsCal.vue";
import Overview from "@/components/myComponent/Home/Overview.vue";
</script>

<template>
  <main class="min-h-screen bg-slate-50 pl-72 py-3 w-full">
    <div class="container w-full flex flex-col">
      <Header />
      <Overview />
      <NotifStatsCal />
    </div>
  </main>
</template>
