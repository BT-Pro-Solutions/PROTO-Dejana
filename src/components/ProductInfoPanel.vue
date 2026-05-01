<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import StarRating from './StarRating.vue'
import AddToCartButton from './AddToCartButton.vue'
import { media } from '../assets/media'
import type { BladeOption, DemoProduct } from '../data/products'
import { favoritesKey } from '../layout/favorites'

const props = defineProps<{
  productId: string
  title: string
  sku: string
  inStock: boolean
  price: number
  compareAtPrice?: number
  reviewCount: number
  rating: number
  bladeOptions: BladeOption[]
  shipNote: string
  cartProduct: DemoProduct
}>()

const favorites = inject(favoritesKey, null)
const wishlisted = computed(() => (favorites ? favorites.isFavorite(props.productId) : false))

function toggleWishlist() {
  if (favorites) favorites.toggle(props.productId)
}

const qty = ref(1)

function initialBladeIndex(opts: BladeOption[]) {
  const i = opts.findIndex((o) => o.selected)
  return i >= 0 ? i : 0
}

const selectedBlade = ref(initialBladeIndex(props.bladeOptions))

function bump(delta: number) {
  qty.value = Math.max(1, Math.min(99, qty.value + delta))
}

const shipNoteHtml = computed(() => {
  return props.shipNote
    .replace('Free shipping', '<strong class="free">Free shipping</strong>')
    .replace(/(\d{5})/, '<span class="zip">$1</span>')
})

const kingsParkMapsUrl =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('490 Pulaski Road, Kings Park, NY 11754')
</script>

<template>
  <div class="panel">
    <div v-if="inStock" class="badge-stock">
      <img :src="media.icons.inStockCheck" width="14" height="10" alt="" />
      <span>IN STOCK</span>
    </div>

    <h1 class="title">{{ title }}</h1>

    <div class="meta">
      <span class="sku">SKU: {{ sku }}</span>
      <StarRating :rating="rating" :review-count="reviewCount" />
    </div>

    <div class="price-row">
      <span class="price">${{ price.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}</span>
      <span v-if="compareAtPrice" class="compare"
        >${{ compareAtPrice.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}</span
      >
    </div>

    <div class="actions">
      <div class="qty">
        <button type="button" class="qty__btn" aria-label="Decrease quantity" @click="bump(-1)">−</button>
        <span class="qty__val">{{ qty }}</span>
        <button type="button" class="qty__btn" aria-label="Increase quantity" @click="bump(1)">+</button>
      </div>
      <AddToCartButton block class="actions__atc" :product="cartProduct" />
    </div>

    <button
      type="button"
      class="btn-wish"
      :class="{ 'btn-wish--active': wishlisted }"
      :aria-pressed="wishlisted"
      @click="toggleWishlist"
    >
      <img :src="media.icons.wishlistHeart" width="20" height="18" alt="" />
      {{ wishlisted ? 'Saved to wishlist' : 'Add to Wishlist' }}
    </button>

    <div class="blades" role="radiogroup" aria-label="Blade size">
      <button
        v-for="(opt, i) in bladeOptions"
        :key="opt.label"
        type="button"
        class="blade"
        :class="[i === selectedBlade ? 'blade--selected' : 'blade--plain', 'blade--' + opt.tone]"
        role="radio"
        :aria-checked="i === selectedBlade"
        @click="selectedBlade = i"
      >
        <strong class="blade__label">{{ opt.label }}</strong>
        <span class="blade__avail">{{ opt.availability }}</span>
      </button>
    </div>

    <div class="ship-banner">
      <img :src="media.icons.truckDelivery" width="25" height="19" alt="" />
      <p class="ship-banner__text" v-html="shipNoteHtml" />
    </div>

    <div class="ship-banner">
      <img :src="media.icons.buildingStore" width="25" height="20" alt="" />
      <p class="ship-banner__text">
        <strong class="free">Free local pickup</strong> at
        <a
          class="ship-banner__link"
          :href="kingsParkMapsUrl"
          target="_blank"
          rel="noopener noreferrer"
          >Kings Park</a>
        location.
      </p>
    </div>
  </div>
</template>

<style scoped>
.panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 520px;
}

.badge-stock {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--color-success-bg);
  color: #fff;
  font-size: 12px;
  letter-spacing: 0.3px;
  padding: 4px 12px 4px 8px;
  border-radius: var(--radius-sm);
  width: fit-content;
}

