/* eslint-disable @typescript-eslint/no-empty-function */
import TheMainMenu from "@/components/TheMainMenu.vue"
import { shallowMount } from "@vue/test-utils"

describe("TheAppBar component", () => {
  it("should display menu titles, descriptions and icons", () => {
    const wrapper = shallowMount(TheMainMenu, {
      data() {
        return {
          items: [
            {
              title: this.$i18n.t("test.item1.title"),
              description: this.$i18n.t("test.item1.description"),
              icon: "test-item1-icon",
              route: "page1",
            },
            {
              title: this.$i18n.t("test.item2.title"),
              description: this.$i18n.t("test.item2.description"),
              icon: "test-item2-icon",
              route: "page2",
            },
          ],
        }
      },
      mocks: {
        $i18n: {
          t: (key: string) => key,
        },
        $store: {
          state: { mainMenuIsVisible: false },
        },
      },
    })

    const menuItemTitles = wrapper.findAll("v-list-item-title-stub")
    expect(menuItemTitles).toHaveLength(2)
    expect(menuItemTitles.at(0).text()).toBe("test.item1.title")
    expect(menuItemTitles.at(1).text()).toBe("test.item2.title")

    const menuDescriptions = wrapper.findAll("v-list-item-subtitle-stub")
    expect(menuDescriptions).toHaveLength(2)
    expect(menuDescriptions.at(0).text()).toBe("test.item1.description")
    expect(menuDescriptions.at(1).text()).toBe("test.item2.description")

    const menuIcons = wrapper.findAll("v-list-item-avatar-stub")
    expect(menuIcons).toHaveLength(2)
    expect(menuIcons.at(0).text()).toBe("mdi-test-item1-icon")
    expect(menuIcons.at(1).text()).toBe("mdi-test-item2-icon")
  })
})
