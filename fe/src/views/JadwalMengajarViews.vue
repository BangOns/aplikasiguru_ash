<script setup lang="ts">
import Vicon from "@/components/myComponent/Vicon.vue";
</script>

<template>
  <section class="w-full flex justify-center mt-5">
    <header class="w-full flex items-center gap-5">
      <Vicon name="co-book" scale="2" animation="wrench" />
      <h1 class="font-mona-bold text-2xl">Jadwal Mengajar</h1>
    </header>
  </section>
  <article class="w-full rounded border shadow p-5 mt-5">
    <section class="w-full flex justify-between">
      <article class="flex gap-5 items-center">
        <button
          class="cursor-pointer gap-2 bg-blue-400 hover:bg-blue-500 flex items-center p-2 text-white rounded text-xl font-mona-bold"
        >
          <Vicon name="bi-arrow-90deg-left" scale="1" class="p-0 font-bold" />
          Minggu Sebelumnya
        </button>
        <button
          class="cursor-pointer gap-2 bg-blue-400 hover:bg-blue-500 flex items-center p-2 text-white rounded text-xl font-mona-bold"
        >
          Minggu berikutnya
          <Vicon name="bi-arrow-90deg-right" scale="1" class="p-0 font-bold" />
        </button>
        <button
          class="cursor-pointer bg-green-400/20 hover:bg-green-100 gap-2 flex items-center p-2 text-green-500 rounded text-xl font-mona-bold"
        >
          <Vicon name="co-book" scale="1.5" class="p-0 font-bold" />
          Minggu ini
        </button>
      </article>
      <article class="flex gap-5 items-center">
        <section class="flex gap-2 font-mona-bold text-blue-700">
          <p>25 Februari 2025</p>
          -
          <p>31 Februari 2025</p>
        </section>
        <button
          class="cursor-pointer gap-2 bg-green-400 hover:bg-green-500 flex items-center p-2 text-slate-700 rounded text-lg font-mona-bold"
        >
          <Vicon name="co-plus" scale="1.5" class="p-0 font-bold" />
          Tambah Jadwal
        </button>
      </article>
    </section>
  </article>
</template>
