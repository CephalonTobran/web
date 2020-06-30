import {
  FirebaseIsInitialized,
  FirestoreIsInitialized,
  initFirebase,
  initFirestore,
  initFirestorePersistence,
} from "@/services/FirebaseServices"
import Firebase from "firebase/app"
import "firebase/firestore"

describe("FirebaseServices", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  it("initialized statuses should default to false", () => {
    expect(FirebaseIsInitialized).toBe(false)
    expect(FirestoreIsInitialized).toBe(false)
  })

  it("should initialize Firebase", () => {
    initFirebase()

    expect(Firebase.initializeApp).toHaveBeenCalledTimes(1)
    expect(FirebaseIsInitialized).toBe(true)
  })

  it("should initialize Firestore", () => {
    initFirestore()

    expect(Firebase.firestore).toHaveBeenCalledTimes(1)
    expect(FirestoreIsInitialized).toBe(true)
  })

  it("should initialize Firestore persistence", async () => {
    const testResult = await initFirestorePersistence()

    expect(testResult).toBe(true)
  })

  it.todo(
    "should handle Firestore persistence failure" /* , async () => {
    const enablePersistenceMock = jest
      .spyOn(Firebase.firestore(), "enablePersistence")
      .mockImplementation(() => Promise.reject("Nope"))

    const testResult = await initFirestorePersistence()

    expect(enablePersistenceMock).toHaveBeenCalledTimes(1)
    expect(testResult).toBe(true)
  } */
  )
})
