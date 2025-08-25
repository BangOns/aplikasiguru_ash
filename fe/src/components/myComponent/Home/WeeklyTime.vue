<script setup lang="ts">
import { useSchedule } from "@/lib/pinia/schedule";
import { useGetSchedule } from "@/lib/query/schedule";
import { getWeekDates } from "@/utils/GenerateWeeks";
import moment from "moment";
import { ref } from "vue";
import { computed } from "vue";

const weeks = ref<number>(0);
const scheduleUse = useSchedule();
const { data: get_schedule } = useGetSchedule();
const dates = computed(() => {
  const date = getWeekDates(weeks.value, get_schedule.value);
  scheduleUse.datesSchedule = date;
  return date.filter((d) => d.schedule.length > 0);
});
const getDaySchedule = (date: string) => {
  const day = moment(date).format("dddd");
  return day;
};
</script>

<template>
  <section class="w-full basis-1/3 p-4 bg-slate-50 shadow-sm border rounded-lg">
    <header class="w-full flex justify-between items-center">
      <h2 class="font-mona-bold text-xl">Weekly Timeable</h2>
    </header>
    <article
      class="h-72 overflow-y-auto mt-4 space-y-3 scrollbar-track-white scrollbar-thumb-blue-400 scrollbar-thin"
    >
      <template v-if="dates.length === 0">
        <section class="w-full bg-slate-200 rounded-md py-3 px-2 flex gap-4">
          <figure class="bg-slate-500/50 flex flex-col justify-center rounded">
            <h1 class="px-2 py-0 font-mona">--:--</h1>
          </figure>
          <article>
            <h6 class="font-mona-bold text-lg">No Schedule</h6>
            <p class="font-mona-bold text-slate-600/50 text-xs">
              There are no schedules for this week.
            </p>
          </article>
        </section>
      </template>
      <template v-else v-for="value in dates" :key="value">
        <section
          v-for="(schedule, index) in value.schedule"
          class="w-full bg-slate-200 rounded-md py-3 px-2 flex gap-4"
          :key="index"
        >
          <figure class="bg-slate-500/50 flex flex-col justify-center rounded">
            <h1 class="px-2 py-0 font-mona">{{ schedule.start_time }}</h1>
          </figure>
          <article class="w-full">
            <section class="flex w-full justify-between items-center">
              <h6 class="font-mona-bold text-lg">{{ schedule.activity }}</h6>
              <p class="font-mona text-sm">
                {{ getDaySchedule(value.fullDate) }}
              </p>
            </section>
            <p class="font-mona-bold text-slate-600/50 text-xs">
              {{ schedule.description }}
            </p>
          </article>
        </section>
      </template>
    </article>
  </section>
</template>
