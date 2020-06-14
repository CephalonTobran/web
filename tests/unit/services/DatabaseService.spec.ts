import database from "@/services/DatabaseService"
import Firebase from "Firebase"
jest.mock("Firebase")

describe("DatabaseService", () => {
  it("database should not be null", () => {
    expect(database).toBeNonEmptyObject()
  })
})
