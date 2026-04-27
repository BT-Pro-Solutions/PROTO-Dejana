import { publicUrl } from '../lib/publicUrl'
import type { DemoProduct } from './products'
import { relatedProducts } from './products'

export const searchQueryDemo = 'Gear'

export const listingProducts: DemoProduct[] = [
  {
    id: 'l1',
    slug: 'fisher-hs-compact',
    sku: 'MP-SNOW-PLOW-7',
    title: 'Fisher HS Compact Snow Plow',
    price: 4299.99,
    image: publicUrl('assets/product-fisher-plow-hero.png'),
    reviewCount: 42,
    rating: 4.5,
  },
  {
    id: 'l2',
    sku: 'DJ-GBX-450',
    title: 'Industrial Worm Gear Drive 450',
    price: 889.0,
    image: publicUrl('assets/product-fisher-plow-thumb-2.png'),
    reviewCount: 12,
    rating: 4.0,
  },
  {
    id: 'l3',
    sku: 'LT-FLOOD-60',
    title: '60″ LED Flood Bar — Amber/Clear',
    price: 412.5,
    image: publicUrl('assets/product-fisher-plow-thumb-3.png'),
    reviewCount: 28,
    rating: 4.7,
  },
  {
    id: 'l4',
    sku: 'SP-HOPPER-1.5',
    title: '1.5 Yard Stainless Hopper Spreader',
    price: 3295.0,
    image: publicUrl('assets/product-fisher-plow-thumb-4.png'),
    reviewCount: 7,
    rating: 4.2,
  },
  {
    id: 'l5',
    sku: 'CB-REEL-500',
    title: 'CableBoss 500 Hydraulic Reel',
    price: 1849.0,
    image: publicUrl('assets/pdp-description-diagram.png'),
    reviewCount: 18,
    rating: 4.0,
  },
  {
    id: 'l6',
    sku: 'VH-LADDER-PRO',
    title: 'Van Guard Drop-Down Ladder Rack',
    price: 1295.0,
    image: publicUrl('assets/product-fisher-plow-thumb-2.png'),
    reviewCount: 9,
    rating: 4.2,
  },
]

export const filterGroups = [
  {
    title: 'CATEGORIES',
    options: ['Snowplow Gear (5)', 'Other Gear (7)'],
  },
  {
    title: 'GEAR TYPE',
    options: ['Worm Gear', 'Spur Gear', 'Bevel Gear'],
  },
  {
    title: 'MATERIAL',
    options: ['Hardened Steel', 'Composite Polymer'],
  },
]

export interface CategoryListingFilterOption {
  label: string
  checked?: boolean
}

export interface CategoryListingFilterGroup {
  title: string
  options: CategoryListingFilterOption[]
}

/** New Arrivals PLP sidebar (same shape as category listing filters). */
export const newArrivalsFilters: CategoryListingFilterGroup[] = [
  {
    title: 'ARRIVAL WINDOW',
    options: [
      { label: 'Last 30 days', checked: true },
      { label: 'Last 60 days' },
      { label: 'Last 90 days' },
    ],
  },
  {
    title: 'PRODUCT CATEGORIES',
    options: [
      { label: 'Snow & Ice (4)', checked: true },
      { label: 'Work Truck (2)' },
      { label: 'Lighting (1)' },
    ],
  },
  {
    title: 'BRAND',
    options: [{ label: 'Fisher' }, { label: 'Boss' }, { label: 'SnowEx' }],
  },
]

/** Favorites PLP sidebar (prototype checkboxes). */
export const favoritesFilters: CategoryListingFilterGroup[] = [
  {
    title: 'AVAILABILITY',
    options: [{ label: 'In stock', checked: true }, { label: 'Ships within 7 days' }],
  },
  {
    title: 'PRODUCT CATEGORIES',
    options: [
      { label: 'Snow & Ice', checked: true },
      { label: 'Work Truck' },
      { label: 'Lighting & Electrical' },
    ],
  },
  {
    title: 'BRAND',
    options: [{ label: 'Fisher' }, { label: 'Boss' }, { label: 'SnowEx' }],
  },
]

/** PLP sidebar filters (category grid prototype) */
export const categoryListingFilters: CategoryListingFilterGroup[] = [
  {
    title: 'PRODUCT CATEGORIES',
    options: [
      { label: 'Snowplows (5)', checked: true },
      { label: 'Ice Removal (7)' },
    ],
  },
  {
    title: 'BLADE WIDTH',
    options: [{ label: 'Under 6 Feet' }, { label: '6 - 8 Feet' }, { label: 'Over 8 Feet' }],
  },
  {
    title: 'BRAND',
    options: [{ label: 'Meyer Products' }, { label: 'SnowEx' }],
  },
]

export const mainCategories = [
  {
    slug: 'snow-ice',
    title: 'Snow & Ice Removal',
    description:
      'Commercial plows, spreaders, and de-icing solutions engineered for municipal and fleet duty cycles.',
    image: publicUrl('assets/product-fisher-plow-hero.png'),
  },
  {
    slug: 'work-truck',
    title: 'Work Truck Solutions',
    description: 'Upfits, storage, and accessories that keep crews productive and payloads secure.',
    image: publicUrl('assets/product-fisher-plow-thumb-3.png'),
  },
]

export const categoryHero = {
  title: 'Snow & Ice Removal',
  lead:
    'Equip your fleet for the harshest winters with professional-grade plows, spreaders, and lighting from brands you trust.',
}

