<script setup lang="ts">
import { useTodoStore } from "@/store/useTodoStore";
import todoColumn from "@/components/todo/todoColumn.vue";
import newTask from "@/components/todo/newTask.vue";

const todoStore = useTodoStore();
</script>

<template>
  <main class="board">
    <div class="flex">
      <new-task />

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

.hide-scroll-bar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hide-scroll-bar::-webkit-scrollbar {
  display: none;
}
</style>
