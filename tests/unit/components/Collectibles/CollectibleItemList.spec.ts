import CollectibleItemList from "@/components/Collectibles/CollectibleItemList.vue"
import CollectibleItemSummary from "@/components/Collectibles/CollectibleItemSummary.vue"
import { shallowMount, Wrapper } from "@vue/test-utils"
import { CollectibleSortFields } from "@/types/collectibles"

type DummyCollectibleItem = {
  databaseID: string
  name: string
  masteryRequirement: number
  introduced: number
  isVaulted: boolean
}

type DummyCollectibleItemList = Array<DummyCollectibleItem>

describe("CollectibleItemList component", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let wrapper: Wrapper<CollectibleItemList & { [key: string]: any }>

  const collectibleList: DummyCollectibleItemList = [
    {
      databaseID: "chroma-prime",
      name: "Chroma Prime",
      masteryRequirement: 4,
      introduced: 2018,
      isVaulted: false,
    },
    {
      databaseID: "excalibur-umbra",
      name: "Excalibur Umbra",
      masteryRequirement: 2,
      introduced: 2019,
      isVaulted: false,
    },
    { databaseID: "ash", name: "Ash", masteryRequirement: 3, introduced: 2017, isVaulted: true },
    {
      databaseID: "frost",
      name: "Frost",
      masteryRequirement: 5,
      introduced: 2016,
      isVaulted: false,
    },
    {
      databaseID: "banshee-prime",
      name: "Banshee Prime",
      masteryRequirement: 1,
      introduced: 2020,
      isVaulted: true,
    },
  ]

  beforeEach(() => {
    wrapper = shallowMount(CollectibleItemList, {
      propsData: {
        category: "warframes",
      },
      stubs: { "router-view": true },
      mocks: {
        $t: (key: string) => key,
        $store: {
          state: {
            warframes: {
              list: collectibleList,
            },
          },
          getters: {
            "warframes/total": collectibleList.length,
          },
        },
      },
    })
  })

  it("should display a list of collectible-item-summary components", () => {
    const allCollectibleItemSummaries = wrapper.findAllComponents(CollectibleItemSummary)
    expect(allCollectibleItemSummaries).toHaveLength(collectibleList.length)
  })

  it("should compute the total number of collectibles", () => {
    expect(wrapper.vm.total).toBeNumber()
    expect(wrapper.vm.total).toBe(collectibleList.length)
  })

  describe("search, sort and filter", () => {
    it("should display it's panel once", () => {
      const allSearchSortFilterPanels = wrapper.findAll("#search-sort-filter-panel")
      expect(allSearchSortFilterPanels).toHaveLength(1)

      const theSearchSortFilterPanel = wrapper.findAll("#search-sort-filter-panel").at(0)
      expect(theSearchSortFilterPanel.exists()).toBeTrue()
    })

    describe("search", () => {
      it("text should initially be null", () => {
        expect(wrapper.vm.$data.searchText).toBeNull()
      })

      it("should find a collectible by name, case-insensitive", async () => {
        await wrapper.setData({ searchText: "banshee" })
        expect(wrapper.vm.$data.searchText).toBe("banshee")

        const searchResults: DummyCollectibleItemList = wrapper.vm.collectibles

        const searchResultNames = searchResults.map((result) => result.name)
        expect(searchResultNames).toContainAllValues(["Banshee Prime"])
      })
    })

    describe("sort", () => {
      const collectibleNamesAscending = [
        "Ash",
        "Banshee Prime",
        "Chroma Prime",
        "Excalibur Umbra",
        "Frost",
      ]
      const collectibleMasteryRanksAscending = [1, 2, 3, 4, 5]
      const collectiblePatchesAscending = [2016, 2017, 2018, 2019, 2020]

      it("should initially sort by name ascending", () => {
        expect(wrapper.vm.$data.sortBy).toBe(CollectibleSortFields.name)
        expect(wrapper.vm.$data.sortAscending).toBe(true)

        const sortResults: DummyCollectibleItemList = wrapper.vm.collectibles

        const sortResultNames = sortResults.map((result) => result.name)
        expect(sortResultNames).toStrictEqual(collectibleNamesAscending)
      })

      it("should sort by name descending", async () => {
        await wrapper.setData({ sortAscending: false })

        expect(wrapper.vm.$data.sortBy).toBe(CollectibleSortFields.name)
        expect(wrapper.vm.$data.sortAscending).toBe(false)

        const sortResults: DummyCollectibleItemList = wrapper.vm.collectibles

        const sortResultNames = sortResults.map((result) => result.name)
        expect(sortResultNames).toStrictEqual([...collectibleNamesAscending].reverse())
      })

      it("should sort by mastery requirement ascending", async () => {
        await wrapper.setData({
          sortBy: CollectibleSortFields.masteryRequirement,
          sortAscending: true,
        })

        expect(wrapper.vm.$data.sortBy).toBe(CollectibleSortFields.masteryRequirement)
        expect(wrapper.vm.$data.sortAscending).toBe(true)

        const sortResults: DummyCollectibleItemList = wrapper.vm.collectibles

        const sortResultRanks = sortResults.map((result) => result.masteryRequirement)
        expect(sortResultRanks).toStrictEqual(collectibleMasteryRanksAscending)
      })

      it("should sort by mastery requirement descending", async () => {
        await wrapper.setData({
          sortBy: CollectibleSortFields.masteryRequirement,
          sortAscending: false,
        })

        expect(wrapper.vm.$data.sortBy).toBe(CollectibleSortFields.masteryRequirement)
        expect(wrapper.vm.$data.sortAscending).toBe(false)

        const searchResults: DummyCollectibleItemList = wrapper.vm.collectibles

        const searchResultRanks = searchResults.map((result) => result.masteryRequirement)
        expect(searchResultRanks).toStrictEqual([...collectibleMasteryRanksAscending].reverse())
      })

      it("should sort by introduction patch ascending", async () => {
        await wrapper.setData({
          sortBy: CollectibleSortFields.introduced,
          sortAscending: true,
        })

        expect(wrapper.vm.$data.sortBy).toBe(CollectibleSortFields.introduced)
        expect(wrapper.vm.$data.sortAscending).toBe(true)

        const searchResults: DummyCollectibleItemList = wrapper.vm.collectibles

        const searchResultPatches = searchResults.map((result) => result.introduced)
        expect(searchResultPatches).toStrictEqual(collectiblePatchesAscending)
      })

      it("should sort by introduction patch descending", async () => {
        await wrapper.setData({
          sortBy: CollectibleSortFields.introduced,
          sortAscending: false,
        })

        expect(wrapper.vm.$data.sortBy).toBe(CollectibleSortFields.introduced)
        expect(wrapper.vm.$data.sortAscending).toBe(false)

        const searchResults: DummyCollectibleItemList = wrapper.vm.collectibles

        const searchResultPatches = searchResults.map((result) => result.introduced)
        expect(searchResultPatches).toStrictEqual([...collectiblePatchesAscending].reverse())
      })
    })

    describe("filter", () => {
      const primeCollectibleNames = ["Chroma Prime", "Banshee Prime"]
      const umbraCollectibleNames = ["Excalibur Umbra"]

      it("should initially show all", () => {
        const filterResults: DummyCollectibleItemList = wrapper.vm.collectibles
        expect(filterResults).toBeArrayOfSize(collectibleList.length)
        expect(filterResults).toBeArrayOfObjects()
      })

      it("should compute the total number of filtered collectibles, initially the same as total", () => {
        expect(wrapper.vm.filteredTotal).toBeNumber()
        expect(wrapper.vm.filteredTotal).toBe(collectibleList.length)
        expect(wrapper.vm.filteredTotal).toBe(wrapper.vm.total)
      })

      describe("by mastery rank requirement", () => {
        it("should initially show be set to minimum and maximum mastery ranks", () => {
          const masteryRankFilter = wrapper.vm.$data.filters.masteryRank
          expect(masteryRankFilter).toStrictEqual([0, 30])
        })

        it("should filter by minimum and maximum inclusive", async () => {
          await wrapper.setData({
            filters: {
              masteryRank: [2, 4],
            },
          })
          expect(wrapper.vm.$data.filters.masteryRank).toStrictEqual([2, 4])

          const filterResults: DummyCollectibleItemList = wrapper.vm.collectibles

          const filterResultMasteryRanks = filterResults.map((result) => result.masteryRequirement)
          expect(filterResultMasteryRanks).toContainAllValues([2, 3, 4])
          expect(filterResultMasteryRanks).not.toContainAnyValues([1, 5])
        })
      })

      describe("by variant", () => {
        it("should initially be undefined", () => {
          expect(wrapper.vm.$data.filters.variant).toBeUndefined()
        })

        it("should filter by original (no variant)", async () => {
          await wrapper.setData({
            filters: {
              variant: "original",
            },
          })
          expect(wrapper.vm.$data.filters.variant).toBe("original")

          const filterResults: DummyCollectibleItemList = wrapper.vm.collectibles

          const filterResultNames = filterResults.map((result) => result.name)
          expect(filterResultNames).not.toContainAnyValues([
            ...primeCollectibleNames,
            ...umbraCollectibleNames,
          ])
        })

        it("should filter prime variants", async () => {
          await wrapper.setData({
            filters: {
              variant: "prime",
            },
          })
          expect(wrapper.vm.$data.filters.variant).toBe("prime")

          const filterResults: DummyCollectibleItemList = wrapper.vm.collectibles

          const filterResultNames = filterResults.map((result) => result.name)
          expect(filterResultNames).toContainAllValues([...primeCollectibleNames])
        })

        it("should filter umbra variants", async () => {
          await wrapper.setData({
            filters: {
              variant: "umbra",
            },
          })
          expect(wrapper.vm.$data.filters.variant).toBe("umbra")

          const filterResults: DummyCollectibleItemList = wrapper.vm.collectibles

          const filterResultNames = filterResults.map((result) => result.name)
          expect(filterResultNames).toContainAllValues([...umbraCollectibleNames])
        })
      })

      describe("by vaulted status", () => {
        it("should initially be undefined", () => {
          expect(wrapper.vm.$data.filters.vaulted).toBeUndefined()
        })

        it("should filter to collectibles not in the vault", async () => {
          await wrapper.setData({
            filters: {
              variant: "prime",
              vaulted: false,
            },
          })
          expect(wrapper.vm.$data.filters.variant).toBe("prime")
          expect(wrapper.vm.$data.filters.vaulted).toBe(false)

          const filterResults: DummyCollectibleItemList = wrapper.vm.collectibles

          const filterResultVaultedStatuses = filterResults.map((result) => result.isVaulted)
          expect(filterResultVaultedStatuses).toContainAllValues([false])
        })

        it("should filter to collectibles which are vaulted", async () => {
          await wrapper.setData({
            filters: {
              variant: "prime",
              vaulted: true,
            },
          })
          expect(wrapper.vm.$data.filters.variant).toBe("prime")
          expect(wrapper.vm.$data.filters.vaulted).toBe(true)

          const filterResults: DummyCollectibleItemList = wrapper.vm.collectibles

          const filterResultVaultedStatuses = filterResults.map((result) => result.isVaulted)
          expect(filterResultVaultedStatuses).toContainAllValues([true])
        })
      })
    })
  })

  describe("page heading", () => {
    it("should not be empty", () => {
      const pageHeading = wrapper.vm.headingText
      expect(pageHeading).toBeNonEmptyString()
    })
  })
})
