import Vue from "vue"
import Vuetify from "vuetify"
import { ObjectContainingAnything } from "../_utility/utilities"

export function shallowInitVuetify(): void {
  Vue.use(Vuetify)
}

export const mockI18n = {
  t: (key: string): string => key,
}

type MockState = ObjectContainingAnything

type MockStore = {
  state?: MockState
}

export function mockStore(state?: MockState): MockStore {
  const store: MockStore = {}

  if (state !== undefined) {
    store.state = state
  }

  return store
}
