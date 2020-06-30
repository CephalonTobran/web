import firestore from "./firestore"

const Firebase: Record<string, unknown> = jest.genMockFromModule("firebase/app")

Firebase.firestore = firestore

export default Firebase
