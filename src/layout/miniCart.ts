import type { InjectionKey, Ref } from 'vue'
import type { DemoProduct } from '../data/products'
import type { CartLine } from '../data/site'

export type AddFromProductOptions = {
  /** Wait this many ms before opening the drawer (cart line updates immediately). */
  openDelayMs?: number
}

export type MiniCartApi = {
  open: () => void
  close: () => void
  isOpen: Ref<boolean>
  lines: Ref<CartLine[]>
  /** Adds or increments qty for matching SKU, then opens the drawer (optionally after a delay). */
  addFromProduct: (product: DemoProduct, options?: AddFromProductOptions) => void
}

export const miniCartKey: InjectionKey<MiniCartApi> = Symbol('miniCart')
