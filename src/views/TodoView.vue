<script setup lang="ts">
import { ref } from "vue";
import { uuid } from "@/utils/uuid";
import { useTodoStore } from "@/stores/useTodoStore";
import type { Task, Column } from "@/stores/useTodoStore";

const todoStore = useTodoStore();

const newTaskTitle = ref("");
const fromColumn = ref<Column | null>(null);
const pickedTask = ref<Task | null>(null);

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

function startDrag(
  event: DragEvent,
  taskIndex: number,
  fromColumnIndex: string,
  taskId: string
) {
  event.dataTransfer!.dropEffect = "move";
  event.dataTransfer!.effectAllowed = "move";

  event.dataTransfer!.setData("task-index", String(taskIndex));
  event.dataTransfer!.setData("task-id", taskId);
  event.dataTransfer!.setData("from-column-index", fromColumnIndex);

  fromColumn.value = todoStore.todoBoard[Number(fromColumnIndex)];
  pickedTask.value = fromColumn.value.tasks[taskIndex];
}

function moveTask(event: DragEvent, toTasks: Column) {
  const taskIndex = event.dataTransfer!.getData("task-index");
  const taskId = event.dataTransfer!.getData("task-id");

  todoStore.moveTask(fromColumn.value!, toTasks, taskId, Number(taskIndex));
  endDrag();
}

function endDrag() {
  fromColumn.value = null;
  pickedTask.value = null;
}

function isColumnAvailable(columnId: string): boolean {
  return !!fromColumn.value?.availableColumns.includes(columnId);
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

      <div
        v-for="(column, $columnIndex) in todoStore.todoBoard"
        :key="column.id"
        class="px-3"
      >
        <div
          :class="[
            'column',
            {
              'border-2 border-green-700 border-dashed bg-green-100':
                isColumnAvailable(column.id),
            },
          ]"
          @drop="moveTask($event, column)"
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
                startDrag($event, $taskIndex, String($columnIndex), task.id)
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

.task {
  @apply flex items-start flex-col shadow mb-2 p-2 rounded bg-white text-gray-900 hover:cursor-pointer;
}

.hide-scroll-bar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hide-scroll-bar::-webkit-scrollbar {
  display: none;
}
</style>
