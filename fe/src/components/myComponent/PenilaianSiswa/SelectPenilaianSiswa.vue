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

import { computed } from "vue";
import { useGetKelas } from "@/lib/query/kelas";
import { useGetJurusan } from "@/lib/query/jurusan";
import type { KelasType } from "@/types/siswa/data_kelas";
import type { JurusanType } from "@/types/siswa";
import type { LessonType } from "@/types/lesson";
import { useGetLesson } from "@/lib/query/pelajaran";
import { usePenilaian } from "@/lib/pinia/penilaian";
import Vicon from "../Vicon.vue";

const { data: get_kelas } = useGetKelas();
const { data: get_jurusan } = useGetJurusan();
const { data: get_mapel } = useGetLesson();
const penilaian = usePenilaian();
const labelFormKelasDanJurusan = computed(() => {
  if (!get_kelas.value || !get_jurusan.value) return [];
  return get_kelas.value.map((kelas: KelasType) => {
    const nameJurusan = get_jurusan.value.find(
      (jurusan: JurusanType) => jurusan.id === kelas.jurusan.id
    );
    return {
      ...kelas,
      jurusan: nameJurusan?.nama_jurusan,
    };
  });
});
</script>

<template>
  <header class="w-full flex gap-5 mt-5">
    <section class="w-full basis-1/6 space-y-1">
      <header>
        <h3 class="font-mona-bold">Kelas & Jurusan</h3>
      </header>
      <Select class="w-full" v-model="penilaian.searchKelas">
        <SelectTrigger class="w-full py-2 px-3 bg-white border-blue-300 border">
          <SelectValue placeholder="Pilih Kelas & Jurusan" class="font-mona" />
        </SelectTrigger>
        <SelectContent class="p-3">
          <SelectGroup class="font-mona">
            <SelectLabel class="font-mona-bold">Pilih Pelajaran</SelectLabel>
            <SelectItem
              v-for="(data, index) in labelFormKelasDanJurusan"
              :key="index"
              :value="data.id"
            >
              {{ data.nama_kelas }}-{{ data.jurusan }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </section>
    <section class="w-full basis-1/5 space-y-1">
      <header>
        <h3 class="font-mona-bold">Mata Pelajaran</h3>
      </header>
      <Select class="w-full" v-model="penilaian.searchMapel">
        <SelectTrigger class="w-full py-2 px-3 bg-white border-blue-300 border">
          <SelectValue placeholder="Pilih Pelajaran" class="font-mona" />
        </SelectTrigger>
        <SelectContent class="p-3">
          <SelectGroup class="font-mona">
            <SelectLabel class="font-mona-bold"
              >Pilih Mata Peljaran</SelectLabel
            >
            <SelectItem
              v-for="(data,index) in get_mapel as LessonType[]"
              :key="index"
              :value="data.id"
            >
              {{ data.nama_pelajaran }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </section>
  </header>
  <section class="mt-5 w-full flex flex-wrap gap-5 justify-between">
    <section
      class="w-full flex justify-center flex-col items-center gap-2"
      v-if="!penilaian.searchKelas || !penilaian.searchMapel"
    >
      <Vicon name="ri-error-warning-line" scale="1.5" />
      <p class="font-mona pt-1 text-lg">
        Silahkan Pilih Kelas dan Mata Pelajaran
      </p>
    </section>
  </section>
</template>
