<script setup lang="ts">
import Vicon from "../Vicon.vue";
import { Input } from "@/components/ui/input";
import { useTeacher } from "@/lib/pinia/guru";

const teacher = useTeacher();
const resetSearch = () => {
  teacher.searchTeacher = "";
};
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
            v-model="teacher.searchTeacher"
          />
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
