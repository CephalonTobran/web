import TheApp from "@/components/TheApp.vue"
import TheMainMenu from "@/components/TheMainMenu.vue"
import TheAppBar from "@/components/TheAppBar.vue"
import TheScrollToTopButton from "@/components/TheScrollToTopButton.vue"
import { shallowMount } from "@vue/test-utils"

describe("theApp component", () => {
  it("should load TheMainMenu component once", () => {
    const wrapper = shallowMount(TheApp)

    const allTheMainMenus = wrapper.findAllComponents(TheMainMenu)
    expect(allTheMainMenus).toHaveLength(1)

    const theMainMenu = wrapper.findAllComponents(TheMainMenu).at(0)
    expect(theMainMenu.exists()).toBeTrue()
  })

  it("should load TheAppBar component once", () => {
    const wrapper = shallowMount(TheApp)

    const allTheAppBars = wrapper.findAllComponents(TheAppBar)
    expect(allTheAppBars).toHaveLength(1)

    const theAppBar = wrapper.findAllComponents(TheAppBar).at(0)
    expect(theAppBar.exists()).toBeTrue()
  })

  it("should load TheScrollToTopButton component once", () => {
    const wrapper = shallowMount(TheApp)

    const allTheScrollToTopButtons = wrapper.findAllComponents(TheScrollToTopButton)
    expect(allTheScrollToTopButtons).toHaveLength(1)

    const theScrollToTopButton = wrapper.findAllComponents(TheScrollToTopButton).at(0)
    expect(theScrollToTopButton.exists()).toBeTrue()
  })
})
