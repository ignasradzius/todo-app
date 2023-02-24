<script setup lang="ts">
import { useTodoStore, type Task } from "@/store/useTodoStore";

const props = defineProps<{
  task: Task;
  taskIndex: number;
  columnIndex: number;
}>();

const todoStore = useTodoStore();

function startDrag(event: DragEvent, taskId: string) {
  event.dataTransfer!.dropEffect = "move";
  event.dataTransfer!.effectAllowed = "move";

  event.dataTransfer!.setData("task-index", String(props.taskIndex));
  event.dataTransfer!.setData("task-id", taskId);

  todoStore.dragginFromColumn = todoStore.todoBoard[props.columnIndex];
  todoStore.pickedTask = todoStore.dragginFromColumn.tasks[props.taskIndex];
}
</script>

<template>
  <li
    class="task border-2 border-slate-500"
    draggable="true"
    @dragstart="startDrag($event, task.id)"
    @dragend="todoStore.endDrag"
    @click="$router.push({ name: 'task', params: { id: task.id } })"
  >
    <h4 class="font-bold text-sm">{{ task.title }}</h4>
    <p class="text-sm italic text-gray-600">{{ task.description }}</p>
  </li>
</template>

<style lang="css" scoped>
.task {
  @apply flex items-start flex-col shadow mb-2 p-2 rounded bg-white text-gray-900 hover:cursor-pointer;
}
</style>
