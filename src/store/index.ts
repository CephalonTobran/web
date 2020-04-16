import Vue from "vue"
import Vuex from "vuex"
import database from "@/services/DatabaseService"
import { Warframe } from "@/types/collectibles"
import { initFirestorePersistence } from "@/services/FirebaseServices"

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",

  state: {
    mainMenuIsVisible: false,

    offlinePersistenceIsEnabled: false,

    warframes: [],
  },

  getters: {
    totalWarframes: state => {
      return state.warframes.length
    },
  },

  mutations: {
    SET_DATABASE_PERSISTENCE_AVAILABILITY(state, availability: boolean) {
      state.offlinePersistenceIsEnabled = availability
    },

    SET_MAIN_MENU_VISIBILITY(state, visibility?: boolean) {
      // Toggle state if not specifically defined
      if (visibility === undefined)
        state.mainMenuIsVisible = !state.mainMenuIsVisible
      else state.mainMenuIsVisible = visibility
    },

    ADD_WARFRAME(state, warframe: Warframe) {
      state.warframes.push(warframe)
    },

    UPDATE_WARFRAME(state, updatedWarframe: Warframe) {
      const index = state.warframes.findIndex(
        warframe => warframe.databaseID === updatedWarframe.databaseID
      )
      state.warframes.splice(index, 1, updatedWarframe)
    },

    DELETE_WARFRAME(state, id: string) {
      const index = state.warframes.findIndex(
        warframe => warframe.databaseID === id
      )
      state.warframes.splice(index, 1)
    },
  },

  actions: {
    enableDatabasePersistence(context) {
      initFirestorePersistence()
        .then(() => {
          context.commit("SET_DATABASE_PERSISTENCE_AVAILABILITY", true)
        })
        .catch(error => {
          context.commit("SET_DATABASE_PERSISTENCE_AVAILABILITY", false)

          if (error.code === "failed-precondition") {
            console.error(
              "Offline data persistence is disabled because multiple tabs are open."
            )
          } else if (error.code === "unimplemented") {
            console.error(
              "Offline data persistence is disabled because this browser does not support all of the required features."
            )
          }
        })
    },

    listenToWarframes(context) {
      database
        .collection("warframes")
        .orderBy("name")
        .onSnapshot(function (snapshot) {
          snapshot.docChanges().forEach(function (change) {
            if (change.type === "added") {
              const warframe: Warframe = {
                databaseID: change.doc.id,
                uniqueName: change.doc.data().uniqueName,
                name: change.doc.data().name,
                image: change.doc.data().image,
                description: change.doc.data().description,
                masteryRequirement: change.doc.data().masteryRequirement,
                introduced: change.doc.data().introduced,
                wikiURL: change.doc.data().wikiURL,
                isPrime: change.doc.data().isPrime,
                isVaulted: change.doc.data().isVaulted,
              }
              context.commit("ADD_WARFRAME", warframe)
            }
            if (change.type === "modified") {
              const warframe: Warframe = {
                databaseID: change.doc.id,
                uniqueName: change.doc.data().uniqueName,
                name: change.doc.data().name,
                image: change.doc.data().image,
                description: change.doc.data().description,
                masteryRequirement: change.doc.data().masteryRequirement,
                introduced: change.doc.data().introduced,
                wikiURL: change.doc.data().wikiURL,
                isPrime: change.doc.data().isPrime,
                isVaulted: change.doc.data().isVaulted,
              }
              context.commit("UPDATE_WARFRAME", warframe)
            }
            if (change.type === "removed") {
              context.commit("DELETE_WARFRAME", change.doc.id)
            }
          })
        })
    },
  },
})
