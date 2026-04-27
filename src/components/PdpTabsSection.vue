<script setup lang="ts">
import { computed, ref } from 'vue'
import { media } from '../assets/media'
import StarRating from './StarRating.vue'
import type { PdpDocument, PdpReviewEntry, PdpReviewsSummary } from '../data/products'

const props = defineProps<{
  productTitle: string
  reviewCount: number
  tabHeading: string
  lead: string
  bullets: string[]
  documents: PdpDocument[]
  reviewsSummary: PdpReviewsSummary
  reviews: PdpReviewEntry[]
}>()

const active = ref(0)

const tabs = computed(() =>
  ['Description', 'Documents & Downloads', `Reviews (${props.reviewCount})`] as const,
)

const starRowLabels = ['5 Star', '4 Star', '3 Star', '2 Star', '1 Star'] as const
</script>

<template>
  <section class="tabs">
    <div class="tabs__nav" role="tablist">
      <button
        v-for="(tab, i) in tabs"
        :key="tab"
        type="button"
        role="tab"
        class="tabs__btn"
        :class="{ 'tabs__btn--active': i === active }"
        :aria-selected="i === active"
        @click="active = i"
      >
        {{ tab }}
      </button>
    </div>

    <div v-show="active === 0" class="tabs__panel">
      <div class="tabs__col">
        <h2 class="tabs__h2">{{ tabHeading }}</h2>
        <p class="tabs__lead">{{ lead }}</p>
        <ul class="tabs__list">
          <li v-for="(b, i) in bullets" :key="i">
            <img :src="media.icons.bulletCheck" width="12" height="12" alt="" />
            <span>{{ b }}</span>
          </li>
        </ul>
      </div>
      <div class="tabs__figure">
        <img :src="media.descriptionDiagram" alt="Fisher HS plow technical illustration" />
      </div>
    </div>

    <div v-show="active === 1" class="tabs__panel tabs__panel--docs">
      <h2 class="tabs__h2 tabs__h2--docs">Documents for {{ productTitle }}</h2>
      <ul class="doc-list">
        <li v-for="(doc, i) in documents" :key="i" class="doc-list__item">
          <a href="#" class="doc-list__link" @click.prevent>
            <span class="doc-list__ico" aria-hidden="true">
              <svg viewBox="0 0 32 40" width="28" height="35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="30" height="38" rx="2" stroke="currentColor" stroke-width="2" />
                <path d="M8 12h16M8 18h12M8 24h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              </svg>
              <span class="doc-list__pdf">PDF</span>
            </span>
            <span class="doc-list__main">
              <span class="doc-list__title">{{ doc.title }}</span>
              <span class="doc-list__size">{{ doc.sizeLabel }}</span>
            </span>
            <span class="doc-list__dl" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.75">
                <path d="M12 3v12M8 11l4 4 4-4" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M5 21h14" stroke-linecap="round" />
              </svg>
            </span>
          </a>
        </li>
      </ul>
    </div>

    <div v-show="active === 2" class="tabs__panel tabs__panel--reviews">
      <div class="rev-summary">
        <h2 class="tabs__h2 rev-summary__h">Customer Reviews</h2>
        <div class="rev-summary__avg">
          <span class="rev-summary__num" aria-hidden="true">{{ reviewsSummary.average.toFixed(1) }}</span>
          <StarRating
            class="rev-summary__stars"
            :rating="reviewsSummary.average"
            :review-count="0"
          />
        </div>
        <p class="rev-summary__based">Based on {{ reviewCount }} reviews</p>

        <div class="rev-bars" role="list" aria-label="Rating breakdown">
          <div
            v-for="(pct, idx) in reviewsSummary.distribution"
            :key="starRowLabels[idx]"
            class="rev-bars__row"
            role="listitem"
          >
            <span class="rev-bars__label">{{ starRowLabels[idx] }}</span>
            <div class="rev-bars__track" :aria-label="`${pct} percent`">
              <div class="rev-bars__fill" :style="{ width: pct + '%' }" />
            </div>
            <span class="rev-bars__pct">{{ pct }}%</span>
          </div>
        </div>

        <button type="button" class="rev-summary__write">Write a review</button>
      </div>

      <div class="rev-feed">
        <article v-for="(r, idx) in reviews" :key="idx" class="rev-card">
          <div class="rev-card__head">
            <StarRating :rating="r.rating" :review-count="0" />
            <time class="rev-card__date" :datetime="r.date">{{ r.date }}</time>
          </div>
          <h3 class="rev-card__title">{{ r.title }}</h3>
          <p class="rev-card__body">{{ r.body }}</p>
          <p class="rev-card__by">{{ r.author.toUpperCase() }} — VERIFIED PURCHASE</p>
          <div class="rev-card__helpful">
            <span class="rev-card__helpful-q">Was this helpful?</span>
            <span class="rev-card__votes">
              <span class="rev-card__vote">
                <svg class="rev-card__thumb" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"
                  />
                </svg>
                <span class="visually-hidden">Thumbs up:</span>
                {{ r.helpfulUp }}
              </span>
              <span class="rev-card__vote">
                <svg class="rev-card__thumb" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.58-6.59c.37-.36.59-.86.59-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"
                  />
                </svg>
                <span class="visually-hidden">Thumbs down:</span>
                {{ r.helpfulDown }}
              </span>
            </span>
          </div>
        </article>

        <nav class="rev-pag" aria-label="Reviews pagination">
          <button type="button" class="rev-pag__btn rev-pag__btn--active" aria-current="page">1</button>
          <button type="button" class="rev-pag__btn">2</button>
          <button type="button" class="rev-pag__btn">3</button>
          <span class="rev-pag__ellipsis" aria-hidden="true">…</span>
          <button type="button" class="rev-pag__next">Next</button>
        </nav>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tabs {
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  max-width: var(--layout-max-width);
  margin: 0 auto;
  padding-top: 15px;
  padding-bottom: 60px;
}

