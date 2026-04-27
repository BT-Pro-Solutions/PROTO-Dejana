<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { media } from '../assets/media'
import AddToCartButton from './AddToCartButton.vue'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

const router = useRouter()
const inputRef = ref<HTMLInputElement | null>(null)
const query = ref('')

const recentSearches = ['Salt Spreader', 'Hydraulic Pump', 'Flange Bearing'] as const

const buyAgain = [
  {
    title: 'Hydraulic Fluid EZ-FLOW 1 Gal',
    price: 25.99,
    image: '/assets/product-fisher-plow-thumb-3.png',
    slug: 'fisher-hs-compact',
  },
  {
    title: "Cutting Edge Kit 8.5' XV/X2",
    price: 45.99,
    image: '/assets/product-fisher-plow-thumb-4.png',
    slug: 'l2',
  },
] as const

const recentlyViewed = [
  {
    title: 'Hydraulic Unit Extreme V',
    price: 199.99,
    image: '/assets/product-fisher-plow-thumb-2.png',
    slug: 'fisher-hs-compact',
  },
  {
    title: 'Hydraulic Unit Extreme V',
    price: 199.99,
    image: '/assets/product-fisher-plow-thumb-2.png',
    slug: 'fisher-hs-compact',
  },
] as const

const queryTrim = computed(() => query.value.trim())

const suggestionSuffixes = [' products', ' for trucks', ' accessories', ' parts & hardware'] as const

const liveSuggestions = computed(() =>
  suggestionSuffixes.map((suffix) => ({
    suffix,
    full: queryTrim.value + suffix,
  })),
)

const showLiveSuggestions = computed(() => queryTrim.value.length > 0)

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      nextTick(() => {
        inputRef.value?.focus()
      })
    } else {
      query.value = ''
    }
  },
)

function goToSearch(q: string) {
  const term = q.trim()
  if (!term) return
  emit('close')
  router.push({ name: 'search', query: { q: term } })
}

function onInputEnter() {
  goToSearch(queryTrim.value)
}
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="smodal" @keydown.escape.prevent="emit('close')">
      <div class="smodal__backdrop" aria-hidden="true" @click="emit('close')" />
      <div
        class="smodal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="smodal-title"
        tabindex="-1"
      >
        <button type="button" class="smodal__close" aria-label="Close search" @click="emit('close')">
          ×
        </button>
        <div class="smodal__panel-inner">
          <h2 id="smodal-title" class="visually-hidden">Search</h2>

          <div class="smodal__stack">
            <div class="smodal__card smodal__card--search">
              <div class="smodal__search-body">
                <div class="smodal__search-row-wrap">
                  <div class="smodal__search-row">
                    <label class="smodal__search-label">
                      <span class="visually-hidden">Search products</span>
                      <div class="smodal__input-shell">
                        <input
                          ref="inputRef"
                          v-model="query"
                          type="search"
                          class="smodal__input"
                          placeholder="Search products..."
                          autocomplete="off"
                          @keydown.enter.prevent="onInputEnter"
                        />
                        <span class="smodal__input-icon" aria-hidden="true">
                          <img :src="media.icons.search" width="18" height="18" alt="" />
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                <div v-if="showLiveSuggestions" class="smodal__attached-suggest">
                  <h3 class="smodal__h smodal__h--attached">Suggestions</h3>
                  <ul class="smodal__suggest-list" role="listbox" aria-label="Search suggestions">
                    <li v-for="(s, i) in liveSuggestions" :key="i">
                      <button type="button" class="smodal__suggest" @click="goToSearch(s.full)">
                        <span class="smodal__suggest-text">
                          <strong class="smodal__suggest-match">{{ queryTrim }}</strong>{{ s.suffix }}
                        </span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          <div v-if="!showLiveSuggestions" class="smodal__card">
            <h3 class="smodal__h">Recent searches</h3>
            <ul class="smodal__recent">
              <li v-for="r in recentSearches" :key="r">
                <RouterLink
                  :to="{ name: 'search', query: { q: r } }"
                  class="smodal__recent-link"
                  @click="emit('close')"
                >
                  <span class="smodal__recent-icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        stroke="currentColor"
                        stroke-width="1.6"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  <span class="smodal__recent-text">{{ r }}</span>
                </RouterLink>
              </li>
            </ul>
          </div>

          <div class="smodal__card">
            <h3 class="smodal__h">Buy again</h3>
            <ul class="smodal__buy-list">
              <li v-for="p in buyAgain" :key="p.title">
                <div class="smodal__buy-row">
                  <RouterLink
                    :to="{ name: 'product', params: { slug: p.slug } }"
                    class="smodal__buy-main"
                    @click="emit('close')"
                  >
                    <img :src="p.image" width="56" height="56" alt="" class="smodal__buy-thumb" />
                    <span class="smodal__buy-name">{{ p.title }}</span>
                    <span class="smodal__buy-price">${{ p.price.toFixed(2) }}</span>
                  </RouterLink>
                  <span class="smodal__ac">
                    <AddToCartButton variant="icon" label="Add to cart" />
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <div class="smodal__card">
            <h3 class="smodal__h">Recently viewed</h3>
            <ul class="smodal__viewed">
              <li v-for="(p, idx) in recentlyViewed" :key="`${p.title}-${idx}`">
                <RouterLink
                  :to="{ name: 'product', params: { slug: p.slug } }"
                  class="smodal__viewed-link"
                  @click="emit('close')"
                >
                  <img :src="p.image" width="80" height="80" alt="" class="smodal__viewed-thumb" />
                  <span class="smodal__viewed-body">
                    <span class="smodal__viewed-title">{{ p.title }}</span>
                    <span class="smodal__viewed-price">${{ p.price.toFixed(2) }}</span>
                  </span>
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.smodal {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 48px 16px;
}

