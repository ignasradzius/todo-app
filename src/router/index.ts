import { createRouter, createWebHistory } from "vue-router";
import TodoView from "@/views/TodoBoard.vue";
import TaskView from "@/views/TaskModal.vue";
import NotFound from "@/views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: TodoView,
      children: [
        {
          path: "task/:id",
          name: "task",
          component: TaskView,
        },
      ],
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: NotFound,
    },
    {
      path: "/404/:resource",
      name: "404Resource",
      component: NotFound,
      props: true,
    },
  ],
});

export default router;