.tabs__nav {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 32px;
  border-bottom: 1px solid var(--color-border-strong);
}

.tabs__btn {
  border: none;
  background: none;
  padding: 0 0 16px;
  margin-bottom: -1px;
  font-size: 16px;
  font-family: inherit;
  color: var(--color-text-muted);
  cursor: pointer;
  border-bottom: 2px solid transparent;
}

.tabs__btn--active {
  color: var(--color-dark-blue);
  font-weight: 700;
  border-bottom-color: var(--color-dark-blue);
}

.tabs__panel {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px 50px;
  align-items: start;
}

.tabs__panel--docs {
  display: block;
  max-width: 100%;
}

.tabs__panel--reviews {
  grid-template-columns: 1fr;
  gap: 40px;
}

@media (min-width: 960px) {
  .tabs__panel--reviews {
    grid-template-columns: minmax(240px, 320px) minmax(0, 1fr);
    align-items: start;
  }
}

@media (min-width: 900px) {
  .tabs__panel:not(.tabs__panel--docs):not(.tabs__panel--reviews) {
    grid-template-columns: 1fr minmax(280px, 0.45fr);
  }
}

.tabs__h2 {
  margin: 0 0 24px;
  font-size: clamp(20px, 3vw, 24px);
  font-weight: 400;
  letter-spacing: -0.6px;
  color: var(--color-dark-blue);
}

.tabs__h2--docs {
  margin-bottom: 20px;
  font-weight: 700;
}

.tabs__lead {
  margin: 0 0 24px;
  font-size: 16px;
  line-height: 26px;
  color: var(--color-text-muted);
}

.tabs__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tabs__list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14px;
  line-height: 20px;
  color: var(--color-text);
}

.tabs__figure {
  border-radius: var(--radius-md);
  overflow: hidden;
  background: #fff;
}

.tabs__figure img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

/* —— Documents —— */
.doc-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.doc-list__link {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 20px;
  border-radius: var(--radius-md);
  background: var(--color-gray-section);
  text-decoration: none;
  color: var(--color-text);
  border: 1px solid transparent;
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}

.doc-list__link:hover {
  background: #e8ecf4;
  border-color: var(--color-border-strong);
  box-shadow: 0 2px 8px rgba(0, 30, 64, 0.06);
}

.doc-list__ico {
  position: relative;
  flex-shrink: 0;
  display: inline-block;
  color: var(--color-dark-blue);
  line-height: 0;
}

