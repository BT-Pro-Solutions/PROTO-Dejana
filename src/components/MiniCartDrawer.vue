<script setup lang="ts">
import { computed, inject, nextTick, onUnmounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { miniCartKey } from '../layout/miniCart'
import { cartSubtotal } from '../data/site'
import { media } from '../assets/media'

const api = inject(miniCartKey)!

const open = computed(() => api.isOpen.value)
const lines = computed(() => api.lines.value)

const closeBtnRef = ref<HTMLButtonElement | null>(null)

const subtotal = computed(() => cartSubtotal(lines.value))
const grandTotal = computed(() => subtotal.value)

function money(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

function close() {
  api.close()
}

function bumpQty(lineId: string, delta: number) {
  const line = lines.value.find((l) => l.id === lineId)
  if (!line) return
  const next = Math.max(1, Math.min(99, line.qty + delta))
  line.qty = next
}

let prevHtmlOverflow = ''

function onDocKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

watch(
  () => api.isOpen.value,
  async (open) => {
    if (open) {
      prevHtmlOverflow = document.documentElement.style.overflow
      document.documentElement.style.overflow = 'hidden'
      document.addEventListener('keydown', onDocKeydown)
      await nextTick()
      closeBtnRef.value?.focus()
    } else {
      document.removeEventListener('keydown', onDocKeydown)
      document.documentElement.style.overflow = prevHtmlOverflow
    }
  },
)

onUnmounted(() => {
  document.removeEventListener('keydown', onDocKeydown)
  document.documentElement.style.overflow = prevHtmlOverflow
})
</script>

<template>
  <Teleport to="body">
    <Transition name="mcart">
      <div
        v-if="open"
        class="mcart"
        role="presentation"
      >
        <div class="mcart__backdrop" aria-hidden="true" @click="close" />
        <aside
          class="mcart__panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mcart-title"
          tabindex="-1"
        >
          <header class="mcart__head">
            <h2 id="mcart-title" class="mcart__title">
              <RouterLink to="/cart" class="mcart__title-link" @click="close">Shopping Cart</RouterLink>
            </h2>
            <button ref="closeBtnRef" type="button" class="mcart__x" aria-label="Close cart" @click="close">×</button>
          </header>

          <div class="mcart__ship" role="status">
            <img class="mcart__ship-icon" :src="media.icons.truckDelivery" width="22" height="16" alt="" />
            <p class="mcart__ship-text">
              <strong class="mcart__ship-free">FREE</strong> shipping available to
              <a href="#" class="mcart__ship-zip">11754</a>
            </p>
          </div>

          <div class="mcart__scroll">
            <ul class="mcart__list">
              <li v-for="line in lines" :key="line.id" class="mcart__item">
                <div class="mcart__thumb">
                  <img :src="line.image" :alt="line.title" />
                </div>
                <div class="mcart__body">
                  <h3 class="mcart__item-title">{{ line.title }}</h3>
                  <p v-if="line.description" class="mcart__desc">{{ line.description }}</p>
                  <span
                    v-if="line.stockStatus"
                    class="mcart__badge"
                    :class="{
                      'mcart__badge--in': line.stockStatus === 'in-stock',
                      'mcart__badge--low': line.stockStatus === 'low-stock',
                    }"
                  >
                    {{ line.stockStatus === 'in-stock' ? 'IN STOCK' : 'ONLY 2 LEFT' }}
                  </span>
                  <div class="mcart__price-row">
                    <div>
                      <p class="mcart__ea">{{ money(line.price) }} ea</p>
                      <p class="mcart__line-total">{{ money(line.price * line.qty) }}</p>
                    </div>
                    <div class="mcart__qty" role="group" :aria-label="'Quantity for ' + line.title">
                      <button type="button" aria-label="Decrease quantity" @click="bumpQty(line.id, -1)">−</button>
                      <span>{{ line.qty }}</span>
                      <button type="button" aria-label="Increase quantity" @click="bumpQty(line.id, 1)">+</button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <footer class="mcart__foot">
            <div class="mcart__totals">
              <div class="mcart__row">
                <span class="mcart__label">SUBTOTAL</span>
                <span class="mcart__val">{{ money(subtotal) }}</span>
              </div>
              <div class="mcart__row mcart__row--grand">
                <span class="mcart__label">GRAND TOTAL</span>
                <div class="mcart__grand-wrap">
                  <span class="mcart__val mcart__val--grand">{{ money(grandTotal) }}</span>
                  <span class="mcart__fine">Calculated at checkout</span>
                </div>
              </div>
            </div>
            <RouterLink to="/checkout" class="mcart__cta mcart__cta--primary" @click="close">
              Proceed to Checkout
              <svg class="mcart__cta-arrow" width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true">
                <path
                  d="M1 6h13M11 2l5 4-5 4"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </RouterLink>
            <RouterLink to="/cart" class="mcart__cta mcart__cta--ghost" @click="close">View Full Cart</RouterLink>
          </footer>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.mcart {
  position: fixed;
  inset: 0;
  z-index: 400;
  display: flex;
  justify-content: flex-end;
  align-items: stretch;
  pointer-events: none;
}

.mcart__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 20, 40, 0.45);
  pointer-events: auto;
}

