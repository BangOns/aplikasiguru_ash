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
      <h1 class="font-mona-bold text-lg">Kelola Data Siswa</h1>
    </header>
    <section class="mt-5 w-full flex max-xl:flex-col gap-5 items-end">
      <article class="w-full basis-1/3 space-y-1">
        <header>
          <h2 class="font-mona-bold">Kelas</h2>
        </header>
        <section class="w-full">
          <Select>
            <SelectTrigger class="w-full py-2 px-3 bg-slate-100 border">
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

      <article class="full flex items-center justify-end">
        <button
          @click="siswa.openModalsSiswa = true"
          class="py-2 px-3 cursor-pointer flex items-center bg-green-800 hover:bg-green-900 text-white rounded-lg font-mona-bold border"
        >
          <Vicon name="bi-plus" scale="1.5" />
          <p>Tambah Data Siswa</p>
        </button>
      </article>
    </section>
  </article>
</template>
