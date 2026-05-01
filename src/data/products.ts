import { publicUrl } from '../lib/publicUrl'

export interface DemoProduct {
  id: string
  /** URL segment for `/product/:slug` */
  slug?: string
  sku: string
  title: string
  price: number
  compareAtPrice?: number
  image: string
  reviewCount: number
  rating: number
}

export interface BladeOption {
  label: string
  availability: string
  tone: 'success' | 'warning' | 'neutral'
  selected?: boolean
}

export interface PdpDocument {
  title: string
  sizeLabel: string
}

export interface PdpReviewEntry {
  rating: number
  date: string
  title: string
  body: string
  author: string
  helpfulUp: number
  helpfulDown: number
}

export interface PdpReviewsSummary {
  average: number
  /** Percentages for 5★ through 1★ (should sum to ~100 for demo). */
  distribution: [number, number, number, number, number]
}

export const primaryProduct = {
  id: 'fisher-hs-compact',
  title: 'Fisher HS Compact Snow Plow',
  sku: 'DJ-VNS-424614-G',
  inStock: true,
  price: 4299.99,
  compareAtPrice: 4590.0,
  reviewCount: 42,
  rating: 4.5,
  breadcrumbs: ['Shop', 'Van Interiors', 'Shelving Units'],
  shipZip: '11754',
  shipNote: 'Free shipping available to 11754',
  gallery: [
    {
      id: 'main',
      src: publicUrl('assets/product-fisher-plow-hero.png'),
      alt: 'Fisher HS compact plow installed on a pickup',
    },
    { id: 't1', src: publicUrl('assets/product-fisher-plow-hero.png'), alt: 'Alternate angle 1' },
    { id: 't2', src: publicUrl('assets/product-fisher-plow-thumb-2.png'), alt: 'Alternate angle 2' },
    { id: 't3', src: publicUrl('assets/product-fisher-plow-thumb-3.png'), alt: 'Alternate angle 3' },
    { id: 't4', src: publicUrl('assets/product-fisher-plow-thumb-4.png'), alt: 'Alternate angle 4' },
  ],
  bladeOptions: [
    { label: "6' 8″ Blade", availability: '25 Available To Buy', tone: 'success', selected: true },
    { label: "7' 2″ Blade", availability: 'Only 2 Left', tone: 'warning' },
  ] satisfies BladeOption[],
  descriptionLead:
    'Designed for mid-size pickup trucks and SUVs, the easy to attach, easy to use FISHER HS compact snowplow will have you setup and ready for whatever winter throws your way.',
  descriptionBullets: [
    '16-gauge powder coated steel moldboard (23.5″ Tall)',
    'High-Carbon Steel Cutting Edge',
    '(6) Six verticle ribs',
    '1″ pivot bushing',
    'Fully enclosed hydraulic system',
    'Full Blade Trip with (2) two trip springs',
  ],
  tabHeading: 'Built for Maximum Durability',
  pdpDocuments: [
    { title: "Owner's Manual — Fisher HS Series", sizeLabel: '3.2 MB' },
    { title: 'Quick Mount Installation Guide', sizeLabel: '1.1 MB' },
    { title: 'Hydraulic service & fluid chart', sizeLabel: '890 KB' },
    { title: 'Warranty & registration (US)', sizeLabel: '12 MB' },
  ] satisfies PdpDocument[],
  pdpReviewsSummary: {
    average: 4.8,
    distribution: [85, 10, 5, 0, 0],
  } satisfies PdpReviewsSummary,
  pdpReviews: [
    {
      rating: 5,
      date: 'OCT 14, 2024',
      title: 'Incredible build quality',
      body:
        'The moldboard is significantly sturdier than what we ran on our older half-ton fleet trucks. The powder coat is smooth, trip springs feel positive, and hook-up to our new F-250 was straightforward with the supplied brackets. Highly recommend for contractor crews.',
      author: 'James R.',
      helpfulUp: 12,
      helpfulDown: 0,
    },
    {
      rating: 4,
      date: 'SEP 28, 2024',
      title: 'Solid, but instructions could be clearer',
      body:
        'The plow itself is five-star quality, but the quick-mount guide skipped a torque callout for the sector bolts. Once our shop figured it out, the cutting edge tracked true with no chatter. Handles heavy wet snow without bowing.',
      author: 'Mark T.',
      helpfulUp: 4,
      helpfulDown: 1,
    },
  ] satisfies PdpReviewEntry[],
}

export const relatedProducts: DemoProduct[] = [
  {
    id: 'rel-1',
    slug: 'xtradeep-shelving',
    sku: 'DJ-XTRA-DEEP',
    title: 'XtraDeep Pro Series Van Shelving',
    price: 612.0,
    image: publicUrl('assets/product-fisher-plow-thumb-2.png'),
    reviewCount: 42,
    rating: 4.5,
  },
  {
    id: 'rel-2',
    slug: 'fisher-hs-compact',
    sku: 'MP-SNOW-PLOW-7',
    title: 'Fisher HS Compact Snow Plow',
    price: 4299.99,
    compareAtPrice: 4590,
    image: publicUrl('assets/product-fisher-plow-hero.png'),
    reviewCount: 42,
    rating: 4.5,
  },
  {
    id: 'rel-3',
    sku: 'CB-REEL-500',
    title: 'CableBoss 500 Hydraulic Reel',
    price: 1849.0,
    image: publicUrl('assets/product-fisher-plow-thumb-3.png'),
    reviewCount: 18,
    rating: 4.0,
  },
  {
    id: 'rel-4',
    sku: 'LT-BAR-48',
    title: '48″ LED Flood / Spot Combo Bar',
    price: 289.99,
    image: publicUrl('assets/product-fisher-plow-thumb-4.png'),
    reviewCount: 63,
    rating: 4.8,
  },
  {
    id: 'rel-5',
    sku: 'VH-LADDER-PRO',
    title: 'Van Guard Drop-Down Ladder Rack',
    price: 1295.0,
    image: publicUrl('assets/pdp-description-diagram.png'),
    reviewCount: 9,
    rating: 4.2,
  },
]
