<script setup lang="ts">
import Header from "./components/myComponent/Header.vue";
import Navbar from "./components/myComponent/Navbar.vue";
import { Toaster } from "./components/ui/sonner";
import "vue-sonner/style.css";
</script>

<template>
  <Navbar />
  <main class="min-h-screen bg-slate-100/70 lg:pl-72 lg:py-3 w-full lg:pr-5">
    <article class="lg:container w-full flex flex-col justify-center">
      <Header />
      <router-view />
    </article>
  </main>
  <Toaster />
</template>
