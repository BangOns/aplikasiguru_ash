<script setup lang="ts">
import Vicon from "../Vicon.vue";
</script>

<template>
  <article class="w-full rounded border shadow p-5 mt-5">
    <header class="w-full">
      <section class="flex font-mona-bold gap-2 items-center">
        <Vicon name="co-plus" scale="1.5" class="p-0 font-bold" />
        <h1 class="text-lg">Tambah Jadwal Baru</h1>
      </section>
      <section class="flex font-mona-bold items-start gap-2 mt-5">
        <Vicon
          name="ri-alarm-warning-fill"
          scale="0.9"
          class="font-bold text-amber-400"
        />
        <h3 class="block text-sm">
          Catatan :
          <span class="text-blue-400"
            >Jadwal yang ada masukkan akan berulang setiap minggu</span
          >
        </h3>
      </section>
    </header>

    <section></section>
  </article>
</template>