.mcart__panel {
  position: relative;
  pointer-events: auto;
  width: min(420px, 100%);
  max-width: 100vw;
  height: 100dvh;
  max-height: 100dvh;
  background: #fff;
  box-shadow: -8px 0 32px rgba(0, 30, 64, 0.12);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.mcart__head {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 30px 20px;
  background: var(--color-mini-cart-surface);
  border-bottom: 1px solid rgba(0, 30, 64, 0.06);
}

.mcart__title {
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.4px;
  color: var(--color-dark-blue);
}

.mcart__title-link {
  color: inherit;
  text-decoration: none;
}

.mcart__title-link:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.mcart__x {
  width: 40px;
  height: 40px;
  margin: -8px -8px -8px 0;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  font-size: 28px;
  line-height: 1;
  color: var(--color-dark-blue);
  cursor: pointer;
}

.mcart__x:hover {
  background: rgba(255, 255, 255, 0.6);
}

.mcart__ship {
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 22px;
  background: var(--color-mini-cart-surface);
  margin: 20px;
  border-radius: 10px;
}

.mcart__ship-icon {
  flex-shrink: 0;
  margin-top: 2px;
}

.mcart__ship-text {
  margin: 0;
  font-size: 14px;
  line-height: 1.45;
  color: var(--color-text-muted);
}

.mcart__ship-free {
  color: var(--color-success);
  font-weight: 800;
}

.mcart__ship-zip {
  color: var(--color-dark-blue);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.mcart__scroll {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  padding: 8px 22px 24px;
}

.mcart__list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.mcart__item {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.mcart__thumb {
  flex-shrink: 0;
  width: 72px;
  height: 72px;
  border-radius: var(--radius-md);
  background: var(--color-card-image-bg);
  overflow: hidden;
}

.mcart__thumb img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.mcart__body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.mcart__item-title {
  margin: 0;
  font-size: 15px;
  font-weight: 800;
  line-height: 1.35;
  color: var(--color-dark-blue);
}

.mcart__desc {
  margin: 0;
  font-size: 12px;
  line-height: 1.45;
  color: var(--color-text-soft);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.mcart__badge {
  align-self: flex-start;
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: #fff;
}

.mcart__badge--in {
  background: var(--color-success-bg);
}

.mcart__badge--low {
  background: var(--color-accent);
}

.mcart__price-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  margin-top: 4px;
}

.mcart__ea {
  margin: 0;
  font-size: 11px;
  color: var(--color-caption);
}

.mcart__line-total {
  margin: 2px 0 0;
  font-size: 17px;
  font-weight: 900;
  color: var(--color-dark-blue);
}

.mcart__qty {
  display: inline-flex;
  align-items: center;
  gap: 0;
  border: 1px solid var(--color-border-strong);
  border-radius: 999px;
  background: #fff;
  overflow: hidden;
}

.mcart__qty button {
  width: 32px;
  height: 32px;
  border: none;
  background: #fff;
  font-size: 18px;
  line-height: 1;
  color: var(--color-dark-blue);
  cursor: pointer;
}

.mcart__qty button:hover {
  background: var(--color-gray-section);
}

.mcart__qty span {
  min-width: 28px;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  color: var(--color-dark-blue);
}

.mcart__foot {
  flex-shrink: 0;
  padding: 20px 22px 24px;
  background: var(--color-mini-cart-footer-bg);
  border-top: 1px solid rgba(0, 30, 64, 0.08);
  box-shadow: 0 -24px 32px -8px rgba(255, 255, 255, 0.95);
}

.mcart__totals {
  margin-bottom: 16px;
}

.mcart__row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  padding: 6px 0;
}

.mcart__row--grand {
  padding-top: 10px;
  margin-top: 4px;
  border-top: 1px solid rgba(0, 30, 64, 0.1);
}

.mcart__label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--color-caption);
}

.mcart__val {
  font-size: 15px;
  font-weight: 800;
  color: var(--color-dark-blue);
}

.mcart__val--grand {
  font-size: 20px;
}

.mcart__grand-wrap {
  text-align: right;
}

.mcart__fine {
  display: block;
  margin-top: 4px;
  font-size: 11px;
  color: var(--color-caption);
}

.mcart__cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 14px 20px;
  border-radius: var(--radius-lg);
  font-size: 15px;
  font-weight: 800;
  text-decoration: none;
  margin-top: 10px;
  box-sizing: border-box;
}

.mcart__cta--primary {
  margin-top: 0;
  background: var(--color-dark-blue);
  color: #fff;
}

.mcart__cta--primary:hover {
  background: var(--color-light-blue);
}

.mcart__cta-arrow {
  color: var(--color-accent);
  flex-shrink: 0;
}

.mcart__cta--ghost {
  background: #fff;
  color: var(--color-dark-blue);
  box-shadow: inset 0 0 0 2px var(--color-dark-blue);
}

.mcart__cta--ghost:hover {
  background: var(--color-gray-section);
}

/* Slide + fade: panel only moves; backdrop fades via Transition on root children — use separate transitions */
.mcart-enter-active,
.mcart-leave-active {
  transition: opacity 0.22s ease;
}

.mcart-enter-active .mcart__panel,
.mcart-leave-active .mcart__panel {
  transition: transform 0.26s cubic-bezier(0.22, 1, 0.36, 1);
}

.mcart-enter-from,
.mcart-leave-to {
  opacity: 0;
}

.mcart-enter-from .mcart__panel,
.mcart-leave-to .mcart__panel {
  transform: translate3d(100%, 0, 0);
}

.mcart-enter-to .mcart__panel,
.mcart-leave-from .mcart__panel {
  transform: translate3d(0, 0, 0);
}
</style>
