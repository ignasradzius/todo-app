<script setup lang="ts">
import { ref } from "vue";
import { uuid } from "@/utils/uuid";
import { useTodoStore } from "@/store/useTodoStore";
import todoColumn from "@/components/todo/todoColumn.vue";

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
  <main class="board">
    <div class="flex">
      <div class="px-3 flex flex-col">
        <div class="column">
          <input
            v-model="newTaskTitle"
            type="text"
            placeholder="+ Create a new task"
            class="text-center bg-transparent w-full"
            @keyup.enter="handleSubmit"
          />
        </div>

        <button
          class="mt-2 w-full border border-teal-700 px-4 py-1 rounded shadow-md bg-emerald-600 text-white hover:opacity-80 active:opacity-60 transition-all duration-300"
          @click="handleSubmit"
        >
          Save
        </button>
      </div>

      <todo-column 
        v-for="(column, $columnIndex) in todoStore.todoBoard"
        :key="column.id"
        :column="column"
        :column-index="$columnIndex"
      />
    </div>

    <div>
      <router-view />
    </div>
  </main>
</template>

<style lang="css" scoped>
.board {
  @apply overflow-x-scroll hide-scroll-bar pb-6 pt-28 min-h-screen bg-slate-100;
}

.column {
  @apply border-2 p-2 inline-block text-left shadow-lg rounded;
  width: 260px;
}

.hide-scroll-bar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hide-scroll-bar::-webkit-scrollbar {
  display: none;
}
</style>
