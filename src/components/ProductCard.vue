<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { RouterLink } from 'vue-router'
import StarRating from './StarRating.vue'
import AddToCartButton from './AddToCartButton.vue'
import type { DemoProduct } from '../data/products'
import { favoritesKey } from '../layout/favorites'
import { miniCartKey } from '../layout/miniCart'

const props = withDefaults(
  defineProps<{
    product: DemoProduct
    showAddToCart?: boolean
    showCompare?: boolean
    /** Category PLP: square image, orange stars, no row CTA (compare lives in sidebar) */
    categoryGrid?: boolean
    /** Gold “New” pill on the image (e.g. New Arrivals grid). */
    showNewBadge?: boolean
    /** White card shell for grids on dark backgrounds. */
    darkGrid?: boolean
    /** Show heart next to add-to-cart (e.g. favorites page). */
    alwaysShowWishlist?: boolean
  }>(),
  {
    showAddToCart: false,
    showCompare: false,
    categoryGrid: false,
    showNewBadge: false,
    darkGrid: false,
    alwaysShowWishlist: false,
  },
)

const miniCart = inject(miniCartKey, null)
const favorites = inject(favoritesKey, null)

const productSlug = computed(() => props.product.slug ?? props.product.id)

const isListingGrid = computed(
  () => props.showAddToCart || props.showCompare || props.categoryGrid,
)

const localWishlisted = ref(false)
const wishlisted = computed(() =>
  favorites ? favorites.isFavorite(props.product.id) : localWishlisted.value,
)

const showWishlistButton = computed(() => !props.showAddToCart || props.alwaysShowWishlist)

const inCompare = ref(false)

function toggleWish(e: MouseEvent) {
  e.preventDefault()
  e.stopPropagation()
  if (favorites) {
    favorites.toggle(props.product.id)
  } else {
    localWishlisted.value = !localWishlisted.value
  }
}

function onAddToCart(e: MouseEvent) {
  e.preventDefault()
  e.stopPropagation()
  miniCart?.addFromProduct(props.product)
}

function toggleCompare(e: MouseEvent) {
  e.preventDefault()
  e.stopPropagation()
  inCompare.value = !inCompare.value
}
</script>

<template>
  <article
    class="card"
    :class="{
      'card--listing': isListingGrid,
      'card--category': categoryGrid,
      'card--dark-grid': darkGrid,
    }"
  >
    <div class="card__media">
      <span v-if="showNewBadge" class="card__new">New</span>
      <RouterLink :to="{ name: 'product', params: { slug: productSlug } }" class="card__media-link">
        <img :src="product.image" :alt="product.title" />
      </RouterLink>
      <button
        v-if="showWishlistButton"
        type="button"
        class="card__wish"
        :class="{ 'card__wish--active': wishlisted }"
        :aria-pressed="wishlisted"
        :aria-label="wishlisted ? 'Remove from wishlist' : 'Add to wishlist'"
        @click="toggleWish"
      >
        <svg class="card__wish-svg" viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
          <path
            class="card__wish-path"
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          />
        </svg>
      </button>
    </div>
    <RouterLink :to="{ name: 'product', params: { slug: productSlug } }" class="card__body-link">
      <div class="card__body">
        <StarRating
          :rating="product.rating"
          :review-count="product.reviewCount"
          :variant="categoryGrid ? 'ember' : 'default'"
        />
        <p class="card__sku">SKU: {{ product.sku }}</p>
        <h3 class="card__title">{{ product.title }}</h3>
        <p class="card__price">
          ${{ product.price.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}
        </p>
      </div>
    </RouterLink>
    <AddToCartButton v-if="showAddToCart" block class="card__atc" @click="onAddToCart" />
    <button
      v-else-if="showCompare"
      type="button"
      class="card__compare"
      :class="{ 'card__compare--active': inCompare }"
      :aria-pressed="inCompare"
      @click="toggleCompare"
    >
      <span class="card__compare-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M8 7h12M8 12h12M8 17h12" stroke-linecap="round" />
          <path d="M4 7h.01M4 12h.01M4 17h.01" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
      {{ inCompare ? 'Added to compare' : 'Compare' }}
    </button>
  </article>
</template>

<style scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 210px;
  min-width: 180px;
  flex: 0 0 auto;
}

