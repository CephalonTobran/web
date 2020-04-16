import Vue from "vue"
import Vuex from "vuex"
import database from "@/services/DatabaseService"
import {
  Warframe,
  convertToWarframe,
  WarframeSortCriteria,
  CompareWarframesBy,
} from "@/types/collectibles"
import { initFirestorePersistence } from "@/services/FirebaseServices"

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",

  state: {
    mainMenuIsVisible: false,

    offlinePersistenceIsEnabled: false,

    warframes: [],
    sortWarframesBy: WarframeSortCriteria.name,
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

    SORT_WARFRAMES(
      state,
      criteria: WarframeSortCriteria = state.sortWarframesBy
    ) {
      state.sortWarframesBy = criteria
      state.warframes.sort((warframeA: Warframe, WarframeB: Warframe) =>
        CompareWarframesBy(state.sortWarframesBy, warframeA, WarframeB)
      )
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
        .onSnapshot(snapshot => {
          let needToSort = false

          snapshot.docChanges().forEach(change => {
            if (change.type === "added") {
              context.commit(
                "ADD_WARFRAME",
                convertToWarframe(change.doc.id, change.doc.data())
              )
              needToSort = true
            } else if (change.type === "modified") {
              context.commit(
                "UPDATE_WARFRAME",
                convertToWarframe(change.doc.id, change.doc.data())
              )
              needToSort = true
            } else if (change.type === "removed") {
              context.commit("DELETE_WARFRAME", change.doc.id)
            }
          })

          if (needToSort) context.commit("SORT_WARFRAMES")
        })
    },
  },
})