/** Listing page subcategory strip — image + label (category grid prototype) */
export const subcategoryTiles = [
  {
    label: 'Light Duty Plows',
    slug: 'light-duty-plows',
    image: publicUrl('assets/product-fisher-plow-thumb-2.png'),
  },
  {
    label: 'Commercial Plows',
    slug: 'commercial-plows',
    image: publicUrl('assets/product-fisher-plow-hero.png'),
  },
  {
    label: 'Medium & Heavy Duty Plows',
    slug: 'medium-heavy-plows',
    image: publicUrl('assets/product-fisher-plow-thumb-3.png'),
  },
  {
    label: 'Spreaders',
    slug: 'spreaders',
    image: publicUrl('assets/product-fisher-plow-thumb-4.png'),
  },
]

export interface CompareRow {
  label: string
  values: [string, string, string]
}

/** Compare tool — matches Dejana Figma compare frame (dummy SKUs / specs). */
export const compareProducts: DemoProduct[] = [
  {
    id: 'cmp-1',
    slug: 'pro-series-hd',
    sku: 'DJ-PSHD-01',
    title: 'Pro Series HD',
    price: 6250,
    image: publicUrl('assets/product-fisher-plow-hero.png'),
    reviewCount: 36,
    rating: 4.6,
  },
  {
    id: 'cmp-2',
    slug: 'commercial-xt-300',
    sku: 'DJ-CXT-300',
    title: 'Commercial XT-300',
    price: 5875,
    image: publicUrl('assets/product-fisher-plow-thumb-2.png'),
    reviewCount: 22,
    rating: 4.4,
  },
  {
    id: 'cmp-3',
    slug: 'fleetmaster-pro',
    sku: 'DJ-FMP-99',
    title: 'FleetMaster Pro',
    price: 7100,
    image: publicUrl('assets/product-fisher-plow-thumb-4.png'),
    reviewCount: 41,
    rating: 4.8,
  },
]

const demoProductById = new Map<string, DemoProduct>()

function registerDemoProducts(products: DemoProduct[]) {
  for (const p of products) {
    if (!demoProductById.has(p.id)) demoProductById.set(p.id, p)
  }
}

registerDemoProducts(listingProducts)
registerDemoProducts(compareProducts)
registerDemoProducts(relatedProducts)

export function findDemoProductById(id: string): DemoProduct | undefined {
  return demoProductById.get(id)
}

export function orderedFavoriteProducts(ids: string[]): DemoProduct[] {
  const out: DemoProduct[] = []
  for (const id of ids) {
    const p = demoProductById.get(id)
    if (p) out.push(p)
  }
  return out
}

export const compareRows: CompareRow[] = [
  { label: 'Blade width', values: ["8'6″", "8'0″", "9'0″"] },
  { label: 'Blade height', values: ['32″', '30″', '34″'] },
  {
    label: 'Material',
    values: ['Reinforced powder-coated steel', 'High-strength steel moldboard', 'Poly + steel hybrid edge'],
  },
  {
    label: 'Vehicle compatibility',
    values: ['¾ & 1 ton pickups', 'Class 4–5 chassis', '1 ton+ DRW recommended'],
  },
  { label: 'Weight', values: ['485 lb', '442 lb', '518 lb'] },
  { label: 'Angle cylinder', values: ['2″ × 6″', '2″ × 5″', '2¼″ × 6″'] },
  { label: 'Lift cylinder', values: ['1½″ × 8″', '1½″ × 8″', '1¾″ × 9″'] },
]

export interface CartLine {
  id: string
  title: string
  sku: string
  price: number
  qty: number
  image: string
  /** Short listing blurb for mini cart */
  description?: string
  /** Stock badge in mini cart */
  stockStatus?: 'in-stock' | 'low-stock'
}

export const cartLines: CartLine[] = [
  {
    id: 'line-1',
    title: 'Fisher HS Compact Snow Plow',
    sku: 'MP-SNOW-PLOW-7',
    price: 4299.99,
    qty: 1,
    image: publicUrl('assets/product-fisher-plow-hero.png'),
    description: 'Professional-grade straight blade with trip-edge design for municipal and contractor fleets.',
    stockStatus: 'in-stock',
  },
  {
    id: 'line-2',
    title: '1.5 Yard Stainless Hopper Spreader',
    sku: 'SP-HOPPER-1.5',
    price: 3295.0,
    qty: 1,
    image: publicUrl('assets/product-fisher-plow-thumb-4.png'),
    description: 'Stainless hopper with dual variable-speed augers and in-cab controls for precise salt delivery.',
    stockStatus: 'low-stock',
  },
  {
    id: 'line-3',
    title: 'HD Series Galvanized 3-Shelf Unit',
    sku: 'DJ-SHELF-HD3',
    price: 240.0,
    qty: 2,
    image: publicUrl('assets/pdp-description-diagram.png'),
    description: 'Heavy-duty galvanized steel shelving with adjustable tiers for van and trailer upfits.',
    stockStatus: 'in-stock',
  },
]

export function cartSubtotal(lines: CartLine[]) {
  return lines.reduce((s, l) => s + l.price * l.qty, 0)
}

export const checkoutSteps = [
  { id: 'ship', title: 'Shipping address' },
  { id: 'delivery', title: 'Delivery method' },
  { id: 'pay', title: 'Payment' },
]

/** Home “Best Sellers” row — matches Figma card structure. */
export const homeBestSellers = listingProducts.slice(0, 5)
