/**
 * Configurable return reasons for the storefront prototype.
 * In production this would come from CMS, feature flags, or an API.
 */
export type ReturnReason = {
  id: string
  label: string
}

export const returnReasons: readonly ReturnReason[] = [
  { id: 'defective', label: 'Defective or damaged on arrival' },
  { id: 'wrong-item', label: 'Wrong item shipped' },
  { id: 'not-as-described', label: 'Not as described' },
  { id: 'ordered-wrong', label: 'Ordered wrong item by mistake' },
  { id: 'no-longer-needed', label: 'No longer needed' },
  { id: 'other', label: 'Other (see notes)' },
] as const

export function reasonLabelById(id: string): string {
  return returnReasons.find((r) => r.id === id)?.label ?? id
}
