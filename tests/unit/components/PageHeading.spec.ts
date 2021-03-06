import PageHeading from "@/components/PageHeading.vue"
import { shallowMount } from "@vue/test-utils"
import { shallowInitVuetify } from "../_setup/vue"

shallowInitVuetify()

describe("PageHeading component", () => {
  it("should display text", () => {
    const wrapper = shallowMount(PageHeading, {
      slots: {
        default: "Test Page Heading",
      },
    })
    expect(wrapper.text()).toBe("Test Page Heading")
  })
})
