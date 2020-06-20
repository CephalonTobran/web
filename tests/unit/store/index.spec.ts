import { Context, State, state, mutations, actions } from "@/store"
import { mocked } from "ts-jest/utils"
import { initFirestorePersistence } from "@/services/FirebaseServices"

jest.mock("../../../src/services/FirebaseServices")

const initFirestorePersistenceMock = mocked(initFirestorePersistence)

describe("general store", () => {
  let mockState: State

  beforeEach(() => {
    mockState = {
      offlinePersistenceIsEnabled: state.offlinePersistenceIsEnabled,
      mainMenuIsVisible: state.mainMenuIsVisible,
    }
  })

  afterEach(() => {
    initFirestorePersistenceMock.mockClear()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  describe("state", () => {
    it("should have correct defaults", () => {
      expect(state.offlinePersistenceIsEnabled).toBe(false)
      expect(state.mainMenuIsVisible).toBe(false)
    })
  })

  describe("getters", () => {
    // There are no getters yet
  })

  describe("mutations", () => {
    describe("SET_DATABASE_PERSISTENCE_AVAILABILITY", () => {
      const { SET_DATABASE_PERSISTENCE_AVAILABILITY } = mutations

      it("should mutate offlinePersistenceIsEnabled", () => {
        expect(mockState.offlinePersistenceIsEnabled).toBe(false)

        SET_DATABASE_PERSISTENCE_AVAILABILITY(mockState, true)
        expect(mockState.offlinePersistenceIsEnabled).toBe(true)

        SET_DATABASE_PERSISTENCE_AVAILABILITY(mockState, false)
        expect(mockState.offlinePersistenceIsEnabled).toBe(false)
      })
    })

    describe("SET_MAIN_MENU_VISIBILITY", () => {
      const { SET_MAIN_MENU_VISIBILITY } = mutations

      it("should mutate mainMenuIsVisible when given an explicit value", () => {
        expect(mockState.mainMenuIsVisible).toBe(false)

        SET_MAIN_MENU_VISIBILITY(mockState, true)
        expect(mockState.mainMenuIsVisible).toBe(true)

        SET_MAIN_MENU_VISIBILITY(mockState, false)
        expect(mockState.mainMenuIsVisible).toBe(false)

        SET_MAIN_MENU_VISIBILITY(mockState, true)
        expect(mockState.mainMenuIsVisible).toBe(true)
      })

      it("should toggle mutate mainMenuIsVisible when not given an explicit value", () => {
        expect(mockState.mainMenuIsVisible).toBe(false)

        SET_MAIN_MENU_VISIBILITY(mockState)
        expect(mockState.mainMenuIsVisible).toBe(true)

        SET_MAIN_MENU_VISIBILITY(mockState)
        expect(mockState.mainMenuIsVisible).toBe(false)
      })
    })
  })

  describe("actions", () => {
    describe("enableDatabasePersistence", () => {
      const contextMock: Context = { commit: jest.fn() }

      afterEach(() => {
        initFirestorePersistenceMock.mockClear()
      })

      it("should init persistence", () => {
        actions.enableDatabasePersistence(contextMock)
        expect(initFirestorePersistenceMock).toHaveBeenCalledTimes(1)
      })
    })
  })
})