.card--listing {
  width: 100%;
  max-width: 320px;
  min-width: 0;
}

.card--category {
  flex: 1 1 auto;
  width: 100%;
  max-width: none;
  min-width: 0;
  min-height: 0;
  height: 100%;
}

.card--dark-grid {
  padding: 12px 12px 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.28);
}

.card__new {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 3;
  padding: 5px 11px;
  border-radius: var(--radius-sm);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-dark-blue);
  background: var(--cta-yellow);
  line-height: 1;
  pointer-events: none;
}

.card__media {
  position: relative;
  aspect-ratio: 210 / 232;
  background: #fff;
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.card--listing .card__media {
  aspect-ratio: 282 / 340;
  max-height: 360px;
}

.card--category .card__media {
  flex-shrink: 0;
  aspect-ratio: 1 / 1;
  max-height: none;
  border-radius: 4px;
  border: none;
  box-shadow: none;
}

.card__media-link {
  display: block;
  width: 100%;
  height: 100%;
}

.card__media-link img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.card--listing .card__media-link img {
  object-fit: cover;
}

.card--category .card__media-link img {
  object-fit: contain;
  padding: 8%;
}

.card__wish {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 48px;
  min-height: 48px;
  padding: 10px;
  border: none;
  background: rgba(255, 255, 255, 0.92);
  border-radius: 0 0 0 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  transition:
    background 0.15s ease,
    color 0.15s ease;
}

.card--category .card__wish {
  background: transparent;
  border-radius: 0;
  color: #b0b4bc;
}

.card__wish:hover {
  background: #fff;
  color: #4b5563;
}

.card--category .card__wish:hover {
  background: rgba(255, 255, 255, 0.65);
  color: #6b7280;
}

.card__wish--active {
  color: #dc2626!important;
  background: rgba(255, 255, 255, 0.98);
}

.card__wish-path {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.65;
  stroke-linejoin: round;
  transition:
    fill 0.15s ease,
    stroke 0.15s ease;
}

.card__wish--active .card__wish-path {
  fill: currentColor;
  stroke: #b91c1c;
}

.card__body-link {
  text-decoration: none;
  color: inherit;
}

.card--category .card__body-link {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.card__body {
  padding-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.card--category .card__body {
  flex: 1 1 auto;
  min-height: 0;
}

.card__sku {
  margin: 0;
  font-size: 10px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--color-caption);
}

.card__title {
  margin: 0;
  font-size: 20px;
  font-weight: 400;
  line-height: 28px;
  color: var(--color-dark-blue);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card--category .card__title {
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #002d62;
}

.card__price {
  margin: 8px 0 0;
  font-size: 20px;
  font-weight: 900;
  color: var(--color-dark-blue);
}

.card--category .card__price {
  margin-top: auto;
  padding-top: 8px;
  color: #002d62;
  font-size: clamp(20px, 2.1vw, 24px);
  font-weight: 800;
}

.card__atc {
  margin-top: 8px;
}

.card__compare {
  margin-top: 8px;
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 16px;
  border-radius: var(--radius-lg);
  border: 2px solid var(--color-dark-blue);
  background: #fff;
  color: var(--color-dark-blue);
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition:
    background 0.15s ease,
    color 0.15s ease;
}

.card__compare:hover {
  background: rgba(0, 30, 64, 0.04);
}

.card__compare--active {
  background: var(--color-dark-blue);
  color: #fff;
}

.card__compare-icon {
  display: flex;
  flex-shrink: 0;
}
</style>
