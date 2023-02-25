import { createRouter, createWebHistory } from "vue-router";
import TodoBoard from "@/views/TodoBoard.vue";
import TaskModal from "@/views/TaskModal.vue";
import NotFound from "@/views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: TodoBoard,
      children: [
        {
          path: "task/:id",
          name: "task",
          component: TaskModal,
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
