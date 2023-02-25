import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import todoTask from "../todoTask.vue";

describe("todo-task-component", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  
  it("renders a todo", () => {
    const wrapper = mount(todoTask, {
      props: {
        task: {
          id: '1',
          title: 'Test task',
          description: 'with vitest',
          status: 'opened'
        },
        taskIndex: 0,
        columnIndex: 0
      }
    })

    const title = wrapper.get('[data-test="task-title"]')
    const description = wrapper.get('[data-test="task-description"]')

    expect(title.text()).toBe('Test task')
    expect(description.text()).toBe('with vitest')
  });

  it("redirects to a /task/1 modal page after click", async () => {
    const mockRoute = {
      params: {
        id: 1
      }
    }
    const mockRouter = {
      push: vi.fn()
    }

    const wrapper = mount(todoTask, {
      props: {
        task: {
          id: '1',
          title: 'Test task',
          description: 'with vitest',
          status: 'opened'
        },
        taskIndex: 0,
        columnIndex: 0
      },
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter
        }
      }
    })

    await wrapper.get('[data-test="task"]').trigger('click')

    expect(mockRouter.push).toHaveBeenCalledTimes(1)
    expect(mockRouter.push).toHaveBeenCalledWith({name: 'task', params: {id: '1'}})
  })
});
