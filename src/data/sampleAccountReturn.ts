/** Illustrative completed return for the account Returns table (prototype). */
export type AccountReturnTableRow = {
  key: string
  requestId: string
  orderId: string
  itemSummary: string
  reasonLabel: string
  submittedAt: string
  status: 'pending' | 'approved' | 'rejected'
  reviewNote: string
  /** Shown as a subtle “Example” row in the UI. */
  isSample?: boolean
}

export const accountSampleReturnRow: AccountReturnTableRow = {
  key: 'demo-sample-return',
  requestId: 'RET-7Q3M44-A',
  orderId: 'DJ-7Q3M44',
  itemSummary: 'Cable puller — 500 lb (qty 1)',
  reasonLabel: 'Not as described',
  submittedAt: '2026-01-14T15:30:00.000Z',
  status: 'approved',
  reviewNote: 'Refund issued to your original payment method.',
  isSample: true,
}
