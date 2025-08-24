<script setup lang="ts">
import Vicon from "../Vicon.vue";
import { computed, ref, watchEffect } from "vue";
import { getWeekDates } from "@/utils/GenerateWeeks";
import moment from "moment";
import type { ScheduleType } from "@/types/schedule";
import { useSchedule } from "@/lib/pinia/schedule";
import { useDeleteSchedule, useGetSchedule } from "@/lib/query/schedule";
const ExampleSchedule: ScheduleType[] = [
  {
    id: "1",
    activity: "Town Hall Meeting",
    description: "Acara perusahaan",
    date: "2025-08-16",
    start_time: "15:00",
    end_time: "17:00",
    is_active: true,
  },
  {
    id: "2",
    activity: "Town Hall Meeting",
    description: "Acara perusahaan",
    date: "2025-08-14",
    start_time: "15:00",
    end_time: "17:00",
    is_active: true,
  },
];
const weeks = ref<number>(0);
const scheduleUse = useSchedule();
const { data: get_schedule } = useGetSchedule();
const mutationDelete = useDeleteSchedule();
const dates = computed(() => {
  const date = getWeekDates(weeks.value, get_schedule.value);
  scheduleUse.datesSchedule = date;
  return date;
});

const editSchedules = (data: ScheduleType) => {
  scheduleUse.setDatesSchedule = data;
  scheduleUse.editSchedule = true;
  scrollToForm();
};
const validateSchedule = (date: string) => {
  const scheduleDate = moment(date, "YYYY-MM-DD");
  return scheduleDate.isSameOrAfter(moment(), "day");
};

const getScheduleList = (day: string) => {
  scheduleUse.daySchedule = day;
  scrollToForm();
};

const handleDeleteSchedule = (id: string) => {
  mutationDelete.mutate(id);
};

const scrollToForm = () => {
  document.getElementById("form-schedule")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};
watchEffect(() => {
  console.log(get_schedule.value);

  // console.log(scheduleUse.datesSchedule);
});
</script>

<template>
  <article class="w-full rounded border shadow p-5 mt-5">
    <section
      class="w-full flex flex-col max-2xl:gap-5 xl:flex-row justify-between"
    >
      <article class="flex gap-5 max-md:flex-col items-center">
        <section class="flex gap-5">
          <button
            class="cursor-pointer gap-2 bg-blue-400 hover:bg-blue-500 flex items-center p-2 text-white rounded text-sm lg:text-xl font-mona-bold"
            @click="weeks--"
          >
            <Vicon name="bi-arrow-90deg-left" scale="1" class="p-0 font-bold" />
            Minggu Sebelumnya
          </button>
          <button
            class="cursor-pointer gap-2 bg-blue-400 hover:bg-blue-500 flex items-center p-2 text-white rounded text-sm lg:text-xl font-mona-bold"
            @click="weeks++"
          >
            Minggu berikutnya
            <Vicon
              name="bi-arrow-90deg-right"
              scale="1"
              class="p-0 font-bold"
            />
          </button>
        </section>
        <button
          class="cursor-pointer bg-green-400/20 hover:bg-green-100 gap-2 flex items-center p-2 text-green-500 rounded text-sm lg:text-xl font-mona-bold"
          @click="weeks = 0"
        >
          <Vicon name="co-book" scale="1.5" class="p-0 font-bold" />
          Minggu ini
        </button>
      </article>
      <article
        class="flex gap-5 max-md:flex-col-reverse items-center max-md:items-end max-2xl:justify-center"
      >
        <section class="flex gap-2 max-lg:text-sm font-mona-bold text-blue-700">
          <p>{{ dates[0]?.date }} {{ dates[0]?.month }} {{ dates[0]?.year }}</p>
          -
          <p>
            {{ dates[dates.length - 1]?.date }}
            {{ dates[dates.length - 1]?.month }}
            {{ dates[dates.length - 1]?.year }}
          </p>
        </section>
        <!-- <button
          class="cursor-pointer gap-2 bg-green-400 hover:bg-green-500 flex items-center p-2 text-slate-700 rounded text-sm lg:text-lg font-mona-bold"
        >
          <Vicon name="co-plus" scale="1.5" class="p-0 font-bold" />
          Tambah Jadwal
        </button> -->
      </article>
    </section>
    <article
      class="w-auto mt-5 flex flex-wrap items-center justify-center gap-5 overflow-x-auto"
    >
      <section
        v-for="(value, index) in dates"
        class="md:w-72 2xl:w-96 flex flex-col gap-5"
        :key="index"
      >
        <header class="text-center font-mona-bold text-lg">
          {{ value.dayName }}
        </header>
        <section
          :class="[
            'w-full p-4 border shadow rounded-xl',
            validateSchedule(value.fullDate)
              ? 'cursor-pointer hover:bg-slate-100 bg-white'
              : 'cursor-not-allowed bg-slate-200',
          ]"
          @click="
            validateSchedule(value.fullDate) && getScheduleList(value.dayName)
          "
        >
          <header class="w-full">
            <h1 class="font-mona-bold">{{ value.date }} {{ value.month }}</h1>
          </header>
          <template v-if="value.schedule.length > 0">
            <article
              v-for="schedule in value.schedule"
              class="bg-blue-200 rounded p-2 font-mona-bold mt-4 text-center"
            >
              <p class="font-mona-bold">
                {{ schedule.start_time }} - {{ schedule.end_time }}
              </p>
              <p class="text-sm">{{ schedule.activity }}</p>
              <section
                v-if="validateSchedule(value.fullDate)"
                class="w-full flex justify-center gap-5 mt-5"
              >
                <button
                  @click="handleDeleteSchedule(schedule.id)"
                  class="text-white p-2 px-3 text-sm hover:bg-red-600 cursor-pointer rounded-md bg-red-500"
                >
                  Hapus
                </button>
                <button
                  @click="editSchedules(schedule)"
                  class="text-white p-2 px-3 text-sm hover:bg-amber-600 cursor-pointer rounded-md bg-amber-500"
                >
                  Edit
                </button>
              </section>
            </article>
          </template>
          <template v-else>
            <article
              class="bg-blue-200 rounded p-2 font-mona-bold mt-4 text-center"
            >
              <p class="font-mona-bold">
                {{
                  validateSchedule(value.fullDate)
                    ? "Klik untuk tambah jadwal"
                    : "Waktu sudah lewat"
                }}
              </p>
            </article>
          </template>
        </section>
      </section>
      <!-- <section class="w-2xl 2xl:w-96 flex flex-col gap-5">
        <header class="text-center font-mona-bold text-lg">senin</header>
        <section class="w-full p-4 bg-white border shadow rounded-xl">
          <header class="w-full">
            <h1 class="font-mona-bold">31 Juli</h1>
          </header>
          <article class="bg-blue-200 rounded p-2 font-mona mt-4">
            <ul class="font-mona-bold">
              <li>12:30 - 21:00</li>
              <li>12:30 - 21:00</li>
            </ul>
            <p class="text-sm">
              Lorem ipsum dolor sit amet consectetur, Lorem ipsum dolor sit.
            </p>
          </article>
        </section>
      </section> -->
    </article>
  </article>
</template>
