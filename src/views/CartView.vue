<script setup lang="ts">
import { computed, inject } from 'vue'
import { RouterLink } from 'vue-router'
import ProductHorizontalStrip from '../components/ProductHorizontalStrip.vue'
import { cartLines as seedCartLines, cartSubtotal, homeBestSellers } from '../data/site'
import { miniCartKey } from '../layout/miniCart'
import { media } from '../assets/media'

const miniCart = inject(miniCartKey, null)

const lines = computed(() => miniCart?.lines.value ?? seedCartLines)

const totalQty = computed(() => lines.value.reduce((sum, l) => sum + l.qty, 0))
const subtotal = computed(() => cartSubtotal(lines.value))
const shipping = 0
const tax = computed(() => Math.round(subtotal.value * 0.07 * 100) / 100)
const total = computed(() => subtotal.value + shipping + tax.value)

function money(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

function bumpQty(lineId: string, delta: number) {
  const list = miniCart?.lines.value
  if (!list) return
  const line = list.find((l) => l.id === lineId)
  if (!line) return
  line.qty = Math.max(1, Math.min(99, line.qty + delta))
}

function stockLabel(status: (typeof seedCartLines)[0]['stockStatus']) {
  if (status === 'in-stock') return 'IN STOCK'
  if (status === 'low-stock') return 'ONLY 2 LEFT'
  return ''
}
</script>

<template>
  <div class="page">
    <div class="page__inner">
      <nav class="crumb" aria-label="Breadcrumb">
        <RouterLink to="/">HOME</RouterLink>
        <img :src="media.icons.breadcrumbSep" width="5" height="7" alt="" />
        <span class="crumb__here">SHOPPING CART</span>
      </nav>

      <header class="page-head">
        <h1 class="page-head__title">Shopping Cart</h1>
        <p class="page-head__meta">{{ totalQty }} {{ totalQty === 1 ? 'Item' : 'Items' }}</p>
      </header>

      <div v-if="lines.length" class="layout">
        <section class="lines" aria-label="Cart items">
          <article v-for="line in lines" :key="line.id" class="line">
            <div class="line__thumb">
              <img :src="line.image" :alt="line.title" class="line__img" />
            </div>
            <div class="line__body">
              <h2 class="line__title">{{ line.title }}</h2>
              <p v-if="line.description" class="line__desc">{{ line.description }}</p>
              <span
                v-if="line.stockStatus"
                class="line__badge"
                :class="{
                  'line__badge--in': line.stockStatus === 'in-stock',
                  'line__badge--low': line.stockStatus === 'low-stock',
                }"
              >
                {{ stockLabel(line.stockStatus) }}
              </span>
              <div class="line__row">
                <div class="line__prices">
                  <p class="line__ea">{{ money(line.price) }} ea</p>
                  <p class="line__line-total">{{ money(line.price * line.qty) }}</p>
                </div>
                <div class="line__qty" role="group" :aria-label="'Quantity for ' + line.title">
                  <button type="button" aria-label="Decrease quantity" @click="bumpQty(line.id, -1)">−</button>
                  <span>{{ line.qty }}</span>
                  <button type="button" aria-label="Increase quantity" @click="bumpQty(line.id, 1)">+</button>
                </div>
              </div>
            </div>
          </article>
        </section>

        <aside class="summary" aria-label="Order summary">
          <h2 class="summary__h">Order summary</h2>
          <div class="summary__rows">
            <div class="summary__row">
              <span class="summary__label">Subtotal</span>
              <span class="summary__val">{{ money(subtotal) }}</span>
            </div>
            <div class="summary__row">
              <span class="summary__label">Shipping</span>
              <span class="summary__val summary__val--free">FREE</span>
            </div>
            <div class="summary__row">
              <span class="summary__label">Estimated tax</span>
              <span class="summary__val">{{ money(tax) }}</span>
            </div>
          </div>
          <div class="summary__total-block">
            <span class="summary__total-label">Total</span>
            <span class="summary__total-num">{{ money(total) }}</span>
          </div>
          <RouterLink to="/checkout" class="summary__cta">
            Secure checkout
            <svg class="summary__cta-arrow" width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true">
              <path
                d="M1 6h13M11 2l5 4-5 4"
                stroke="currentColor"
                stroke-width="1.35"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </RouterLink>
          <div class="summary__trust">
            <div class="summary__trust-item">
              <svg class="summary__trust-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 3 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-3Z"
                  stroke="currentColor"
                  stroke-width="1.4"
                  stroke-linejoin="round"
                />
                <path
                  d="m9 12 2 2 4-5"
                  stroke="currentColor"
                  stroke-width="1.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span>Secure checkout</span>
            </div>
            <div class="summary__trust-item">
              <img :src="media.icons.truckDelivery" width="22" height="22" alt="" class="summary__trust-img" />
              <span>Free shipping available</span>
            </div>
          </div>
        </aside>
      </div>

      <div v-else class="empty">
        <p class="empty__text">Your cart is empty.</p>
        <RouterLink to="/shop" class="empty__cta">Continue shopping</RouterLink>
      </div>
    </div>

    <ProductHorizontalStrip
      v-if="lines.length"
      title="You May Also Like"
      subtitle="High quality products that customers like you love."
      :products="homeBestSellers"
    />
  </div>
</template>

<style scoped>
.page {
  background: var(--color-page-bg);
  padding-bottom: 0;
}

