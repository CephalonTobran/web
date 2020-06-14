import Vue from "vue"
import Vuex from "vuex"
import { initFirestorePersistence } from "@/services/FirebaseServices"
import warframes from "./collectibles/warframes"

export interface State {
  offlinePersistenceIsEnabled: boolean
  mainMenuIsVisible: boolean
}

export interface Context {
  commit: (mutation: string, payload?: boolean) => void
}

Vue.use(Vuex)

export const state: State = {
  offlinePersistenceIsEnabled: false,
  mainMenuIsVisible: false,
}

export const getters = {}

export const mutations = {
  SET_DATABASE_PERSISTENCE_AVAILABILITY(state: State, availability: boolean): void {
    state.offlinePersistenceIsEnabled = availability
  },

  SET_MAIN_MENU_VISIBILITY(state: State, visibility?: boolean): void {
    // Toggle state if not specifically defined
    if (visibility === undefined) state.mainMenuIsVisible = !state.mainMenuIsVisible
    else state.mainMenuIsVisible = visibility
  },
}

export const actions = {
  enableDatabasePersistence(context: Context): void {
    initFirestorePersistence()
      .then(() => {
        context.commit("SET_DATABASE_PERSISTENCE_AVAILABILITY", true)
      })
      .catch((error) => {
        context.commit("SET_DATABASE_PERSISTENCE_AVAILABILITY", false)

        if (error.code === "failed-precondition") {
          console.error("Offline data persistence is disabled because multiple tabs are open.")
        } else if (error.code === "unimplemented") {
          console.error(
            "Offline data persistence is disabled because this browser does not support all of the required features."
          )
        }
      })
  },
}

export const modules = {
  warframes: warframes,
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules,
  strict: process.env.NODE_ENV !== "production",
})
