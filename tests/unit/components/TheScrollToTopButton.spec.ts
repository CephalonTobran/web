import TheScrollToTopButton from "@/components/TheScrollToTopButton.vue"

import { mount } from "@vue/test-utils"

describe("TheScrollToTopButton component", () => {
  it("should be invisible initially", () => {
    const component = mount(TheScrollToTopButton)
    const button = component.get("#page-scroll-to-top-button").element

    expect(component.vm.$data["show"]).toBe(false)
    expect(button).not.toBeVisible()
  })

  it("should be visible when show is true", () => {
    const component = mount(TheScrollToTopButton, {
      data() {
        return { show: true }
      },
    })
    const button = component.get("#page-scroll-to-top-button").element

    expect(component.vm.$data["show"]).toBe(true)
    expect(button).toBeVisible()
  })

  it.todo(
    "should respond to a button click"
    /* , () => {
    const component = mount(TheScrollToTopButton)
    component.get("#page-scroll-to-top-button").trigger("click")
    expect(component.vm.scrollToTop).toHaveBeenCalledTimes(1)
  } */
  )
})
