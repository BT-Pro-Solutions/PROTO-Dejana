import type { InjectionKey, Ref } from 'vue'
import type { DemoProduct } from '../data/products'
import type { CartLine } from '../data/site'

export type MiniCartApi = {
  open: () => void
  close: () => void
  isOpen: Ref<boolean>
  lines: Ref<CartLine[]>
  /** Adds or increments qty for matching SKU, then opens the drawer. */
  addFromProduct: (product: DemoProduct) => void
}

export const miniCartKey: InjectionKey<MiniCartApi> = Symbol('miniCart')
