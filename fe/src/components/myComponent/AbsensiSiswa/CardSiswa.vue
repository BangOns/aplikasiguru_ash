<script setup lang="ts">
import type { StudentType } from "@/types/siswa/data_siswa";
import Vicon from "../Vicon.vue";
import { usePresent } from "@/lib/pinia/absensi";
import { useGetAbsensi, usePostAbsensi } from "@/lib/query/absensi";
import type { AbsensiType, StatusAbsensi } from "@/types/absensi";
import { v4 as uuidv4 } from "uuid";
import { ref, watchEffect } from "vue";

const { props, date } = defineProps<{ props: StudentType; date: string }>();
const absensi = usePresent();
const mutationPost = usePostAbsensi();
const { data: get_absensi } = useGetAbsensi();
const StatusNow = ref<string>();
const handlePostAbsensi = (status: StatusAbsensi) => {
  const isEditMode = get_absensi.value?.find(
    (item: AbsensiType) =>
      item.id_siswa === props.id && item.id_lesson === absensi.searchMapel
  );
  const data: AbsensiType = {
    id: isEditMode ? isEditMode.id : uuidv4(),
    date: date,
    id_siswa: props.id,
    id_lesson: absensi.searchMapel,
    status: status,
  };
  mutationPost.mutate(data);
};
watchEffect(() => {
  StatusNow.value = get_absensi.value?.find(
    (item: AbsensiType) =>
      item.id_siswa === props.id && item.id_lesson === absensi.searchMapel
  )?.status;
});
</script>

<template>
  <section class="w-full lg:w-72 p-4 bg-white border shadow rounded-2xl">
    <header class="w-full flex gap-2">
      <figure
        class="w-12 h-12 bg-green-500 rounded-full flex justify-center items-center"
      >
        <h1 class="font-mona-bold text-xl text-white">
          {{
            props.nama
              .split(" ")
              .map((item) => item.charAt(0))
              .join("")
          }}
        </h1>
      </figure>
      <section class="items-center flex">
        <h1 class="font-mona-bold">{{ props.nama }}</h1>
      </section>
    </header>
    <article class="w-full mt-5 space-y-2">
      <section class="w-full flex justify-between gap-2">
        <button
          @click="handlePostAbsensi('HADIR')"
          class="cursor-pointer gap-2 w-full justify-center bg-green-800 hover:bg-green-900 flex items-center py-2 px-3 text-xs text-white rounded font-mona-bold"
        >
          <Vicon name="bi-check-square-fill" scale="1" class="p-0 font-bold" />
          Hadir
        </button>
        <button
          @click="handlePostAbsensi('IZIN')"
          class="cursor-pointer gap-2 w-full justify-center bg-amber-800 hover:bg-amber-900 flex items-center py-2 px-3 text-xs text-white rounded font-mona-bold"
        >
          <Vicon name="gi-notebook" scale="1" class="p-0 font-bold" />
          Izin
        </button>
      </section>
      <section class="w-full flex justify-between gap-2">
        <button
          @click="handlePostAbsensi('SAKIT')"
          class="cursor-pointer gap-2 w-full justify-center bg-pink-600 hover:bg-pink-700 flex items-center py-2 px-3 text-xs text-white rounded font-mona-bold"
        >
          <Vicon name="md-sick" scale="1" class="p-0 font-bold" />
          Sakit
        </button>
        <button
          @click="handlePostAbsensi('ALPA')"
          class="cursor-pointer gap-2 w-full justify-center bg-red-800 hover:bg-red-900 flex items-center py-2 px-3 text-xs text-white rounded font-mona-bold"
        >
          <Vicon name="md-close-round" scale="1" class="p-0 font-bold" />
          Alpa
        </button>
      </section>
      <section class="w-full text-center">
        <p class="font-mona-bold text-green-800">{{ StatusNow }}</p>
      </section>
    </article>
  </section>
</template>