.smodal__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(28, 32, 36, 0.42);
}

.smodal__panel {
  position: relative;
  width: min(560px, 100%);
  margin-top: 8px;
  padding: 0;
  overflow: visible;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-radius: 12px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.28);
}

.smodal__panel-inner {
  max-height: calc(100vh - 96px);
  overflow: auto;
  padding: 24px 16px;
}

.smodal__close {
  position: absolute;
  top: -14px;
  right: -14px;
  z-index: 3;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 1px 4px rgba(0, 30, 64, 0.12);
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  color: var(--color-text-soft);
  transition: background-color 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
}

.smodal__close:hover,
.smodal__close:focus-visible {
  background: #fff;
  color: var(--color-dark-blue);
  box-shadow: 0 2px 8px rgba(0, 30, 64, 0.16);
  outline: none;
}

.smodal__stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.smodal__card {
  background: var(--color-surface);
  border-radius: 8px;
  padding: 16px 18px 18px;
  box-shadow: 0 1px 3px rgba(0, 30, 64, 0.06);
}

.smodal__card--search {
  padding: 0;
  background: #fff;
  border: 2px solid #e2e8f0;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.smodal__search-body {
  overflow: hidden;
  border-radius: 6px;
}

.smodal__search-row {
  display: flex;
  align-items: stretch;
  gap: 8px;
}

.smodal__card--search:focus-within {
  border-color: var(--color-light-blue);
  box-shadow: 0 0 0 1px rgba(15, 83, 149, 0.08), 0 1px 3px rgba(0, 30, 64, 0.06);
}

.smodal__search-label {
  flex: 1;
  min-width: 0;
  display: block;
  margin: 0;
}

.smodal__input-shell {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  height: 100%;
  padding: 12px 20px;
  background: #f8fafc;
  border-radius: 8px;
  transition: border-color 0.15s ease, background-color 0.15s ease;
}

.smodal__input-shell:focus-within {
  background: #fff;
  border-color: rgba(15, 83, 149, 0.35);
}

.smodal__input {
  flex: 1;
  min-width: 0;
  border: none;
  padding: 8px 4px 8px 0;
  margin: 0;
  font-size: 16px;
  font-family: inherit;
  color: var(--color-text);
  background: transparent;
  outline: none;
}

