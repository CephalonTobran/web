import database from "@/services/DatabaseService"
import {
  Collectible,
  CollectiblesList,
  CollectibleSortFields,
  convertToCollectible,
  sortCollectiblesBy,
} from "@/types/collectibles"

// eslint-disable-next-line @typescript-eslint/class-name-casing
interface context {
  commit: (mutation: string, payload?: string | Collectible) => void
}

// eslint-disable-next-line @typescript-eslint/class-name-casing
interface state {
  dbCollection: string
  list: CollectiblesList
}

const collectibles = {
  namespaced: true,

  state() {
    return {
      dbCollection: null as string,
      list: [] as CollectiblesList,
    }
  },

  getters: {
    total: (state: state) => {
      return state.list.length
    },
  },

  mutations: {
    SET_COLLECTION(state: state, collection: string) {
      state.dbCollection = collection
    },

    ADD(state: state, collectible: Collectible) {
      state.list.push(collectible)
    },

    UPDATE(state: state, updatedCollectible: Collectible) {
      const index = state.list.findIndex(
        (collectible: Collectible) =>
          collectible.databaseID === updatedCollectible.databaseID
      )
      state.list.splice(index, 1, updatedCollectible)
    },

    DELETE(state: state, id: string) {
      const index = state.list.findIndex(
        (collectible: Collectible) => collectible.databaseID === id
      )
      state.list.splice(index, 1)
    },

    SORT(state: state) {
      state.list.sort((collectibleA: Collectible, collectibleB: Collectible) =>
        sortCollectiblesBy(
          CollectibleSortFields.name,
          true,
          collectibleA,
          collectibleB
        )
      )
    },
  },

  actions: {
    listen(context: context, collection: string) {
      context.commit("SET_COLLECTION", collection)
      database
        .collection(collection)
        .orderBy("name")
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type === "added") {
              context.commit(
                "ADD",
                convertToCollectible(change.doc.id, change.doc.data())
              )
            } else if (change.type === "modified") {
              context.commit(
                "UPDATE",
                convertToCollectible(change.doc.id, change.doc.data())
              )
            } else if (change.type === "removed") {
              context.commit("DELETE", change.doc.id)
            }
          })
        })
    },
  },
}

export default collectibles
