<script setup lang="ts">
import Vicon from "../Vicon.vue";
</script>

<template>
  <section class="w-full lg:w-72 p-4 bg-white border shadow rounded-2xl">
    <header class="w-full flex gap-2">
      <figure
        class="w-12 h-12 bg-green-500 rounded-full flex justify-center items-center"
      >
        <h1 class="font-mona-bold text-xl text-white">AB</h1>
      </figure>
      <section class="space-y-1">
        <h1 class="font-mona-bold">Syahroni</h1>
        <p class="font-mona text-xs text-slate-500">NISN : 123456</p>
      </section>
    </header>
    <article class="w-full mt-5 space-y-2">
      <section class="w-full flex justify-between gap-2">
        <button
          class="cursor-pointer gap-2 w-full justify-center bg-green-800 hover:bg-green-900 flex items-center py-2 px-3 text-xs text-white rounded font-mona-bold"
        >
          <Vicon name="bi-check-square-fill" scale="1" class="p-0 font-bold" />
          Hadir
        </button>
        <button
          class="cursor-pointer gap-2 w-full justify-center bg-amber-800 hover:bg-amber-900 flex items-center py-2 px-3 text-xs text-white rounded font-mona-bold"
        >
          <Vicon name="gi-notebook" scale="1" class="p-0 font-bold" />
          Izin
        </button>
      </section>
      <section class="w-full flex justify-between gap-2">
        <button
          class="cursor-pointer gap-2 w-full justify-center bg-pink-600 hover:bg-pink-700 flex items-center py-2 px-3 text-xs text-white rounded font-mona-bold"
        >
          <Vicon name="md-sick" scale="1" class="p-0 font-bold" />
          Sakit
        </button>
        <button
          class="cursor-pointer gap-2 w-full justify-center bg-red-800 hover:bg-red-900 flex items-center py-2 px-3 text-xs text-white rounded font-mona-bold"
        >
          <Vicon name="md-close-round" scale="1" class="p-0 font-bold" />
          Alpa
        </button>
      </section>
      <section class="w-full text-center">
        <p class="font-mona-bold text-green-800">Hadir</p>
      </section>
    </article>
  </section>
</template>
