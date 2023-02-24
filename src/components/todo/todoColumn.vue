<script setup lang="ts">
import { useTodoStore, type Column } from '@/store/useTodoStore';

const props = defineProps<{
  column: Column
  columnIndex: number
}>();

const todoStore = useTodoStore();

function startDrag(
  event: DragEvent,
  taskIndex: number,
  taskId: string
) {
  event.dataTransfer!.dropEffect = "move";
  event.dataTransfer!.effectAllowed = "move";

  event.dataTransfer!.setData("task-index", String(taskIndex));
  event.dataTransfer!.setData("task-id", taskId);

  todoStore.dragginFromColumn = todoStore.todoBoard[props.columnIndex];
  todoStore.pickedTask = todoStore.dragginFromColumn.tasks[taskIndex];
}

function dropTask(event: DragEvent, toTasks: Column) {
  const taskIndex = event.dataTransfer!.getData("task-index");
  const taskId = event.dataTransfer!.getData("task-id");

  todoStore.moveTask(todoStore.dragginFromColumn, toTasks, taskId, Number(taskIndex));
  endDrag();
}

function endDrag() {
  todoStore.dragginFromColumn = {};
  todoStore.pickedTask = {};
}

function isColumnAvailable(columnId: string): boolean {
  return todoStore.dragginFromColumn.availableColumns?.includes(columnId);
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
      <h3 class="text-center font-bold text-slate-700">
        {{ column.name }}
      </h3>

      <ul class="mt-4">
        <li
          v-for="(task, $taskIndex) in column.tasks"
          :key="task.id"
          class="task border-2 border-slate-500"
          draggable="true"
          @dragstart="
            startDrag($event, $taskIndex, task.id)
          "
          @dragend="endDrag"
          @click="$router.push({ name: 'task', params: { id: task.id } })"
        >
          <h4 class="font-bold text-sm">{{ task.title }}</h4>
          <p class="text-sm italic text-gray-600">{{ task.description }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="css" scoped>
.column {
  @apply border-2 p-2 inline-block text-left shadow-lg rounded;
  width: 260px;
}

.task {
  @apply flex items-start flex-col shadow mb-2 p-2 rounded bg-white text-gray-900 hover:cursor-pointer;
}
</style>