import database from "@/services/DatabaseService"
import {
  Collectible,
  CollectiblesList,
  CollectibleSortFields,
  convertToCollectible,
  sortCollectiblesBy,
} from "@/types/collectibles"

export interface Context {
  commit: (mutation: string, payload?: string | Collectible) => void
}

export interface State {
  dbCollection: string
  list: CollectiblesList
}

export const state = function (): State {
  return {
    dbCollection: null as string,
    list: [] as CollectiblesList,
  }
}

export const getters = {
  total: (state: State): number => {
    return state.list.length
  },
}

export const mutations = {
  SET_COLLECTION(state: State, collection: string): void {
    state.dbCollection = collection
  },

  ADD(state: State, collectible: Collectible): void {
    state.list.push(collectible)
  },

  UPDATE(state: State, updatedCollectible: Collectible): void {
    const index = state.list.findIndex(
      (collectible: Collectible) => collectible.databaseID === updatedCollectible.databaseID
    )
    state.list.splice(index, 1, updatedCollectible)
  },

  DELETE(state: State, id: string): void {
    const index = state.list.findIndex((collectible: Collectible) => collectible.databaseID === id)
    state.list.splice(index, 1)
  },

  SORT(state: State): void {
    state.list.sort((collectibleA: Collectible, collectibleB: Collectible) =>
      sortCollectiblesBy(collectibleA, collectibleB, CollectibleSortFields.name)
    )
  },
}

export const actions = {
  listen(context: Context, collection: string): void {
    context.commit("SET_COLLECTION", collection)
    database
      .collection(collection)
      .orderBy("name")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            context.commit("ADD", convertToCollectible(change.doc.id, change.doc.data()))
          } else if (change.type === "modified") {
            context.commit("UPDATE", convertToCollectible(change.doc.id, change.doc.data()))
          } else if (change.type === "removed") {
            context.commit("DELETE", change.doc.id)
          }
        })
      })
  },
}

const collectibles = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}

export default collectibles
