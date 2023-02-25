<script setup lang="ts">
import { ref } from "vue";
import { uuid } from "@/utils/uuid";
import { useTodoStore } from "@/store/useTodoStore";

const todoStore = useTodoStore();

const newTaskTitle = ref("");

function handleSubmit() {
  if (!newTaskTitle.value) return;

  todoStore.createTask({
    id: uuid(),
    title: newTaskTitle.value,
    description: "",
    status: "opened",
  });

  newTaskTitle.value = "";
}
</script>

<template>
  <div class="px-3 flex flex-col">
    <div class="column">
      <input
        v-model="newTaskTitle"
        type="text"
        placeholder="+ Create a new task"
        class="text-center bg-transparent w-full"
        data-test="new-task-input"
        @keyup.enter="handleSubmit"
      />
    </div>

    <button
      class="mt-2 w-full border border-teal-700 px-4 py-1 rounded shadow-md bg-emerald-600 text-white hover:opacity-80 active:opacity-60 transition-all duration-300"
      data-test="new-task-button"
      @click="handleSubmit"
    >
      Save
    </button>
  </div>
</template>

<style lang="css" scoped>
.column {
  @apply border-2 p-2 inline-block text-left shadow-lg rounded;
  width: 260px;
}
</style>
