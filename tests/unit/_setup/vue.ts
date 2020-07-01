import Vue from "vue"
import Vuetify from "vuetify"
import { Wrapper } from "@vue/test-utils"
import { ObjectContainingAnything } from "../_utility/utilities"

export type WrapperObject = Wrapper<Vue & ObjectContainingAnything>

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
