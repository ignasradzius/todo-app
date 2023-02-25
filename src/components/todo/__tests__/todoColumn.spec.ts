import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import todoColumn from "../todoColumn.vue";

describe("todo-column-component", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("renders a list of tasks", () => {
    const wrapper = mount(todoColumn, {
      props: {
        column: {
          id: "opened",
          name: "Opened",
          availableColumns: ["in-progress", "closed"],
          tasks: [
            {
              id: "123",
              title: "Get some milk",
              description: "for breakfast",
              status: "opened",
            },
            {
              id: "456",
              title: "Take out trash",
              description: "",
              status: "opened",
            },
          ],
        },
        columnIndex: 0,
      },
    });

    const todoList = wrapper.findAll('[data-test="todo-list"]');

    expect(todoList).toHaveLength(2);
  });

  it("displays correct column name", () => {
    const wrapper = mount(todoColumn, {
      props: {
        column: {
          id: "opened",
          name: "Opened",
          availableColumns: ["in-progress", "closed"],
          tasks: [],
        },
        columnIndex: 0,
      },
    });

    const columnName = wrapper.get('[data-test="column-name"]');

    expect(columnName.text()).toBe("Opened");
  });
});
