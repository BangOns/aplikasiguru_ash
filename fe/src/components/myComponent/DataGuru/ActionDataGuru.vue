<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Vicon from "../Vicon.vue";
import moment from "moment";
import { onMounted, onUnmounted, ref } from "vue";

import { useSiswa } from "@/lib/pinia/siswa";
import { Input } from "@/components/ui/input";

const timeNow = ref(moment().format("LTS"));
const siswa = useSiswa();
onMounted(() => {
  const timer = setInterval(() => {
    timeNow.value = moment().format("LTS");
  }, 1000);

  onUnmounted(() => clearInterval(timer));
});
</script>

<template>
  <article class="w-full bg-white p-4 mt-10 rounded-md">
    <header class="w-full flex items-center text-blue-500 gap-2">
      <Vicon name="bi-calendar-check" scale="1.5" />
      <h1 class="font-mona-bold text-lg">Kelola Data Guru</h1>
    </header>
    <section class="mt-5 w-full flex max-xl:flex-col gap-5 items-end">
      <article class="w-full basis-1/4 space-y-1">
        <header>
          <h2 class="font-mona-bold">Nama Guru</h2>
        </header>
        <section class="w-full">
          <Input
            type="text"
            class="w-full py-2 px-3 border"
            placeholder="Ketik Nama Guru"
          />
        </section>
      </article>
      <!-- <article class="w-full basis-1/6 space-y-1">
        <header>
          <h2 class="font-mona-bold">Kelas</h2>
        </header>
        <section class="w-full">
          <Select>
            <SelectTrigger class="w-full py-2 px-3 border">
              <SelectValue placeholder="Pilih Kelas" class="font-mona" />
            </SelectTrigger>
            <SelectContent class="p-3">
              <SelectGroup class="font-mona">
                <SelectLabel class="font-mona-bold">Pilih Kelas</SelectLabel>
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
      <article class="w-full basis-1/6 space-y-1">
        <header>
          <h2 class="font-mona-bold">Jurusan</h2>
        </header>
        <section class="w-full">
          <Select>
            <SelectTrigger class="w-full py-2 px-3 border">
              <SelectValue placeholder="Pilih Jurusan" class="font-mona" />
            </SelectTrigger>
            <SelectContent class="p-3">
              <SelectGroup class="font-mona">
                <SelectLabel class="font-mona-bold">Pilih Jurusan</SelectLabel>
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
      </article> -->

      <article class="full flex items-center justify-end">
        <button
          class="py-2 px-5 cursor-pointer flex items-center bg-blue-800 gap-2 hover:bg-blue-900 text-white rounded-lg font-mona-bold border"
        >
          <Vicon name="bi-search" scale="1" />
          <p>Search</p>
        </button>
      </article>
    </section>
  </article>
</template>