.page__inner {
  max-width: var(--layout-max-width);
  margin: 0 auto;
  padding: clamp(24px, 4vw, 48px) var(--space-page-x) clamp(40px, 6vw, 64px);
}

.crumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
  margin-bottom: 20px;
}

.crumb a {
  color: inherit;
  text-decoration: none;
}

.crumb a:hover {
  color: var(--color-dark-blue);
}

.crumb__here {
  color: var(--color-caption);
}

.page-head {
  margin-bottom: clamp(28px, 4vw, 40px);
}

.page-head__title {
  margin: 0;
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 900;
  letter-spacing: -0.5px;
  color: var(--color-dark-blue);
}

.page-head__meta {
  margin: 8px 0 0;
  font-size: 15px;
  color: var(--color-text-muted);
}

.layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(24px, 4vw, 40px);
  align-items: start;
}

@media (min-width: 960px) {
  .layout {
    grid-template-columns: 1fr min(380px, 34%);
    gap: 48px;
  }
}

.lines {
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 8px clamp(16px, 3vw, 28px) 8px;
}

.line {
  display: flex;
  gap: clamp(16px, 3vw, 24px);
  padding: clamp(20px, 3vw, 28px) 0;
  border-bottom: 1px solid var(--color-border);
}

.line:last-child {
  border-bottom: none;
}

.line__thumb {
  flex-shrink: 0;
  width: clamp(96px, 18vw, 120px);
  height: clamp(96px, 18vw, 120px);
  border-radius: var(--radius-md);
  background: var(--color-card-image-bg);
  overflow: hidden;
}

.line__img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.line__body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.line__title {
  margin: 0;
  font-size: clamp(16px, 2.2vw, 18px);
  font-weight: 800;
  line-height: 1.35;
  color: var(--color-dark-blue);
}

.line__desc {
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: var(--color-text-soft);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line__badge {
  align-self: flex-start;
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: #fff;
}

.line__badge--in {
  background: var(--color-success-bg);
}

.line__badge--low {
  background: var(--color-accent);
}

.line__row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-top: auto;
  padding-top: 8px;
}

.line__ea {
  margin: 0;
  font-size: 13px;
  color: var(--color-caption);
}

.line__line-total {
  margin: 4px 0 0;
  font-size: clamp(18px, 2.5vw, 22px);
  font-weight: 900;
  color: var(--color-dark-blue);
}

.line__qty {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--color-border-strong);
  border-radius: 999px;
  background: #fff;
  overflow: hidden;
}

.line__qty button {
  width: 40px;
  height: 40px;
  border: none;
  background: #fff;
  font-size: 20px;
  line-height: 1;
  color: var(--color-dark-blue);
  cursor: pointer;
}

.line__qty button:hover {
  background: var(--color-gray-section);
}

.line__qty span {
  min-width: 36px;
  text-align: center;
  font-size: 15px;
  font-weight: 700;
  color: var(--color-dark-blue);
}

.summary {
  position: sticky;
  top: 16px;
  padding: clamp(24px, 3vw, 32px);
  background: var(--color-card-surface);
  border: 1px solid rgba(0, 30, 64, 0.08);
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 30, 64, 0.06);
}

.summary__h {
  margin: 0 0 22px;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-dark-blue);
}

.summary__rows {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.summary__row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 8px 0;
  font-size: 14px;
}

.summary__label {
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-size: 12px;
  color: var(--color-caption);
}

.summary__val {
  font-weight: 700;
  color: var(--color-dark-blue);
}

.summary__val--free {
  color: var(--color-success);
  font-weight: 800;
}

.summary__total-block {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(0, 30, 64, 0.12);
}

.summary__total-label {
  font-size: 14px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-dark-blue);
}

.summary__total-num {
  font-size: clamp(22px, 3vw, 28px);
  font-weight: 900;
  letter-spacing: -0.5px;
  color: var(--color-dark-blue);
}

.summary__cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 24px;
  padding: 16px 24px;
  text-align: center;
  text-decoration: none;
  border-radius: var(--radius-lg);
  background: linear-gradient(167deg, rgb(6, 50, 100) 0%, rgb(20, 86, 152) 100%);
  color: #fff;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: filter 0.15s ease;
}

.summary__cta:hover {
  filter: brightness(1.06);
}

.summary__cta-arrow {
  color: var(--color-accent);
  flex-shrink: 0;
}

.summary__trust {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 22px;
  padding-top: 20px;
  border-top: 1px solid rgba(0, 30, 64, 0.08);
}

.summary__trust-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-muted);
}

.summary__trust-icon {
  flex-shrink: 0;
  color: var(--color-light-blue);
}

.summary__trust-img {
  flex-shrink: 0;
  opacity: 0.85;
  filter: brightness(0) saturate(100%) invert(36%) sepia(96%) saturate(456%) hue-rotate(88deg) brightness(96%)
    contrast(101%);
}

.empty {
  padding: 48px 24px;
  text-align: center;
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: 12px;
}

.empty__text {
  margin: 0 0 16px;
  font-size: 16px;
  color: var(--color-text-muted);
}

.empty__cta {
  display: inline-block;
  padding: 12px 24px;
  font-weight: 800;
  text-decoration: none;
  color: #fff;
  background: var(--color-dark-blue);
  border-radius: var(--radius-lg);
}
</style>
