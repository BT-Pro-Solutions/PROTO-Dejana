<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import SiteHeader from '../components/SiteHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
import SearchModal from '../components/SearchModal.vue'
import MiniCartDrawer from '../components/MiniCartDrawer.vue'
import ToastStack from '../components/ToastStack.vue'
import type { DemoProduct } from '../data/products'
import { cartLines as seedCartLines } from '../data/site'
import type { CartLine } from '../data/site'
import { authKey } from './auth'
import * as demoAuth from '../session/demoAuth'
import { favoritesKey } from './favorites'
import { searchModalKey } from './searchModal'
import { miniCartKey } from './miniCart'
import { toastKey, type ToastItem } from './toast'

const FAVORITES_STORAGE_KEY = 'dejana-demo-favorite-ids'
function readFavoriteIds(): string[] {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}

const route = useRoute()

provide(authKey, {
  user: demoAuth.authUser,
  isLoggedIn: demoAuth.isLoggedIn,
  initials: demoAuth.authInitials,
  login: demoAuth.login,
  logout: demoAuth.logout,
})

const toastItems = ref<ToastItem[]>([])

function pushToast(opts: { message: string; action?: { label: string; to: string } }) {
  const id = `t-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
  toastItems.value = [...toastItems.value, { id, message: opts.message, action: opts.action }]
  window.setTimeout(() => dismissToast(id), 8000)
}

function dismissToast(id: string) {
  toastItems.value = toastItems.value.filter((t) => t.id !== id)
}

provide(toastKey, {
  items: toastItems,
  push: pushToast,
  dismiss: dismissToast,
})
const searchOpen = ref(false)

const cartLinesState = ref<CartLine[]>(seedCartLines.map((l) => ({ ...l })))
const miniCartOpen = ref(false)

const favoriteIds = ref<string[]>(readFavoriteIds())

watch(
  favoriteIds,
  (ids) => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(ids))
    } catch {
      /* ignore quota */
    }
  },
  { deep: true },
)

function toggleFavorite(productId: string) {
  const i = favoriteIds.value.indexOf(productId)
  if (i === -1) {
    if (!demoAuth.isLoggedIn.value) {
      pushToast({
        message: 'Sign in to save items to your favorites.',
        action: { label: 'Log in', to: '/login' },
      })
      return
    }
    favoriteIds.value = [...favoriteIds.value, productId]
  } else {
    favoriteIds.value = favoriteIds.value.filter((id) => id !== productId)
  }
}

function isFavorite(productId: string) {
  return favoriteIds.value.includes(productId)
}

provide(favoritesKey, {
  ids: favoriteIds,
  toggle: toggleFavorite,
  isFavorite,
})

function addFromProduct(product: DemoProduct) {
  const sku = product.sku
  const existing = cartLinesState.value.find((l) => l.sku === sku)
  if (existing) {
    existing.qty = Math.min(99, existing.qty + 1)
  } else {
    cartLinesState.value.push({
      id: `line-${product.id}`,
      title: product.title,
      sku,
      price: product.price,
      qty: 1,
      image: product.image,
      stockStatus: 'in-stock',
    })
  }
  miniCartOpen.value = true
}

provide(searchModalKey, {
  open: () => {
    searchOpen.value = true
  },
  close: () => {
    searchOpen.value = false
  },
})

provide(miniCartKey, {
  open: () => {
    miniCartOpen.value = true
  },
  close: () => {
    miniCartOpen.value = false
  },
  isOpen: miniCartOpen,
  lines: cartLinesState,
  addFromProduct,
})

const activeNav = computed(() => {
  const p = route.path
  if (p === '/' || p === '') return 'home'
  if (p.startsWith('/search')) return 'search'
  if (p.startsWith('/new-arrivals')) return 'new-arrivals'
  if (p.startsWith('/favorites')) return 'favorites'
  if (p.startsWith('/shop')) return 'shop'
  if (p.startsWith('/category')) return 'category'
  if (p.startsWith('/product')) return 'product'
  if (p.startsWith('/compare')) return 'compare'
  if (p.startsWith('/cart')) return 'cart'
  if (p.startsWith('/checkout')) return 'checkout'
  if (p.startsWith('/account')) return 'account'
  return ''
})

const contactLabel = computed(() =>
  activeNav.value === 'home' ||
  activeNav.value === 'shop' ||
  activeNav.value === 'category' ||
  activeNav.value === 'new-arrivals' ||
  activeNav.value === 'favorites'
    ? 'Need Assistance?'
    : 'We’re Here To Help',
)

const headerCartCount = computed(() => cartLinesState.value.reduce((sum, line) => sum + line.qty, 0))
const headerFavoritesCount = computed(() => favoriteIds.value.length)
</script>

<template>
  <div class="layout">
    <SiteHeader
      :active-nav="activeNav"
      :contact-label="contactLabel"
      :cart-count="headerCartCount"
      :favorites-count="headerFavoritesCount"
    />
    <main class="layout__main">
      <RouterView />
    </main>
    <SiteFooter />
    <SearchModal :open="searchOpen" @close="searchOpen = false" />
    <MiniCartDrawer />
    <ToastStack />
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--color-page-bg);
}

.layout__main {
  flex: 1;
  width: 100%;
}
</style>
