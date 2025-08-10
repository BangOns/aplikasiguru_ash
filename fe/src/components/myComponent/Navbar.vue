<script setup lang="ts">
import Button from "../ui/button/Button.vue";
import Vicon from "./Vicon.vue";
</script>

<template>
  <header class="w-72 h-screen fixed top-0">
    <section class="w-full h-full py-4 pl-4 pr-10">
      <div
        class="w-full h-full rounded-2xl bg-slate-50 border shadow flex flex-col justify-between"
      >
        <ul class="flex basis-3/5 w-full h-full flex-col justify-between p-4">
          <li class="w-full" v-for="value in [1, 2, 3, 4, 5]" :key="value">
            <Button
              class="w-full px-2 py-8 bg-blue-500/50 hover:bg-blue-600/50 cursor-pointer font-mona items-center justify-start gap-5 text-xl"
            >
              <Vicon name="md-spacedashboard" scale="2" />
              Dashboard
            </Button>
          </li>
        </ul>
      </div>
    </section>
  </header>
</template>
