<script setup lang="ts">
import { useTodoStore } from "@/store/useTodoStore";
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const todoStore = useTodoStore();

todoStore.getTaskById(`${route.params.id}`);

const form = reactive({
  title: ref(todoStore.task?.title || ""),
  description: ref(todoStore.task?.description || ""),
});

function updateTask() {
  todoStore.updateTask(form);
  router.push({ name: "home" });
}

function deleteTask() {
  todoStore.deleteTask();
  router.push({ name: "home" });
}

if (!Object.keys(todoStore.task).length) {
  router.push({
    name: "404Resource",
    params: { resource: "task" },
  });
}
</script>

<template>
  <div
    class="relative z-10"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div
        class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        @click.self="$router.push({ name: 'home' })"
      >
        <div
          class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg"
        >
          <form
            @submit.prevent="updateTask"
            class="flex flex-col gap-2 p-4 sm:p-6"
          >
            <input
              type="text"
              readonly
              name="status"
              :value="`Status: ${todoStore.task.status}`"
              class="text-right"
            />
            <input
              v-model="form.title"
              type="text"
              name="title"
              placeholder="Title"
              required
              class="border border-gray-500 rounded-lg p-2 text-gray-700"
            />
            <textarea
              v-model="form.description"
              type="text"
              name="description"
              placeholder="Description"
              class="border border-gray-500 rounded-lg p-2 text-gray-700"
            />

            <div class="flex gap-2 place-content-end mt-2">
              <button
                type="submit"
                class="w-full sm:w-min border border-teal-700 px-4 rounded-lg hover:bg-green-200 active:bg-green-300 transition-colors duration-300"
              >
                Update
              </button>

              <button
                class="w-full sm:w-min border border-teal-700 px-4 rounded-lg hover:bg-rose-300 active:bg-rose-400 transition-colors duration-300"
                @click="deleteTask"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
