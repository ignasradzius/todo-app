import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import newTask from "../newTask.vue";

describe("new-task-component", async () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders an input', () => {
    const wrapper = mount(newTask)
    const input = wrapper.get('[data-test="new-task-input"]')
   
    expect(input).toBeTruthy()
  })

  it('renders a button', () => {
    const wrapper = mount(newTask)
    const button = wrapper.get('[data-test="new-task-button"]')

    expect(button).toBeTruthy()
  })
})