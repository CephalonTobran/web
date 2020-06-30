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

export async function initFirestorePersistence(): Promise<boolean> {
  try {
    await Firebase.firestore().enablePersistence({ synchronizeTabs: true })
    return true
  } catch (error) {
    if (error.code === "failed-precondition") {
      console.error("Offline data persistence is disabled because multiple tabs are open.")
    } else if (error.code === "unimplemented") {
      console.error(
        "Offline data persistence is disabled because this browser does not support all of the required features."
      )
    }
    return Promise.reject(error.code)
  }
}
