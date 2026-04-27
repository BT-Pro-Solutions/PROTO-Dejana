<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    activeFilterCount: number
    /** Light PLP (category / search) vs dark sheet (new arrivals / favorites). */
    theme?: 'light' | 'dark'
  }>(),
  { theme: 'light' },
)

const open = ref(false)
const isDesktop = ref(false)

function readMq() {
  isDesktop.value = window.matchMedia('(min-width: 900px)').matches
}

function close() {
  open.value = false
}

const showBackdrop = computed(() => open.value && !isDesktop.value)

const asideAriaHidden = computed(() => (!isDesktop.value && !open.value) || undefined)

let mq: MediaQueryList | null = null

onMounted(() => {
  readMq()
  mq = window.matchMedia('(min-width: 900px)')
  mq.addEventListener('change', readMq)
  window.addEventListener('keydown', onGlobalKeydown)
})

onUnmounted(() => {
  mq?.removeEventListener('change', readMq)
  window.removeEventListener('keydown', onGlobalKeydown)
  document.documentElement.classList.remove('plp-filters-drawer-open')
})

watch(isDesktop, (d) => {
  if (d) open.value = false
})

watch(
  () => [open.value, isDesktop.value] as const,
  ([o, desk]) => {
    const lock = o && !desk
    document.documentElement.classList.toggle('plp-filters-drawer-open', lock)
  },
  { flush: 'post' },
)

function onGlobalKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value && !isDesktop.value) close()
}
</script>

<template>
  <div class="plp-shell" :data-theme="theme">
    <div class="plp-shell__toolbar">
      <button type="button" class="plp-shell__filter-btn" @click="open = true">
        Filters ({{ activeFilterCount }})
      </button>
    </div>

    <div
      v-show="showBackdrop"
      class="plp-shell__backdrop"
      aria-hidden="true"
      @click="close"
    />

    <div class="plp-shell__layout">
      <aside
        class="plp-shell__aside filters"
        aria-label="Filters"
        :class="{ 'plp-shell__aside--open': open }"
        :aria-hidden="asideAriaHidden"
      >
        <div class="plp-shell__aside-top">
          <span class="plp-shell__aside-title">Filters</span>
          <button type="button" class="plp-shell__aside-close" aria-label="Close filters" @click="close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="plp-shell__aside-scroll">
          <slot name="filters" />
        </div>
      </aside>

      <div class="plp-shell__results">
        <slot />
      </div>
    </div>
  </div>
</template>

<style>
html.plp-filters-drawer-open {
  overflow: hidden;
}
</style>

<style scoped>
.plp-shell {
  --plp-drawer-w: min(20rem, calc(100vw - 40px));
  --plp-drawer-z: 320;
}

.plp-shell__toolbar {
  display: flex;
  margin-bottom: 20px;
}

@media (min-width: 900px) {
  .plp-shell__toolbar {
    display: none;
  }
}

.plp-shell__filter-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 18px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;
}

.plp-shell[data-theme='light'] .plp-shell__filter-btn {
  border: 1px solid #002d62;
  background: #fff;
  color: #002d62;
}

.plp-shell[data-theme='light'] .plp-shell__filter-btn:hover {
  background: #f4f6f9;
}

.plp-shell[data-theme='dark'] .plp-shell__filter-btn {
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
}

.plp-shell[data-theme='dark'] .plp-shell__filter-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.3);
}

.plp-shell__backdrop {
  display: none;
  position: fixed;
  inset: 0;
  z-index: calc(var(--plp-drawer-z) - 1);
  background: rgba(0, 20, 40, 0.45);
}

@media (max-width: 899px) {
  .plp-shell__backdrop {
    display: block;
  }
}

.plp-shell__layout {
  display: block;
}

@media (min-width: 900px) {
  .plp-shell__layout {
    display: grid;
    grid-template-columns: var(--plp-sidebar-w) minmax(0, 1fr);
    column-gap: var(--plp-layout-gap);
    align-items: start;
  }
}

.plp-shell__aside {
  box-sizing: border-box;
}

@media (max-width: 899px) {
  .plp-shell__aside {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: var(--plp-drawer-z);
    width: var(--plp-drawer-w);
    max-width: 100%;
    padding: max(12px, env(safe-area-inset-top)) max(16px, env(safe-area-inset-right)) 24px
      max(16px, env(safe-area-inset-left));
    padding-bottom: max(24px, env(safe-area-inset-bottom));
    transform: translateX(-105%);
    transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 6px 0 28px rgba(0, 20, 40, 0.18);
  }

  .plp-shell__aside--open {
    transform: translateX(0);
  }

  .plp-shell[data-theme='light'] .plp-shell__aside {
    background: #fff;
  }

  .plp-shell[data-theme='dark'] .plp-shell__aside {
    background: #001a3a;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
  }
}

@media (min-width: 900px) {
  .plp-shell__aside {
    position: static;
    transform: none;
    width: auto;
    padding: 0;
    overflow: visible;
    display: block;
    box-shadow: none;
    background: transparent;
    border: none;
  }
}

.plp-shell__aside-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-shrink: 0;
  margin-bottom: 16px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(0, 45, 98, 0.12);
}

.plp-shell[data-theme='dark'] .plp-shell__aside-top {
  border-bottom-color: rgba(255, 255, 255, 0.12);
}

@media (min-width: 900px) {
  .plp-shell__aside-top {
    display: none;
  }
}

.plp-shell__aside-title {
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.plp-shell[data-theme='light'] .plp-shell__aside-title {
  color: #002d62;
}

.plp-shell[data-theme='dark'] .plp-shell__aside-title {
  color: rgba(255, 255, 255, 0.92);
}

.plp-shell__aside-close {
  width: 44px;
  height: 44px;
  margin: -8px -10px -8px 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  font-size: 28px;
  line-height: 1;
  font-weight: 300;
  cursor: pointer;
  transition: background 0.12s ease;
}

.plp-shell[data-theme='light'] .plp-shell__aside-close {
  background: transparent;
  color: #002d62;
}

.plp-shell[data-theme='light'] .plp-shell__aside-close:hover {
  background: rgba(0, 45, 98, 0.08);
}

.plp-shell[data-theme='dark'] .plp-shell__aside-close {
  background: transparent;
  color: #fff;
}

.plp-shell[data-theme='dark'] .plp-shell__aside-close:hover {
  background: rgba(255, 255, 255, 0.1);
}

.plp-shell__aside-scroll {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

@media (min-width: 900px) {
  .plp-shell__aside-scroll {
    overflow: visible;
  }
}

.plp-shell__results {
  min-width: 0;
}
</style>
