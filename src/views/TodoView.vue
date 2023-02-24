<script setup lang="ts">
import { ref } from "vue";
import { useTodoStore } from "@/stores/useTodoStore";
import { uuid } from "@/utils/uuid";
import type { Task, Column } from "@/stores/useTodoStore";

const newTaskTitle = ref("");
const todoStore = useTodoStore();

function handleSubmit() {
  todoStore.createTask({
    id: uuid(),
    title: newTaskTitle.value,
    description: "",
    status: "opened",
  });

  newTaskTitle.value = "";
}

function startDrag(event: DragEvent, taskIndex: string, fromColumnIndex: string) {
  event.dataTransfer!.dropEffect = 'move';
  event.dataTransfer!.effectAllowed = 'move';

  event.dataTransfer!.setData('task-index', taskIndex);
  event.dataTransfer!.setData('from-column-index', fromColumnIndex);
}

function moveTask(event: DragEvent, toTasks: Task[]) {
  const fromColumnIndex = event.dataTransfer!.getData('from-column-index');
  const fromTasks = todoStore.todoBoard[Number(fromColumnIndex)].tasks;
  const taskIndex = event.dataTransfer!.getData('task-index');

  todoStore.moveTask(fromTasks, toTasks, Number(taskIndex))
}
</script>

<template>
  <main class="board">
    <div class="flex">
      <div class="px-3">
        <div class="column">
          <input
            v-model="newTaskTitle"
            type="text"
            placeholder="+ Create a new task"
            class="text-center bg-transparent w-full"
            @keyup.enter="handleSubmit()"
          />
        </div>
      </div>

      <div 
        v-for="(column, $columnIndex) in todoStore.todoBoard" 
        :key="column.id" 
        class="px-3"
      >
        <div 
          class="column"
          @drop="moveTask($event, column.tasks)"
          @dragenter.prevent
          @dragover.prevent
        >
          <h3 class="text-center font-bold">{{ column.name }}</h3>

          <ul class="mt-4">
            <li
              v-for="(task, $taskIndex) in column.tasks"
              :key="task.id"
              class="task border-2 border-orange-400"
              draggable="true"
              @dragstart="startDrag($event, String($taskIndex), String($columnIndex))"
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
  @apply overflow-x-scroll hide-scroll-bar py-6;
}

.column {
  @apply bg-gray-200 p-2 inline-block text-left shadow-md rounded;
  width: 260px;
}

.task {
  @apply flex items-start flex-col shadow mb-2 p-2 rounded bg-white text-gray-900;
}

.hide-scroll-bar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hide-scroll-bar::-webkit-scrollbar {
  display: none;
}
</style>
