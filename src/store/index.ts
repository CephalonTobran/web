import Vue from "vue"
import Vuex from "vuex"
import { initFirestorePersistence } from "@/services/FirebaseServices"
import warframes from "./collectibles/warframes"

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",

  state: {
    mainMenuIsVisible: false,

    offlinePersistenceIsEnabled: false,
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
  },

  modules: {
    warframes: warframes,
  },
})
