import {
  Collectible,
  CollectibleSortFields,
  convertToCollectible,
  sortCollectiblesBy,
} from "@/types/collectibles"

interface DocumentData {
  name: string
  uniqueName: string
  image: string
  description: string
  masteryRequirement: number
  introduced: number
  wikiURL: string
  isVaulted: boolean
}

describe("collectibles", () => {
  describe("convertToCollectible", () => {
    it("should convert Firestore DocumentData to a Collectible", () => {
      const data: DocumentData = {
        uniqueName: "test/data/dummy",
        name: "Dummy",
        image: "dummy.png",
        description: "A dummy item for testing purposes",
        masteryRequirement: 0,
        introduced: 0,
        wikiURL: "http://www.example.com/wiki/dummy",
        isVaulted: false,
      }

      const item: Collectible = {
        databaseID: "dummy",
        uniqueName: "test/data/dummy",
        name: "Dummy",
        image: "dummy.png",
        description: "A dummy item for testing purposes",
        masteryRequirement: 0,
        introduced: 0,
        wikiURL: "http://www.example.com/wiki/dummy",
        isVaulted: false,
      }

      const testResult = convertToCollectible("dummy", data)
      expect(testResult).toStrictEqual(item)
    })
  })

  describe("sortCollectiblesBy", () => {
    const collectibleBase: Collectible = {
      name: "Dummy",
      masteryRequirement: 0,
      introduced: 0,
      databaseID: "dummy",
      uniqueName: "test/data/dummy",
      image: "dummy.png",
      description: "A dummy item for testing purposes",
      wikiURL: "http://www.example.com/wiki/dummy",
      isVaulted: false,
    }

    let firstCollectible: Collectible
    let secondCollectible: Collectible

    beforeEach(() => {
      firstCollectible = Object.assign({}, collectibleBase)
      secondCollectible = Object.assign({}, collectibleBase)
    })

    describe("when sorting by the name field", () => {
      it("should sort ascending", () => {
        firstCollectible.name = "Alpha"
        secondCollectible.name = "Beta"

        const testResult = sortCollectiblesBy(
          firstCollectible,
          secondCollectible,
          CollectibleSortFields.name
        )
        expect(testResult).toBeLessThan(0)
      })

      it("should sort descending", () => {
        firstCollectible.name = "Alpha"
        secondCollectible.name = "Beta"

        const testResult = sortCollectiblesBy(
          firstCollectible,
          secondCollectible,
          CollectibleSortFields.name,
          false
        )
        expect(testResult).toBeGreaterThan(0)
      })

      it("should not sort identical names", () => {
        firstCollectible.name = "Alpha"
        secondCollectible.name = "Alpha"

        const testResult = sortCollectiblesBy(
          firstCollectible,
          secondCollectible,
          CollectibleSortFields.name
        )
        expect(testResult).toBe(0)
      })
    })

    describe("when sorting by the introduced field", () => {
      it("should sort ascending", () => {
        firstCollectible.introduced = 2018
        secondCollectible.introduced = 2020

        const testResult = sortCollectiblesBy(
          firstCollectible,
          secondCollectible,
          CollectibleSortFields.introduced
        )
        expect(testResult).toBeLessThan(0)
      })

      it("should sort descending", () => {
        firstCollectible.introduced = 2018
        secondCollectible.introduced = 2020

        const testResult = sortCollectiblesBy(
          firstCollectible,
          secondCollectible,
          CollectibleSortFields.introduced,
          false
        )
        expect(testResult).toBeGreaterThan(0)
      })

      it("should sort identical patches by name ascending", () => {
        firstCollectible.name = "Alpha"
        secondCollectible.name = "Beta"

        firstCollectible.introduced = 2020
        secondCollectible.introduced = 2020

        const testResult = sortCollectiblesBy(
          firstCollectible,
          secondCollectible,
          CollectibleSortFields.introduced
        )
        expect(testResult).toBeLessThan(0)
      })
    })

    describe("when sorting by the mastery rank requirement field", () => {
      it("should sort ascending", () => {
        firstCollectible.masteryRequirement = 5
        secondCollectible.masteryRequirement = 10

        const testResult = sortCollectiblesBy(
          firstCollectible,
          secondCollectible,
          CollectibleSortFields.masteryRequirement
        )
        expect(testResult).toBeLessThan(0)
      })

      it("should sort descending", () => {
        firstCollectible.masteryRequirement = 5
        secondCollectible.masteryRequirement = 10

        const testResult = sortCollectiblesBy(
          firstCollectible,
          secondCollectible,
          CollectibleSortFields.masteryRequirement,
          false
        )
        expect(testResult).toBeGreaterThan(0)
      })

      it("should sort identical MR by name ascending", () => {
        firstCollectible.name = "Alpha"
        secondCollectible.name = "Beta"

        firstCollectible.masteryRequirement = 5
        secondCollectible.masteryRequirement = 5

        const testResult = sortCollectiblesBy(
          firstCollectible,
          secondCollectible,
          CollectibleSortFields.masteryRequirement
        )
        expect(testResult).toBeLessThan(0)
      })
    })
  })
})
