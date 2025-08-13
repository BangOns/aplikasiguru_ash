<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Vicon from "../Vicon.vue";
import CardSiswa from "./CardSiswa.vue";
</script>

<template>
  <article class="w-full bg-white p-4 mt-10 rounded-md">
    <header class="w-full flex items-center text-blue-500 gap-2">
      <Vicon name="bi-calendar-check" scale="1.5" />
      <h1 class="font-mona-bold text-lg">Sesi Absensi Siswa Online</h1>
    </header>
    <section class="mt-5 w-full flex max-xl:flex-col justify-between gap-5">
      <article class="w-full basis-1/3 space-y-1">
        <header>
          <h2 class="font-mona-bold">Tanggal & Waktu</h2>
        </header>
        <section class="w-full bg-slate-100 p-2 rounded-md">
          <p class="font-mona">Kamis, 2 Agustus 2023</p>
        </section>
      </article>
      <article class="full basis-1/3 space-y-1">
        <header>
          <h2 class="font-mona-bold">Kelas</h2>
        </header>
        <section class="w-full">
          <Select>
            <SelectTrigger class="w-full py-2 px-3 bg-slate-100 border">
              <SelectValue placeholder="Select a fruit" class="font-mona" />
            </SelectTrigger>
            <SelectContent class="p-3">
              <SelectGroup class="font-mona">
                <SelectLabel class="font-mona-bold">Day</SelectLabel>
                <SelectItem
                  v-for="day in [12, 2, 3, 4]"
                  :key="day"
                  :value="day"
                >
                  {{ day }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </section>
      </article>
      <article class="full basis-1/3 space-y-1">
        <header>
          <h2 class="font-mona-bold">Mata Pelajaran</h2>
        </header>
        <section class="w-full">
          <Select>
            <SelectTrigger class="w-full py-2 px-3 bg-slate-100 border">
              <SelectValue placeholder="Select a fruit" class="font-mona" />
            </SelectTrigger>
            <SelectContent class="p-3">
              <SelectGroup class="font-mona">
                <SelectLabel class="font-mona-bold">Day</SelectLabel>
                <SelectItem
                  v-for="day in [12, 2, 3, 4]"
                  :key="day"
                  :value="day"
                >
                  {{ day }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </section>
      </article>
    </section>
  </article>
  <!-- Card data -->
  <article class="w-full bg-white p-4 mt-10 rounded-md">
    <header class="w-full flex items-center text-blue-500 gap-2">
      <button
        class="cursor-pointer gap-2 bg-blue-400 hover:bg-blue-500 flex items-center p-2 text-white rounded text-sm font-mona-bold"
      >
        <Vicon name="hi-refresh" scale="1" class="p-0 font-bold" />
        Refresh Data
      </button>
      <button
        class="cursor-pointer gap-2 bg-green-400 hover:bg-green-500 flex items-center p-2 text-white rounded text-sm font-mona-bold"
      >
        <Vicon name="si-microsoftexcel" scale="1" class="p-0 font-bold" />
        Export Excel
      </button>
    </header>
    <section class="mt-5 w-full flex flex-wrap gap-5 justify-between">
      <CardSiswa />
      <CardSiswa />
      <CardSiswa />
      <CardSiswa />
      <CardSiswa />
      <CardSiswa />
      <CardSiswa />
    </section>
  </article>
</template>
