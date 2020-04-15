import Vue from "vue"
import Vuex from "vuex"
import database from "@/services/DatabaseService"
import { Warframe } from "@/types/collectibles"

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",

  state: {
    mainMenuIsVisible: false,

    warframes: [],
    warframesAreLoaded: false,
  },

  getters: {
    totalWarframes: state => {
      if (!state.warframesAreLoaded) return 0
      else return state.warframes.length
    },
  },

  mutations: {
    mainMenuVisibility(state, visibility?: boolean) {
      // Toggle state if not specifically defined
      if (visibility === undefined)
        state.mainMenuIsVisible = !state.mainMenuIsVisible
      else state.mainMenuIsVisible = visibility
    },

    addWarframe(state, warframe: Warframe) {
      state.warframes.push(warframe)
      if (!state.warframesAreLoaded) state.warframesAreLoaded = true
    },

    setWarframes(state, warframes: Array<Warframe>) {
      state.warframes = warframes
      state.warframesAreLoaded = true
    },
  },

  actions: {
    loadWarframes(context) {
      database
        .collection("warframes")
        .orderBy("name")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(query => {
            const warframe: Warframe = {
              uniqueName: query.data().uniqueName,
              name: query.data().name,
              image: query.data().image,
              description: query.data().description,
              masteryRequirement: query.data().masteryRequirement,
              introduced: query.data().introduced,
              wikiURL: query.data().wikiURL,
              isPrime: query.data().isPrime,
              isVaulted: query.data().isVaulted,
            }
            context.commit("addWarframe", warframe)
          })
        })
    },
  },
})
