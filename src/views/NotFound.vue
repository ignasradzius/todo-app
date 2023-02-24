<!-- <script setup lang="ts">
export interface Props {
  resource: string
}

const props = withDefaults(defineProps<Props>(), {
  resource: 'page'
})
</script> -->

<template>
  <div class="container mx-auto mt-20">
    <h1 class="text-4xl text-center">Oops!</h1>
    <h3 class="text-xl text-center mt-5">
      The page you're looking for is not here.
    </h3>
    <router-link :to="{ name: 'home' }">Back to the home page</router-link>
  </div>
</template>
