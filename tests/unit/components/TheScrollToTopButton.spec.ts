import TheScrollToTopButton from "@/components/TheScrollToTopButton.vue"

import { createLocalVue, mount, Wrapper } from "@vue/test-utils"
import Vuetify from "vuetify"

describe("TheScrollToTopButton component", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let wrapper: Wrapper<TheScrollToTopButton & { [key: string]: any }>

  beforeEach(() => {
    wrapper = mount(TheScrollToTopButton)
  })

  it("should be invisible initially", () => {
    expect(wrapper.vm.show).toBe(false)

    const button = wrapper.get("button").element
    expect(button).not.toBeVisible()
  })

  it("should toggle visibility", async () => {
    await wrapper.setData({ show: true })
    expect(wrapper.vm.show).toBe(true)

    expect(wrapper.get("button").element).toBeVisible()

    await wrapper.setData({ show: false })
    expect(wrapper.vm.show).toBe(false)

    expect(wrapper.get("button").element).not.toBeVisible()
  })

  it("should respond to a button click", async () => {
    const localVue = createLocalVue()
    const vuetify = new Vuetify()
    wrapper = mount(TheScrollToTopButton, { localVue, vuetify })

    jest.spyOn(wrapper.vm, "scrollToTop")
    await wrapper.setData({ show: true })

    await wrapper.get("button").trigger("click")
    expect(wrapper.vm.scrollToTop).toHaveBeenCalledTimes(1)
  })
})
