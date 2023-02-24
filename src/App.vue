<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <header class="p-6 bg-emerald-600">
    <router-link to="/" class="text-gray-100 font-bold text-2xl">
      Todo app
    </router-link>
  </header>

  <RouterView />
</template>
