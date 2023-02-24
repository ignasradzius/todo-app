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
    },
    updateTask(payload: TaskUpdatePayload) {
      if (!payload) return;

      this.task.title = payload.title;
      this.task.description = payload.description;
    },
    deleteTask() {
      const columnToDeleteFrom = this.todoBoard.find(
        (column) => column.id === this.task.status
      );

      if (!columnToDeleteFrom || !this.task.status) return;

      const taskIndex = columnToDeleteFrom.tasks.findIndex(
        (task) => task.id === this.task.id
      );
      columnToDeleteFrom.tasks.splice(taskIndex, 1);
    },
    moveTask(from: Column, to: Column, taskId: string, taskIndex: number) {
      if (!from.availableColumns.includes(to.id)) return;

      const taskToMove = from.tasks.splice(taskIndex, 1)[0];
      to.tasks.push(taskToMove);
    },
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
  availableColumns: string[];
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
