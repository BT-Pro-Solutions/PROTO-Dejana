<script setup lang="ts">
import { ref, useSlots } from 'vue'
import ProductCard from './ProductCard.vue'
import { media } from '../assets/media'
import type { DemoProduct } from '../data/products'

defineProps<{
  title: string
  /** Plain-text subtitle when no `#subtitle` slot is provided */
  subtitle?: string
  products: DemoProduct[]
}>()

const slots = useSlots()

const scroller = ref<HTMLElement | null>(null)

function scrollStrip(dir: -1 | 1) {
  const el = scroller.value
  if (!el) return
  const step = Math.max(220, Math.floor(el.clientWidth * 0.72))
  el.scrollBy({ left: dir * step, behavior: 'smooth' })
}
</script>

<template>
  <section class="strip">
    <div class="strip__inner">
      <header class="strip__head">
        <h2 class="strip__title">{{ title }}</h2>
        <div v-if="slots.subtitle || subtitle" class="strip__sub-wrap">
          <slot name="subtitle">
            <p v-if="subtitle" class="strip__subtitle">{{ subtitle }}</p>
          </slot>
        </div>
      </header>
      <div class="strip__row">
        <button type="button" class="strip__nav strip__nav--prev" aria-label="Previous products" @click="scrollStrip(-1)">
          <img
            class="strip__nav-icon strip__nav-icon--flip"
            :src="media.icons.carouselControl"
            width="44"
            height="44"
            alt=""
          />
        </button>
        <div ref="scroller" class="strip__scroller" tabindex="0">
          <ProductCard v-for="p in products" :key="p.id" :product="p" />
        </div>
        <button type="button" class="strip__nav strip__nav--next" aria-label="Next products" @click="scrollStrip(1)">
          <img class="strip__nav-icon" :src="media.icons.carouselControl" width="44" height="44" alt="" />
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.strip {
  background: var(--color-product-strip-bg);
  padding: clamp(40px, 7vw, 64px) var(--space-page-x) clamp(48px, 8vw, 72px);
}

.strip__inner {
  max-width: var(--layout-max-width);
  margin: 0 auto;
}

.strip__head {
  text-align: center;
  margin-bottom: clamp(20px, 4vw, 32px);
}

.strip__title {
  margin: 0 0 12px;
  font-size: clamp(26px, 5vw, 36px);
  font-weight: 900;
  letter-spacing: -0.6px;
  color: var(--color-dark-blue);
}

.strip__subtitle {
  margin: 0 auto;
  max-width: 560px;
  font-size: 16px;
  line-height: 1.65;
  color: var(--color-text-soft);
}

.strip__sub-wrap :deep(p) {
  margin: 0 auto 0;
  max-width: 560px;
  font-size: 16px;
  line-height: 1.65;
  color: var(--color-text-soft);
}

.strip__sub-wrap :deep(strong) {
  color: var(--color-text);
  font-weight: 700;
}

.strip__row {
  display: flex;
  align-items: center;
  gap: clamp(4px, 2vw, 12px);
}

.strip__scroller {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 24px;
  overflow-x: auto;
  overflow-y: visible;
  scroll-behavior: smooth;
  padding: 8px 4px 16px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 30, 64, 0.25) transparent;
}

.strip__scroller:focus-visible {
  outline: 2px solid var(--color-light-blue);
  outline-offset: 4px;
}

.strip__nav {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 50%;
}

.strip__nav:hover {
  filter: brightness(0.97);
}

.strip__nav-icon {
  display: block;
}

.strip__nav-icon--flip {
  transform: scaleX(-1);
}

@media (max-width: 520px) {
  .strip__nav {
    width: 36px;
    height: 36px;
  }

  .strip__nav-icon {
    width: 36px;
    height: 36px;
  }
}
</style>
