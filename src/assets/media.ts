import { publicUrl } from '../lib/publicUrl'

/** Public URLs for Figma exports (renamed where copied; pages/ uses export hashes). */
export const media = {
  headerLogo: publicUrl('assets/Logo.png'),
  supportAvatar: publicUrl('assets/header-support-avatar.png'),
  galleryBackdrop: publicUrl('assets/gallery-hero-backdrop.png'),
  productHero: publicUrl('assets/product-fisher-plow-hero.png'),
  productThumb2: publicUrl('assets/product-fisher-plow-thumb-2.png'),
  productThumb3: publicUrl('assets/product-fisher-plow-thumb-3.png'),
  productThumb4: publicUrl('assets/product-fisher-plow-thumb-4.png'),
  descriptionDiagram: publicUrl('assets/pdp-description-diagram.png'),
  /** Home + marketing frames (`get_design_context` on node `1:848`). */
  pages: {
    homeHeroBg: publicUrl('assets/pages/0c746b085ea09c476231d03c049bd8b371fa56f1.png'),
    homeHeroBlend: publicUrl('assets/pages/ca29c412538811345f155ce86a4e869a3da3a941.png'),
    categorySnowPlow: publicUrl('assets/pages/dec22453fbe1e3f30f0c728375ae1e5df06338a5.png'),
    categoryGearbox: publicUrl('assets/pages/1c842bc97926589a4575c68aa2def3ca5f0cfc8d.png'),
    categoryLighting: publicUrl('assets/pages/62970ad0ee876c87e9e99e45a36e43bec4dbe580.png'),
    categoryLightingRect: publicUrl('assets/pages/ecf24defddf90e99f30f2deea92106dd5ffc23a6.png'),
    customerServiceRep: publicUrl('assets/pages/7b4f374817e5979f7ae3937e427e076f5b48efb6.png'),
    homeProductThumb: publicUrl('assets/pages/7ce07d402335e8cb5a2bcf59f0c66577589de1b9.png'),
    heritagePhoto: publicUrl('assets/pages/86996050e3930943ba9e7c82d01ce77c997f4b54.png'),
  },
  icons: {
    dejanaWordmark: publicUrl('assets/icons/icon-dejana-wordmark.svg'),
    /** Heritage headline — same paths as wordmark, fills #001e40 for light backgrounds */
    dejanaWordmarkBlue: publicUrl('assets/icons/icon-dejana-wordmark-blue.svg'),
    facebook: publicUrl('assets/icons/icon-social-facebook.svg'),
    youtube: publicUrl('assets/icons/icon-social-youtube.svg'),
    shippingFast: publicUrl('assets/icons/icon-shipping-fast.svg'),
    search: publicUrl('assets/icons/icon-search.svg'),
    wishlistCard: publicUrl('assets/icons/icon-wishlist-card.svg'),
    carouselControl: publicUrl('assets/icons/icon-carousel-control.svg'),
    user: publicUrl('assets/icons/icon-header-user.svg'),
    cart: publicUrl('assets/icons/icon-cart.svg'),
    addToCart: publicUrl('assets/icons/icon-add-to-cart.svg'),
    /** Search modal “Buy again” row — solid blue cart + */
    addToCartModal: publicUrl('assets/icons/icon-add-to-cart-modal.svg'),
    wishlistHeart: publicUrl('assets/icons/icon-wishlist-heart.svg'),
    truckDelivery: publicUrl('assets/icons/icon-truck-delivery.svg'),
    /** PDP local pickup — matches truck icon visual weight */
    buildingStore: publicUrl('assets/icons/icon-building-store.svg'),
    inStockCheck: publicUrl('assets/icons/icon-in-stock-check.svg'),
    starFilled: publicUrl('assets/icons/icon-star-filled.svg'),
    starEmpty: publicUrl('assets/icons/icon-star-empty.svg'),
    chevronRight: publicUrl('assets/icons/icon-chevron-right.svg'),
    chevronDown: publicUrl('assets/icons/icon-chevron-down.svg'),
    breadcrumbSep: publicUrl('assets/icons/icon-breadcrumb-separator.svg'),
    bulletCheck: publicUrl('assets/icons/icon-bullet-check.svg'),
    starHalf: publicUrl('assets/icons/icon-star-half.svg'),
    navCaret: publicUrl('assets/icons/icon-nav-caret.svg'),
    onlineDot: publicUrl('assets/icons/icon-online-indicator.svg'),
    /** Customer service decorative / UI from `public/assets/pages` exports */
    csBlob: publicUrl('assets/pages/52c13a3a69ad3e8d3a9cc0b825ebb202d9cd96cd.svg'),
    csBlob2: publicUrl('assets/pages/6267bb8b94e259c48abb40ac1c7f7d4178a52fa4.svg'),
    messagePen: publicUrl('assets/pages/6887f4251d33f20c3457d701ab933313fad57b81.svg'),
    envelope: publicUrl('assets/icons/icon-envelope.svg'),
    solarPhoneBold: publicUrl('assets/pages/e607f64c738879de9762e69b6b68944aedd8d8e8.svg'),
    heroChevrons: publicUrl('assets/pages/ea9711c037df4a9ebf8734696f38f013b4407635.svg'),
    btnArrow: publicUrl('assets/pages/dae617b36b150bd104206556bbe784f93058a9e6.svg'),
  },
} as const
