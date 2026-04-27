<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { media } from '../assets/media'
import { getLegalPage } from '../data/legalPages'
import { publicUrl } from '../lib/publicUrl'

const route = useRoute()
const page = computed(() => getLegalPage(route.name as string))
const isShippingPolicy = computed(() => route.name === 'shipping-policy')
const shippingMapSrc = computed(() => publicUrl('assets/shipping-map.png'))

const lastUpdated = 'April 27, 2026'
</script>

<template>
  <div v-if="page" class="legal">
    <header class="legal__mast" aria-labelledby="legal-h1">
      <div class="legal__wrap">
        <nav class="legal__crumb" aria-label="Breadcrumb">
          <RouterLink to="/">Home</RouterLink>
          <img class="legal__crumb-ico" :src="media.icons.breadcrumbSep" width="5" height="7" alt="" />
          <span class="legal__crumb-here">{{ page.breadcrumbLabel }}</span>
        </nav>
        <h1 id="legal-h1" class="legal__h1">{{ page.title }}</h1>
        <p class="legal__meta">Last updated: {{ lastUpdated }}</p>
      </div>
    </header>

    <article class="legal__body">
      <div class="legal__prose">
        <p class="legal__intro">{{ page.intro }}</p>

        <figure v-if="isShippingPolicy" class="legal__map">
          <img
            class="legal__map-img"
            :src="shippingMapSrc"
            alt="Reference map of shipping regions and estimated delivery zones within the United States."
            width="3199"
            height="1823"
            loading="lazy"
            decoding="async"
          />
          <figcaption class="legal__map-cap">
            Illustrative coverage map; actual transit times depend on inventory, carrier, and destination.
          </figcaption>
        </figure>

        <section v-for="(sec, i) in page.sections" :key="i" class="legal__sec">
          <h2 class="legal__h2">{{ sec.title }}</h2>
          <p v-for="(para, j) in sec.paragraphs" :key="j" class="legal__p">{{ para }}</p>
        </section>
      </div>
    </article>
  </div>
  <div v-else class="legal legal--missing">
    <div class="legal__wrap">
      <p class="legal__missing">This page could not be found.</p>
      <RouterLink to="/" class="legal__back">Return home</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.legal {
  min-height: 60vh;
  background: var(--color-page-bg);
  color: var(--color-text);
  padding-bottom: clamp(48px, 10vw, 80px);
}

.legal__mast {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border-strong);
}

.legal__wrap {
  max-width: var(--max-content);
  margin: 0 auto;
  padding-left: var(--space-page-x);
  padding-right: var(--space-page-x);
}

.legal__mast .legal__wrap {
  padding-top: clamp(20px, 4vw, 32px);
  padding-bottom: clamp(24px, 5vw, 40px);
}

.legal__crumb {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.legal__crumb a {
  color: var(--color-link);
  text-decoration: none;
}

.legal__crumb a:hover {
  text-decoration: underline;
}

.legal__crumb-ico {
  opacity: 0.45;
}

.legal__crumb-here {
  color: var(--color-text-muted);
}

.legal__h1 {
  margin: 0 0 8px;
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: var(--color-dark-blue);
}

.legal__meta {
  margin: 0;
  font-size: 14px;
  color: var(--color-text-soft);
}

.legal__body {
  padding-top: clamp(28px, 5vw, 48px);
}

.legal__prose {
  max-width: 42rem;
  margin: 0 auto;
  padding-left: var(--space-page-x);
  padding-right: var(--space-page-x);
}

.legal__intro {
  margin: 0 0 2rem;
  font-size: 1.0625rem;
  line-height: 1.7;
  color: var(--color-text-muted);
}

.legal__map {
  margin: 0 0 2.5rem;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--color-border-strong);
  background: var(--color-surface-muted);
  box-shadow: 0 8px 28px rgba(0, 30, 64, 0.08);
}

.legal__map-img {
  display: block;
  width: 100%;
  height: auto;
  vertical-align: middle;
}

.legal__map-cap {
  margin: 0;
  padding: 12px 16px;
  font-size: 0.8125rem;
  line-height: 1.45;
  color: var(--color-text-soft);
  background: var(--color-surface);
  border-top: 1px solid var(--color-border-strong);
}

.legal__sec {
  margin-bottom: 2rem;
}

.legal__sec:last-child {
  margin-bottom: 0;
}

.legal__h2 {
  margin: 0 0 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-dark-blue);
  line-height: 1.3;
}

.legal__p {
  margin: 0 0 0.875rem;
  font-size: 1rem;
  line-height: 1.7;
  color: var(--color-text);
}

.legal__p:last-child {
  margin-bottom: 0;
}

.legal--missing {
  padding-top: clamp(48px, 12vw, 120px);
}

.legal__missing {
  margin: 0 0 1rem;
  font-size: 1.125rem;
}

.legal__back {
  color: var(--color-link);
  font-weight: 600;
  text-decoration: none;
}

.legal__back:hover {
  text-decoration: underline;
}
</style>
