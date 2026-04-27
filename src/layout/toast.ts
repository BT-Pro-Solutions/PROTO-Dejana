import type { InjectionKey, Ref } from 'vue'

export type ToastItem = {
  id: string
  message: string
  action?: { label: string; to: string }
}

export type ToastApi = {
  items: Ref<ToastItem[]>
  push: (opts: { message: string; action?: { label: string; to: string } }) => void
  dismiss: (id: string) => void
}

export const toastKey: InjectionKey<ToastApi> = Symbol('toast')
