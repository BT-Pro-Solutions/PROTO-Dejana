import type { InjectionKey, Ref } from 'vue'
import type { ReturnReason } from '../data/returnReasons'
import type { ReturnRequest, SubmitReturnInput } from '../session/demoReturns'

export type ReturnsApi = {
  requests: Ref<ReturnRequest[]>
  reasons: readonly ReturnReason[]
  submit: (input: SubmitReturnInput) => { ok: true; id: string } | { ok: false; error: string }
  hasPendingForOrder: (orderId: string, submittedByDisplayName: string) => boolean
}

export const returnsKey: InjectionKey<ReturnsApi> = Symbol('returns')
