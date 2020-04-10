import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",

  state: {
    mainMenuIsVisible: false,

    collectibles: {
      warframes: {
        total: 42,
        constructed: 18,
        mastered: 7,
      },
    },
  },

  mutations: {
    mainMenuVisibility(state, visibility?: boolean) {
      // Toggle state if not specifically defined
      if (visibility === undefined)
        state.mainMenuIsVisible = !state.mainMenuIsVisible
      else state.mainMenuIsVisible = visibility
    },
  },
})
