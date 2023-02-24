import { createApp, watch } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount("#app");

watch(
  () => pinia.state.value.todoStore?.todoBoard,
  (todoBoard) => {
    localStorage.setItem('todo-board', JSON.stringify(todoBoard));
  },
  { deep: true }
)
