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

import { Input } from "@/components/ui/input";
import { useGetKelas } from "@/lib/query/kelas";
import type { KelasType } from "@/types/siswa/data_kelas";
import { useLesson } from "@/lib/pinia/pelajaran";

const lesson = useLesson();
const { data: get_kelas } = useGetKelas();
const resetSearch = () => {
  lesson.searchLesson = "";
  lesson.searchKelas = "";
};
</script>

<template>
  <article class="w-full bg-white p-4 mt-10 rounded-md">
    <header class="w-full flex items-center text-blue-500 gap-2">
      <Vicon name="bi-calendar-check" scale="1.5" />
      <h1 class="font-mona-bold text-lg">Kelola Data Pelajaran</h1>
    </header>
    <section class="mt-5 w-full flex max-xl:flex-col gap-5 items-end">
      <article class="w-full basis-1/4 space-y-1">
        <header>
          <h2 class="font-mona-bold">Nama Pelajaran</h2>
        </header>
        <section class="w-full">
          <Input
            type="text"
            class="w-full py-2 px-3 border"
            placeholder="Ketik Nama Siswa"
            v-model="lesson.searchLesson"
          />
        </section>
      </article>
      <article class="w-full basis-1/6 space-y-1">
        <header>
          <h2 class="font-mona-bold">Kelas</h2>
        </header>
        <section class="w-full">
          <Select v-model="lesson.searchKelas">
            <SelectTrigger class="w-full py-2 px-3 border">
              <SelectValue placeholder="Pilih Kelas" class="font-mona" />
            </SelectTrigger>
            <SelectContent class="p-3">
              <SelectGroup class="font-mona">
                <SelectLabel class="font-mona-bold">Pilih Kelas</SelectLabel>
                <SelectItem
                  v-for="(data,index) in get_kelas as KelasType[]"
                  :key="index"
                  :value="data.nama_kelas"
                >
                  {{ data.nama_kelas }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </section>
      </article>

      <article class="full flex items-center justify-end">
        <button
          @click="resetSearch"
          class="py-2 px-5 cursor-pointer flex items-center bg-blue-800 gap-2 hover:bg-blue-900 text-white rounded-lg font-mona-bold border"
        >
          <Vicon name="bi-arrow-counterclockwise" scale="1" />
          <p>Reset</p>
        </button>
      </article>
    </section>
  </article>
</template>
