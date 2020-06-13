/* eslint-disable @typescript-eslint/no-empty-function */
import TheAppBar from "@/components/TheAppBar.vue"
import { shallowMount } from "@vue/test-utils"
import { shallowInitVuetify } from "../_setup/vue"

shallowInitVuetify()

describe("TheAppBar component", () => {
  it("should display the app name", () => {
    const displayText = "Testing Cephalon Tobran"
    const wrapper = shallowMount(TheAppBar, {
      mocks: {
        $t: () => displayText,
      },
    })
    expect(wrapper.get("v-toolbar-title-stub").text()).toBe(displayText)
  })

  describe("menu toggle button", () => {
    it("should exist", () => {
      const wrapper = shallowMount(TheAppBar, {
        mocks: {
          $t: () => {},
        },
      })
      expect(wrapper.get("v-app-bar-nav-icon-stub").exists()).toBeTrue()
    })

    it.todo("should toggle the main menu display when clicked")
  })
})
