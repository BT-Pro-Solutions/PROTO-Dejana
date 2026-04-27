/** Demo order lines for account / returns prototype UI. */
export type DemoAccountOrderLine = {
  sku: string
  title: string
  qty: number
  unitPrice: number
}

export type DemoAccountOrder = {
  id: string
  date: string
  status: 'Shipped' | 'Delivered' | 'Processing'
  lines: DemoAccountOrderLine[]
}

export const demoAccountOrders: DemoAccountOrder[] = [
  {
    id: 'DJ-8F2K91',
    date: 'Apr 2, 2026',
    status: 'Shipped',
    lines: [
      { sku: 'DJ-VRK-12', title: 'Van rack kit — 12 ft', qty: 1, unitPrice: 1299.0 },
      { sku: 'DJ-ACC-HW', title: 'Mounting hardware set', qty: 2, unitPrice: 89.0 },
      { sku: 'DJ-ACC-SEAL', title: 'Weather seal strip', qty: 4, unitPrice: 42.625 },
    ],
  },
  {
    id: 'DJ-7Q3M44',
    date: 'Mar 18, 2026',
    status: 'Delivered',
    lines: [{ sku: 'DJ-CBL-500', title: 'Cable puller — 500 lb', qty: 1, unitPrice: 329.0 }],
  },
  {
    id: 'DJ-6P1L02',
    date: 'Feb 4, 2026',
    status: 'Delivered',
    lines: [
      { sku: 'DJ-SNOW-BLD', title: 'Snow plow blade 8 ft', qty: 1, unitPrice: 4200.0 },
      { sku: 'DJ-SNOW-CTL', title: 'Hydraulic control kit', qty: 1, unitPrice: 925.75 },
    ],
  },
]

export function orderTotal(o: DemoAccountOrder): number {
  return o.lines.reduce((sum, l) => sum + l.unitPrice * l.qty, 0)
}

export function orderItemCount(o: DemoAccountOrder): number {
  return o.lines.reduce((sum, l) => sum + l.qty, 0)
}

/** Orders that are far enough in the lifecycle to request a return (prototype rule). */
export function orderEligibleForReturn(o: DemoAccountOrder): boolean {
  return o.status === 'Shipped' || o.status === 'Delivered'
}
