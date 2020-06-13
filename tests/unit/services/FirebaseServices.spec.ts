import {
  Firebase,
  FirebaseIsInitialized,
  FirestoreIsInitialized,
  initFirebase,
  initFirestore,
} from "@/services/FirebaseServices"

describe("FirebaseServices", () => {
  beforeAll(() => {
    jest.spyOn(Firebase, "initializeApp").mockImplementation()
    jest.spyOn(Firebase, "firestore").mockImplementation()
  })

  afterEach(() => {
    jest.resetAllMocks()
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
})
