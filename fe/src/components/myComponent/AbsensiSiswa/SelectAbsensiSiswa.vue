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
import CardSiswa from "./CardSiswa.vue";
import moment from "moment";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useGetKelas } from "@/lib/query/kelas";
import { useGetLesson } from "@/lib/query/pelajaran";
import { useGetJurusan } from "@/lib/query/jurusan";
import type { KelasType } from "@/types/siswa/data_kelas";
import type { JurusanType } from "@/types/siswa";
import type { LessonType } from "@/types/lesson";
import { usePresent } from "@/lib/pinia/absensi";
import { useGetSiswa } from "@/lib/query/siswa";
import type { StudentType } from "@/types/siswa/data_siswa";
const date = new Date();
const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  locale: "id-ID",
};
const dateIndonesia = date.toLocaleDateString("id-ID", options as any);
const timeNow = ref(moment().format("LTS"));
const absensi = usePresent();
const { data: get_siswa } = useGetSiswa();
const { data: get_kelas } = useGetKelas();
const { data: get_mapel } = useGetLesson();
const { data: get_jurusan } = useGetJurusan();
const labelFormKelasDanJurusan = computed(() => {
  if (!get_kelas.value || !get_jurusan.value) return [];
  return get_kelas.value.map((kelas: KelasType) => {
    const nameJurusan = get_jurusan.value.find(
      (jurusan: JurusanType) => jurusan.id === kelas.jurusan
    );
    return {
      ...kelas,
      jurusan: nameJurusan?.nama_jurusan,
    };
  });
});
const listSiswa = computed(() => {
  if (!absensi.searchKelas || !absensi.searchMapel) return [];
  return get_siswa.value.filter(
    (siswa: StudentType) => siswa.kelas === absensi.searchKelas
  );
});

onMounted(() => {
  const timer = setInterval(() => {
    timeNow.value = moment().format("LTS");
  }, 1000);

  onUnmounted(() => clearInterval(timer));
});
console.log(dateIndonesia);
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
          <p class="font-mona">{{ dateIndonesia }} - {{ timeNow }}</p>
        </section>
      </article>
      <article class="full basis-1/3 space-y-1">
        <header>
          <h2 class="font-mona-bold">Kelas & Jurusan</h2>
        </header>
        <section class="w-full">
          <Select v-model="absensi.searchKelas">
            <SelectTrigger class="w-full py-2 px-3 bg-slate-100 border">
              <SelectValue placeholder="Pilih kelas" class="font-mona" />
            </SelectTrigger>
            <SelectContent class="p-3">
              <SelectGroup class="font-mona">
                <SelectLabel class="font-mona-bold">Pilih Kelas</SelectLabel>
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
      </article>
      <article class="full basis-1/3 space-y-1">
        <header>
          <h2 class="font-mona-bold">Mata Pelajaran</h2>
        </header>
        <section class="w-full">
          <Select v-model="absensi.searchMapel">
            <SelectTrigger class="w-full py-2 px-3 bg-slate-100 border">
              <SelectValue
                placeholder="Pilih Mata Pelajaran"
                class="font-mona"
              />
            </SelectTrigger>
            <SelectContent class="p-3">
              <SelectGroup class="font-mona">
                <SelectLabel class="font-mona-bold"
                  >pilih pelajaran</SelectLabel
                >
                <SelectItem
                  v-for="(data,index) in get_mapel as LessonType[]"
                  :key="index"
                  :value="data.id"
                >
                  {{ data.mapel }}
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
      <section
        class="w-full flex justify-center flex-col items-center gap-2"
        v-if="!absensi.searchKelas || !absensi.searchMapel"
      >
        <Vicon name="ri-error-warning-line" scale="1.5" />
        <p class="font-mona pt-1 text-lg">
          Silahkan Pilih Kelas dan Mata Pelajaran
        </p>
      </section>
      <section
        class="w-full flex justify-center flex-col items-center gap-2"
        v-else-if="!listSiswa.length"
      >
        <Vicon name="ri-error-warning-line" scale="1.5" />
        <p class="font-mona pt-1 text-lg">Data Kosong</p>
      </section>
      <template v-else v-for="value in listSiswa" :key="value.id">
        <CardSiswa
          :props="value"
          :date="(dateIndonesia as string) + ' - ' + (timeNow as string)"
        />
      </template>
    </section>
  </article>
</template>
