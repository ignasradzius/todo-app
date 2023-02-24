import { defineStore } from "pinia";
import { columns as defaultColumns } from "@/default-board";

const _todoBoard =
  JSON.parse(localStorage.getItem("todo-board")!) || defaultColumns;

export const useTodoStore = defineStore("todoStore", {
  state: () => ({
    todoBoard: _todoBoard as Column[],
    task: {} as Task,
  }),

  actions: {
    createTask(payload: Task) {
      if (!payload) return;

      this.todoBoard[0].tasks.push(payload);

      localStorage.setItem("todo-board", JSON.stringify(this.todoBoard));
    },
    updateTask(payload: TaskUpdatePayload) {
      if (!payload) return;

      this.task.title = payload.title;
      this.task.description = payload.description;

      localStorage.setItem("todo-board", JSON.stringify(this.todoBoard));
    },
    deleteTask(id: string) {
      //
    },
    moveTask(from: Task[], to: Task[], taskIndex: number) {
      const taskToMove = from.splice(taskIndex, 1)[0];
      to.push(taskToMove);
    }
  },

  getters: {
    getTaskById(state) {
      return (id: string) => {
        state.todoBoard.forEach((board) => {
          board.tasks.forEach((task) => {
            if (task.id === id) {
              state.task = task;
            }
          });
        });
      };
    },
  },
});

export interface Column {
  id: string;
  name: string;
  tasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

interface TaskUpdatePayload {
  title: string;
  description: string;
}
