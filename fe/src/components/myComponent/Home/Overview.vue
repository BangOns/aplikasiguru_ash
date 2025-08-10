<script setup lang="ts">
import Vicon from "../Vicon.vue";
</script>

<template>
  <header class="w-full flex justify-between pt-10">
    <h1 class="font-mona-bold text-xl text-slate-900">Overview</h1>
  </header>
  <section class="flex gap-4 justify-between mt-5 max-xl:flex-col">
    <article
      class="flex basis-3/4 gap-5 max-lg:flex-col justify-between items-center"
    >
      <section
        v-for="value in [1, 2, 3, 4]"
        :key="value"
        class="p-4 bg-blue-300/40 w-full rounded-2xl"
      >
        <header class="flex gap-4 items-center">
          <Vicon
            name="hi-solid-user-circle"
            fill="blue"
            scale="2"
            class="cursor-pointer"
          />
          <h2 class="font-mona-bold max-xl:text-sm">No Of Student</h2>
        </header>
        <article class="mt-3 w-full">
          <h2
            class="text-4xl font-mona-bold pb-5 w-fit border-b-4 border-blue-500"
          >
            250
          </h2>
        </article>
      </section>
    </article>
    <article class="flex basis-1/3">
      <section class="p-1 w-full flex gap-5">
        <figure>
          <img
            src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            width="130"
            height="130"
            class="rounded-xl"
            alt="pp profile"
          />
        </figure>
        <article class="flex flex-col justify-center gap-1">
          <section class="space-y-1">
            <p class="font-mona-bold text-xl">Syahroni</p>
            <p class="font-mona text-slate-600">admin@example.com</p>
          </section>
          <section class="bg-slate-200 py-5 px-2 rounded-md">
            <p class="text-xs font-mona-bold">Guru Pendidikan Agama Islam</p>
          </section>
        </article>
      </section>
    </article>
  </section>
</template>