.smodal__input::placeholder {
  color: var(--color-input-placeholder);
}

.smodal__input-icon {
  display: flex;
  flex-shrink: 0;
  padding-right: 10px;
  opacity: 0.85;
}

.smodal__h {
  margin: 0 0 12px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-caption);
}

.smodal__attached-suggest {
  border-top: 1px solid rgba(195, 198, 209, 0.55);
  padding: 10px 12px 6px;
}

.smodal__h--attached {
  margin: 0 0 6px;
  padding: 0 2px;
}

.smodal__attached-suggest .smodal__suggest-list {
  margin: 0 -4px;
}

.smodal__recent {
  list-style: none;
  margin: 0;
  padding: 0;
}

.smodal__recent li {
  border-bottom: 1px solid rgba(195, 198, 209, 0.35);
}

.smodal__recent li:last-child {
  border-bottom: none;
}

.smodal__recent-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  text-decoration: none;
  color: var(--color-text);
  font-size: 15px;
  font-weight: 400;
}

.smodal__recent-link:hover .smodal__recent-text {
  color: var(--color-light-blue);
}

.smodal__recent-icon {
  display: flex;
  color: var(--color-caption);
  flex-shrink: 0;
}

.smodal__recent-text {
  line-height: 1.35;
}

.smodal__buy-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.smodal__buy-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(195, 198, 209, 0.35);
}

.smodal__buy-list li:last-child .smodal__buy-row {
  border-bottom: none;
  padding-bottom: 0;
}

.smodal__buy-list li:first-child .smodal__buy-row {
  padding-top: 0;
}

.smodal__buy-main {
  flex: 1;
  min-width: 0;
  display: grid;
  grid-template-columns: 56px 1fr auto;
  align-items: center;
  gap: 12px 16px;
  text-decoration: none;
  color: inherit;
}

.smodal__buy-thumb {
  width: 56px;
  height: 56px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid rgba(195, 198, 209, 0.45);
  background: #fff;
}

.smodal__buy-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-dark-blue);
  line-height: 1.35;
}

.smodal__buy-price {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text);
  white-space: nowrap;
}

.smodal__ac {
  flex-shrink: 0;
}

.smodal__viewed {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.smodal__viewed-link {
  display: flex;
  gap: 12px;
  text-decoration: none;
  color: inherit;
  min-width: 0;
}

.smodal__viewed-thumb {
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid rgba(195, 198, 209, 0.45);
  background: #fff;
}

.smodal__viewed-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.smodal__viewed-title {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-dark-blue);
  line-height: 1.35;
}

.smodal__viewed-price {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-text);
}

.smodal__suggest-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.smodal__suggest {
  display: block;
  width: 100%;
  margin: 0;
  padding: 10px 6px;
  border: none;
  border-bottom: 1px solid rgba(195, 198, 209, 0.35);
  background: transparent;
  text-align: left;
  font: inherit;
  color: var(--color-dark-blue);
  cursor: pointer;
}

.smodal__attached-suggest .smodal__suggest-list li:last-child .smodal__suggest {
  border-bottom: none;
  padding-bottom: 4px;
}

.smodal__attached-suggest .smodal__suggest-list li:first-child .smodal__suggest {
  padding-top: 2px;
}

.smodal__suggest:hover,
.smodal__suggest:focus-visible {
  color: var(--color-light-blue);
  outline: none;
}

.smodal__suggest-match {
  font-weight: 700;
}

.smodal__suggest-text {
  font-size: 15px;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 420px) {
  .smodal__viewed {
    grid-template-columns: 1fr;
  }

  .smodal__buy-main {
    grid-template-columns: 48px 1fr;
    grid-template-rows: auto auto;
  }

  .smodal__buy-thumb {
    grid-row: span 2;
    width: 48px;
    height: 48px;
  }

  .smodal__buy-price {
    grid-column: 2;
  }
}
</style>
