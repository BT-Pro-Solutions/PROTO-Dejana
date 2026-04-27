import { publicUrl } from '../lib/publicUrl'

/** Main Category Page (`95:580`) — copy and asset paths from Figma. */
export const shopCategoryMedia = {
  vanInterior: publicUrl('assets/shop-category/d98f26f50a2f314bcc883e2456ecefdedb1b5342.png'),
  cablePulling: publicUrl('assets/shop-category/2259ea51191d40e377dd2308e875fef50939e1a7.png'),
  snowPlow: publicUrl('assets/shop-category/dec22453fbe1e3f30f0c728375ae1e5df06338a5.png'),
  gearboxes: publicUrl('assets/shop-category/1c842bc97926589a4575c68aa2def3ca5f0cfc8d.png'),
  lighting: publicUrl('assets/shop-category/ecf24defddf90e99f30f2deea92106dd5ffc23a6.png'),
} as const

export const shopCategoryFeatured = {
  to: '/category/van-interiors',
  eyebrow: 'MOST POPULAR',
  title: ['Van Interiors &', 'Shelving'],
  lines: [
    'Maximize your mobile workspace',
    'with ergonomic shelving,',
    'bulkheads, and custom flooring',
    'systems.',
  ],
}

export const shopCategoryTopRight = {
  to: '/category/snow-ice',
  title: 'Snow & Ice Removal',
  lines: ['Commercial-grade plows, salt spreaders, and', 'de-icing accessories for fleet vehicles.'],
  image: shopCategoryMedia.snowPlow,
  imageBg: 'var(--color-gray-section)' as const,
}

/** Nav flyout under “Shop By Category” — same routes as shop page tiles. */
export const headerShopCategoryLinks = [
  { label: 'Van Interiors & Shelving', to: '/category/van-interiors' },
  { label: 'Snow & Ice Removal', to: '/category/snow-ice' },
  { label: 'Cable Pulling Equipment', to: '/category/cable-pulling' },
  { label: 'Gearboxes & Motors', to: '/category/gearboxes' },
  { label: 'Lighting', to: '/category/lighting' },
  { label: 'View all categories', to: '/shop' },
] as const

export const shopCategoryRow2 = [
  {
    to: '/category/cable-pulling',
    title: 'Cable Pulling Equipment',
    lines: ['High-tension pullers, conduit tools, and safety', 'gear for professional electrical contractors.'],
    image: shopCategoryMedia.cablePulling,
    imageBg: 'var(--color-card-image-bg)' as const,
  },
  {
    to: '/category/gearboxes',
    title: 'Gearboxes & Motors',
    lines: ['Durable gearboxes and high-performance motors for industrial applications.'],
    image: shopCategoryMedia.gearboxes,
    imageBg: 'var(--color-gray-section)' as const,
    imageBlend: true as const,
  },
  {
    to: '/category/lighting',
    title: 'Lighting',
    lines: ['See and be seen with state of the art lighting equipment.'],
    image: shopCategoryMedia.lighting,
    imageBg: 'var(--color-gray-section)' as const,
  },
]
