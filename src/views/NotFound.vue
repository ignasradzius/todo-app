<script setup lang="ts">
export interface Props {
  resource: string;
}

const props = withDefaults(defineProps<Props>(), {
  resource: "page",
});
</script>

<template>
  <div class="h-screen container mx-auto text-center mt-40">
    <h1 class="text-4xl text-center">Oops!</h1>
    <h3 class="text-xl text-center mt-5">
      The {{ resource }} you're looking for is not here.
    </h3>
    <router-link
      class="underline block mt-4 hover:opacity-80"
      :to="{ name: 'home' }"
    >
      Back to the home page
    </router-link>
  </div>
</template>
