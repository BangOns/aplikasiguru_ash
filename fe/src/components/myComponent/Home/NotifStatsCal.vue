<script setup lang="ts">
import Calendar from "@/components/ui/calendar/Calendar.vue";
import type { DateValue } from "@internationalized/date";
import type { Ref } from "vue";
import { getLocalTimeZone, today } from "@internationalized/date";
import { ref } from "vue";
import ChartStudent from "./ChartStudent.vue";

const value = ref(today(getLocalTimeZone())) as Ref<DateValue>;
</script>

<template>
  <article
    class="w-full flex max-xl:flex-col xl:justify-between gap-3 mt-5 max-lg:px-5"
  >
    <!-- Notifications -->
    <section
      class="w-full basis-2/5 p-4 bg-slate-50 shadow-sm border rounded-lg"
    >
      <header class="w-full flex justify-between items-center">
        <h2 class="font-mona-bold text-xl">Notifications</h2>
        <RouterLink
          to="#"
          class="font-mona-bold bg-slate-200 rounded-full py-2 px-5"
          >View All</RouterLink
        >
      </header>
      <article
        class="h-72 overflow-y-auto mt-4 space-y-2 scrollbar-track-white scrollbar-thumb-blue-400 scrollbar-thin"
      >
        <section class="w-full bg-slate-200 rounded-md p-4 flex flex-col">
          <h6 class="font-mona-bold text-lg">Title Notif</h6>
          <p class="font-mona-bold text-slate-600 text-sm">
            Lorem ipsum dolor sit amet
          </p>
        </section>
        <section class="w-full bg-slate-200 rounded-md p-4 flex flex-col">
          <h6 class="font-mona-bold text-lg">Title Notif</h6>
          <p class="font-mona-bold text-slate-600 text-sm">
            Lorem ipsum dolor sit amet
          </p>
        </section>
        <section class="w-full bg-slate-200 rounded-md p-4 flex flex-col">
          <h6 class="font-mona-bold text-lg">Title Notif</h6>
          <p class="font-mona-bold text-slate-600 text-sm">
            Lorem ipsum dolor sit amet
          </p>
        </section>
        <section class="w-full bg-slate-200 rounded-md p-4 flex flex-col">
          <h6 class="font-mona-bold text-lg">Title Notif</h6>
          <p class="font-mona-bold text-slate-600 text-sm">
            Lorem ipsum dolor sit amet
          </p>
        </section>
      </article>
    </section>
    <!-- Statistik -->
    <ChartStudent />
    <!-- Calendar -->
    <section
      class="w-full basis-1/3 bg-slate-50 shadow-sm flex justify-center rounded-lg"
    >
      <Calendar
        v-model="value"
        class="rounded-lg border w-full font-mona-bold"
      />
    </section>
  </article>
</template>
