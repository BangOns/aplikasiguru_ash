<script setup lang="ts">
import Calendar from "@/components/ui/calendar/Calendar.vue";
import Vicon from "../Vicon.vue";
</script>

<template>
  <article class="w-full flex justify-between gap-5 mt-5">
    <!-- Notifications -->
    <section class="w-full basis-2/5 p-4 bg-slate-50 shadow-sm">
      <header class="w-full flex justify-between items-center">
        <h2 class="font-mona-bold text-xl">Notifications</h2>
        <RouterLink
          to="#"
          class="font-mona-bold bg-slate-200 rounded-full py-2 px-5"
          >View All</RouterLink
        >
      </header>
    </section>
    <section class="w-full basis-1/3 p-4 bg-slate-50 shadow-sm">
      <header class="w-full flex justify-between items-center">
        <h2 class="font-mona-bold text-xl">Student performance</h2>
        <RouterLink to="#">
          <Vicon
            name="bi-three-dots-vertical"
            scale="1.5"
            class="cursor-pointer"
          />
        </RouterLink>
      </header>
    </section>
    <section class="w-full basis-1/3 bg-slate-50 shadow-sm flex justify-center">
      <Calendar
        :weekday-format="'short'"
        class="rounded-md border w-full font-mona-bold"
      />
    </section>
    <!-- Statistik -->
    <!-- Calendar -->
  </article>
</template>
