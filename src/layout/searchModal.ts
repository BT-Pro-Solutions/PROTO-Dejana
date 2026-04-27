import type { InjectionKey } from 'vue'

export type SearchModalApi = {
  open: () => void
  close: () => void
}

export const searchModalKey: InjectionKey<SearchModalApi> = Symbol('searchModal')
