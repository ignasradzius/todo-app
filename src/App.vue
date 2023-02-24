<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <header class="fixed top-0 w-full p-6 bg-emerald-600 shadow-md">
    <router-link
      to="/"
      class="text-gray-100 font-bold text-2xl hover:text-gray-300 transition-colors duration-300"
    >
      Todo app
    </router-link>
  </header>

  <RouterView />
</template>
