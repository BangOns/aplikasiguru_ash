<script setup lang="ts">
import Header from "@/components/myComponent/Home/Header.vue";
import NotifStatsCal from "@/components/myComponent/Home/NotifStatsCal.vue";
import Overview from "@/components/myComponent/Home/Overview.vue";
import TableStudent from "@/components/myComponent/Home/TableStudent.vue";
</script>

<template>
  <main class="min-h-screen bg-slate-100/70 pl-72 py-3 w-full pr-5">
    <div class="container w-full flex flex-col">
      <Header />
      <Overview />
      <NotifStatsCal />
      <TableStudent />
    </div>
  </main>
</template>
