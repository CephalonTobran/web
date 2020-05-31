import Firebase from "firebase/app"
import "firebase/firestore"

export { Firebase }

const FirebaseConfig = {
  apiKey: "AIzaSyB1dCMR7uVSgYkwY0erzWBeb_U7YXp_Y0s",
  authDomain: "cephalon-tobran.firebaseapp.com",
  databaseURL: "https://cephalon-tobran.firebaseio.com",
  projectId: "cephalon-tobran",
  storageBucket: "cephalon-tobran.appspot.com",
  messagingSenderId: "957908054883",
  appId: "1:957908054883:web:15b2949bdff82e1d429956",
  measurementId: "G-CSLS8K7WJM",
}

export let FirebaseIsInitialized = false

export function initFirebase(): void {
  Firebase.initializeApp(FirebaseConfig)
  FirebaseIsInitialized = true
}

export let FirestoreIsInitialized = false

export function initFirestore(): Firebase.firestore.Firestore {
  if (!FirebaseIsInitialized) initFirebase()

  const db = Firebase.firestore()
  FirestoreIsInitialized = true

  return db
}

export function initFirestorePersistence(): Promise<void> {
  return Firebase.firestore().enablePersistence({ synchronizeTabs: true })
}
