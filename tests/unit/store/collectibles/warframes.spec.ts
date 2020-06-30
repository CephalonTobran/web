import { Context, State, state, getters, mutations } from "@/store/collectibles/warframes"
import { Collectible } from "@/types/collectibles"

describe("warframe collectibles store", () => {
  let dummyCollectible: Collectible
  let mockState: State

  beforeEach(() => {
    dummyCollectible = {
      databaseID: "dummy-db-id",
      name: "Dummy Collectible",
      uniqueName: "dummy",
      image: "example.png",
      description: "A dummy collectible for testing purposes",
      masteryRequirement: 0,
      introduced: 0,
      wikiURL: "http://example.com/wiki/item",
      isVaulted: false,
    }

    mockState = {
      dbCollection: "testing",
      list: [
        Object.assign({}, dummyCollectible),
        Object.assign({}, dummyCollectible),
        Object.assign({}, dummyCollectible),
      ],
    }
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  describe("state", () => {
    it("should have correct defaults", () => {
      const initialState = state()
      expect(initialState.dbCollection).toBeNull()
      expect(initialState.list).toBeEmptyArray()
    })
  })

  describe("getters", () => {
    describe("total", () => {
      it("should return the total number of collectibles", () => {
        expect(mockState.list).toHaveLength(3)
        const testResult = getters.total(mockState)
        expect(testResult).toBe(3)
      })
    })
  })

  describe("mutations", () => {
    const { SET_COLLECTION, ADD, UPDATE, DELETE, SORT } = mutations

    describe("SET_COLLECTION", () => {
      it("should mutate dbCollection", () => {
        expect(mockState.dbCollection).toBe("testing")
        SET_COLLECTION(mockState, "new")
        expect(mockState.dbCollection).toBe("new")
      })
    })

    describe("ADD", () => {
      it("should append a new item to the end of the collectible list", () => {
        const newCollectible = Object.assign({}, dummyCollectible)
        newCollectible.name = "New Hotness"

        ADD(mockState, newCollectible)

        expect(mockState.list).toBeArrayOfSize(4)
        expect(mockState.list[0]).toStrictEqual(dummyCollectible)
        expect(mockState.list[1]).toStrictEqual(dummyCollectible)
        expect(mockState.list[2]).toStrictEqual(dummyCollectible)
        expect(mockState.list[3]).toStrictEqual(newCollectible)
        expect(mockState.list[3].name).toBe("New Hotness")
      })
    })

    describe("UPDATE", () => {
      it("should update an existing item in the collectible list", () => {
        mockState.list[2].databaseID = "test-target"

        const updatedCollectible = Object.assign({}, dummyCollectible)
        updatedCollectible.name = "New Hotness"
        updatedCollectible.databaseID = "test-target"

        UPDATE(mockState, updatedCollectible)

        expect(mockState.list).toBeArrayOfSize(3)
        expect(mockState.list[0]).toStrictEqual(dummyCollectible)
        expect(mockState.list[1]).toStrictEqual(dummyCollectible)
        expect(mockState.list[2]).toStrictEqual(updatedCollectible)
        expect(mockState.list[2].name).toBe("New Hotness")
      })
    })

    describe("DELETE", () => {
      it("should remove an existing item from the collectible list", () => {
        mockState.list[0].databaseID = "dummy1"
        mockState.list[1].databaseID = "dummy2"
        mockState.list[2].databaseID = "dummy3"

        DELETE(mockState, "dummy2")

        expect(mockState.list).toBeArrayOfSize(2)
        expect(mockState.list[0].databaseID).toBe("dummy1")
        expect(mockState.list[1].databaseID).not.toBe("dummy2")
        expect(mockState.list[1].databaseID).toBe("dummy3")
      })
    })

    describe("SORT", () => {
      it("should sort collectibles list by name", () => {
        mockState.list[0].name = "Gamma"
        mockState.list[1].name = "Alpha"
        mockState.list[2].name = "Beta"

        SORT(mockState)

        expect(mockState.list).toBeArrayOfSize(3)
        expect(mockState.list[0].name).toBe("Alpha")
        expect(mockState.list[1].name).toBe("Beta")
        expect(mockState.list[2].name).toBe("Gamma")
      })
    })
  })

  describe("actions", () => {
    // const { listen } = actions

    describe("listen", () => {
      const contextMock: Context = { commit: jest.fn() }
      const commitSpy = jest.spyOn(contextMock, "commit")

      afterEach(() => {
        jest.spyOn(contextMock, "commit").mockImplementation()
        commitSpy.mockClear()
      })

      afterAll(() => {
        commitSpy.mockRestore()
      })

      it.todo(
        "should set the collection" /* , () => {
        listen(contextMock, "listening")
        expect(commitSpy).toHaveBeenCalledTimes(1)
        expect(commitSpy).toHaveBeenCalledWith(["SET_COLLECTION"])
      } */
      )
    })
  })
})
