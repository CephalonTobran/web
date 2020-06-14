jest.mock("../../../src/services/FirebaseServices", () => {
  return {
    initFirestore: jest.fn(() => true),
  }
})

import database from "@/services/DatabaseService"

describe("DatabaseService", () => {
  it("should initialize database", () => {
    expect(database).toBe(true)
  })
})
