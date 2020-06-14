import database from "@/services/DatabaseService"
import { Firebase } from "@/services/FirebaseServices"
jest.mock("Firebase")

describe("DatabaseService", () => {
  it("database should be an instance of Firestore", () => {
    expect(database).toBeInstanceOf(Firebase.firestore.Firestore)
  })
})
