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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  enableDatabasePersistence(context: Context): void {
    initFirestorePersistence()
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
