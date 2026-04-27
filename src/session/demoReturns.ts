import { ref, watch } from 'vue'
import { reasonLabelById } from '../data/returnReasons'
import type { DemoAccountOrder } from '../data/demoAccountOrders'

export type ReturnRequestStatus = 'pending' | 'approved' | 'rejected'

export type ReturnRequest = {
  id: string
  orderId: string
  orderDate: string
  reasonId: string
  reasonLabel: string
  notes: string
  status: ReturnRequestStatus
  submittedAt: string
  submittedByDisplayName: string
  reviewNote: string
  reviewedAt: string | null
}

const STORAGE_KEY = 'dejana-demo-return-requests'

function readRequests(): ReturnRequest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isReturnRequest)
  } catch {
    return []
  }
}

function isReturnRequest(x: unknown): x is ReturnRequest {
  if (!x || typeof x !== 'object') return false
  const o = x as Record<string, unknown>
  return (
    typeof o.id === 'string' &&
    typeof o.orderId === 'string' &&
    typeof o.status === 'string' &&
    ['pending', 'approved', 'rejected'].includes(o.status)
  )
}

export const returnRequests = ref<ReturnRequest[]>(readRequests())

watch(
  returnRequests,
  (list) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
    } catch {
      /* quota */
    }
  },
  { deep: true },
)

function newReturnId(): string {
  return `RET-${Date.now().toString(36).toUpperCase()}`
}

export function hasPendingReturnForOrder(orderId: string, submittedByDisplayName: string): boolean {
  return returnRequests.value.some(
    (r) => r.orderId === orderId && r.submittedByDisplayName === submittedByDisplayName && r.status === 'pending',
  )
}

export type SubmitReturnInput = {
  order: DemoAccountOrder
  reasonId: string
  notes: string
  submittedByDisplayName: string
}

export function submitReturnRequest(input: SubmitReturnInput): { ok: true; id: string } | { ok: false; error: string } {
  const { order, reasonId, notes, submittedByDisplayName } = input
  if (!submittedByDisplayName.trim()) {
    return { ok: false, error: 'Sign in to submit a return request.' }
  }
  if (hasPendingReturnForOrder(order.id, submittedByDisplayName)) {
    return { ok: false, error: 'You already have a pending return for this order.' }
  }
  const id = newReturnId()
  const row: ReturnRequest = {
    id,
    orderId: order.id,
    orderDate: order.date,
    reasonId,
    reasonLabel: reasonLabelById(reasonId),
    notes: notes.trim(),
    status: 'pending',
    submittedAt: new Date().toISOString(),
    submittedByDisplayName: submittedByDisplayName.trim(),
    reviewNote: '',
    reviewedAt: null,
  }
  returnRequests.value = [row, ...returnRequests.value]
  return { ok: true, id }
}
