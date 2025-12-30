<script setup lang="ts">
import Calendar from "@/components/ui/calendar/Calendar.vue";
import type { DateValue } from "@internationalized/date";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { computed } from "vue";
import ChartStudent from "./ChartStudent.vue";
import { useGetSchedule } from "@/lib/query/schedule";
import type { ScheduleType } from "@/types/schedule";

const { data } = useGetSchedule();

const defaultPlaceholder = today(getLocalTimeZone());
const scheduleDates = computed(() => {
  if (!data.value) return [];

  return data.value
    .map((item: ScheduleType) => {
      try {
        return parseDate(item.date.split(" ")[0]);
      } catch (error) {
        return null;
      }
    })
    .filter((date: DateValue): date is DateValue => date !== null);
});
const isDateWithoutSchedule = (dateValue: DateValue) => {
  return !scheduleDates.value.some(
    (scheduleDate: DateValue) =>
      scheduleDate.year === dateValue.year &&
      scheduleDate.month === dateValue.month &&
      scheduleDate.day === dateValue.day
  );
};
</script>

<template>
  <article
    class="w-full flex max-xl:flex-col xl:justify-between gap-5 mt-5 max-lg:px-5"
  >
    <!-- Notifications -->
    <!-- <section
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
    </section> -->
    <!-- Statistik -->
    <ChartStudent />
    <!-- Calendar -->
    <section
      class="w-full basis-1/3 bg-slate-50 shadow-sm flex justify-center rounded-lg"
    >
      <Calendar
        :model-value="scheduleDates"
        :is-date-disabled="isDateWithoutSchedule"
        :default-placeholder="defaultPlaceholder"
        class="rounded-lg border w-full font-mona-bold **:data-[slot=calendar-cell-trigger]:size-12!"
      >
      </Calendar>
    </section>
  </article>
</template>
