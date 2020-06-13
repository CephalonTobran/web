import database from "@/services/DatabaseService"
jest.mock("Firebase")
import { Firebase } from "@/services/FirebaseServices"

describe("DatabaseService", () => {
  it("database should be an instance of Firestore", () => {
    expect(database).toBeInstanceOf(Firebase.firestore.Firestore)
  })
})
