import type { InjectionKey, Ref } from 'vue'

export type FavoritesApi = {
  ids: Ref<string[]>
  toggle: (productId: string) => void
  isFavorite: (productId: string) => boolean
}

export const favoritesKey: InjectionKey<FavoritesApi> = Symbol('favorites')
