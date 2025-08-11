<script setup lang="ts">
import Vicon from "../Vicon.vue";
</script>

<template>
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
    <article class="w-full mt-5 flex gap-2">
      <section
        v-for="value in [1, 2, 3, 4, 5, 6]"
        class="w-96 flex flex-col gap-5"
      >
        <header class="text-center font-mona-bold text-lg">senin</header>
        <section class="w-full p-4 bg-white border shadow rounded-xl">
          <header class="w-full">
            <h1 class="font-mona-bold">31 Juli</h1>
          </header>
          <article class="bg-blue-200 rounded p-2 font-mona mt-4">
            <p class="font-mona-bold">12:00 - 21:00</p>
            <p class="text-sm">Lorem ipsum dolor sit amet consectetur,</p>
          </article>
        </section>
      </section>
      <section class="w-96 flex flex-col gap-5">
        <header class="text-center font-mona-bold text-lg">senin</header>
        <section class="w-full p-4 bg-white border shadow rounded-xl">
          <header class="w-full">
            <h1 class="font-mona-bold">31 Juli</h1>
          </header>
          <article class="bg-blue-200 rounded p-2 font-mona mt-4">
            <ul class="font-mona-bold">
              <li>12:30 - 21:00</li>
              <li>12:30 - 21:00</li>
            </ul>
            <p class="text-sm">
              Lorem ipsum dolor sit amet consectetur, Lorem ipsum dolor sit.
            </p>
          </article>
        </section>
      </section>
    </article>
  </article>
</template>
