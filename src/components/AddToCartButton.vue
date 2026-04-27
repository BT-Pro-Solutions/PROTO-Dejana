<script setup lang="ts">
import { inject, onUnmounted, ref } from 'vue'
import type { DemoProduct } from '../data/products'
import { miniCartKey } from '../layout/miniCart'

const props = withDefaults(
  defineProps<{
    /** Full-width (e.g. cards, compare table cells). */
    block?: boolean
    /** Icon-only square (e.g. search modal “buy again” row). */
    variant?: 'default' | 'icon'
    label?: string
    /** When set, click adds to cart, opens mini cart, shows success state, and emits `added`. */
    product?: DemoProduct
  }>(),
  { block: false, variant: 'default', label: 'Add to Cart' },
)

const emit = defineEmits<{
  click: [e: MouseEvent]
  added: []
}>()

const miniCart = inject(miniCartKey, null)

const justAdded = ref(false)
let resetTimer: ReturnType<typeof setTimeout> | null = null

onUnmounted(() => {
  if (resetTimer) clearTimeout(resetTimer)
})

function onClick(e: MouseEvent) {
  if (props.product && miniCart) {
    e.preventDefault()
    e.stopPropagation()
    miniCart.addFromProduct(props.product, { openDelayMs: 1000 })
    justAdded.value = true
    if (resetTimer) clearTimeout(resetTimer)
    resetTimer = window.setTimeout(() => {
      justAdded.value = false
      resetTimer = null
    }, 2800)
    emit('added')
    return
  }
  emit('click', e)
}
</script>

<template>
  <button
    type="button"
    class="atc"
    :class="{
      'atc--icon': variant === 'icon',
      'atc--block': block,
      'atc--added': justAdded,
    }"
    :aria-label="
      variant === 'icon' ? (justAdded ? 'Added to cart' : label) : undefined
    "
    :aria-busy="justAdded"
    @click="onClick"
  >
    <span class="atc__icon" aria-hidden="true">
      <svg
        v-if="justAdded && variant === 'icon'"
        class="atc__svg atc__svg--check"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
        />
      </svg>
      <svg
        v-else
        class="atc__svg"
        viewBox="0 0 19.9815 20"
        width="20"
        height="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18C4 17.45 4.19583 16.9792 4.5875 16.5875C4.97917 16.1958 5.45 16 6 16C6.55 16 7.02083 16.1958 7.4125 16.5875C7.80417 16.9792 8 17.45 8 18C8 18.55 7.80417 19.0208 7.4125 19.4125C7.02083 19.8042 6.55 20 6 20V20M16 20C15.45 20 14.9792 19.8042 14.5875 19.4125C14.1958 19.0208 14 18.55 14 18C14 17.45 14.1958 16.9792 14.5875 16.5875C14.9792 16.1958 15.45 16 16 16C16.55 16 17.0208 16.1958 17.4125 16.5875C17.8042 16.9792 18 17.45 18 18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20V20M5.15 4L7.55 9H14.55V9V9L17.3 4V4V4H5.15V4M4.2 2H18.95C19.3333 2 19.625 2.17083 19.825 2.5125C20.025 2.85417 20.0333 3.2 19.85 3.55L16.3 9.95C16.1167 10.2833 15.8708 10.5417 15.5625 10.725C15.2542 10.9083 14.9167 11 14.55 11H7.1L6 13V13V13H18V15H6C5.25 15 4.68333 14.6708 4.3 14.0125C3.91667 13.3542 3.9 12.7 4.25 12.05L5.6 9.6L2 2H0V0H3.25L4.2 2V2M7.55 9V9H14.55V9V9V9H7.55V9"
        />
      </svg>
    </span>
    <span v-if="variant === 'default'" class="atc__label">{{ justAdded ? 'Added to Cart!' : label }}</span>
  </button>
</template>

<style scoped>
.atc {
  --atc-bg-mid: #0a2f5c;
  --atc-bg-edge: #00152e;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 22px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: #fff;
  background: var(--atc-bg-mid);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
  transition:
    background 0.2s ease,
    filter 0.15s ease,
    transform 0.12s ease;
}

.atc:hover {
  filter: brightness(1.06);
}

.atc:active {
  transform: scale(0.99);
}

.atc:focus-visible {
  outline: 2px solid var(--color-light-blue);
  outline-offset: 3px;
}

.atc--added {
  background: var(--color-success);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.atc--added:hover {
  filter: brightness(1.05);
}

.atc__icon {
  display: flex;
  color: #fff;
  line-height: 0;
}

.atc--icon {
  padding: 0;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 8px;
}

.atc--icon .atc__svg {
  width: 18px;
  height: 18px;
}

.atc--icon .atc__svg--check {
  width: 22px;
  height: 22px;
}

.atc--block {
  width: 100%;
}
</style>
