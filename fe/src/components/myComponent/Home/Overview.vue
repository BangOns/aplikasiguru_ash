<script setup lang="ts">
import { reactive, watchEffect } from "vue";
import Vicon from "../Vicon.vue";
import { useGetJurusan } from "@/lib/query/jurusan";
import { useGetLesson } from "@/lib/query/pelajaran";
import { useGetKelas } from "@/lib/query/kelas";
import { useGetSiswa } from "@/lib/query/siswa";
const overviewList = reactive([
  {
    id: 1,
    title: "No Of Student",
    icon: "bi-people-fill",
    iconColor: "blue",
    value: 0,
  },
  {
    id: 2,
    title: "No Of Class",
    icon: "ri-door-open-fill",
    iconColor: "green",
    value: 0,
  },
  {
    id: 3,
    title: "No Of Lesson",
    icon: "gi-book-pile",
    iconColor: "orange",
    value: 0,
  },
  {
    id: 4,
    title: "No Of Teacher",
    icon: "bi-person-fill",
    iconColor: "red",
    value: 0,
  },
]);
const { data: get_siswa } = useGetSiswa();
const { data: get_kelas } = useGetKelas();
const { data: get_lesson } = useGetLesson();
const { data: get_jurusan } = useGetJurusan();

watchEffect(() => {
  if (
    get_siswa.value &&
    get_kelas.value &&
    get_lesson.value &&
    get_jurusan.value
  ) {
    overviewList[0].value = get_siswa.value.length;
    overviewList[1].value = get_kelas.value.length;
    overviewList[2].value = get_lesson.value.length;
    overviewList[3].value = get_jurusan.value.length;
  }
});
</script>

<template>
  <header class="w-full flex justify-between pt-10 max-lg:px-5">
    <h1 class="font-mona-bold text-xl text-slate-900">Overview</h1>
  </header>
  <section
    class="flex gap-4 justify-between mt-5 max-xl:flex-col-reverse max-lg:px-5"
  >
    <article
      class="flex basis-3/4 gap-5 max-lg:flex-col justify-between items-center"
    >
      <section
        v-for="(value, index) in overviewList"
        :key="index"
        class="p-4 bg-blue-300/40 w-full rounded-2xl"
      >
        <header class="flex gap-4 items-center">
          <Vicon
            :name="value.icon"
            fill="blue"
            scale="2"
            class="cursor-pointer"
          />
          <h2 class="font-mona-bold max-xl:text-sm">{{ value.title }}</h2>
        </header>
        <article class="mt-3 w-full">
          <h2
            class="text-4xl font-mona-bold pb-5 w-fit border-b-4 border-blue-500"
          >
            {{ value.value }}
          </h2>
        </article>
      </section>
    </article>
    <article class="flex basis-1/3">
      <section class="p-1 w-full flex gap-5">
        <figure
          class="basis-1/6 md:basis-1/5 lg:basis-1/3 w-full h-full flex items-center"
        >
          <img
            src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            width="150"
            height="150"
            class="rounded-xl h-full object-cover"
            alt="pp profile"
          />
        </figure>
        <article
          class="flex basis-4/5 md:basis-3/4 w-full flex-col justify-center gap-1"
        >
          <section class="space-y-1">
            <p class="font-mona-bold md:text-xl">Syahroni</p>
            <p class="font-mona max-md:text-sm text-slate-600">
              admin@example.com
            </p>
          </section>
          <section class="bg-slate-200 py-5 px-2 rounded-md">
            <p class="text-xs font-mona-bold">Guru Pendidikan Agama Islam</p>
          </section>
        </article>
      </section>
    </article>
  </section>
</template>
