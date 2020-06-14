import database from "@/services/DatabaseService"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Firebase from "firebase/app"
jest.mock("Firebase")

describe("DatabaseService", () => {
  it("database should not be null", () => {
    expect(database).toBeNonEmptyObject()
  })
})
