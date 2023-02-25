<script setup lang="ts">
import { useTodoStore, type Column } from "@/store/useTodoStore";
import todoTask from "./todoTask.vue";

const props = defineProps<{
  column: Column;
  columnIndex: number;
}>();

const todoStore = useTodoStore();

function dropTask(event: DragEvent, toTasks: Column) {
  const taskIndex = event.dataTransfer!.getData("task-index");
  const taskId = event.dataTransfer!.getData("task-id");

  todoStore.moveTask(
    todoStore.dragginFromColumn!,
    toTasks,
    taskId,
    Number(taskIndex)
  );
  todoStore.endDrag();
}

function isColumnAvailable(columnId: string): boolean {
  return !!todoStore.dragginFromColumn?.availableColumns?.includes(columnId);
}
</script>

<template>
  <div class="px-3">
    <div
      :class="[
        'column',
        {
          'border-2 border-green-700 border-dashed bg-green-100':
            isColumnAvailable(column.id),
        },
      ]"
      @drop="dropTask($event, column)"
      @dragenter.prevent
      @dragover.prevent
    >
      <h3 class="text-center font-bold text-slate-700" data-test="column-name">
        {{ column.name }}
      </h3>

      <ul class="mt-4">
        <todo-task
          v-for="(task, $taskIndex) in column.tasks"
          :key="task.id"
          :task="task"
          :task-index="$taskIndex"
          :column-index="columnIndex"
          data-test="todo-list"
        />
      </ul>
    </div>
  </div>
</template>

<style lang="css" scoped>
.column {
  @apply border-2 p-2 inline-block text-left shadow-lg rounded;
  width: 260px;
}
</style>
