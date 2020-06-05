import CollectibleItemSummary from "@/components/Collectibles/CollectibleItemSummary.vue"
import { mount } from "@vue/test-utils"
import { Collectible } from "@/types/collectibles"

describe("CollectibleItemSummary component", () => {
  let dummyCollectible: Collectible

  beforeEach(() => {
    dummyCollectible = {
      databaseID: "dummyDbId",
      name: "Dummy Collectible",
      uniqueName: "dummy",
      image: "example.png",
      description: "A dummy collectible for testing purposes",
      masteryRequirement: 0,
      introduced: 0,
      wikiURL: "http://example.com/wiki/item",
      isVaulted: false,
    }
  })

  it("should display a title for a collectible item", () => {
    const wrapper = mount(CollectibleItemSummary, {
      propsData: {
        collectible: dummyCollectible,
      },
    })

    expect(wrapper.get(".v-toolbar__title").text()).toBe(dummyCollectible.name)
  })
})
