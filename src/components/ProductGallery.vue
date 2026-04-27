<script setup lang="ts">
import { ref, computed, watch, onUnmounted, nextTick } from 'vue'
import { media } from '../assets/media'

export interface GalleryImage {
  id: string
  src: string
  alt: string
}

const props = defineProps<{
  images: GalleryImage[]
}>()

const active = ref(0)
const mainSrc = computed(() => props.images[active.value]?.src ?? props.images[0]?.src ?? '')
const mainAlt = computed(() => props.images[active.value]?.alt ?? '')

const lightboxOpen = ref(false)
const closeBtnRef = ref<HTMLButtonElement | null>(null)

function openLightbox() {
  lightboxOpen.value = true
}

function closeLightbox() {
  lightboxOpen.value = false
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') closeLightbox()
}

watch(lightboxOpen, async (open) => {
  if (open) {
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeydown)
    await nextTick()
    closeBtnRef.value?.focus()
  } else {
    document.body.style.overflow = ''
    window.removeEventListener('keydown', onKeydown)
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div class="gallery">
    <div class="gallery__hero">
      <div class="gallery__hero-inner">
        <img
          class="gallery__backdrop"
          :src="media.galleryBackdrop"
          alt=""
          aria-hidden="true"
        />
        <img class="gallery__main" :src="mainSrc" :alt="mainAlt" draggable="false" />
        <button
          type="button"
          class="gallery__hero-open"
          aria-haspopup="dialog"
          :aria-expanded="lightboxOpen"
          aria-label="View image full screen"
          @click="openLightbox"
        />
      </div>
    </div>
    <div class="gallery__thumbs" role="tablist" aria-label="Product images">
      <button
        v-for="(img, i) in images"
        :key="img.id"
        type="button"
        class="gallery__thumb"
        :class="{ 'gallery__thumb--active': i === active }"
        :aria-selected="i === active"
        @click="active = i"
      >
        <img :src="img.src" :alt="img.alt" />
      </button>
    </div>

    <Teleport to="body">
      <div
        v-if="lightboxOpen"
        class="lightbox"
        role="dialog"
        aria-modal="true"
        :aria-label="mainAlt || 'Product image'"
      >
        <div class="lightbox__backdrop" @click="closeLightbox" />
        <div class="lightbox__content">
          <button
            ref="closeBtnRef"
            type="button"
            class="lightbox__close"
            aria-label="Close full screen image"
            @click="closeLightbox"
          >
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
            </svg>
          </button>
          <img class="lightbox__img" :src="mainSrc" :alt="mainAlt" @click.stop />
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.gallery {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.gallery__hero {
  background: var(--color-gallery-bg);
  border-radius: var(--radius-md);
  overflow: hidden;
  aspect-ratio: 16 / 10;
  max-height: 575px;
}

.gallery__hero-inner {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery__hero-open {
  position: absolute;
  inset: 0;
  z-index: 2;
  margin: 0;
  padding: 0;
  border: none;
  border-radius: inherit;
  background: transparent;
  cursor: zoom-in;
}

.gallery__hero-open:focus-visible {
  outline: 3px solid var(--color-light-blue);
  outline-offset: 2px;
}

.gallery__backdrop {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.35;
}

.gallery__main {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.gallery__thumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
}

@media (max-width: 520px) {
  .gallery__thumbs {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 4px;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
  }
}

.gallery__thumb {
  position: relative;
  flex: 0 0 auto;
  width: 72px;
  height: 72px;
  padding: 0;
  border: 2px solid transparent;
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  background: #fff;
}

@media (max-width: 520px) {
  .gallery__thumb {
    width: 64px;
    height: 64px;
    scroll-snap-align: start;
  }
}

.gallery__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.gallery__thumb--active {
  border-color: var(--color-dark-blue);
}

.lightbox {
  position: fixed;
  inset: 0;
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(16px, 4vw, 48px);
  box-sizing: border-box;
}

.lightbox__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(10, 12, 18, 0.92);
  backdrop-filter: blur(4px);
}

.lightbox__content {
  position: relative;
  z-index: 1;
  max-width: min(96vw, var(--layout-max-width));
  max-height: min(92vh, 1200px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox__img {
  max-width: 100%;
  max-height: min(92vh, 1200px);
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: var(--radius-md);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.55);
}

.lightbox__close {
  position: fixed;
  top: clamp(12px, 3vw, 24px);
  right: clamp(12px, 3vw, 24px);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  cursor: pointer;
  transition: background 0.15s ease, transform 0.12s ease;
}

.lightbox__close:hover {
  background: rgba(255, 255, 255, 0.22);
}

.lightbox__close:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 3px;
}

.lightbox__close:active {
  transform: scale(0.96);
}
</style>