.doc-list__pdf {
  position: absolute;
  left: 50%;
  bottom: 4px;
  transform: translateX(-50%);
  font-size: 8px;
  font-weight: 800;
  letter-spacing: 0.02em;
  color: var(--color-dark-blue);
  line-height: 1;
}

.doc-list__main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 8px 20px;
}

.doc-list__title {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-dark-blue);
}

.doc-list__size {
  font-size: 14px;
  color: var(--color-caption);
}

.doc-list__dl {
  flex-shrink: 0;
  color: var(--color-dark-blue);
  opacity: 0.85;
}

/* —— Reviews summary —— */
.rev-summary__h {
  margin-bottom: 16px;
  font-weight: 800;
}

.rev-summary__avg {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 14px;
  margin-bottom: 8px;
}

.rev-summary__num {
  font-size: clamp(36px, 6vw, 48px);
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--color-dark-blue);
  line-height: 1;
}

.rev-summary__stars :deep(.star__svg) {
  width: 18px;
  height: 18px;
}

.rev-summary__based {
  margin: 0 0 28px;
  font-size: 15px;
  color: var(--color-text-muted);
}

.rev-bars {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 28px;
}

.rev-bars__row {
  display: grid;
  grid-template-columns: 56px 1fr 40px;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: var(--color-text-muted);
}

.rev-bars__label {
  font-weight: 600;
  color: var(--color-dark-blue);
}

.rev-bars__track {
  height: 8px;
  border-radius: 4px;
  background: rgba(0, 30, 64, 0.08);
  overflow: hidden;
}

.rev-bars__fill {
  height: 100%;
  border-radius: 4px;
  background: linear-gradient(90deg, #7a4d1c, #c9952d);
  min-width: 0;
  transition: width 0.25s ease;
}

.rev-bars__pct {
  text-align: right;
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  color: var(--color-text-muted);
}

.rev-summary__write {
  width: 100%;
  padding: 16px 20px;
  border: none;
  border-radius: var(--radius-md);
  background: var(--color-dark-blue);
  color: #fff;
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.15s ease, filter 0.15s ease;
}

.rev-summary__write:hover {
  background: var(--color-light-blue);
}

.rev-summary__write:focus-visible {
  outline: 2px solid var(--color-light-blue);
  outline-offset: 3px;
}

/* —— Review cards —— */
.rev-feed {
  display: flex;
  flex-direction: column;
  gap: 32px;
  min-width: 0;
}

.rev-card {
  padding-bottom: 32px;
  border-bottom: 1px solid var(--color-border-strong);
}

.rev-card:last-of-type {
  border-bottom: none;
  padding-bottom: 0;
}

.rev-card__head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.rev-card__date {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--color-caption);
}

.rev-card__title {
  margin: 0 0 12px;
  font-size: 18px;
  font-weight: 800;
  color: var(--color-dark-blue);
  letter-spacing: -0.02em;
}

.rev-card__body {
  margin: 0 0 16px;
  font-size: 15px;
  line-height: 1.6;
  color: var(--color-text);
}

.rev-card__by {
  margin: 0 0 16px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--color-caption);
}

.rev-card__helpful {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 20px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.rev-card__votes {
  display: inline-flex;
  align-items: center;
  gap: 16px;
}

.rev-card__vote {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--color-dark-blue);
}

.rev-pag {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 8px;
}

.rev-pag__btn {
  min-width: 40px;
  height: 40px;
  padding: 0 10px;
  border: 1px solid var(--color-dark-blue);
  border-radius: 4px;
  background: #fff;
  color: var(--color-dark-blue);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
}

.rev-pag__btn:hover {
  background: var(--color-gray-section);
}

.rev-pag__btn--active {
  background: var(--color-dark-blue);
  color: #fff;
}

.rev-pag__btn:focus-visible,
.rev-pag__next:focus-visible {
  outline: 2px solid var(--color-light-blue);
  outline-offset: 2px;
}

.rev-pag__ellipsis {
  padding: 0 4px;
  color: var(--color-text-muted);
  font-weight: 600;
}

.rev-pag__next {
  height: 40px;
  padding: 0 18px;
  border: 2px solid var(--color-dark-blue);
  border-radius: 4px;
  background: #fff;
  color: var(--color-dark-blue);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  font-family: inherit;
}

.rev-pag__next:hover {
  background: rgba(0, 30, 64, 0.06);
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
</style>
