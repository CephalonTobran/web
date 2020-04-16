const state = {
  loading: true,

  warframes: {
    empty: { name: "Empty Frame" },
  },
}

const warframesModule = {
  firestorePath: "warframes",
  firestoreRefType: "collection",
  moduleName: "warframes",
  statePropName: "codex",
  namespaced: true,
  sync: {
    preventInitialDocInsertion: true,
  },

  state,

  getters: {
    isLoading(state: { loading: boolean }): boolean {
      return state.loading
    },

    // total(state) {

    // },
  },
}

export default warframesModule