.title {
  margin: 0;
  font-size: clamp(28px, 5vw, 36px);
  font-weight: 400;
  letter-spacing: -1.8px;
  line-height: 1.15;
  color: var(--color-dark-blue);
}

.meta {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

@media (min-width: 480px) {
  .meta {
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
  }
}

.sku {
  font-size: 14px;
  color: var(--color-text-muted);
  letter-spacing: 1.4px;
  text-transform: uppercase;
}

.price-row {
  position: relative;
  min-height: 52px;
}

.price {
  font-size: clamp(36px, 8vw, 48px);
  font-weight: 800;
  color: var(--color-dark-blue);
  letter-spacing: -2.4px;
  line-height: 1;
}

.compare {
  margin-left: 1rem;
  font-size: 18px;
  color: var(--color-text-muted);
  text-decoration: line-through;
  vertical-align: super;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: stretch;
}

.actions :deep(.actions__atc) {
  flex: 1;
  min-width: 200px;
}

.qty {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 128px;
  min-height: 56px;
  padding: 0 12px;
  background: var(--color-surface-muted);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.qty__btn {
  border: none;
  background: none;
  font-size: 20px;
  cursor: pointer;
  color: var(--color-dark-blue);
  padding: 8px;
}

.qty__val {
  font-size: 16px;
  color: var(--color-dark-blue);
}

.btn-wish {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: var(--radius-lg);
  background: transparent;
  color: var(--color-dark-blue);
  font-size: 16px;
  cursor: pointer;
  font-family: inherit;
  font-weight: 600;
}

.btn-wish--active {
  background: rgba(15, 83, 149, 0.08);
}

.blades {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px 21px;
}

@media (max-width: 400px) {
  .blades {
    grid-template-columns: 1fr;
  }
}

.blade {
  margin: 0;
  width: 100%;
  padding: 15px 20px;
  border-radius: 8px;
  background: var(--color-surface);
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease,
    transform 0.12s ease,
    background 0.15s ease;
}

.blade:hover {
  box-shadow: 0 4px 14px rgba(0, 30, 64, 0.1);
  transform: translateY(-1px);
}

.blade:focus-visible {
  outline: 2px solid var(--color-light-blue);
  outline-offset: 2px;
}

.blade--plain:hover {
  border-color: var(--color-light-blue);
  background: #fafcfe;
}

.blade--selected:hover {
  box-shadow: 0 4px 16px rgba(0, 42, 86, 0.18);
}

.blade__label {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-dark-blue);
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: 3px;
  transition: text-decoration-color 0.15s ease;
}

.blade:hover .blade__label {
  text-decoration-color: rgba(15, 83, 149, 0.45);
}

.blade--selected .blade__label {
  text-decoration: none;
}

.blade__avail {
  font-size: 14px;
  font-weight: 600;
}

.blade--selected {
  border: 4px solid var(--color-blade-selected-border);
}

.blade--plain {
  border: 2px solid var(--color-blade-muted-border);
}

.blade--success .blade__avail {
  color: var(--color-success);
}

.blade--warning .blade__avail {
  color: var(--color-warning-text);
}

.ship-banner {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border-radius: var(--radius-lg);
  background: linear-gradient(90deg, var(--color-stock-banner-from), var(--color-stock-banner-to)),
    linear-gradient(102deg, var(--color-success) 14%, #fff 14%);
}

.ship-banner__text {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.35;
}

:deep(.free) {
  color: var(--color-success);
}

:deep(.zip) {
  color: var(--color-link);
  text-decoration: underline;
}

.ship-banner__link {
  color: var(--color-link);
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.ship-banner__link:hover {
  color: var(--color-dark-blue);
}
</style>
